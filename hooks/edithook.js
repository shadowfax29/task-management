import Swal from 'sweetalert2'


import { useState, useEffect } from "react";
import axios from "axios";
import taskValidation from "../utils/task-validation";
import { useAuth } from "../context/AuthContext";

const useEditTask = () => {
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    isEdit: false,
    clientErrors: null,
    serverErrors: null,
  });

  const { user } = useAuth();
  const { idd } = useAuth();

  useEffect(() => {
    if (user && user.role === "Assigner") {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://localhost:4444/task-details/${idd}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setEditTask(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [idd, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevEditTask) => ({
     ...prevEditTask,
      [name]: value,
    }));
  };
  const handleChangeSelect = (e) => {
    setEditTask({ ...editTask, assignedTo: e });
  };

  const errors = taskValidation(editTask);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
        title: "Task Updated",
        text: "Details",
        icon: "success"
      });
    if (Object.keys(errors).length === 0) {
      const editTaskData = {
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        priority: editTask.priority,
        dueDate: editTask.dueDate,
        assignedTo: editTask.assignedTo,
      };

      try {
        if (editTaskData) {
          const Response = await axios.put(
            `http://localhost:4444/assigner/task/${idd}`,
            editTaskData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          
        }
        console.log("success updating")
        setEditTask((prevEditTask) => ({
         ...prevEditTask,
          isEdit:!prevEditTask.isEdit,
        }));
      } catch (err) {
        setEditTask((prevEditTask) => ({
         ...prevEditTask,
          serverErrors: err.response.data.errors,
          clientErrors: null,
        }));
      }
    } else {
      setEditTask((prevEditTask) => ({
       ...prevEditTask,
        clientErrors: errors,
        serverErrors: null,
      }));
    }
  };

  return { editTask, handleChange,handleChangeSelect, handleSubmit };
};

export default useEditTask;
