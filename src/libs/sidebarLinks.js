import {
  MdDashboard,
  MdOutlineLocalPharmacy,
  MdOutlineInventory2,
  MdPointOfSale,
  MdPeopleOutline,
} from "react-icons/md";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: <MdDashboard className="w-6 h-6" />,
  },
  {
    key: "customer",
    label: "Customer",
    href: "/customer",
    icon: <MdPeopleOutline className="w-6 h-6" />,
  },
  {
    key: "medicine",
    label: "Medicine",
    href: "/medicine",
    icon: <MdOutlineLocalPharmacy className="w-6 h-6" />,
  },
  {
    key: "inventory",
    label: "Inventory",
    href: "/inventory",
    icon: <MdOutlineInventory2 className="w-6 h-6" />,
  },
  {
    key: "sells",
    label: "Sales",
    href: "/sells",
    icon: <MdPointOfSale className="w-6 h-6" />,
  },
];
