import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>user details</h1>
      {user && <p>{user.username}</p>}
    </div>
  );
};

export default Home;
