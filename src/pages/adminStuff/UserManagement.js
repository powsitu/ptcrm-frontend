import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS, SWITCH_USER_BLOCK } from "../../store/user/gql_user";
import UsersTable from "../../components/Tables/users";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import {
  setMessage,
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../../store/appState/actions";

export default function UserManagement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [switchUserBlock] = useMutation(SWITCH_USER_BLOCK);

  const { data, loading, error } = useQuery(ALL_USERS, {
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    dispatch(setMessage("danger", true, error.message));
    return <Loading />;
  }

  const profileButtonClick = (userId) => {
    history.push(`/admin/users/${userId}`);
  };

  async function clickSwitchStatus(userId) {
    dispatch(appLoading());
    try {
      const response = await switchUserBlock({
        variables: { userId: userId },
        refetchQueries: [
          {
            query: ALL_USERS,
            fetchPolicy: "network-only",
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Status switched!", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("danger", true, error.message));
      dispatch(appDoneLoading());
    }
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.getAllUsers.map((user) => {
              return (
                <UsersTable
                  key={user.id}
                  userId={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  isBlocked={user.isBlocked.toString()}
                  profileButtonAction={() => profileButtonClick(user.id)}
                  buttonAction={() => clickSwitchStatus(user.id)}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
