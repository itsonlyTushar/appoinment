// BOOKING PAGE FORM FIELDS
export const bookingFields = [
  {
    name: "date",
    label: "Date & Time",
    type: "datetime-local",
    placeholder: "DD-MM-YYYY --:--",
    required: "Date and time are required",
    invalidMessage: "Please select a valid date and time",
  },
  {
    name: "department",
    label: "Department",
    type: "select",
    placeholder: "Select department",
    required: "Department is required",
    invalidMessage: "Please select valid department",
  },
  {
    name: "comments",
    label: "Comments",
    type: "textarea",
    placeholder: "Write other instructions...",
    invalidMessage: "Enter valid input",
  },
  {
    name: "reports",
    label: "Medical Reports",
    type: "file",
    accept: "image/*",
    required: false,
    invalidMessage: "Only image files (JPEG, PNG, WEBP, etc.) are allowed",
  },
];

export const registerFields = bookingFields;
