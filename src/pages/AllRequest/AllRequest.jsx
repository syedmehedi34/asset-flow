import { useState } from "react";
// import { FaSquareArrowUpRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Make sure you have framer-motion installed for animation
import { FaSquareArrowUpRight } from "react-icons/fa6";

const AllRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data (you can replace this with real data from an API)
  const requests = [
    {
      assetName: "Laptop",
      assetType: "Electronics",
      requesterEmail: "john.doe@example.com",
      requesterName: "John Doe",
      requestDate: "2025-01-16",
      note: "Need it for a project presentation",
      status: "Pending",
      quantity: 1,
      dateAdded: "2025-01-10",
      productRequest: 2,
    },
    {
      assetName: "Monitor",
      assetType: "Electronics",
      requesterEmail: "jane.smith@example.com",
      requesterName: "Jane Smith",
      requestDate: "2025-01-15",
      note: "For working from home setup",
      status: "Approved",
      quantity: 3,
      dateAdded: "2025-01-08",
      productRequest: 1,
    },
    {
      assetName: "Chair",
      assetType: "Furniture",
      requesterEmail: "bob.jones@example.com",
      requesterName: "Bob Jones",
      requestDate: "2025-01-14",
      note: "Replacement for broken chair",
      status: "Rejected",
      quantity: 0,
      dateAdded: "2025-01-05",
      productRequest: 0,
    },
  ];

  // Filter requests based on search
  const filteredRequests = requests.filter(
    (request) =>
      request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requesterEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle deleting an asset (use real delete functionality)
  const handleDeleteAsset = (assetId) => {
    console.log("Delete asset with id:", assetId);
    // Call API or dispatch action to delete asset
  };

  return (
    <div className="p-6 my-24">
      <h1 className="text-3xl font-semibold mb-6">
        Asset Management - All Requests
      </h1>

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          className="input input-bordered w-full mb-4"
          placeholder="Search by Requester Name or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </div>

      {/* Request List Section */}
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
            {filteredRequests.map((asset, index) => (
              <motion.tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.assetName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {asset.assetType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.quantity === 0 ? (
                    <p className="badge bg-red-600 border-none">Out of Stock</p>
                  ) : (
                    <p>{asset.quantity}</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-3">
                  {asset.productRequest || 0}
                  <span className="transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                    <FaSquareArrowUpRight size={18} />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.dateAdded}
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
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequest;
