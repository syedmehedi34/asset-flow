import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBell, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Topbar = ({ isSidebarOpen, userRole, user, logOut }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentNews, setCurrentNews] = useState(0);
  const [imageError, setImageError] = useState(false);

  const newsItems = [
    "📊 New Asset Reports Available!",
    "👥 HR Manager: Check Employee Updates!",
    "⏰ Admin: Review Pending Requests!",
    "📅 Schedule Asset Maintenance Today!",
    "🔔 Employee: Update Your Profile!",
    "🔧 Dashboard Update: New Features Added!",
    "✅ Admin: Approve User Access Requests!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="h-auto w-full flex items-center justify-between px-6 py-4 shadow-md bg-[#1B4D3E] backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <motion.div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="h-14 md:h-14 object-contain"
          />
        </motion.div>
      </div>

      <div className="hidden md:flex flex-1 mx-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search assets, employees..."
            className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
        </div>
      </div>

      <div className="hidden md:flex flex-1 mx-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNews}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-medium text-white text-center w-full"
          >
            {newsItems[currentNews]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white text-xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: 180 }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>

        <motion.div className="relative" whileHover={{ scale: 1.05 }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white">
              {imageError || !user?.photoURL ? (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                  {getInitial(user?.displayName)}
                </div>
              ) : (
                <img
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
            </div>
            <div className="hidden md:flex">
              <div className="text-white text-center md:text-left">
                <p className="text-sm md:text-lg font-medium">
                  {user?.displayName || "Guest User"}
                </p>
                {user?.email && (
                  <p className="text-xs md:text-sm font-light">{user.email}</p>
                )}
              </div>
            </div>
          </button>
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.displayName || "Guest User"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {userRole || "Employee"}
                  </p>
                  <div className="mt-2 space-y-2">
                    <Link
                      to="/dashboard/my-profile"
                      className="block text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logOut}
                      className="w-full text-left text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-white text-xl focus:outline-none relative"
          >
            <FaBell />
            <span className="absolute top-0 right-0 z-10 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50"
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800">
                    Notifications
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">
                        New asset request pending.
                      </p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">
                        Employee profile updated.
                      </p>
                    </div>
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600">
                        System maintenance scheduled.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Topbar;
