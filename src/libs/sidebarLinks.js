import {
  MdDashboard,
  MdOutlineLocalPharmacy,
  MdOutlineInventory2,
  MdPointOfSale,
  MdPeopleOutline,
} from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: <MdDashboard className="w-6 h-6" />,
  },
  {
    key: "AddCustomer",
    label: "Add Customer",
    href: "/add-customer",
    icon: <RiUserAddLine className="w-6 h-6" />,
  },
  {
    key: "customers",
    label: "Customer Lists",
    href: "/customers",
    icon: <MdPeopleOutline className="w-6 h-6" />,
  },
  {
    key: "add-medicine",
    label: "Add medicine",
    href: "/add-medicine",
    icon: <MdOutlineLocalPharmacy className="w-6 h-6" />,
  },
  {
    key: "medicines",
    label: "Medicine Lists",
    href: "/medicines",
    icon: <MdOutlineLocalPharmacy className="w-6 h-6" />,
  },

  {
    key: "sales",
    label: "Sales",
    href: "/sales",
    icon: <MdPointOfSale className="w-6 h-6" />,
  },
];
