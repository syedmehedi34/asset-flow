import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import PageTitle from "../../../components/PageTitle";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import PageTitle from "../../components/PageTitle";

const AllAssetsOfAnEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [assets, setAssets] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosSecure.get(`/single_user/${id}`);
        setEmployee(res?.data);
        setAssets(res?.data.assets || []);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id, axiosSecure]);

  // Extract unique asset types for dynamic category dropdown
  const uniqueCategories = [
    ...new Set(assets.map((asset) => asset.assetType).filter(Boolean)),
  ];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = (asset.assetName || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory
      ? asset.assetType === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn] || "";
      const bValue = b[sortColumn] || "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (assetID) => {
    console.log(assetID);
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const res = await axiosSecure.patch("/users", {
    //         _id: id,
    //         $pull: { assets: { assetID: assetID } },
    //       });
    //       if (res.data.modifiedCount) {
    //         Swal.fire({
    //           title: "Deleted!",
    //           text: "Asset has been deleted.",
    //           icon: "success",
    //         });
    //         // Refetch employee data
    //         const fetchEmployee = async () => {
    //           const res = await axiosSecure.get(`/single_user/${id}`);
    //           setEmployee(res?.data);
    //           setAssets(res?.data.assets || []);
    //         };
    //         fetchEmployee();
    //       } else {
    //         Swal.fire({
    //           title: "Error!",
    //           text: "Failed to delete asset. Please try again.",
    //           icon: "error",
    //         });
    //       }
    //     } catch (error) {
    //       Swal.fire({
    //         title: "Error!",
    //         text: "An error occurred while deleting the asset.",
    //         icon: "error",
    //       });
    //       console.error("Error deleting asset:", error);
    //     }
    //   }
    // });
  };

  return (
    <div className="container mx-auto px-4 py-6 my-24">
      <Helmet>
        <title>
          {employee
            ? `AssetFlow | Assets of ${employee.name}`
            : "AssetFlow | Loading"}
        </title>
      </Helmet>
      {/* {employee && (
        <PageTitle
          heading={`Assets of ${employee.name}`}
          subHeading="List of all assets assigned to this employee."
        />
      )} */}
      {employee && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center"
        >
          <img
            src={employee.photo}
            alt={`${employee.name}'s photo`}
            className="h-20 w-20 rounded-full object-cover mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> {employee.name}
            </h2>
            <p className="flex items-center text-gray-600 mb-1">
              <FaEnvelope className="mr-2 text-blue-500" /> {employee.email}
            </p>
            <p className="flex items-center text-gray-600 mb-1">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />{" "}
              {employee.address || "Not provided"}
            </p>
            <p className="flex items-center text-gray-600">
              <FaPhone className="mr-2 text-blue-500" />{" "}
              {employee.contact || "Not provided"}
            </p>
          </div>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 p-4 rounded-lg shadow-md mb-8"
      >
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border p-2 rounded-md pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Assets List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[50px]">
                  S.No
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetName")}
                >
                  Asset Name{" "}
                  {sortColumn === "assetName" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetRequestingDate")}
                >
                  Request Date{" "}
                  {sortColumn === "assetRequestingDate" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetType")}
                >
                  Type{" "}
                  {sortColumn === "assetType" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortColumn === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <motion.tbody
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {sortedAssets.map((asset, index) => (
                <motion.tr
                  key={asset.assetID}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[50px]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.assetName || "No name"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.assetRequestingDate || "Not provided"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.assetType || "No type"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        asset.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {asset.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link to={`/dashboard/asset/${asset.assetID}`}>
                      <button className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 ml-2">
                        View Details
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(asset.assetID)}
                      className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
        {sortedAssets.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No assets found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AllAssetsOfAnEmployee;
