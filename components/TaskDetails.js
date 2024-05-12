import React from "react";
import { useParams , Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IoIosArrowRoundBack } from "react-icons/io";

import { useAuth } from "../context/AuthContext";
const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const[log,setLog]=useState(null)
  const navigate = useNavigate()
  const convertMillisecondsToTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };
  useEffect(() => {
    (async () => {
      
      try {
        const taskDetails = await axios.get(
          `http://localhost:4444/task-details/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setTask(taskDetails.data);
        const logtime = await axios.get(
          `http://localhost:4444/log/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLog(logtime?.data?.time ? convertMillisecondsToTime(logtime.data.time) : null);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id,task]);

  return (
    <div className="body-container">
      
      <h3>Task Details</h3>
      <Link to="/home">
        <IoIosArrowRoundBack />
      </Link>

      {task && (
        <div>
          <div style={{ marginTop: "12px" }}>
            <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>Title</h4>
            <p>{task.title}</p>
          </div>
          <div style={{ marginTop: "12px" }}>
            <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
              Description
            </h4>
            <p>{task.description}</p>
          </div>
          <div style={{ marginTop: "12px" }}>
            <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>Status</h4>
            <p>{task.status}</p>
          </div>
          <div style={{ marginTop: "12px" }}>
            <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>Priority</h4>
            <p>{task.priority}</p>
          </div>
          <div style={{ marginTop: "12px" }}>
            <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>Due Date</h4>
            <p>{moment.utc(task.dueDate).local().format("YYYY-MMM-DD")}</p>
          </div>
          {user && user.role == "Assigner" ? (
            <div style={{ marginTop: "12px" }}>
              <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                Assigned To
              </h4>
              <div style={{ display: "flex", gap: 4 }}>
                {task.assignedTo.map((ele, index) => {
                  return (
                    <React.Fragment key={ele.value}>
                      <p>{ele.label}</p>
                      {index !== task.assignedTo.length - 1 && <span>,</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "12px" }}>
              <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
                Assigned By
              </h4>
              <p>assigner</p>
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: "12px" }}>
              <h4 style={{ color: "#4f4444", marginBottom: "4px" }}>
               time taken to complete task
              </h4>
              {log?(<p>{log}</p>):(<p>Not Completed</p>)}
              
            </div>
     
      
    </div>
  );
};

export default TaskDetails;
