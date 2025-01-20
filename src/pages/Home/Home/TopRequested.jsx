import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Archive, TrendingUp, ArrowRight } from "lucide-react";
import useAssetDistributionData from "../../../hooks/useAssetDistributionData";
const TopRequested = () => {
  const [assetDistributionData] = useAssetDistributionData();
  console.log(assetDistributionData);
  // Step 1: Count occurrences of each assetID
  const assetCounts = assetDistributionData.reduce((counts, item) => {
    counts[item.assetID] = (counts[item.assetID] || 0) + 1;
    return counts;
  }, {});

  // Step 2: Convert the counts object into an array and sort by count in descending order
  const sortedAssetCounts = Object.entries(assetCounts)
    .map(([assetID, count]) => ({ assetID, count }))
    .sort((a, b) => b.count - a.count);

  console.log(sortedAssetCounts); // desire counting is here
  //   todo  need to find from the assets list now

  //
  const topRequestedItems = [
    {
      id: 1,
      name: "MacBook Pro M2",
      addedDate: "2024-01-15",
      category: "Returnable",
      quantity: 25,
      usersCount: 18,
    },
    {
      id: 2,
      name: "Ergonomic Chair",
      addedDate: "2024-01-20",
      category: "Returnable",
      quantity: 30,
      usersCount: 22,
    },
    {
      id: 3,
      name: "Wireless Keyboard",
      addedDate: "2024-01-25",
      category: "Returnable",
      quantity: 40,
      usersCount: 35,
    },
    {
      id: 4,
      name: "Premium Notebooks",
      addedDate: "2024-02-01",
      category: "Non-returnable",
      quantity: 150,
      usersCount: 45,
    },
  ];
  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Top Requested Items
            </h2>
            <p className="text-gray-600">
              Most frequently requested assets across the organization
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRequestedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.category === "Returnable"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {item.category}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3">{item.name}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(item.addedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Archive className="w-4 h-4 mr-2" />
                  <span>{item.quantity} available</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{item.usersCount} users</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TopRequested;
