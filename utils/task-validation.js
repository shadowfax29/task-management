const taskValidation = (value) => {
  const errors = {};
  if (value.title.trim().length == 0) {
    errors.title = "Title is required";
  }
  if (value.description.trim().length == 0) {
    errors.description = "Description is required";
  }
  if (value.status.trim().length == 0) {
    errors.status = "Status is required";
  }
  if (value.priority.trim().length == 0) {
    errors.priority = "Priority is required";
  }
  if (value.dueDate.trim().length == 0) {
    errors.dueDate = "Due Date is required";
  } else if (new Date(value.dueDate) < new Date()) {
    errors.dueDate = "Due Date should be greater than current date";
  }
  if (value.assignedTo.length == 0) {
    errors.assignedTo = "Assignee is required";
  }
  return errors;
};

export default taskValidation;
