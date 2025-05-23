import { motion } from "framer-motion";
import {
  Calendar,
  Building2,
  Package,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";
import { Link } from "react-router-dom";

const MyPendingRequest = () => {
  const [assetDistributionData] = useAssetDistributionData();

  // Filter data for only pending requests
  const pendingRequests = assetDistributionData
    .filter((asset) => asset.requestStatus.toLowerCase() === "pending")
    .slice(0, 6); // Take only the first 6 items

  return (
    <section className="mt-20 py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-16 flex flex-col lg:flex-row lg:items-center justify-between"
        >
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
              My Pending Requests
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 ">
              View the list of all your asset requests that are still pending
              approval.
            </p>
          </div>
          <div>
            <h3 className="lg:text-xl mt-5 lg:mt-0 font-bold text-blue-gray-800 p-2 bg-blue-100 rounded-full px-5 w-fit">
              Total Pending : {pendingRequests?.length}
            </h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pendingRequests.map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-600" />
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.assetType === "Returnable"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {request.assetType}
                  </motion.span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
                  {request.assetName}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{request.requestStatus}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(
                        request.assetRequestingDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  View Details
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/my_assets">
            <motion.p
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-black rounded-full font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all"
            >
              View All Requests
              <ArrowRight className="ml-2 w-5 h-5 transition-transform" />
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MyPendingRequest;
