import {
  MdDashboard,
  MdOutlineLocalPharmacy,
  MdPointOfSale,
  MdPeopleOutline,
  MdOutlineBusiness,
  MdOutlineListAlt,
} from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: <MdDashboard className="w-6 h-6" />,
  },
  {
    key: "add-customer",
    label: "Add Customer",
    href: "/add-customer",
    icon: <RiUserAddLine className="w-6 h-6 text-green-600" />,
  },
  {
    key: "customers",
    label: "Customer Lists",
    href: "/customers",
    icon: <MdPeopleOutline className="w-6 h-6 text-blue-600" />,
  },
  {
    key: "add-medicine",
    label: "Add Medicine",
    href: "/add-medicine",
    icon: <FaPlusCircle className="w-6 h-6 text-emerald-600" />,
  },
  {
    key: "medicines",
    label: "Medicine Lists",
    href: "/medicines",
    icon: <MdOutlineLocalPharmacy className="w-6 h-6 text-teal-600" />,
  },
  {
    key: "add-company",
    label: "Add Company",
    href: "/add-company",
    icon: <FaPlusCircle className="w-6 h-6 text-purple-600" />,
  },
  {
    key: "company-lists",
    label: "Company Lists",
    href: "/companies",
    icon: <MdOutlineBusiness className="w-6 h-6 text-indigo-600" />,
  },
  {
    key: "add-sale",
    label: "Add Sell",
    href: "/add-sale",
    icon: <MdPointOfSale className="w-6 h-6 text-pink-600" />,
  },
  {
    key: "sales",
    label: "Sales",
    href: "/sales",
    icon: <MdPointOfSale className="w-6 h-6 text-pink-600" />,
  },
];
