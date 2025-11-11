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
    key: "customers",
    label: "Customers",
    href: "/customers",
    icon: <MdPeopleOutline className="w-6 h-6" />,
  },
  {
    key: "medicines",
    label: "Medicines",
    href: "/medicines",
    icon: <MdOutlineLocalPharmacy className="w-6 h-6" />,
  },

  {
    key: "sells",
    label: "Sales",
    href: "/sells",
    icon: <MdPointOfSale className="w-6 h-6" />,
  },
];
