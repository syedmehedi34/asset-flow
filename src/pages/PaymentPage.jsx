import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Users,
  CheckCircle,
  ArrowLeft,
  Package,
  Shield,
  Zap,
} from "lucide-react";

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

function PaymentPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowPayment(true);
  };

  const handleBack = () => {
    setShowPayment(false);
    setSelectedPackage(null);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  return (
    <div className="my-24 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        {!showPayment ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your Perfect Plan
              </h1>
              <p className="text-lg text-gray-600">
                Select the package that best suits your team&apos;s needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packageOptions.map((pkg, index) => (
                <motion.div
                  key={pkg.packageId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="p-8">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                      {index === 0 ? (
                        <Package className="h-6 w-6 text-indigo-600" />
                      ) : index === 1 ? (
                        <Zap className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <Shield className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {pkg.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <div className="flex items-center mb-6">
                      <Users className="h-5 w-5 text-indigo-600 mr-2" />
                      <span className="text-gray-600">
                        Up to {pkg.members} members
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-8">
                      ${pkg.price}
                      <span className="text-lg text-gray-500">/month</span>
                    </div>
                    <button
                      onClick={() => handlePackageSelect(pkg)}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Select Plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Plans
              </button>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Details
                  </h2>
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 text-indigo-600 mr-2" />
                    <span className="text-gray-600">Secure Payment</span>
                  </div>
                </div>

                {selectedPackage && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedPackage.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Monthly subscription
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${selectedPackage.price}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Pay ${selectedPackage?.price}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
