/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Users, Package, Shield, Zap } from "lucide-react";
import { Dialog } from "@material-tailwind/react";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import usePaymentData from "../hooks/usePaymentData";

const packageOptions = [
  {
    packageId: "starter",
    packageMemberLimit: 5,
    packagePrice: 5,
    packageName: "Starter Package - 5 Members",
    description: "Perfect for small teams. Manage up to 5 members for just $5",
  },
  {
    packageId: "basic",
    packageMemberLimit: 10,
    packagePrice: 8,
    packageName: "Growth Package - 10 Members",
    description: "Scale up with ease. Manage up to 10 members for only $8",
  },
  {
    packageId: "pro",
    packageMemberLimit: 20,
    packagePrice: 15,
    packageName: "Pro Package - 20 Members",
    description:
      "Ideal for larger teams. Manage up to 20 members for just $15.",
  },
];

function PaymentPage() {
  const [
    selectedPackage,
    setSelectedPackage,
    stripePromise,
    open,
    setOpen,
    handleOpen,
  ] = usePaymentData();
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  // ? modal portion
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(!open);
  //?
  // console.log(selectedPackage);

  return (
    <div className="my-24 min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        {/* package portions  */}
        <div>
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
                    {pkg.packageName}
                  </h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="flex items-center mb-6">
                    <Users className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-gray-600">
                      Up to {pkg.packageMemberLimit} members
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-8">
                    ${pkg.packagePrice}
                    <span className="text-lg text-gray-500">/month</span>
                  </div>
                  <button
                    // setOpen
                    onClick={() => {
                      handlePackageSelect(pkg);
                      setOpen(true);
                    }}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Select Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* modal portion will be here  */}
        <Dialog open={open} handler={handleOpen}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto"
          >
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
                    {selectedPackage.packageName}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly subscription</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${selectedPackage.packagePrice}
                    </span>
                  </div>
                </div>
              )}

              {/* form  */}
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  selectedPackage={selectedPackage}
                  setOpen={setOpen}
                ></CheckoutForm>
              </Elements>
            </div>
          </motion.div>
        </Dialog>
      </div>
    </div>
  );
}

export default PaymentPage;
