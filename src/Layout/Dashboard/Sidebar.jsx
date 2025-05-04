import { NavLink } from "react-router-dom";
import {
  RiHome2Line,
  RiBox3Line,
  RiGroupLine,
  RiFileList3Line,
  RiUser3Line,
  RiLogoutCircleFill,
} from "react-icons/ri";

const Sidebar = ({ isSidebarOpen, toggleSidebar, userRole, logOut }) => {
  const navLinks = [
    {
      path: "/dashboard",
      label: "Overview",
      icon: <RiHome2Line className="text-xl" />,
    },
    ...(userRole === "manager"
      ? [
          {
            path: "/dashboard/assets",
            label: "Assets",
            icon: <RiBox3Line className="text-xl" />,
          },
          {
            path: "/dashboard/employees",
            label: "Employees",
            icon: <RiGroupLine className="text-xl" />,
          },
          {
            path: "/dashboard/requests",
            label: "Requests",
            icon: <RiFileList3Line className="text-xl" />,
          },
        ]
      : []),
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <RiUser3Line className="text-xl" />,
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-0 md:w-64"
      } bg-gray-800 text-white fixed top-0 left-0 h-full transition-all duration-300 flex flex-col justify-between overflow-hidden z-20`}
    >
      <div>
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`${
              isSidebarOpen ? "block" : "hidden md:block"
            } text-2xl font-bold`}
          >
            Dashboard
          </h1>
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </div>
        <nav className="mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center p-4 hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700" : ""
                } ${isSidebarOpen ? "block" : "hidden md:block"}`
              }
              onClick={() => isSidebarOpen && toggleSidebar()}
            >
              <span className="mr-2">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={logOut}
          className={`w-full p-3 rounded text-center flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors ${
            isSidebarOpen ? "block" : "hidden md:block"
          }`}
        >
          <RiLogoutCircleFill className="mr-2 text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
