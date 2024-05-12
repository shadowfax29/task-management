import validator from "validator";
const loginValidation = (value) => {
  const errors = {};
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
    errors.password = "password should be 8 - 128 character length";
  }
  return errors;
};

export default loginValidation;
