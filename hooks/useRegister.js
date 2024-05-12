import { useState } from "react";
import registerValidation from "../utils/register-validation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const useRegister = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    clientErrors: null,
    serverErrors: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const errors = registerValidation(form);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: form.username,
      email: form.email,
      password: form.password,
      role: form.role,
    };
    try {
      if (Object.keys(errors).length == 0) {
        const user = await axios.post(
          "http://localhost:4444/user/register",
          formData
        );
        
        navigate("/login");
      } else {
        setForm({ ...form, clientErrors: errors, serverErrors: null });
      }
    } catch (err) {
      console.log(err);
      setForm({
        ...form,
        serverErrors: err.response.data.errors,
        clientErrors: null,
      });
    }
  };

  return { form, handleChange, handleSubmit };
};

export default useRegister;
