/* eslint-disable no-unused-vars */
import { FaSquareArrowUpRight } from "react-icons/fa6";
import useAllAssets from "../hooks/useAllAssets";
import useRole from "../hooks/useRole";
import { Filter, SlidersHorizontal } from "lucide-react";
import React from "react";
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

const AssetRequest = () => {
  const [isRole] = useRole();
  const [assets, loadingAssets, refetchAssets] = useAllAssets();

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const handleOpen = (asset) => {
    setSelectedAsset(asset);
    setOpen(!open);
    // console.log(asset);
  };

  //
  //
  // Initialize react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    const requestData = {
      assetData: selectedAsset,
      requestData: data,
    };
    // handleRequest(requestData);
    console.log(requestData);
    setOpen(false);
  };

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
            <div className="flex justify-between items-center gap-4">
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
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                {assets.map((asset, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="w-[40px] px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}.
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
                      {asset?.productQuantity ? (
                        <p className="badge bg-green-600 border-none">
                          In Stock
                        </p>
                      ) : (
                        <p className="badge bg-red-600 border-none">
                          Out of Stock
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right w-[auto]">
                      <button
                        className="btn btn-outline min-h-0 h-9 text-xs font-semibold"
                        onClick={() => handleOpen(asset)}
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                  {selectedAsset.productName}
                </motion.h2>
              </div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-gray-700 flex items-center gap-2">
                  <Textarea
                    size="md"
                    label="Your request information"
                    {...register("requestInfo", {
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
                    href={`mailto:${selectedAsset.hr_email}`}
                    className="text-teal-600 hover:text-teal-800 font-semibold text-sm relative group"
                  >
                    {selectedAsset.hr_email}
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
            onClick={handleSubmit(onSubmit)} // Handle form submission
            className="text-white bg-blue-gray-600 hover:border hover:border-blue-gray-600 hover:bg-teal-200 hover:text-blue-gray-800"
          >
            Request
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AssetRequest;
