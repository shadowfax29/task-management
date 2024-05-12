import { useState } from "react";
import axios from "axios";
import taskValidation from "../utils/task-validation";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
const useTask = () => {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: [],
    clientErrors: null,
    serverErrors: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleChangeSelect = (e) => {
    setForm({ ...form, assignedTo: e });
  };
  const errors = taskValidation(form);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = _.pick(form, [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
      "assignedTo",
    ]);

    if (Object.keys(errors).length == 0) {
      try {
        const taskResponse = await axios.post(
          "http://localhost:4444/assigner/task",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    } else {
      setForm({ ...form, clientErrors: errors });
    }
  };

  return { form, handleChange, handleSubmit, handleChangeSelect };
};

export default useTask;
