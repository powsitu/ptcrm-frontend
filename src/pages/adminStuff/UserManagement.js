import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS, SWITCH_USER_BLOCK } from "../../store/user/gql_user";
import UsersTable from "../../components/Tables/users";

export default function UserManagement() {
  const [users, set_users] = useState();
  const [switchUserBlock] = useMutation(SWITCH_USER_BLOCK);

  const { data } = useQuery(ALL_USERS, {
    fetchPolicy: "network-only",
  });

  async function clickSwitchStatus(userId) {
    const response = await switchUserBlock({
      variables: { userId: userId },
    });
  }

  useEffect(() => {
    if (data) {
      set_users(data);
    }
  }, [data]);

  return (
    <div className="users-container">
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Blocked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.getAllUsers.map((user) => {
              return (
                <UsersTable
                  key={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  isBlocked={user.isBlocked.toString()}
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
