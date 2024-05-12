import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { user } = useAuth();
  return (
    <div className="nav">
      <div className="nav-container">
        <h3>
          <Link to={"/home"}>Task</Link>
        </h3>
        <ul>
          <li>
            <Link to={"account"}>Account</Link>
            <small>({user && user.role})</small>
          </li>
          <li>
            <Link to={"/login"}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
