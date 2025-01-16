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

const AllRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assets, loadingAssets, refetchAssets] = useAllAssets();
  // modal functions
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  let serialNumber = 1;

  const filteredAssets = assets.filter(
    (item) => item.assetUser && item.assetUser.length > 0
  );

  // filter search by name and email
  const products = filteredAssets.filter((product) =>
    product?.assetUser.some(
      (pendingRequest) =>
        pendingRequest.assetUserName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pendingRequest.assetUserEmail
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
  );

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
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <input
          type="text"
          className="input input-bordered w-full sm:w-auto flex-grow mb-4 sm:mb-0"
          placeholder="Search by Product Name or HR Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary sm:ml-4">Search</button>
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
            {products.map((product, i) => {
              return product?.assetUser?.map((pendingItem, idx) => (
                <motion.tr
                  key={`${product?._id}-${idx}`}
                  className="border-b hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {serialNumber++}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product?.productName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product?.assetType}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-col">
                    <span>{pendingItem?.assetUserName}</span>
                    <span>{pendingItem?.assetUserEmail}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product?.dateAdded}
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
                      onClick={() => handleReject(product?._id)}
                      className="btn min-h-0 h-9 border-none w-fit px-3 text-[12px] rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                    >
                      Reject
                    </button>
                  </td>
                </motion.tr>
              ));
            })}
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
