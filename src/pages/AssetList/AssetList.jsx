/* eslint-disable no-unused-vars */
import {
  SlidersHorizontal,
  Filter,
  Plus,
  X,
  FileText,
  DollarSign,
  ArrowLeftRight,
  Package,
} from "lucide-react";
import useAllAssets from "../../hooks/useAllAssets";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Dialog, DialogBody } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import usePaginationFunction from "../../hooks/usePaginationFunction";
import { Helmet } from "react-helmet-async";

const AssetList = () => {
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: modalData });
  const [
    assets,
    loadingAssets,
    refetchAssets,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAllAssets();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(assets);

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

  //?

  const handleOpen = (data) => {
    setModalData(data);
    setOpen(!open);
  };

  useEffect(() => {
    if (modalData) {
      reset(modalData);
    }
  }, [modalData, reset]);

  const onSubmit = async (data) => {
    setOpen(false);
    const _id = data._id;
    // console.log(_id);

    const updatedData = {
      assetName: data.assetName,
      assetDescription: data.assetDescription, // Ensures it's a number
      assetQuantity: Number(data.assetQuantity),
      assetType: data.assetType,
    };

    // console.log(updatedData);

    // now patch the data in the backend
    const res = await axiosSecure.patch("/assets_update", { _id, updatedData });
    // console.log(res);
    if (res.data.modifiedCount) {
      refetchAssets();
      Swal.fire({
        title: "Updated!",
        text: "Your Asset has been updated.",
        icon: "success",
        timer: 1500,
      });
    }
  };

  // ?

  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(assets, 10);

  return (
    <>
      <Helmet>
        <title>AssetFlow | Assets List</title>
      </Helmet>

      <div className="p-6 my-24">
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
              {/* Name Search */}
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

              {/* Type Filter */}
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
                      {!asset?.assetQuantity ? (
                        <p className="badge bg-red-600 border-none">
                          Out of Stock
                        </p>
                      ) : (
                        <p>{asset.assetQuantity}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center  gap-3">
                      {asset?.productRequest || 0}
                      {/* <span className=" transition duration-300 ease-in-out transform hover:scale-105  active:scale-95">
                      <FaSquareArrowUpRight size={18} />
                    </span> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset?.assetPostDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleOpen(asset)}
                        className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDeleteAsset(asset._id)}
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
        {paginate}

        {/* dialogue modal */}
        <>
          <Dialog open={open} handler={handleOpen}>
            <DialogBody>
              {/* Heading */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <Package className="text-indigo-600" size={24} />
                    Add New Asset
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 space-y-4"
                // id="root"
                // aria-hidden="true"
              >
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Package size={18} className="text-indigo-500" />
                    Product Name
                  </label>
                  <input
                    {...register("assetName", {
                      required: "Product name is required",
                    })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    placeholder="Enter product name"
                  />
                  {errors.assetName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.assetName.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-5">
                  {/* Asset Type */}
                  <div className="space-y-2 flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ArrowLeftRight size={18} className="text-indigo-500" />
                      Asset Type
                    </label>
                    <select
                      {...register("assetType", {
                        required: "Asset type is required",
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none bg-white"
                    >
                      <option value="">Select type</option>
                      <option value="Returnable">Returnable</option>
                      <option value="Non-returnable">Non-returnable</option>
                    </select>
                    {errors.assetType && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.assetType.message}
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2 flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <DollarSign size={18} className="text-indigo-500" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("assetQuantity", {
                        required: "Amount is required",
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                      placeholder="Enter amount"
                    />
                    {errors.assetQuantity && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.assetQuantity.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FileText size={18} className="text-indigo-500" />
                    Product Description
                  </label>
                  <textarea
                    {...register("assetDescription", {
                      required: "Description is required",
                    })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all h-15 resize-none"
                    placeholder="Enter product description"
                  />
                  {errors.assetDescription && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.assetDescription.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end items-center gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-[5px] border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <X size={18} />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-[5px] bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={18} />
                    Submit
                  </motion.button>
                </div>
              </form>
            </DialogBody>
          </Dialog>
        </>
      </div>
    </>
  );
};

export default AssetList;
