/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { FaSquareArrowUpRight } from "react-icons/fa6";
import useAllAssets from "../../hooks/useAllAssets";

const AllRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [assets, loadingAssets, refetchAssets] = useAllAssets();

  const filteredAssets = assets.filter(
    (item) => item.isPending && item.isPending.length > 0
  );
  // console.log(assets);
  console.log(filteredAssets);

  // todo change logic here
  const products = filteredAssets.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.hr_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = (productId) => {
    console.log("Delete product with id:", productId);
  };

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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <motion.tr
                key={product?._id}
                className="border-b hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6  py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product?.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product?.assetType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-col">
                  <span>{product?.isPending[0].requesterName}</span>
                  <span>{product?.isPending[0].requesterEmail}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product?.dateAdded}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                  <span className="badge">Pending</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Link to={`/product/update/${product?._id}`}>
                    <button className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500">
                      Approve
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product?._id)}
                    className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                    // className="btn btn-error"
                  >
                    Reject
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AllRequest;
