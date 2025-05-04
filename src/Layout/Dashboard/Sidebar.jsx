import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaUser,
  FaBoxOpen,
  FaUsers,
  FaClipboardList,
  FaListAlt,
  FaPlusSquare,
  FaFileSignature,
  FaAddressBook,
  FaUserPlus,
  FaUsersCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, toggleSidebar, userRole, isMobile }) => {
  const allNavItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      roles: ["employee", "hr_manager", "admin"],
    },
    {
      path: "my-profile",
      label: "My Profile",
      icon: <FaUser />,
      roles: ["employee", "hr_manager", "admin"],
    },
    //* employee routes
    {
      path: "/dashboard/my_assets",
      label: "My Assets",
      icon: <FaBoxOpen />,
      roles: ["employee"],
    },
    {
      path: "/dashboard/my_team",
      label: "My Team",
      icon: <FaUsers />,
      roles: ["employee"],
    },
    {
      path: "/dashboard/request_assets",
      label: "Request Assets",
      icon: <FaClipboardList />,
      roles: ["employee"],
    },
    //* hr_manager routes
    {
      path: "/dashboard/assets_list",
      label: "Asset List",
      icon: <FaListAlt />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/add_asset",
      label: "Add an Asset",
      icon: <FaPlusSquare />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/all_requests",
      label: "All Requests",
      icon: <FaFileSignature />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/employee_list",
      label: "Employee List",
      icon: <FaAddressBook />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/add_employee",
      label: "Add Employee",
      icon: <FaUserPlus />,
      roles: ["hr_manager"],
    },
    //* admin routes
    {
      path: "all-users",
      label: "All Users",
      icon: <FaUsersCog />,
      roles: ["admin"],
    },
    {
      path: "all-assets",
      label: "All Assets",
      icon: <FaBoxOpen />,
      roles: ["admin"],
    },
  ];

  const navItems = allNavItems.filter((item) =>
    item.roles.some(
      (role) => role.toLowerCase() === (userRole || "").toLowerCase()
    )
  );

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-teal-800 to-teal-600 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-xl`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-[22.6px] flex items-center justify-between border-b border-teal-500">
          <Link to="/">
            <h1
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } text-xl font-semibold text-white`}
            >
              AssetFlow
            </h1>
          </Link>
          <button
            className="p-2 rounded-md hover:bg-teal-500 transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <FaBars className="text-lg text-white" />
          </button>
        </div>
        <ul className="mt-4 space-y-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => isMobile && !isSidebarOpen && toggleSidebar()}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-md transition-all duration-200 ${
                    isSidebarOpen
                      ? isActive
                        ? "bg-teal-400 text-white font-medium"
                        : "text-teal-100 hover:bg-teal-500 hover:text-white"
                      : isActive
                      ? "bg-teal-400 text-white font-medium justify-center"
                      : "text-teal-200 hover:bg-teal-500 hover:text-white justify-center"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`${
                    isSidebarOpen ? "block" : "hidden"
                  } text-sm font-medium`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-teal-500">
        <button
          className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 w-full ${
            isSidebarOpen
              ? "text-teal-100 hover:bg-teal-500 hover:text-white"
              : "justify-center text-teal-200 hover:bg-teal-500 hover:text-white"
          }`}
        >
          <FaSignOutAlt className="text-lg" />
          <span
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-sm font-medium`}
          >
            Logout
          </span>
        </button>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } mt-2 text-center text-xs text-teal-100`}
        >
          © 2025 AssetFlow Solutions
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
