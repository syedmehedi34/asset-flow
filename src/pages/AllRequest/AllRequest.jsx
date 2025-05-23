/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Printer,
  X,
  Calendar,
  Mail,
  Building2,
  Clock,
  User,
} from "lucide-react";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";
import { Filter, SlidersHorizontal } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import usePaginationFunction from "../../hooks/usePaginationFunction";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import useAllAssets from "../../hooks/useAllAssets";

// Helper function to find asset by assetID and check quantity
const getAssetAvailability = (assets, assetID) => {
  const asset = assets.find((asset) => asset._id === assetID);
  return asset ? asset.assetQuantity > 0 : false;
};

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();
  // console.log(assetDistributionData);

  const [assets, loadingAssets, refetchAssets] = useAllAssets();
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Modal overlay and dialog variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Modal functions
  const handleOpen = (item) => {
    setModalData(item);
    setIsOpen(true);
  };

  const handleReject = (item) => {
    const _id = item?._id;
    const requestStatus = "rejected";

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch("/asset_distribution", {
          _id,
          requestStatus,
          assetID: item?.assetID,
          email: item?.employeeEmail,
          status: "rejected",
          rejectingDate: moment().format("DD-MM-YYYY"),
        });
        if (res.data.message === "Update successful") {
          refetchAssetDistributionData();
          Swal.fire({
            title: "Rejected!",
            text: "Asset request rejected successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleApproveRequest = (item) => {
    const _id = item?._id;
    const requestStatus = "approved";
    const date = moment().format("DD-MM-YYYY");

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch("/asset_distribution", {
          _id,
          requestStatus,
          approvalDate: date,
          assetID: item?.assetID,
          n: -1,
          email: item?.employeeEmail,
          status: "approved",
          receivingDate: date,
        });
        if (res.data.message === "Update successful") {
          refetchAssetDistributionData();
          Swal.fire({
            title: "Approved!",
            text: "Asset request approved successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(assetDistributionData, 15);

  return (
    <>
      <Helmet>
        <title>AssetFlow | All Request</title>
      </Helmet>

      <div className="px-6 my-24">
        <h1 className="text-3xl font-semibold mb-6">
          Asset Management - All Products
        </h1>

        {/* Filter Section */}
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
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Type
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Filter className="h-4 w-4" />
                  </div>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-9"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Filter by type
                    </option>
                    <option value="">All Assets</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product List Section */}
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
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
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItem.map((item, i) => {
                const isAvailable = getAssetAvailability(assets, item.assetID);
                return (
                  <motion.tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.assetType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-col">
                      <span>{item?.employeeName}</span>
                      <span>{item?.employeeEmail}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item?.assetRequestingDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleOpen(item)}
                        className="btn btn-outline rounded-full min-h-0 h-9 text-[12px] px-3 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleApproveRequest(item)}
                        disabled={!isAvailable}
                        className={`btn min-h-0 h-9 border-none text-[12px] px-3 rounded-md font-medium ${
                          isAvailable
                            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                      >
                        {isAvailable ? "Approve" : "Not Available"}
                      </button>
                      <button
                        onClick={() => handleReject(item)}
                        className="btn min-h-0 h-9 border-none w-fit px-3 text-[12px] rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
        {paginate}

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl my-8 mx-4"
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <Printer className="w-8 h-8 text-white" />
                    <h2 className="text-2xl font-bold text-white">
                      Asset Request Details
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 text-gray-600">
                        <User />
                        <p className="text-sm">Employee Name:</p>
                      </div>
                      <p className="font-medium text-sm text-gray-800">
                        {modalData?.employeeName}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-5 h-5" />
                        <p className="text-sm">Employee Email:</p>
                      </div>
                      <p className="font-medium text-sm text-gray-800">
                        {modalData?.employeeEmail}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <p className="text-sm">Request Date:</p>
                      </div>
                      <p className="font-medium text-sm text-gray-800">
                        {modalData?.assetRequestingDate &&
                          new Date(
                            modalData.assetRequestingDate
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="w-5 h-5" />
                        <p className="text-sm">Status:</p>
                      </div>
                      <span className="px-3 py-[3px] bg-yellow-100 text-yellow-800 rounded-full text-[12px] font-medium">
                        {modalData?.requestStatus}
                      </span>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-center underline">
                      Requested Product Details
                    </h3>
                    <h1 className="text-gray-600 text-sm mb-2">
                      <span className="font-bold">Item : </span>
                      {modalData.assetName}
                    </h1>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-bold">Description : </span>
                      {modalData?.assetRequestMessage}
                    </p>
                  </motion.div>
                </div>
                <div className="px-6 py-3 border-t border-gray-200 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsOpen(false);
                      handleReject(modalData);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-white hover:bg-red-600 font-medium bg-warning btn border-none"
                  >
                    Reject
                  </motion.button>
                  <motion.button
                    onClick={() => handleApproveRequest(modalData)}
                    disabled={!getAssetAvailability(assets, modalData?.assetID)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium border-none ${
                      getAssetAvailability(assets, modalData?.assetID)
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {getAssetAvailability(assets, modalData?.assetID)
                      ? "Approve Request"
                      : "Not Available"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AllRequest;
