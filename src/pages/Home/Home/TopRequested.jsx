import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Archive, TrendingUp, ArrowRight } from "lucide-react";
import useAssetDistributionData from "../../../hooks/useAssetDistributionData";
const TopRequested = () => {
  const [assetDistributionData] = useAssetDistributionData();
  const countAssetIDs = assetDistributionData.reduce((acc, item) => {
    acc[item.assetID] = (acc[item.assetID] || 0) + 1;
    return acc;
  }, {});

  const sortedData = assetDistributionData
    .map((item) => ({
      ...item,
      assetID_count: countAssetIDs[item.assetID],
    }))
    .sort((a, b) => countAssetIDs[b.assetID] - countAssetIDs[a.assetID])
    .slice(0, 4);

  // console.log(sortedData);

  // console.log(sortedData);

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
          <motion.p
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
            <ArrowRight className="ml-1 w-4 h-4" />
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
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
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{item.assetPostDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Archive className="w-4 h-4 mr-2" />
                  <span>{item.assetQuantity} available</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{item.assetID_count} users</span>
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
