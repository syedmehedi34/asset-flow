/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const useAssetDistributionData = () =>
  // searchText = "", category = ""
  {
    const axiosSecure = useAxiosSecure();
    const [isRole] = useRole();

    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");
    console.log(searchText, category);

    let hr_email = "mehedi@hr.com";
    // const location = useLocation();
    // const path = location?.pathname;

    // if (path === "/request_assets") {
    //   hr_email = isRole?.hr_email; // for employee route in the Request for a Asset page
    // } else {
    //   hr_email = isRole?.email; // for HR route in the Asset List page
    // }

    // Define query params based on the conditions
    const queryParams = {
      hr_email,
      ...(searchText && { searchText }), // Add searchText if available
      ...(category && { category }), // Add category if available
    };

    const {
      data: assetDistributionData = [],
      isPending: loadingAssetDistributionData,
      refetch: refetchAssetDistributionData,
    } = useQuery({
      queryKey: ["assetDistributionData", queryParams],
      queryFn: async () => {
        const res = await axiosSecure.get("/asset_distribution", {
          params: queryParams,
        });
        return res.data;
      },
      // Refetch if the searchText or category changes
      enabled: Boolean(searchText || category || hr_email),
    });

    return [
      assetDistributionData,
      loadingAssetDistributionData,
      refetchAssetDistributionData,
      searchText,
      setSearchText,
      category,
      setCategory,
    ];
  };

export default useAssetDistributionData;
