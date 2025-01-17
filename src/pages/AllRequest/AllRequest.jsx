/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import useAllAssets from "../../hooks/useAllAssets";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";
import { Filter, SlidersHorizontal } from "lucide-react";

const AllRequest = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [assets, loadingAssets, refetchAssets] = useAllAssets();
  // modal functions
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  //
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();
  console.log(assetDistributionData);
  //

  let serialNumber = 1;

  // console.log(assets);
  // console.log(filteredAssets);
  // console.log(products);

  const handleReject = (productId) => {
    console.log("reject product with id:", productId);

    // send te data to
  };

  //
  return (
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
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
            {assetDistributionData.map((item, i) => (
              <motion.tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {serialNumber++}
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
                    onClick={handleOpen}
                    className="btn btn-outline rounded-full  min-h-0 h-9 text-[12px] px-3 font-medium "
                  >
                    View Details
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="btn min-h-0 h-9 border-none text-[12px] px-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item?._id)}
                    className="btn min-h-0 h-9 border-none w-fit px-3 text-[12px] rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                  >
                    Reject
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple modal.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AllRequest;
