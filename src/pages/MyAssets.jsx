/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import useAssetDistributionData from "../hooks/useAssetDistributionData";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const MyAssets = () => {
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();
  const assets = assetDistributionData;

  console.log(assetDistributionData);
  return (
    <motion.div
      className="min-h-screen bg-gray-50 my-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Search & Filters
            </h2>
          </div>

          <div className="p-6 grid gap-6">
            <div className="flex items-center gap-4">
              {/* Name Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Type Filter */}
              <div className="flex-1">
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
        </motion.div>

        {/* Table */}
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
                  <motion.tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {asset?.assetType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.assetQuantity === 0 ? (
                        <p className="badge bg-red-600 border-none">
                          Out of Stock
                        </p>
                      ) : (
                        <p>{asset.assetQuantity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center  gap-3">
                      {asset?.productRequest || 0}
                      <span className=" transition duration-300 ease-in-out transform hover:scale-105  active:scale-95">
                        <FaSquareArrowUpRight size={18} />
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.assetPostDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link to="/asset/update">
                        <button className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
                          Update
                        </button>
                      </Link>

                      <button
                        // onClick={() => handleDeleteAsset(asset._id)}
                        className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyAssets;
