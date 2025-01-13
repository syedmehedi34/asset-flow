/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { FaUserAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
// import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  // ? need to change here
  // const role = "employee";
  const [isRole] = useRole();

  console.log(isRole?.role);
  const role = isRole?.role;
  // ?

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const { user, logOut } = useAuth();
  // console.log(user?.photoURL);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setIsModalOpen(false); // Close modal on logout
      })
      .catch((error) => console.log(error));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      {/* user routes  */}
      {!user && (
        <>
          <li>
            <Link to="/employee_signup">Join as Employee</Link>
          </li>
          <li>
            <Link to="/hr_signup">Join as HR Manager</Link>
          </li>
        </>
      )}

      {/* employee routes */}
      {role === "employee" && user && (
        <>
          <li>
            <Link to="/my_assets">My Assets</Link>
          </li>
          <li>
            <Link to="/my_team">My Team</Link>
          </li>
          <li>
            <Link to="/request_assets">Request for an Asset</Link>
          </li>
          <li>
            <Link to="/my_profile">Profile</Link>
          </li>
        </>
      )}

      {/* HR routes */}
      {role === "hr_manager" && user && (
        <>
          <li>
            <Link to="/assets_list">Asset List</Link>
          </li>
          <li>
            <Link to="/add_asset">Add an Asset</Link>
          </li>
          <li>
            <Link to="/all_requests">All Requests</Link>
          </li>
          <li>
            <Link to="/employee_list">My Employee List</Link>
          </li>
          <li>
            <Link to="/add_employee">Add an Employee</Link>
          </li>
          <li>
            <Link to="/my_profile">Profile</Link>
          </li>
        </>
      )}

      {/*  */}
    </>
  );

  return (
    <div className="">
      <div className="navbar fixed top-0 z-10 bg-opacity-30 bg-white backdrop-blur-md text-[#121212]">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="relative">
              <div
                onClick={toggleModal}
                className="w-12 h-12 bg-black rounded-full cursor-pointer p-[1px]"
              >
                <img className="rounded-full" src={user?.photoURL} alt="" />
              </div>
              {isModalOpen && (
                <div
                  ref={modalRef} // Attach the modal ref here
                  className="absolute right-0 mt-2 p-4 bg-white shadow-lg rounded-md w-40"
                >
                  <button
                    onClick={handleLogOut}
                    className="btn btn-ghost w-full text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
