import {
  LuScale,
  LuShieldAlert,
  LuUserCheck,
  LuCalendarCheck,
  LuFileSpreadsheet,
} from "react-icons/lu";

export const TERMS_OF_SERVICE_SECTIONS = [
  {
    id: "acceptance-terms",
    icon: LuScale,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing, registering, or scheduling appointments through HealthEase, you acknowledge and agree to comply with these Terms of Service.",
      "If you do not agree with any part of these terms, please discontinue using the platform.",
    ],
  },
  {
    id: "medical-disclaimer",
    icon: LuShieldAlert,
    title: "2. Medical & Emergency Disclaimer",
    content: [
      "• Non-Emergency Service: HealthEase is a digital scheduling portal designed to connect patients with consulting specialists across clinical departments. It is NOT intended for immediate emergency triage.",
      "• Emergency Response: If you are experiencing a medical emergency (such as severe chest pain, shortness of breath, acute trauma, or loss of consciousness), please dial your local emergency services immediately or visit the closest emergency room.",
      "• Professional Judgment: Consultations, diagnoses, and medical advice are provided independently by medical specialists during your scheduled appointments.",
    ],
  },
  {
    id: "account-responsibilities",
    icon: LuUserCheck,
    title: "3. User Accounts & Responsibilities",
    content: [
      "• True and Accurate Data: When registering an account or booking an appointment, you agree to provide accurate and updated information, including your full legal name and an active contact number.",
      "• Account Security: You are responsible for safeguarding your login credentials (passwords or Google authentication access). You must notify us immediately if you suspect unauthorized access to your account.",
      "• Single User Usage: Each account is intended for individual or guardian usage to maintain the integrity of patient health records.",
    ],
  },
  {
    id: "booking-policy",
    icon: LuCalendarCheck,
    title: "4. Appointment Booking & Slot Guidelines",
    content: [
      "• Operating Hours: Appointments can be scheduled during designated operational hours between 10:00 AM and 5:00 PM.",
      "• Conflict Prevention: The platform enforces scheduling checks to prevent duplicate overlapping bookings for the same specialist or time slot.",
      "• Attendance: We ask all patients to arrive promptly or be available at their chosen consultation time to ensure all patients receive timely medical attention.",
    ],
  },
  {
    id: "medical-documents",
    icon: LuFileSpreadsheet,
    title: "5. Uploaded Medical Reports & Attachments",
    content: [
      "• Authentic Records: When uploading diagnostic reports, lab results, or health summaries, ensure they are authentic and relevant to your consultation.",
      "• Consent for Doctor Review: By uploading medical files, you grant authorized consulting physicians permission to review the documents for diagnostic and consultation purposes.",
    ],
  },
  {
    id: "fair-use",
    icon: LuScale,
    title: "6. Fair Platform Usage & Modifications",
    content: [
      "• Acceptable Use: Users agree not to misuse the platform, attempt unauthorized access to backend systems, or submit false booking inquiries.",
      "• Service Updates: HealthEase may update or refine platform features, available departments, or these terms to enhance user experience and adhere to medical compliance standards.",
    ],
  },
];
