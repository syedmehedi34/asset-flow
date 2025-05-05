/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import useAssetDistributionData from "../hooks/useAssetDistributionData";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PdfPage from "../components/PdfPage";
import usePaginationFunction from "../hooks/usePaginationFunction";
import { Helmet } from "react-helmet-async";
import useRole from "../hooks/useRole";
import moment from "moment";

const MyAssets = ({ isDashboard = false }) => {
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();

  const [isRole, isRoleLoading, error, userRoleRefetch] = useRole();
  // console.log(isRole?.email);
  const axiosSecure = useAxiosSecure();
  const assets = assetDistributionData;

  // console.log(assetDistributionData);

  // ?? cancel a request
  const handleCancelButton = (asset) => {
    const _id = asset._id;

    //
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch("/asset_distribution", {
          _id,
          requestStatus: "cancelled",

          //
          assetID: asset?.assetID,
          email: isRole?.email,
          status: "cancelled",
          cancellingDate: moment().format("DD-MM-YYYY"),
        });
        // console.log(res.data.modifiedCount);
        if (res.data.message === "Update successful") {
          refetchAssetDistributionData();
          Swal.fire({
            title: "Cancelled!",
            text: "Asset request cancelled successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  //??

  // return an asset
  const handleReturnAsset = (asset) => {
    const _id = asset._id;
    // const
    const assetID = asset.assetID;
    console.log(asset);

    const requestStatus = "Returned";
    //
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Return it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch("/asset_distribution", {
          _id,
          requestStatus,
        });
        // console.log(res.data.modifiedCount);
        if (res.data.modifiedCount) {
          refetchAssetDistributionData();

          // update quantity from the assets collection
          // todo : i will update this method in the backend later
          const assetCollectionRes = await axiosSecure.patch("/assets", {
            assetID,
          });
          console.log(assetCollectionRes);
          if (assetCollectionRes.data.modifiedCount) {
            Swal.fire({
              title: "Returned!",
              text: "Asset returned successfully.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  };

  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(assets, 10);
  //
  return (
    <>
      <Helmet>
        <title>AssetFlow | My Assets</title>
      </Helmet>

      <motion.div
        className={`min-h-screen bg-gray-50 my-24`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
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
              <div className={`flex items-center gap-4`}>
                {/* Name Search */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
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
                      Requested Date
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Approval Date
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItem.map((asset, index) => (
                    <motion.tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(currentPage - 1) * itemsPerPage + index + 1}
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
                        {asset?.assetPostDate}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset?.approvalDate}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset?.requestStatus}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {asset?.requestStatus === "Pending" ? (
                          <>
                            <button
                              onClick={() => handleCancelButton(asset)}
                              className="w-full btn min-h-0 h-10 border-none font-[600] btn-error"
                            >
                              Cancel
                            </button>
                          </>
                        ) : asset?.requestStatus === "Approved" &&
                          asset?.assetType === "Returnable" ? (
                          <div className="flex items-center justify-center gap-1">
                            <PdfPage asset={asset}></PdfPage>
                            <button
                              onClick={() => handleReturnAsset(asset)}
                              className="flex-1 btn btn-warning min-h-0 h-10 border-none font-[600]"
                            >
                              Return
                            </button>
                          </div>
                        ) : asset?.requestStatus === "Approved" ? (
                          <>
                            <PdfPage asset={asset}></PdfPage>
                          </>
                        ) : asset?.requestStatus === "Cancelled" ? (
                          <>
                            <button
                              disabled
                              className="w-full btn min-h-0 h-10 font-[600] btn-accent"
                            >
                              Cancelled
                            </button>
                          </>
                        ) : asset?.requestStatus === "Returned" ? (
                          <>
                            <button
                              // onClick={() => handleReturnAsset(asset._id)}
                              disabled
                              className="w-full btn btn-warning min-h-0 h-10 border-none font-[600]"
                            >
                              Returned
                            </button>
                          </>
                        ) : null}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          {paginate}
        </div>
      </motion.div>
    </>
  );
};

export default MyAssets;
