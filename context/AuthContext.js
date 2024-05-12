import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [idd,setid]=useState(null)
  const updateTaskStatus = (status) => {
    setTaskStatus(status);
  };

  const handleLogin = (user) => {
    setUser(user);
  };
  const handleProfile = (profile) => {
    setUserProfile(profile);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  const handleEdit=(taskid)=>{
setid(taskid)
}
  return (
    <AuthContext.Provider
      value={{ user, userProfile, handleLogin, handleLogout, handleProfile , taskStatus, updateTaskStatus,handleEdit,idd}}
    >
      {children}
    </AuthContext.Provider>
  );
};
