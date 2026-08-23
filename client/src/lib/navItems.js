import { LuLayoutDashboard, LuHistory } from "react-icons/lu";
import { MdCollectionsBookmark } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

// PRIVATE NAVIGATION ROUTE LINKS 
export const navItems = [
  {
    label: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
  },
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
