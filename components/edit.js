import axios from "axios"
import {useState } from "react";
import { useAuth } from "../context/AuthContext";
import useEditTask from "../hooks/edithook"
import Select from "react-select";

const Edit=()=>{
    const [options, setOptions] = useState(null)
    // const {idd} =useAuth()
        const {editTask, handleChange,handleChangeSelect, handleSubmit}=useEditTask()
    //     const [updated,setUpdated]=useState(null)
    
    async function fetchData() {
        try {
          const assignees = await axios.get(
            "http://localhost:4444/user/assignees",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          
          const list = assignees.data.map((ele) => {
            return {
              label: `${ele.firstname} ${ele.lastname}`,
              value: ele.userId,
            };
          });
          setOptions(list);
        } catch (err) {
          console.log(err);
        }
      }
      fetchData();
    
return(
    <div className="register-container addTask-container ">
      <h2>Edit Task</h2>
       <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="enter the task title"
            id="title"
            value={editTask.title} 
            onChange={handleChange} 
       
            
          />
          
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.title}</p>
        )}
       <div className="form-field">
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            name="description"
            placeholder="enter the task description"
            id="description"
            value={editTask.description} 
            onChange={handleChange} 
       
          />
          
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.description}</p>
        )}
        <p className="radio-title">Status</p>
        <div className="radio-field">
          <div className="form-field-radio">
            <input
              type="radio"
              name="status"
              id="pending"
              value="Pending"
              checked={editTask.status == "Pending"}
              onChange={handleChange}
            />
            <label htmlFor="pending">Pending</label>
          </div>
          <div className="form-field-radio">
            <input
              type="radio"
              name="status"
              id="in-progress"
              value="In-Progress"
              checked={editTask.status == "In-Progress"}
              onChange={handleChange}
            />
            <label htmlFor="in-progress">InProgress</label>
          </div>
          <div className="form-field-radio">
            <input
              type="radio"
              name="status"
              id="completed"
              value="Completed"
              checked={editTask.status == "Completed"}
              onChange={handleChange}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.status}</p>
        )}
      
        <p className="radio-title">Priority</p>
        <div className="radio-field">
          <div className="form-field-radio">
            <input
              type="radio"
              name="priority"
              id="low"
              value="Low"
              checked={editTask.priority== "Low"}
              onChange={handleChange} 
       
            />
            <label htmlFor="low">Low</label>
          </div>
          <div className="form-field-radio">
            <input
              type="radio"
              name="priority"
              id="medium"
              value="Medium"
              checked={editTask.priority== "Medium"}
              onChange={handleChange}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="form-field-radio">
            <input
              type="radio"
              name="priority"
              id="hign"
              value="High"
              checked={editTask.priority== "High"}
              onChange={handleChange}
            />
            <label htmlFor="high">High</label>
          </div>
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.priority}</p>
        )}
        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
          <br />
          <input
            type="date"
            name="dueDate"
            placeholder="dueDate"
            id="dueDate"
            value={editTask.dueDate.slice(0,10)}
            onChange={handleChange}
          />
         
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.dueDate}</p>
        )}
        <div className="form-field">
          <label htmlFor="assignees">Select assignees </label>
          <br />
          <Select
            className="select-assignees"
            options={options}
            isMulti
            name="assignees"
            id="assignees"
            value={editTask.assignedTo}
            onChange={handleChangeSelect}
       
          />
          
        </div>
        {editTask.clientErrors && (
          <p className="error-msg">{editTask.clientErrors.assignedTo}</p>
        )}
        <input type="submit" className="form-btn" /> 
      </form> 
    </div>
  );

}
export default Edit