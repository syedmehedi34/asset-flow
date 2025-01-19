/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Users, Package, Plus, UserPlus, Search } from "lucide-react";
import useUnaffiliatedUsers from "../../hooks/useUnAffiliatedUsers";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import useAllEmployees from "../../hooks/useAllEmployees";
import { Link } from "react-router-dom";
import usePaginationFunction from "../../hooks/usePaginationFunction";
// import axios from "axios";

function RadialProgress({ value, max }) {
  const percentage = (value / max) * 100;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-36 h-36">
        {/* Background circle */}
        <circle
          cx="72"
          cy="72"
          r={radius}
          className="stroke-gray-200"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="72"
          cy="72"
          r={radius}
          className="stroke-indigo-600"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-indigo-600">{value}</span>
        <span className="text-sm text-gray-500">of {max}</span>
      </div>
    </div>
  );
}

const AddEmployee = () => {
  //
  const axiosSecure = useAxiosSecure();
  const [unaffiliatedUsersList, , , unaffiliatedUsersRefetch] =
    useUnaffiliatedUsers();
  const [userSelection, setUserSelection] = useState([]);

  const [isRole] = useRole();

  const [employees, , refetchEmployees] = useAllEmployees();
  // console.log(employees);
  // console.log(unaffiliatedUsersList);

  //
  //
  // const [showPackages, setShowPackages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [stats, setStats] = useState({
    currentMembers: employees?.length,
    memberLimit:
      isRole?.package === "starter"
        ? 5
        : isRole?.package === "basic"
        ? 10
        : isRole?.package === "pro"
        ? 15
        : 0,
  });

  useEffect(() => {
    if (employees?.length) {
      setStats({
        currentMembers: employees.length,
        memberLimit:
          isRole?.package === "starter"
            ? 5
            : isRole?.package === "basic"
            ? 10
            : isRole?.package === "pro"
            ? 15
            : 0,
      });
    }
  }, [employees, isRole]); // for updating the UI

  const packageOptions = [
    {
      packageId: "starter",
      members: 5,
      price: 5,
      title: "Starter Package - 5 Members",
      description:
        "Perfect for small teams. Manage up to 5 members for just $5",
    },
    {
      packageId: "basic",
      members: 10,
      price: 8,
      title: "Growth Package - 10 Members",
      description: "Scale up with ease. Manage up to 10 members for only $8",
    },
    {
      packageId: "pro",
      members: 20,
      price: 15,
      title: "Pro Package - 20 Members",
      description:
        "deal for larger teams. Manage up to 20 members for just $15.",
    },
  ];
  //
  //

  // * add employee function
  const handleAddEmployeeToTeam = async (employee) => {
    const hr_email = isRole?.email;
    const _id = employee._id;

    //
    if (employees.length < stats.memberLimit) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add to team!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.patch("/users", { _id, hr_email });
            // console.log(res);
            if (res.data.modifiedCount) {
              Swal.fire({
                title: "Added!",
                text: "Employee has been successfully added to the team.",
                icon: "success",
              });
              unaffiliatedUsersRefetch();
              refetchEmployees();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to add employee to the team. Please try again.",
                icon: "error",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "An error occurred while adding the employee to the team.",
              icon: "error",
            });
            console.error("Error updating employee:", error);
          }
        }
      });
    } else {
      unaffiliatedUsersRefetch();
      refetchEmployees();
      // alert("sorry");

      Swal.fire({
        title: "You don't have any slot!",
        text: "Upgrade your Subscription to get more slots",
        icon: "error",
      });
    }
  };

  // text search option
  const filteredUsers = unaffiliatedUsersList?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // * this section is for multiple employee insertion
  const toggleUserSelection = (_id) => {
    setUserSelection((prevSelection) => {
      if (prevSelection.includes(_id)) {
        return prevSelection.filter((id) => id !== _id);
      } else {
        return [...prevSelection, _id];
      }
    });
  };
  const addSelectedToTeam = async () => {
    const limit = stats.memberLimit - stats.currentMembers;
    const hr_email = isRole?.email;
    const data = { hr_email };
    const ids = userSelection;

    if (ids.length && limit > 0 && limit >= ids.length) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Add employee!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
          customClass: {
            confirmButton: "btn btn-success custom-confirm-btn ml-1",
            cancelButton: "btn btn-danger custom-cancel-btn mr-1",
          },
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.patch("/user", { ids, data });
            // console.log(res);
            if (res.data.modifiedCount) {
              unaffiliatedUsersRefetch();
              refetchEmployees();
              swalWithBootstrapButtons.fire({
                title: "Added!",
                text: "Employee has been added to your team.",
                icon: "success",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              icon: "warning",
              title: "Member Joining cancelled.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You don't have enough limit",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const { paginate, paginatedItem } = usePaginationFunction(filteredUsers, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 my-24">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Package Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Package Details
                </h2>
              </div>
              <Link to="/packages">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Increase Limit
                </button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Manage your team size and package limits
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <RadialProgress
                  value={stats?.currentMembers}
                  max={stats?.memberLimit}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Current Usage
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">
                        {stats?.currentMembers}
                      </p>
                      <p className="text-sm text-gray-500">Active Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">
                        {stats?.memberLimit - stats?.currentMembers}
                      </p>
                      <p className="text-sm text-gray-500">Available Slots</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-indigo-50 rounded-lg p-4 ${
                    stats?.currentMembers - stats?.memberLimit === 0
                      ? "bg-red-200"
                      : ""
                  }`}
                >
                  <h3 className="text-sm font-medium text-indigo-700 mb-1">
                    Package Status
                  </h3>
                  <p className={`text-sm text-indigo-600 `}>
                    {stats?.currentMembers >= stats?.memberLimit
                      ? "You've reached your member limit. Consider upgrading your package."
                      : `You can add ${
                          stats?.memberLimit - stats?.currentMembers
                        } more members to your team.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unaffiliated Users Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Unaffiliated Users
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={addSelectedToTeam}
                  disabled={stats.memberLimit - stats.currentMembers <= 0}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add to Team
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {paginatedItem?.map((user) => (
                <div
                  key={user?._id}
                  className="border shadow-sm flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  <div>
                    <input
                      type="checkbox"
                      // checked={user?.isSelected}
                      onChange={() => toggleUserSelection(user?._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <img
                      src={user?.photo || "https://i.ibb.co.com/F4YFTCb/1.jpg"}
                      alt={user?.name}
                      className="h-14 w-14 border border-blue-gray-500 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-gray-800">
                      <span className="font-semibold text-gray-700">
                        Employee Name :
                      </span>{" "}
                      {user?.name}
                    </p>
                    <p className="font-medium text-gray-800">
                      <span className="font-semibold text-gray-700">
                        Email :
                      </span>{" "}
                      <span className="hover:text-blue-900 hover:underline cursor-pointer">
                        {user?.email}
                      </span>
                    </p>
                  </div>

                  <div className="space-x-1">
                    <button className="btn normal-case font-normal min-w-0 min-h-0 h-10 text-white hover:text-white bg- btn-active hover:bg-indigo-700 border-indigo-600">
                      Details
                    </button>

                    <button
                      disabled={!(stats.memberLimit - stats.currentMembers)}
                      onClick={() => handleAddEmployeeToTeam(user)}
                      className="btn normal-case font-normal min-w-0 min-h-0 h-10 text-black hover:text-white bg-white hover:bg-indigo-700 border-indigo-600"
                    >
                      Add to Team
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* //? Pagination */}

            {paginate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
