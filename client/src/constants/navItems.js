import { MdCollectionsBookmark } from "react-icons/md";
import { MdMedicalServices } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";

export const navItems = [
  {
    label: "Services",
    icon: MdMedicalServices,
    href: "/services",
  },
  {
    label: "Book Appoinment",
    icon: MdCollectionsBookmark,
    href: "/book",
  },
  {
    label: "My Appoinments",
    icon: LuHistory,
    href: "/appoinments",
  },
  {
    label: "Profile",
    icon: IoPersonCircleOutline,
    href: "/profile",
  },
];
