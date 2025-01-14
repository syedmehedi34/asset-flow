/* eslint-disable no-unused-vars */
import { SlidersHorizontal, Filter } from "lucide-react";
import useAllAssets from "../../hooks/useAllAssets";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaSquareArrowUpRight } from "react-icons/fa6";

const AssetList = () => {
  const [assets, loadingAssets, refetchAssets] = useAllAssets();
  // console.log(assets, loadingAssets);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleDeleteAsset = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete("/assets", {
          data: { productId },
        });
        if (res.data.deletedCount) {
          refetchAssets();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  if (loadingAssets) {
    return (
      <div className="h-screen flex items-center justify-center">loading</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 my-24">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Asset Management
          </h1>
          <p className="text-gray-600">
            Manage and track your company assets efficiently
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Search & Filters
            </h2>
          </div>

          <div className="p-6 grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Quantity Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="Search by quantity..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Type
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Filter className="h-4 w-4" />
                  </div>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-9">
                    <option value="" disabled>
                      Filter by type
                    </option>
                    <option value="all">All Assets</option>
                    <option value="returnable">Returnable</option>
                    <option value="non-returnable">Non-returnable</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {asset?.assetType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.productQuantity === 0 ? (
                        <p className="badge bg-red-600 border-none">
                          Out of Stock
                        </p>
                      ) : (
                        <p>{asset.productQuantity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center  gap-3">
                      {asset?.productRequest || 0}
                      <span className=" transition duration-300 ease-in-out transform hover:scale-105  active:scale-95">
                        <FaSquareArrowUpRight size={18} />
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.dateAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link to="/asset/update">
                        <button className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDeleteAsset(asset._id)}
                        className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
