import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packageOptions = [
  {
    packageId: "starter",
    members: 5,
    price: 5,
    title: "Starter Package - 5 Members",
    description: "Perfect for small teams. Manage up to 5 members for just $5",
  },
  {
    packageId: "basic",
    members: 10,
    price: 8,
    title: "Growth Package - 10 Members",
    description: "Scale up with ease. Manage up to 10 members for only $8",
  },
  {
    packageId: "pro",
    members: 20,
    price: 15,
    title: "Pro Package - 20 Members",
    description:
      "Ideal for larger teams. Manage up to 20 members for just $15.",
  },
];

const features = [
  "Asset tracking",
  "Real-time updates",
  "Email notifications",
  "Analytics dashboard",
  "Priority support",
];

export default function Packages() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the package that best fits your team size and needs. All
            plans include our core features with different member limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packageOptions.map((pkg, index) => (
            <motion.div
              key={pkg.packageId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-5xl font-bold text-blue-600">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
