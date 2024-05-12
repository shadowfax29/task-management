import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Task from "./Task";


const TaskList = () => {
    const { userProfile } = useAuth();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
      if (user && user.role == "Assigner") {
        (async () => {
          const tasklist = await axios.get(
            "http://localhost:4444/assigner/task",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          setTasks(tasklist.data);
        })();
      }
      else if (userProfile && user.role == "Assignee"){
        (async () => {
          const tasklist = await axios.get(
            "http://localhost:4444/assignee/task",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          
          const filteredTasks = tasklist.data.filter(task => {
            
            return task.assignedTo.some(assignee => assignee.value === userProfile.userId);
          });
         
          setTasks(filteredTasks)
        })();
      }
    }, [user,tasks,userProfile]);

    return (
        <div className="body-container">
            <div className="body-container-header">
                {user && user.role === "Assigner" ? (
                    <>
                        <h3>Tasks</h3>
                        
                        <button onClick={() => navigate("/home/createTask")}>Add Task</button>
                    </>
                ) : (
                    <h3>My Tasks</h3>
                )}
            </div>
            
       
      <Task />
    
            <div style={{ width: '50%', margin: '10px' }}>
                {user && user.role === "Assigner" ? (
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={tasks.map(task => ({
                            title: task.title,
                            start: task.dueDate.split('T')[0],
                        }))}
                        height="500px" 
                    />
                ) : (
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={tasks.map(task => ({
                            title: task.title,
                            start: task.dueDate.split('T')[0],
                        }))}
                        height="600px" 
                    />
                )}
            </div>
        </div>
    );
};

export default TaskList;
