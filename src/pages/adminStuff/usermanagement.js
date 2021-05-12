import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../../store/user/gql_user";
import UsersTable from "../../components/Tables/users";

export default function UserManagement() {
  const [users, set_users] = useState();

  const { error, loading, data } = useQuery(ALL_USERS);

  useEffect(() => {
    if (data) {
      console.log("this is the user data", data);
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
