import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const usePaymentData = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return [
    selectedPackage,
    setSelectedPackage,
    stripePromise,
    open,
    setOpen,
    handleOpen,
  ];
};

export default usePaymentData;
