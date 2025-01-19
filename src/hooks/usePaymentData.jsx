import { useState } from "react";

const usePaymentData = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return [selectedPackage, setSelectedPackage];
};

export default usePaymentData;
