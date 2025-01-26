import { Package, Calendar, Building2, ArrowRight } from "lucide-react";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";
import { Link } from "react-router-dom";

const MyPending = () => {
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();

  const pendingRequests = assetDistributionData
    .filter((asset) => asset.requestStatus === "Pending")
    .slice(0, 6);

  return (
    <section className="py-12 bg-gray-50 mt-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            My Pending Requests
          </h2>
          <p className="text-gray-600">
            View your pending asset requests below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pendingRequests.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Package className="w-6 h-6 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {assignment?.assetName}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-lg font-medium ${
                    assignment.assetType === "Returnable"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {assignment?.assetType}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  {assignment?.requestStatus}
                </div>
                <div className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {assignment?.assetRequestingDate}
                </div>
              </div>
              {/* 
              <button className="w-full mt-2 py-2 bg-emerald-500 text-black rounded-md text-sm font-medium hover:bg-emerald-600">
                View Details
              </button> */}
            </div>
          ))}
        </div>

        <Link to="/my_assets">
          <div className="text-center mt-4 cursor-pointer">
            <p className="inline-block px-6 py-3 bg-emerald-500 text-black rounded-md text-sm font-semibold hover:bg-emerald-600 transition">
              View All Asset Assignments
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MyPending;
