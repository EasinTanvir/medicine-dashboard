import { homeIcon, newsIcon, notificationIcon } from "@/constant";

const navLinks = [
  { id: 1, label: "Home", iconImage: homeIcon, path: "/" },
  { id: 2, label: "Newsroom", iconImage: newsIcon, path: "/news" },
  {
    id: 3,
    label: "Notification",
    iconImage: notificationIcon,
    path: "/notifications",
  },
];

export { navLinks };
