import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "Our Services", path: "/services" },
  { name: "Book Appointment", path: "/book" },
  { name: "My Appointments", path: "/appointment" },
  { name: "Sign In", path: "/login" },
  { name: "Create Account", path: "/register" },
];

export const OUR_CENTERS = [
  "Delhi",
  "Mumbai",
  "Surat",
  "Hyderabad",
  "Bengaluru",
];

export const LEGAL_LINKS = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-of-service" },
];

export const SOCIAL_LINKS = [
  { name: "X", icon: FaXTwitter, href: "https://x.com/ts28_7" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/tushar-soni-b0426022b",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/wake.up.tushar",
  },
];
