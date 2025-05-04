import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const checkAuthAndFetchData = async () => {
      // Delay to ensure Firebase auth initialization
      const authTimer = setTimeout(async () => {
        if (!isMounted) return;

        if (!user?.email) {
          setIsLoading(false);
          navigate("/");
          return;
        }

        try {
          const response = await axiosPublic.get(
            `/users/getUser/${user.email}`
          );
          if (isMounted) {
            setUserRole(response.data.role || "employee");
            setIsLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err.message);
            console.error("Failed to fetch user data:", err);
            setIsLoading(false);
          }
        }
      }, 500);

      return () => clearTimeout(authTimer);
    };

    checkAuthAndFetchData();

    return () => {
      isMounted = false;
    };
  }, [user, axiosPublic, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userRole={userRole}
        logOut={logOut}
      />
      <div className="flex-1 flex flex-col">
        <Topbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          userRole={userRole}
          user={user}
        />
        <div className="flex-1 p-6 mt-16 overflow-y-auto">
          <Outlet />
          {!window.location.pathname.includes("/dashboard/") && (
            <div>
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
