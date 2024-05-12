import validator from "validator";
const registerValidation = (value) => {
  const errors = {};
  if (value.username.trim().length === 0) {
    errors.username = "username is required";
  }
  if (value.email.trim().length === 0) {
    errors.email = "email is required";
  } else if (!validator.isEmail(value.email)) {
    errors.email = "email should be valid format";
  }
  if (value.password.trim().length === 0) {
    errors.password = "password is required";
  } else if (
    value.password.trim().length < 8 ||
    value.password.trim().length > 128
  ) {
    errors.password = "password length should be 8 - 128 character length";
  }
  if (value.role.trim().length === 0) {
    errors.role = "role is required";
  }
  return errors;
};

export default registerValidation;
