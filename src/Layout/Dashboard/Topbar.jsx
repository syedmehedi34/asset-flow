const Topbar = ({ toggleSidebar, isSidebarOpen, userRole, user }) => {
  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <button
          className="mr-4 text-gray-600 md:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "✕" : "☰"}
        </button>
        <h2 className="text-xl font-semibold">
          Welcome, {user?.displayName || "User"} ({userRole || "Loading..."})
        </h2>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1 mr-4"
        />
      </div>
    </div>
  );
};

export default Topbar;
