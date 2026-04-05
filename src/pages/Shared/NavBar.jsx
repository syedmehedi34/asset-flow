/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { FaBars, FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { useTheme } from "../../providers/ThemeContext";
import "./NavBar.css";

const NavBar = () => {
  const [isRole] = useRole();
  const role = isRole?.role;
  const companyLogo =
    isRole?.companyLogo || "https://i.ibb.co.com/St0Nj3L/assetflow.png";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const modalRef = useRef(null);
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogOut = () => {
    logOut()
      .then(() => setIsModalOpen(false))
      .catch((error) => console.log(error));
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    [
      "relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-md group",
      isActive
        ? "nav-active"
        : "text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-400",
    ].join(" ");

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={navLinkClass}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="relative z-10">Home</span>
          <ActiveUnderline />
        </NavLink>
      </li>

      {!user && (
        <>
          <li>
            <NavLink
              to="/employee_signup"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Join as Employee</span>
              <ActiveUnderline />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/hr_signup"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Join as HR Manager</span>
              <ActiveUnderline />
            </NavLink>
          </li>
        </>
      )}

      {role === "employee" && user && (
        <>
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/my_assets", label: "My Assets" },
            { to: "/my_team", label: "My Team" },
            { to: "/request_assets", label: "Request Asset" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">{label}</span>
                <ActiveUnderline />
              </NavLink>
            </li>
          ))}
        </>
      )}

      {role === "hr_manager" && user && (
        <>
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/assets_list", label: "Asset List" },
            { to: "/all_requests", label: "All Requests" },
            { to: "/employee_list", label: "Employees" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">{label}</span>
                <ActiveUnderline />
              </NavLink>
            </li>
          ))}
        </>
      )}
    </>
  );

  return (
    <>
      <div
        className={`navbar-root fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0f1217]/90 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
            : "bg-white/70 dark:bg-[#0f1217]/70 backdrop-blur-md"
        }`}
      >
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="h-5 w-5" />
                  ) : (
                    <FaBars className="h-5 w-5" />
                  )}
                </motion.button>
              </div>

              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="logo-mark group-hover:shadow-teal-400/50 transition-shadow duration-300">
                  AF
                </div>
                <div className="hidden sm:block">
                  <span className="text-slate-800 dark:text-white text-[15px] font-bold tracking-tight leading-none">
                    Asset
                    <span className="text-teal-600 dark:text-teal-400">
                      Flow
                    </span>
                  </span>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase leading-none mt-0.5">
                    Asset Management
                  </p>
                </div>
              </Link>
            </div>

            {/* CENTER: Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center gap-1">{navOptions}</ul>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, rotate: 20 }}
                title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              >
                {theme === "dark" ? (
                  <FaSun className="h-4 w-4" />
                ) : (
                  <FaMoon className="h-4 w-4" />
                )}
              </motion.button>

              <div className="nav-divider" />

              {user ? (
                <div className="relative" ref={modalRef}>
                  <motion.button
                    onClick={toggleModal}
                    className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="avatar-ring w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          user?.photoURL ||
                          "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000"
                        }
                        alt="User"
                        onError={(e) =>
                          (e.target.src =
                            "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000")
                        }
                      />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-slate-800 dark:text-slate-200 text-[13px] font-semibold leading-tight">
                        {isRole?.name || "User"}
                      </p>
                      <div className="role-badge mt-0.5">
                        {role || "member"}
                      </div>
                    </div>
                    <svg
                      className="hidden md:block w-3 h-3 text-slate-400 ml-0.5 transition-transform duration-200 group-hover:translate-y-0.5"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <AnimatePresence>
                    {isModalOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700/60 overflow-hidden"
                      >
                        {/* Profile section */}
                        <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-slate-900 border-b border-slate-100 dark:border-slate-700/60">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-400/50">
                              <img
                                className="w-full h-full object-cover"
                                src={
                                  user?.photoURL ||
                                  "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000"
                                }
                                alt="User"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000")
                                }
                              />
                            </div>
                            <div>
                              <p className="text-slate-800 dark:text-slate-100 text-sm font-bold leading-tight">
                                {isRole?.name || "User"}
                              </p>
                              <div className="role-badge mt-1">
                                {role || "member"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        {user?.email && (
                          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700/60">
                            <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        )}

                        {/* Logout */}
                        <div className="p-2">
                          <button
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors duration-150 group"
                          >
                            <svg
                              className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
                              />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 shadow-sm hover:shadow-teal-500/30 hover:shadow-md active:scale-95"
                >
                  Login
                  <svg
                    className="w-3.5 h-3.5 opacity-80"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8h10m-4-4l4 4-4 4"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-slate-100 dark:border-slate-800"
            >
              <div className="bg-white/95 dark:bg-[#0f1217]/95 backdrop-blur-xl px-4 py-3">
                <ul className="flex flex-col gap-1">
                  {/* Mobile nav items use a wrapper to apply mobile style */}
                  <MobileNavOptions
                    navOptions={navOptions}
                    role={role}
                    user={user}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                  />
                </ul>

                {/* Mobile user info */}
                {user && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-teal-400/50">
                        <img
                          className="w-full h-full object-cover"
                          src={
                            user?.photoURL ||
                            "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000"
                          }
                          alt="User"
                          onError={(e) =>
                            (e.target.src =
                              "https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000")
                          }
                        />
                      </div>
                      <div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                          {isRole?.name || "User"}
                        </p>
                        <div className="role-badge">{role || "member"}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogOut}
                      className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Tiny helper: renders the underline indicator inside each link
const ActiveUnderline = () => <span className="nav-underline" />;

// Mobile: re-render nav links with mobile styling applied via CSS class targeting
// We reuse the same navOptions structure — the CSS handles mobile-nav-item styling via the NavLink wrapper
const MobileNavOptions = ({ role, user, setIsMobileMenuOpen }) => {
  const navLinkMobileClass = ({ isActive }) =>
    ["block w-full", isActive ? "nav-active" : ""].join(" ");

  const links = [];

  links.push({ to: "/", label: "Home" });

  if (!user) {
    links.push({ to: "/employee_signup", label: "Join as Employee" });
    links.push({ to: "/hr_signup", label: "Join as HR Manager" });
  }

  if (role === "employee" && user) {
    links.push({ to: "/dashboard", label: "Dashboard" });
    links.push({ to: "/my_assets", label: "My Assets" });
    links.push({ to: "/my_team", label: "My Team" });
    links.push({ to: "/request_assets", label: "Request Asset" });
  }

  if (role === "hr_manager" && user) {
    links.push({ to: "/dashboard", label: "Dashboard" });
    links.push({ to: "/assets_list", label: "Asset List" });
    links.push({ to: "/all_requests", label: "All Requests" });
    links.push({ to: "/employee_list", label: "Employees" });
  }

  return links.map(({ to, label }) => (
    <li key={to}>
      <NavLink
        to={to}
        className={navLinkMobileClass}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="mobile-nav-item">{label}</div>
      </NavLink>
    </li>
  ));
};

export default NavBar;
