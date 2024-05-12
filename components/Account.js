import React from "react";
import { useAuth } from "../context/AuthContext";
import AssigneeProfile from "./AssigneeProfile";
import AssignerProfile from "./AssignerProfile";

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="account-container">
      {user && (
        <div>
          <h3>User Details</h3>
          <p>username - {user.username}</p>
          <p>email - {user.email}</p>
          <p>role - {user.role}</p>
        </div>
      )}
      {user && user.role == "Assignee" ? (
        <AssigneeProfile />
      ) : (
        <AssignerProfile />
      )}
    </div>
  );
};

export default Account;
