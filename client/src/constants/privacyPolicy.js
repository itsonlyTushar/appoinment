import {
  LuUserCheck,
  LuLock,
  LuDatabase,
  LuFileText,
  LuEyeOff,
  LuShieldCheck,
} from "react-icons/lu";

export const PRIVACY_POLICY_SECTIONS = [
  {
    id: "information-collected",
    icon: LuUserCheck,
    title: "1. Information We Collect",
    content: [
      "To provide a seamless healthcare scheduling experience, HealthEase collects only the necessary information provided directly by you:",
      "• Account Information: Full name, email address, contact phone number, and optional profile pictures.",
      "• Appointment Details: Selected medical department, consulting doctor, appointment date and time slot (10:00 AM – 5:00 PM), and optional consultation notes.",
      "• Medical Attachments: Diagnostic files and reports that you optionally upload when booking an appointment to assist your consulting doctor.",
    ],
  },
  {
    id: "password-security",
    icon: LuLock,
    title: "2. Password Security & Authentication",
    content: [
      "We take authentication security seriously and implement industry standard safeguards:",
      "• Password Encryption: All passwords submitted during registration are salted and hashed using one-way cryptographic algorithms (bcrypt). At no point are passwords visible in plain text or shared with anyone.",
      "• Google Authentication: When you sign in with Google, authentication is completed via secure Google OAuth 2.0 ID tokens. We receive only your verified profile details (name, email, and avatar) without gaining access to your Google account password.",
      "• Session Tokens: Authentication sessions are secured with encrypted JSON Web Tokens (JWT) with strict expiration limits.",
    ],
  },
  {
    id: "data-storage",
    icon: LuDatabase,
    title: "3. Data Storage & Infrastructure",
    content: [
      "Your user details and appointment records are housed in secure MongoDB Atlas cloud databases, protected with modern network isolation and data encryption both at rest and in transit.",
      "Medical report attachments and user profile images are processed and stored using dedicated, secure cloud storage with authenticated secure delivery URLs.",
    ],
  },
  {
    id: "data-usage",
    icon: LuFileText,
    title: "4. How We Use Your Information",
    content: [
      "We use the information we collect strictly for healthcare scheduling purposes:",
      "• Processing and confirming your doctor appointments across our medical departments.",
      "• Maintaining your personal appointment history for easy review and record keeping.",
      "• Allowing you to update your profile details and contact number.",
      "• Ensuring verified doctor-patient communication regarding your scheduled visits.",
    ],
  },
  {
    id: "third-party-sharing",
    icon: LuEyeOff,
    title: "5. Zero Third-Party Sharing & Confidentiality",
    content: [
      "We respect your medical privacy. Your diagnostic reports, appointment notes, and personal contact details are shared only with the consulting medical specialists involved in your care.",
      "We never sell, rent, monetize, or trade patient data with third-party advertisers or marketing brokers.",
    ],
  },
  {
    id: "user-rights",
    icon: LuShieldCheck,
    title: "6. Your Rights & Account Control",
    content: [
      "You maintain full control over your HealthEase account:",
      "• You can access and update your full name, contact number, and profile picture at any time from your Profile settings.",
      "• You can view past and upcoming appointment records from the My Appointments section.",
      "• You can request account assistance or data updates by reaching out to our support team.",
    ],
  },
];
