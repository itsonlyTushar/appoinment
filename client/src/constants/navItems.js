import { MdCollectionsBookmark } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";

// PRIVATE NAVIGATION ROUTE LINKS 
export const navItems = [
  {
    label: "Book Appointment",
    icon: MdCollectionsBookmark,
    href: "/book",
  },
  {
    label: "My Appointments",
    icon: LuHistory,
    href: "/appointment",
  },
  {
    label: "Profile",
    icon: IoPersonCircleOutline,
    href: "/profile",
  },
];
