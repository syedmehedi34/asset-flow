/* eslint-disable no-unused-vars */
import { FaSquareArrowUpRight } from "react-icons/fa6";
import useAllAssets from "../../hooks/useAllAssets";
import useRole from "../../hooks/useRole";
import { Filter, SlidersHorizontal } from "lucide-react";
import React from "react";
import moment from "moment";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import usePaginationFunction from "../../hooks/usePaginationFunction";
import { Helmet } from "react-helmet-async";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";

const AssetRequest = () => {
  const [isRole] = useRole();
  const [
    assets,
    loadingAssets,
    refetchAssets,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAllAssets();
  const axiosSecure = useAxiosSecure();

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const handleOpen = (asset) => {
    setSelectedAsset(asset);
    setOpen(!open);
    refetchAssets();
  };

  // Initialize react-hook-form
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Asset distribution data
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
  ] = useAssetDistributionData();

  // Handle form submission
  const onSubmit = async (data) => {
    setOpen(false);
    const date = moment().format("DD-MM-YYYY");

    const assetRequestData = {
      assetID: selectedAsset._id,
      employeeName: isRole.name,
      employeeEmail: isRole.email,
      hr_email: isRole.hr_email,
      assetRequestingDate: date,
      assetRequestMessage: data.assetRequestMessage || "",
      assetName: selectedAsset.assetName,
      assetType: selectedAsset.assetType,
      assetQuantity: selectedAsset.assetQuantity,
      assetDescription: selectedAsset.assetDescription,
      assetPostDate: selectedAsset.assetPostDate,
      companyName: selectedAsset.companyName,
      requestStatus: "Pending",
      approvalDate: "Not approved yet",
    };

    // Post API for the asset request
    const res = await axiosSecure.post("/asset_distribution", assetRequestData);
    if (res.data.insertedId) {
      reset();
      Swal.fire({
        icon: "success",
        title: "New asset request has been sent",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // Pagination
  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(assets, 10);

  return (
    <>
      <Helmet>
        <title>AssetFlow | Asset Request</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 my-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Request for a new Asset
            </h1>
            <p className="text-gray-600">
              Manage and request your company assets efficiently
            </p>
          </motion.div>

          {/* Search and Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Search & Filters
              </h2>
            </div>

            <div className="p-6 grid gap-6">
              <div className="flex justify-between items-center gap-4">
                {/* Name Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search by name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                {/* Type Filter */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Type
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Filter className="h-4 w-4" />
                    </div>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-9"
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
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="w-[40px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px] text-left">
                      Request
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItem.map((asset, index) => {
                    // Check if the asset is Returnable and has a Pending request
                    const isAlreadyRequested = assetDistributionData.some(
                      (dist) =>
                        dist.assetID === asset._id &&
                        dist.employeeEmail === isRole.email &&
                        asset.assetType === "Returnable" &&
                        dist.requestStatus === "Pending"
                    );

                    return (
                      <motion.tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <td className="w-[40px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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
                          {asset?.assetQuantity ? (
                            <p className="badge bg-green-600 border-none">
                              In Stock
                            </p>
                          ) : (
                            <p className="badge bg-red-600 border-none">
                              Out of Stock
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right w-[auto]">
                          <div>
                            {asset.assetQuantity && !isAlreadyRequested ? (
                              <motion.button
                                className="btn btn-outline min-h-0 h-9 text-xs font-semibold"
                                onClick={() => handleOpen(asset)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                              >
                                Request
                              </motion.button>
                            ) : (
                              <motion.button
                                className="btn btn-outline min-h-0 h-9 text-xs font-semibold"
                                disabled
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                              >
                                {isAlreadyRequested ? "Requested" : "Request"}
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        {paginate}

        {/* Modal */}
        <Dialog open={open} handler={setOpen}>
          <DialogHeader>Asset Request Details</DialogHeader>
          <DialogBody className="overflow-y-scroll">
            {selectedAsset ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header Section */}
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-6 h-6 text-teal-500 animate-pulse" />
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    {selectedAsset?.assetName}
                  </motion.h2>
                </div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-gray-700">
                    <Textarea
                      size="md"
                      label="Your request information"
                      {...register("assetRequestMessage", {
                        required: "This field is required",
                      })}
                    />
                    {errors.requestInfo && (
                      <span className="text-red-500 text-sm">
                        {errors.requestInfo.message}
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 p-4 bg-teal-50 rounded-lg border border-teal-100"
                >
                  <div className="text-gray-700 gap-2">
                    <p className="font-medium">Need more information?</p>
                    <span className="text-sm">Contact the HR Manager </span>
                    <a
                      href={`mailto:${selectedAsset?.hr_email}`}
                      className="text-teal-600 hover:text-teal-800 font-semibold text-sm relative group"
                    >
                      {selectedAsset?.hr_email}
                      <FaSquareArrowUpRight className="w-3 h-3 inline-block text-teal-600 group-hover:text-teal-800 ml-1" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <p>Loading...</p>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpen(false)}
              className="text-gray-500"
            >
              Close
            </Button>
            <Button
              variant="text"
              color="red"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="text-white bg-blue-gray-600 hover:border hover:border-blue-gray-600 hover:bg-teal-200 hover:text-blue-gray-800"
            >
              Request
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default AssetRequest;
