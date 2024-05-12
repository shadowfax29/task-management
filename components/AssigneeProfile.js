import React from "react";
import useAssigneeProfile from "../hooks/useAssigneeProfile";
import { useAuth } from "../context/AuthContext";

const AssigneeProfile = () => {
  const { profile, handleChange, handleSubmit, handleToggle } =
    useAssigneeProfile();
  const { userProfile } = useAuth();
  return (
    <div className="profile-form">
      <div className="profile-form-header">
        <h3>My Profile</h3>
        <button
          onClick={handleToggle}
          className="profile-secondaryBtn"
          style={{
            color: profile.isEdit ? "red" : "blue",
          }}
        >
          {profile.isEdit ? "cancel" : "Edit"}
        </button>
      </div>
      {/* {profile.serverErrors &&
        profile.isEdit &&
        profile.serverErrors.map((ele) => {
          return <p className="error-msg">{ele.msg}</p>;
        })} */}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstname">firstname</label>
          <br />
          <input
            type="text"
            name="firstname"
            placeholder="firstname"
            id="firstname"
            value={profile.firstname}
            onChange={handleChange}
            disabled={!profile.isEdit}
          />
          {profile.clientErrors && profile.isEdit && (
            <p className="error-msg">{profile.clientErrors.firstname}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="lastname">lastname</label>
          <br />
          <input
            type="text"
            name="lastname"
            placeholder="lastname"
            id="lastname"
            value={profile.lastname}
            onChange={handleChange}
            disabled={!profile.isEdit}
          />
          {profile.clientErrors && (
            <p className="error-msg">{profile.clientErrors.lastname}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="mobile">mobile</label>
          <br />
          <input
            type="text"
            name="mobile"
            placeholder="mobile"
            id="mobile"
            value={profile.mobile}
            onChange={handleChange}
            disabled={!profile.isEdit}
          />
          {profile.clientErrors && (
            <p className="error-msg">{profile.clientErrors.mobile}</p>
          )}
        </div>
        <div className="form-field">
          <label htmlFor="address">address</label>
          <br />
          <input
            type="text"
            name="address"
            placeholder="address"
            id="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!profile.isEdit}
          />
          {profile.clientErrors && (
            <p className="error-msg">{profile.clientErrors.address}</p>
          )}
        </div>
        {profile.isEdit &&
          (userProfile ? (
            <input type="submit" value={"update"} className="form-btn" />
          ) : (
            <input type="submit" className="form-btn" />
          ))}
      </form>
    </div>
  );
};

export default AssigneeProfile;
