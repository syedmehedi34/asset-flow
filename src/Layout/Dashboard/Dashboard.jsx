import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Detect mobile
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  const [isRole, isRoleLoading] = useRole();
  let userRole = isRole?.role;

  // Handle window resize to detect mobile/large device
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Open on large screens, closed on mobile
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle authentication and role loading
  useEffect(() => {
    if (loading || isRoleLoading) return;
    if (!user) {
      navigate("/");
      return;
    }
    userRole = isRole?.role;
  }, [user, navigate, loading, isRoleLoading, isRole]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Show loading spinner while checking auth
  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Fixed Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userRole={userRole}
        isMobile={isMobile}
      />

      {/* Main content */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } mt-[100px]`}
      >
        <Topbar
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          userRole={isRole}
          user={user}
          logOut={logOut}
        />
        {/* <div className="overflow-y-auto h-[calc(100vh-64px)] dark:bg-[#0B0716]"> */}
        <div className="dark:bg-[#0B0716]">
          <Outlet />
          {/* Dashboard overview */}
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
                  <h2 className="text-xl font-semibold">Assets</h2>
                  <p className="text-2xl">12</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay when sidebar is open */}
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
