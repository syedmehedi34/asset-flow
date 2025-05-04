import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { user, loading, logOut } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  // Wait for Firebase auth state and set dummy role
  useEffect(() => {
    // If user is loading
    if (loading) {
      return; // Wait until auth state is resolved
    }

    // Auth state is resolved, check if user is logged in
    if (user === null) {
      navigate("/");
      return;
    }

    // User is logged in, set dummy role
    setUserRole("hr_manager"); // Customize here: "employee", "hr_manager", or "admin"
  }, [user, navigate, loading]);

  // Toggle sidebar visibility (for mobile)
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
    <div className="flex min-h-screen">
      {/* Sidebar: Full height, fixed width, starts from top */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0 md:w-64"
        } bg-gray-800 text-white transition-all duration-300 flex flex-col fixed top-0 left-0 h-full overflow-hidden z-10`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          userRole={userRole}
        />
      </div>
      {/* Main content: Takes remaining space, adjusts for sidebar width */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-64"
        }`}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          userRole={userRole}
          user={user}
          logOut={logOut}
        />
        <div className="overflow-y-auto h-[calc(100vh-100px)] dark:bg-[#0B0716]">
          <Outlet />
          {/* Show overview when on /dashboard (customize cards below) */}
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
                  <h2 className="text-xl font-semibold">Pending Requests</h2>
                  <p className="text-2xl">12</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
