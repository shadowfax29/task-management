import React from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
const Login = () => {
  const { form, handleChange, handleSubmit, displayErrors } = useLogin();

  return (
    <div className="register-container">
      <h2>Login</h2>
      {form.serverErrors && displayErrors()}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">email</label>
          <br />
          <input
            type="text"
            name="email"
            placeholder="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.email}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="password">password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
          {form.clientErrors && (
            <p className="error-msg">{form.clientErrors.password}</p>
          )}
        </div>
        <input type="submit" className="form-btn" />
      </form>
      <h5>
        Don't have an account?<Link to={"/"}>Register</Link>
      </h5>
    </div>
  );
};

export default Login;
