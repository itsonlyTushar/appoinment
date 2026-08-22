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
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
