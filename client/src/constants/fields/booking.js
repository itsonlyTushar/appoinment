// TIME SLOTS BETWEEN 10:00 AM AND 5:00 PM WITH 24HR VALUES
export const timeSlots = [
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
];

// BOOKING PAGE FORM FIELDS
import {
  PiCalendarBlank,
  PiBuildings,
  PiUserCircle,
  PiChatText,
  PiFileText,
} from "react-icons/pi";

export const bookingFields = [
  {
    name: "date",
    label: "Appointment Date",
    type: "date",
    icon: PiCalendarBlank,
    placeholder: "Select date",
    required: "Appointment date is required",
    invalidMessage: "Please select a valid date",
  },
  {
    name: "department",
    label: "Department",
    type: "select",
    icon: PiBuildings,
    placeholder: "Select department",
    required: "Department is required",
    invalidMessage: "Please select valid department",
  },
  {
    name: "doctor",
    label: "Doctor",
    type: "select",
    icon: PiUserCircle,
    placeholder: "Select doctor",
    required: "Doctor is required",
    invalidMessage: "Please select a doctor",
  },
  {
    name: "comments",
    label: "Comments",
    type: "textarea",
    icon: PiChatText,
    placeholder: "Write other instructions...",
    invalidMessage: "Enter valid input",
  },
  {
    name: "reports",
    label: "Medical Reports",
    type: "file",
    icon: PiFileText,
    accept: "image/*,application/pdf,.pdf",
    required: false,
    invalidMessage:
      "Only image files JPEG, JPG, PNG and PDF documents under 2MB are allowed",
  },
];
