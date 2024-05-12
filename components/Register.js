import React from "react";
import useRegister from "../hooks/useRegister";
import { Link } from "react-router-dom";

const Register = () => {
  const { form, handleChange, handleSubmit } = useRegister();
  return (
    <div className="register-container">
      <h2>Register</h2>
      {form.serverErrors &&
        form.serverErrors.map((ele) => {
          return <p className="error-msg">{ele.msg}</p>;
        })}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.username}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.email}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="Password"
            name="password"
            id="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.password}</p>
          )}
        </div>
        <div className="radio-field">
          <div className="form-field-radio">
            <input
              type="radio"
              name="role"
              id="assigner"
              value="Assigner"
              checked={form.role === "Assigner"}
              onChange={handleChange}
            />
            <label htmlFor="assigner">Assigner</label>
          </div>
          <div className="form-field-radio">
            <input
              type="radio"
              name="role"
              id="assignee"
              value="Assignee"
              checked={form.role === "Assignee"}
              onChange={handleChange}
            />
            <label htmlFor="assignee">Assignee</label>
          </div>
        </div>
        {form.clientErrors && (
          <p className="error-msg">{form.clientErrors.role}</p>
        )}
        <input type="submit" className="form-btn" />
      </form>
      <h5>
        Already have an account?<Link to={"/login"}>Login</Link>
      </h5>
    </div>
  );
};

export default Register;
