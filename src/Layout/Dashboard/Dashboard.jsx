import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open for large devices
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile
  const [userRole, setUserRole] = useState(null);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();

  // Handle window resize to detect mobile/large device
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open by default on large, closed (icons only) on mobile
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Wait for Firebase auth state and set dummy role
  useEffect(() => {
    if (loading) return; // Wait until auth state is resolved
    if (user === null) {
      navigate("/");
      return;
    }
    setUserRole("hr_manager"); // Customize here: "employee", "hr_manager", or "admin"
  }, [user, navigate, loading]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar: Drawer on mobile, fixed on large devices */}
      <div
        className={`${
          isMobile
            ? `${
                isSidebarOpen ? "w-64" : "w-16"
              } absolute top-0 left-0 h-full z-20`
            : `${
                isSidebarOpen ? "w-64" : "w-16"
              } fixed top-0 left-0 h-full z-10`
        } bg-gray-800 text-white transition-all duration-300 flex flex-col overflow-hidden`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={userRole}
          isMobile={isMobile}
        />
      </div>
      {/* Main content: Adjusts opacity on mobile when sidebar is open */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-64" : "ml-16"
        } ${isMobile && isSidebarOpen ? "opacity-50" : "opacity-100"}`}
      >
        <Topbar
          isSidebarOpen={isSidebarOpen}
          userRole={userRole}
          user={user}
          logOut={logOut}
        />
        <div className="overflow-y-auto h-[calc(100vh-100px)] dark:bg-[#0B0716]">
          <Outlet />
          {/* Show overview when on /dashboard */}
          {!window.location.pathname.includes("/dashboard/") && (
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold">Total Assets</h2>
                  <p className="text-2xl">150</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold">Employees</h2>
                  <p className="text-2xl">45</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold"> Assets</h2>
                  <p className="text-2xl">12</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
