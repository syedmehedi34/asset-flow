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
    // {
    //   path: "/",
    //   label: "Home",
    //   icon: <FaHome />,
    //   roles: ["employee", "hr_manager", "admin"],
    // },
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
      } bg-gray-800 text-white transition-all duration-300 flex flex-col h-full overflow-hidden`}
    >
      <div className="pl-4 mt-4 flex-1">
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } text-2xl font-bold`}
          >
            Dashboard
          </h1>
          <button className="text-white" onClick={toggleSidebar}>
            <FaBars className="text-2xl" />
          </button>
        </div>
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                onClick={() => isMobile && !isSidebarOpen && toggleSidebar()}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 text-lg transition-all duration-200 ${
                    isActive
                      ? "text-white border-white border-l-4 border-t-4 border-b-4 shimmer-border bg-emerald-500 rounded-l-4xl font-bold custom-outward-curve"
                      : "text-white font-bold hover:bg-white rounded-l-4xl hover:text-emerald-500"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
