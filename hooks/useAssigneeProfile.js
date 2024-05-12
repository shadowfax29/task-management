import { useState } from "react";
import axios from "axios";
import profileValidation from "../utils/profile-validation";
import { useAuth } from "../context/AuthContext";

const useAssigneeProfile = () => {
  const { userProfile, handleProfile } = useAuth();
  const [profile, setProfile] = useState({
    firstname: userProfile ? userProfile.firstname : "",
    lastname: userProfile ? userProfile.lastname : "",
    mobile: userProfile ? userProfile.mobile : "",
    address: userProfile ? userProfile.address : "",
    isEdit: false,
    clientErrors: null,
    serverErrors: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const errors = profileValidation(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length == 0) {
      const profileData = {
        firstname: profile.firstname,
        lastname: profile.lastname,
        mobile: profile.mobile,
        address: profile.address,
      };
      try {
        if (userProfile) {
          const profileResponse = await axios.put(
            "http://localhost:4444/user/assignee/profile",
            profileData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          handleProfile(profileResponse.data);
        } else {
          const profileResponse = await axios.post(
            "http://localhost:4444/user/assignee/profile",
            profileData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          handleProfile(profileResponse.data);
        }
        setProfile({ ...profile, isEdit: !profile.isEdit });
      } catch (err) {
        setProfile({
          ...profile,
          serverErrors: err.response.data.errors,
          clientErrors: null,
        });
      }
    } else {
      setProfile({ ...profile, clientErrors: errors, serverErrors: null });
    }
  };
  const handleToggle = () => {
    setProfile({ ...profile, isEdit: !profile.isEdit });
  };
  return { profile, handleChange, handleSubmit, handleToggle };
};

export default useAssigneeProfile;
