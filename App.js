import Routers from "./Routers";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

function App() {
  const { handleLogin, handleProfile } = useAuth();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        const userResponse = await axios.get(
          "http://localhost:4444/user/account",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        handleLogin(userResponse.data);

        let url;
        if (userResponse.data.role == "Assignee") {
          url = "http://localhost:4444/user/assignee/profile";
        } else if (userResponse.data.role == "Assigner") {
          url = "http://localhost:4444/user/assigner/profile";
        }
        const profileResponse = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        handleProfile(profileResponse.data);
      })();
    }
  }, []);

  return <Routers />;
}

export default App;
