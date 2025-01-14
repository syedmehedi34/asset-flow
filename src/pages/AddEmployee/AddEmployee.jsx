import { useState } from "react";
import { Users, Package, Plus, UserPlus, Search } from "lucide-react";
import useUnaffiliatedUsers from "../../hooks/useUnAffiliatedUsers";

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
  // ?
  const [unaffiliatedUsersList] = useUnaffiliatedUsers();
  console.log(unaffiliatedUsersList);
  // ?
  const [showPackages, setShowPackages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    currentMembers: 3,
    memberLimit: 5,
  });

  const [unaffiliatedUsers, setUnaffiliatedUsers] = useState([
    {
      id: "1",
      name: "Sarah Wilson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      isSelected: false,
    },
    {
      id: "2",
      name: "Michael Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      isSelected: false,
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      isSelected: false,
    },
  ]);

  const packageOptions = [
    { id: 1, members: 5, price: 5 },
    { id: 2, members: 10, price: 8 },
    { id: 3, members: 20, price: 15 },
  ];

  const toggleUserSelection = (userId) => {
    setUnaffiliatedUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };

  const addSelectedToTeam = () => {
    const selectedCount = unaffiliatedUsers.filter((u) => u.isSelected).length;
    if (stats.currentMembers + selectedCount > stats.memberLimit) {
      alert("Cannot add more members than the package limit allows");
      return;
    }

    setStats((prev) => ({
      ...prev,
      currentMembers: prev.currentMembers + selectedCount,
    }));

    setUnaffiliatedUsers((users) => users.filter((user) => !user.isSelected));
  };

  const purchasePackage = (option) => {
    setStats((prev) => ({
      ...prev,
      memberLimit: option.members,
    }));
    setShowPackages(false);
  };

  const filteredUsers = unaffiliatedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <button
                onClick={() => setShowPackages(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Increase Limit
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Manage your team size and package limits
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                <RadialProgress
                  value={stats.currentMembers}
                  max={stats.memberLimit}
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
                        {stats.currentMembers}
                      </p>
                      <p className="text-sm text-gray-500">Active Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">
                        {stats.memberLimit - stats.currentMembers}
                      </p>
                      <p className="text-sm text-gray-500">Available Slots</p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-indigo-700 mb-1">
                    Package Status
                  </h3>
                  <p className="text-sm text-indigo-600">
                    {stats.currentMembers >= stats.memberLimit
                      ? "You've reached your member limit. Consider upgrading your package."
                      : `You can add ${
                          stats.memberLimit - stats.currentMembers
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
                  disabled={!unaffiliatedUsers.some((u) => u.isSelected)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add to Team
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={user.isSelected}
                    onChange={() => toggleUserSelection(user.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <p className="flex-1 font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Package Modal */}
      {showPackages && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Select Package
              </h3>
              <button
                onClick={() => setShowPackages(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {packageOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex justify-between items-center py-2 px-4 border-b"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {option.members} Members
                    </p>
                    <p className="text-sm text-gray-500">
                      ${option.price}/month
                    </p>
                  </div>
                  <button
                    onClick={() => purchasePackage(option)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
