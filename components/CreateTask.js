import React from "react";
import Select from "react-select";
import useTask from "../hooks/useTask";
import { useState, useEffect } from "react";

import axios from "axios";

const CreateTask = () => {
  const { form, handleChange, handleSubmit, handleChangeSelect } = useTask();
  const [options, setOptions] = useState(null);
  // fetch assignees for select
  useEffect(() => {
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
  }, []);

  return (
    <div className="register-container addTask-container ">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="enter the task title"
            id="title"
            value={form.title}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.title}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <br />
          <input
            type="text"
            name="description"
            placeholder="enter the task description"
            id="description"
            value={form.description}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.description}</p>
          )}
        </div>
        <p className="radio-title">Status</p>
        <div className="radio-field">
          <div className="form-field-radio">
            <input
              type="radio"
              name="status"
              id="pending"
              value="Pending"
              checked={form.status == "Pending"}
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
              checked={form.status == "In-Progress"}
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
              checked={form.status == "Completed"}
              onChange={handleChange}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        {form.clientErrors && (
          <p className="error-msg">{form.clientErrors.status}</p>
        )}
        <p className="radio-title">Priority</p>
        <div className="radio-field">
          <div className="form-field-radio">
            <input
              type="radio"
              name="priority"
              id="low"
              value="Low"
              checked={form.priority == "Low"}
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
              checked={form.priority == "Medium"}
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
              checked={form.priority == "High"}
              onChange={handleChange}
            />
            <label htmlFor="high">High</label>
          </div>
        </div>
        {form.clientErrors && (
          <p className="error-msg">{form.clientErrors.priority}</p>
        )}
        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>
          <br />
          <input
            type="date"
            name="dueDate"
            placeholder="dueDate"
            id="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.dueDate}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="assignees">Select assignees </label>
          <br />
          <Select
            className="select-assignees"
            options={options}
            isMulti
            name="assignees"
            id="assignees"
            value={form.assignedTo}
            onChange={handleChangeSelect}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.assignedTo}</p>
          )}
        </div>
        <input type="submit" className="form-btn" />
      </form>
    </div>
  );
};

export default CreateTask;
