/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../providers/ThemeContext";

const NavBar = () => {
  const [isRole] = useRole();
  const role = isRole?.role;
  const companyLogo =
    isRole?.companyLogo || "https://i.ibb.co.com/St0Nj3L/assetflow.png";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
              isActive
                ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
            }`
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/employee_signup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join as Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hr_signup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join as HR Manager
            </NavLink>
          </li>
        </>
      )}
      {role === "employee" && user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my_assets"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my_team"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/request_assets"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request for an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee_profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
      {role === "hr_manager" && user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/assets_list"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add_asset"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all_requests"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee_list"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add_employee"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add an Employee
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hr_profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 text-teal-900 dark:text-[#E0E0E0] ${
                  isActive
                    ? "bg-teal-200 text-teal-900 dark:bg-[#6B6B6B] dark:text-white"
                    : "hover:bg-teal-100 hover:text-teal-700 dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const modalVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div className="fixed top-0 left-0 w-full min-h-16 bg-gray-100 bg-opacity-90 backdrop-blur-lg shadow-lg z-50 font-sans dark:bg-[#1A1A1A] dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="lg:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className="p-2 text-teal-900 hover:bg-teal-200 rounded-lg transition-all duration-300 dark:text-[#E0E0E0] dark:hover:bg-[#4A4A4A]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaBars className="h-6 w-6" />
              </motion.button>
            </div>
            <Link to="/" className="flex items-center space-x-2">
              {/* <img
                className="h-10 w-auto"
                src={companyLogo}
                alt="AssetFlow Logo"
                onError={(e) => (e.target.src = "")}
              /> */}
              <span className="text-teal-900 text-xl font-bold tracking-tight hidden sm:block dark:text-white">
                AssetFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <ul className="flex space-x-2">{navOptions}</ul>
          </div>

          {/* Right Section (Theme Toggle, User Profile/Login) */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-teal-900 hover:bg-teal-200 rounded-lg transition-all duration-300 dark:text-[#E0E0E0] dark:hover:bg-[#4A4A4A]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </motion.button>
            {user ? (
              <div className="relative">
                <motion.div
                  onClick={toggleModal}
                  className="flex items-center space-x-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 rounded-full border-2 border-teal-500 overflow-hidden dark:border-[#3A3A3A]">
                    <img
                      className="w-full h-full object-cover"
                      src={
                        user?.photoURL ||
                        "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000"
                      }
                      alt="User Profile"
                      onError={(e) =>
                        (e.target.src =
                          "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000")
                      }
                    />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-teal-900 text-sm font-medium dark:text-[#E0E0E0]">
                      {isRole?.name || "User"}
                    </p>
                    <p className="text-teal-700 text-xs capitalize dark:text-[#A0A0A0]">
                      {role || "Role"}
                    </p>
                  </div>
                </motion.div>
                <AnimatePresence>
                  {isModalOpen && (
                    <motion.div
                      ref={modalRef}
                      variants={modalVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-teal-200 p-4 dark:bg-[#2D2D2D] dark:border-[#3A3A3A]"
                    >
                      <p className="text-teal-900 text-sm font-medium dark:text-[#E0E0E0]">
                        {isRole?.name || "User"}
                      </p>
                      <p className="text-teal-700 text-xs capitalize dark:text-[#A0A0A0]">
                        {role || "Role"}
                      </p>
                      <button
                        onClick={handleLogOut}
                        className="w-full mt-3 text-left text-teal-900 text-sm font-medium hover:bg-teal-100 hover:text-teal-700 px-3 py-2 rounded-lg transition-all duration-300 dark:text-[#E0E0E0] dark:hover:bg-[#4A4A4A] dark:hover:text-white"
                      >
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-teal-900 font-medium hover:bg-teal-200 hover:text-teal-700 rounded-lg transition-all duration-300 dark:text-[#E0E0E0] dark:hover:bg-[#4A4A4A] dark:hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-gray-200 w-full absolute top-16 left-0 shadow-xl dark:bg-[#2D2D2D]"
          >
            <ul className="flex flex-col p-4 space-y-2">{navOptions}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
