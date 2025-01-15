/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const useAllAssets = () =>
  // searchText = "", category = ""
  {
    const axiosSecure = useAxiosSecure();
    const [isRole] = useRole();

    const [searchText, setSearchText] = useState(null);
    const [category, setCategory] = useState(null);
    // console.log(searchText, category);

    let hr_email = "none@gmail.com";
    const location = useLocation();
    const path = location?.pathname;

    if (path === "/request_assets") {
      hr_email = isRole?.hr_email;
    } else {
      hr_email = isRole?.email;
    }

    // Define query params based on the conditions
    const queryParams = {
      hr_email,
      ...(searchText && { searchText }), // Add searchText if available
      ...(category && { category }), // Add category if available
    };

    const {
      data: assets = [],
      isPending: loadingAssets,
      refetch: refetchAssets,
    } = useQuery({
      queryKey: ["assets", queryParams],
      queryFn: async () => {
        const res = await axiosSecure.get("/assets", { params: queryParams });
        return res.data;
      },
      // Refetch if the searchText or category changes
      enabled: Boolean(searchText || category || hr_email),
    });

    return [assets, loadingAssets, refetchAssets, setSearchText, setCategory];
  };

export default useAllAssets;
