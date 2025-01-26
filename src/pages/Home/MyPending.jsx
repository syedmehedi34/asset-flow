import { motion } from "framer-motion";
import {
  Calendar,
  Package,
  Building2,
  User2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

// Sample data - in a real app, this would come from your backend
const recentAssignments = [
  {
    id: 1,
    assetName: "MacBook Pro M2",
    assignedTo: "Sarah Johnson",
    companyName: "TechCorp Solutions",
    assignmentDate: "2024-02-28",
    assetType: "Returnable",
  },
  {
    id: 2,
    assetName: "Dell 4K Monitor",
    assignedTo: "Michael Chen",
    companyName: "DataViz Analytics",
    assignmentDate: "2024-02-27",
    assetType: "Returnable",
  },
  {
    id: 3,
    assetName: "Ergonomic Chair",
    assignedTo: "Emma Davis",
    companyName: "CloudNet Systems",
    assignmentDate: "2024-02-27",
    assetType: "Returnable",
  },
  {
    id: 4,
    assetName: "Premium Stationery Set",
    assignedTo: "Alex Turner",
    companyName: "CreativeMinds Agency",
    assignmentDate: "2024-02-26",
    assetType: "Non-returnable",
  },
];

const MyPending = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recently Assigned Assets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track the latest asset assignments across your organization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {recentAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Hover Effect Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-600" />
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      assignment.assetType === "Returnable"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {assignment.assetType}
                  </motion.span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {assignment.assetName}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User2 className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{assignment.assignedTo}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{assignment.companyName}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(assignment.assignmentDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 transition-colors group"
                >
                  View Details
                  <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
          <motion.a
            href="/assignments"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 group"
          >
            View All Asset Assignments
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
export default MyPending;
