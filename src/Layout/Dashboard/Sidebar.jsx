import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHome,
  FaUser,
  FaUsers,
  FaBox,
  FaFileAlt,
  FaBars,
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
        isSidebarOpen ? "w-72" : "w-20"
      } bg-gradient-to-b from-slate-800 to-slate-700 text-white transition-all duration-300 ease-in-out flex flex-col h-full shadow-2xl`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 flex items-center justify-between border-b border-slate-600">
          <h1
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-400 drop-shadow-md`}
          >
            AssetSync
          </h1>
          <button
            className={`rounded-full hover:bg-slate-600 transition-colors duration-200 ${
              isSidebarOpen ? "pr-8" : "p-0"
            }`}
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl text-slate-300" />
          </button>
        </div>
        <ul className="mt-4 space-y-1 px-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => isMobile && !isSidebarOpen && toggleSidebar()}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? isActive
                        ? "bg-teal-500 text-white font-semibold shadow-md"
                        : "text-slate-200 hover:bg-slate-600 hover:text-teal-300"
                      : isActive
                      ? "bg-teal-500 text-white font-semibold shadow-md justify-center"
                      : "text-slate-200 hover:bg-slate-600 hover:text-teal-300 justify-center"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`${
                    isSidebarOpen ? "block" : "hidden"
                  } text-sm font-medium tracking-wide`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } p-6 border-t border-slate-600 text-center text-xs text-slate-400`}
      >
        © 2025 AssetSync Solutions
      </div>
    </div>
  );
};

export default Sidebar;
