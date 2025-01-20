import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  Users,
  Archive,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import useAllAssets from "../../hooks/useAllAssets";
import usePaginationFunction from "../../hooks/usePaginationFunction";

// Sample data - in a real app, this would come from your backend

const limitedStockItems = [
  {
    id: 1,
    name: "Standing Desk",
    category: "Returnable",
    quantity: 5,
    usersCount: 3,
    addedDate: "2024-01-10",
  },
  {
    id: 2,
    name: "4K Monitors",
    category: "Returnable",
    quantity: 8,
    usersCount: 6,
    addedDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    category: "Returnable",
    quantity: 7,
    usersCount: 5,
    addedDate: "2024-02-01",
  },
];

const LimitedStock = () => {
  const [assets] = useAllAssets();

  const filteredAssets = assets.filter((asset) => asset.assetQuantity < 10);
  console.log(filteredAssets);
  console.log(assets);
  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(filteredAssets, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Limited Stock Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Limited Stock Items
              </h2>
              <p className="text-gray-600">
                Assets that require immediate attention due to low inventory
              </p>
            </div>
            <motion.a
              href="/inventory"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItem.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-red-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.assetType === "Returnable"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.assetType}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3">
                  {item.assetName}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-red-600 font-medium">
                    <Archive className="w-4 h-4 mr-2" />
                    <span>Only {item.assetQuantity} left</span>
                  </div>
                  {/* <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{item.usersCount} users</span>
                  </div> */}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {item.assetPostDate}
                      {/* {new Date(item.assetPostDate).toLocaleDateString()} */}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {paginate}
    </section>
  );
};
export default LimitedStock;
