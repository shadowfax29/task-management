import { useState } from "react";
import axios from "axios";
import loginValidation from "../utils/login-validation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const useLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    clientErrors: null,
    serverErrors: null,
  });
  const { handleLogin, handleProfile } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const errors = loginValidation(form);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: form.email,
      password: form.password,
    };

    if (Object.keys(errors).length == 0) {
      try {
        const tokenResponse = await axios.post(
          "http://localhost:4444/user/login",
          formData
        );
        localStorage.setItem("token", tokenResponse.data.token);
        const userReponse = await axios.get(
          "http://localhost:4444/user/account",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        handleLogin(userReponse.data);

        let url;
        if (userReponse.data.role == "Assignee") {
          url = "http://localhost:4444/user/assignee/profile";
        } else if (userReponse.data.role == "Assigner") {
          url = "http://localhost:4444/user/assigner/profile";
        }

        const profileResponse = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        handleProfile(profileResponse.data);

        navigate("/home");
      } catch (err) {
        console.log(err);
        setForm({
          ...form,
          serverErrors: err.response.data.errors,
          clientErrors: null,
        });
      }
    } else {
      setForm({ ...form, clientErrors: errors });
    }
  };

  const displayErrors = () => {
    if (typeof form.serverErrors === "string") {
      return <p className="error-msg">{form.serverErrors}</p>;
    } else {
      return (
        <ul>
          {form.serverErrors.map((ele) => {
            return <li className="error-msg">{ele.msg}</li>;
          })}
        </ul>
      );
    }
  };
  return { form, handleChange, handleSubmit, displayErrors };
};

export default useLogin;
