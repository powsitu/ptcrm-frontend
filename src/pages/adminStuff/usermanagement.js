import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../../store/user/gql_user";

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
      </table>
    </div>
  );
}
