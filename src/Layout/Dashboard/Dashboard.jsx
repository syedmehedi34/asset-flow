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

    // Original API call (commented out, uncomment to fetch real data)
    /*
    import useAxiosPublic from "../../hooks/useAxiosPublic";
    const axiosPublic = useAxiosPublic();
    const fetchUserRole = async () => {
      try {
        const response = await axiosPublic.get(`/users/getUser/${user.email}`);
        setUserRole(response.data.role || "employee");
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setIsLoading(false);
      }
    };
    fetchUserRole();
    */
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
    <div>
      <Topbar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        userRole={userRole}
        user={user}
        logOut={logOut}
      />
      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-0 md:w-64"
          } bg-gray-800 text-white transition-all duration-300 flex flex-col overflow-hidden`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            userRole={userRole}
          />
        </div>
        <div className="flex-1 overflow-y-auto h-full dark:bg-[#0B0716]">
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
