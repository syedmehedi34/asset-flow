import { motion } from "framer-motion";
import { BarChart3, Shield, Clock, Users } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Efficient Asset Tracking",
    description:
      "Real-time monitoring and management of all company assets with detailed analytics and reporting.",
  },
  {
    icon: Shield,
    title: "Secure Management",
    description:
      "Enterprise-grade security ensuring your asset data is protected and accessible only to authorized personnel.",
  },
  {
    icon: Clock,
    title: "Time-Saving Solutions",
    description:
      "Automated processes for asset assignment, returns, and maintenance scheduling.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Seamless communication between HR managers and employees for asset requests and updates.",
  },
];

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Revolutionizing Asset Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive asset management system helps businesses track,
            manage, and optimize their resources effectively, saving time and
            reducing costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
