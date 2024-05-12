import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
 


import Timer from "./timer"


const Task = () => {
  const { user } = useAuth();
  const [task, setTask] = useState([]);
  const {userProfile} =useAuth()
  const { handleEdit } = useAuth()


  

  const navigate = useNavigate();
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
        setTask(tasklist.data);
       
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
       
        setTask(filteredTasks)
        
      })();
    }
 
    
  }, [task,userProfile]);

  const handleDelete = async (id) => {
    if (user && user.role === "Assigner") {
      try {
         await axios.delete(`http://localhost:4444/assigner/task/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const deletedTask=task.filter((ele)=>{
          if(ele._id!=id){

            return ele
          }
        })
        setTask(deletedTask)
       
      } 
      
      catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };
   const handleedit=(id)=>{
    handleEdit(id)
    navigate(`/home/edit`)
  }
  

  return (
    <div>
      {task.map((task, i) => {
        return (
          <div key={i} className="task-card">
            <div>
              <p className="card-title">Title</p>
              <p className="card-content">{task.title}</p>
            </div>
            <div>
              <p className="card-title">Description</p>
              <p className="card-content">
                {task.description.length > 24
                  ? task.description.substring(0, 21) + "..."
                  : task.description}
              </p>
              
            </div>
            <div>
              <p className="card-title">Priority</p>
              <p className="card-content">{task.priority}</p>
            </div>
           <div>
              <p className="card-title">Status</p>
              <p className="card-content"style={{ color: task.status === "Pending"? "red" : task.status === "In-Progress"? "yellow" : "green" }}>{task.status}</p>
            </div>
            
            <div>
              <p className="card-title">Due Date</p>

              <p className="card-content">
                {moment.utc(task.dueDate).local().format("YYYY-MMM-DD")}
              </p>
            </div>
            {user && user.role == "Assigner" ? (
              <div>
                <p className="card-title">Assigned To</p>
                <p className="card-content">
                  <div style={{ display: "flex", gap: 2 }}>
                    {task.assignedTo.map((ele, index) => {
                      return (
                        <React.Fragment key={ele.value}>
                          <p>{ele.label}</p>
                          {index !== task.assignedTo.length - 1 && (
                            <span>,</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </p>
              </div>
            ) : (
              <div>
                <p className="card-title">Assigned by</p>
                
  <p className="card-content">  Assigner     
</p>
 </div>
            )}
            
            <div>
              <p className="card-title">Actions</p>
              <div className="action-icons">
              {user && user.role === "Assigner"? (
      <>
        <TbEdit style={{ fontSize: "20px", color: "blue" }} onClick={()=>{handleedit(task._id)}}/>
        <TbTrash style={{ fontSize: "20px", color: "red" }} onClick={() => {
    handleDelete(task._id);
  }}
          />
      
        <TbEye 
        style={{ fontSize: "20px", color: "purple" }}
        onClick={() => navigate(`/home/taskdetails/${task._id}`)}
      />
      </>
    ):
     (
      <>
       
      <TbEye
        style={{ fontSize: "20px", color: "purple" }}
        onClick={() => navigate(`/home/taskdetails/${task._id}`)}
      />

      <Timer taskId={task._id}/>
      
      
      
  
   
    </> )}
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default Task;
