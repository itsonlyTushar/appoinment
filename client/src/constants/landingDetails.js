import {
  LuUserCheck,
  LuCalendarDays,
  LuClipboardCheck,
  LuBuilding2,
  LuMessagesSquare,
  LuGlobe,
  LuHeartPulse,
  LuBrain,
  LuBone,
  LuSparkles,
  LuBaby,
  LuLock,
  LuShieldCheck,
} from "react-icons/lu";

export const QUICK_SERVICES = [
  {
    id: "find-doctors",
    title: "Find Doctors",
    icon: LuUserCheck,
  },
  {
    id: "book-appointment",
    title: "Book Appointment",
    icon: LuCalendarDays,
  },
  {
    id: "health-checkups",
    title: "Health Checkups",
    icon: LuClipboardCheck,
  },
  {
    id: "our-hospitals",
    title: "Our Hospitals",
    icon: LuBuilding2,
  },
  {
    id: "get-second-opinion",
    title: "Get Second Opinion",
    icon: LuMessagesSquare,
  },
  {
    id: "international-care",
    title: "International Care",
    icon: LuGlobe,
  },
];

export const DOCTOR_IMAGE_URL =
  "https://res.cloudinary.com/dartdvch1/image/upload/v1787492389/ChatGPT_Image_Aug_22_2026_04_49_55_PM_hbs3gc.png";

export const DEPARTMENT_ICONS = {
  Cardiology: LuHeartPulse,
  Neurology: LuBrain,
  Orthopedics: LuBone,
  Dermatology: LuSparkles,
  Pediatrics: LuBaby,
};

export const PRIVACY_FEATURES = [
  {
    icon: LuLock,
    title: "End-to-End Protected Sessions",
    description:
      "All patient data and appointment requests are securely transmitted and stored using industry-standard cloud protection.",
  },
  {
    icon: LuUserCheck,
    title: "Doctor-Patient Confidentiality",
    description:
      "Your diagnostic files and appointment history are accessible strictly by you and your consulting specialists.",
  },
  {
    icon: LuShieldCheck,
    title: "Zero Third-Party Sharing",
    description:
      "We adhere to strict confidentiality practices. Your personal details and medical history are never sold or shared.",
  },
];
