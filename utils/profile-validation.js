const profileValidation = (value) => {
  const errors = {};
  if (value.firstname.trim().length === 0) {
    errors.firstname = "firstname is required   ";
  }
  if (value.lastname.trim().length === 0) {
    errors.lastname = "lastname is required";
  }
  if (value.mobile.length === 0) {
    errors.mobile = "mobile number is required";
  }
  if (value.address.trim().length === 0) {
    errors.address = "address is required";
  }
  return errors;
};

export default profileValidation;
