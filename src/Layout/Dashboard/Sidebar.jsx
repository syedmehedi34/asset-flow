import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaBox,
  FaFileAlt,
  FaBars,
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
      icon: <FaBox />,
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
      icon: <FaFileAlt />,
      roles: ["employee"],
    },
    //* hr_manager routes
    {
      path: "/dashboard/assets_list",
      label: "Asset List",
      icon: <FaFileAlt />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/add_asset",
      label: "Add an Asset",
      icon: <FaFileAlt />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/all_requests",
      label: "All Requests",
      icon: <FaFileAlt />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/employee_list",
      label: "Employee List",
      icon: <FaFileAlt />,
      roles: ["hr_manager"],
    },
    {
      path: "/dashboard/add_employee",
      label: "Add Employee",
      icon: <FaFileAlt />,
      roles: ["hr_manager"],
    },
    //* admin routes
    {
      path: "all-users",
      label: "All Users",
      icon: <FaUsers />,
      roles: ["admin"],
    },
    {
      path: "all-assets",
      label: "All Assets",
      icon: <FaBox />,
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
      } bg-gradient-to-b from-teal-900 to-teal-950 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-lg`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          <h1
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-xl font-bold text-blue-200`}
          >
            AssetSync
          </h1>
          <button
            className="p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={toggleSidebar}
          >
            <FaBars className="text-lg text-blue-300" />
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
                        ? "bg-teal-500 text-white font-medium"
                        : "text-teal-50 hover:bg-teal-500 hover:text-white"
                      : isActive
                      ? "bg-teal-600 text-white font-medium justify-center"
                      : "text-teal-200 hover:bg-teal-700 hover:text-white justify-center"
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
      <div className="p-4 border-t border-blue-700">
        <button
          className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 w-full ${
            isSidebarOpen
              ? "text-blue-200 hover:bg-blue-700 hover:text-white"
              : "justify-center text-blue-200 hover:bg-blue-700 hover:text-white"
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
          } mt-2 text-center text-xs text-blue-300`}
        >
          © 2025 AssetSync Solutions
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
