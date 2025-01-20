import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Calendar,
  Mail,
  Package,
  MessageSquare,
  User,
  Clock,
  ArrowRight,
} from "lucide-react";

// Sample data - in a real app, this would come from my backend
const pendingRequests = [
  {
    id: 1,
    requesterName: "Sarah Johnson",
    requesterEmail: "sarah.j@company.com",
    requestDate: "2024-02-28",
    assetName: "MacBook Pro M2",
    assetType: "Returnable",
    message:
      "Requesting a new laptop for development work as current one is showing performance issues.",
  },
  {
    id: 2,
    requesterName: "Michael Chen",
    requesterEmail: "m.chen@company.com",
    requestDate: "2024-02-27",
    assetName: "Ergonomic Chair",
    assetType: "Returnable",
    message:
      "Need an ergonomic chair for better posture during long working hours.",
  },
  {
    id: 3,
    requesterName: "Emma Davis",
    requesterEmail: "emma.d@company.com",
    requestDate: "2024-02-27",
    assetName: "Wireless Mouse",
    assetType: "Returnable",
    message: "Requesting a wireless mouse for improved workflow efficiency.",
  },
  {
    id: 4,
    requesterName: "Alex Turner",
    requesterEmail: "alex.t@company.com",
    requestDate: "2024-02-26",
    assetType: "Non-returnable",
    assetName: "Notebook Set",
    message: "Need notebooks and stationery items for client meeting notes.",
  },
  {
    id: 5,
    requesterName: "Lisa Wang",
    requesterEmail: "lisa.w@company.com",
    requestDate: "2024-02-26",
    assetName: "Monitor Stand",
    assetType: "Returnable",
    message:
      "Requesting a monitor stand for better screen positioning and desk organization.",
  },
];

const PendingRequests = ({ assetDistributionData }) => {
  const data = assetDistributionData.slice(0, 5);
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pending Asset Requests
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track and manage incoming asset requests from your team members in
            real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {data.map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request?.employeeName}
                    </h3>
                    <div className="flex items-center text-gray-500">
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="text-sm">{request?.employeeEmail}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    request.assetType === "Returnable"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {request.assetType}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Package className="w-5 h-5 mr-3 text-gray-400" />
                  <span>{request.assetName}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span>
                    {new Date(request.assetRequestingDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex items-start text-gray-700">
                  <MessageSquare className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="text-sm">{request.assetRequestMessage}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Review Request
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
          <Link to="/all_requests">
            <motion.p
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors group"
            >
              <Clock className="w-5 h-5 mr-2" />
              See All Requests
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.p>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default PendingRequests;
