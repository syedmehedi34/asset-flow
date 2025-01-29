import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { PieChart as ChartPie, Package2, ArrowRight } from "lucide-react";
import useAssetDistributionData from "../../hooks/useAssetDistributionData";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would be calculated from your backend data
// const data = [
//   { name: "Returnable", value: 65 },
//   { name: "Non-returnable", value: 35 },
// ];

const COLORS = ["#4F46E5", "#EC4899"];

const PieChartSection = () => {
  const [assetDistributionData] = useAssetDistributionData();

  const data = Object.entries(
    assetDistributionData.reduce((acc, { assetType }) => {
      acc[assetType] = (acc[assetType] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, count], _, array) => {
    const total = array.reduce((sum, [, c]) => sum + c, 0);
    return { name, value: (count / total) * 100 }; // Keep value as a number
  });

  // console.log(data);

  //
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Asset Distribution Overview
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the balance between returnable and non-returnable
            assets in your inventory
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Package2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="md:text-2xl font-bold text-gray-900">
                    Asset Insights
                  </h3>
                  <p className="text-gray-600">
                    Real-time distribution analysis
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {data.map((entry, index) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-medium text-gray-700">
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {entry.value}%
                    </span>
                  </motion.div>
                ))}
              </div>

              <Link to="all_requests">
                <motion.p
                  href="/assets"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700"
                >
                  View detailed analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.p>
              </Link>
            </div>
          </motion.div>

          {/* Right side with pie chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 min-h-[400px]"
          >
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={160}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  content={({ payload }) => (
                    <div className="flex justify-center space-x-8">
                      {payload.map((entry, index) => (
                        <div
                          key={`legend-${index}`}
                          className="flex items-center"
                        >
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-gray-600">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default PieChartSection;
