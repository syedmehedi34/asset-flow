/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";
import { useLocation } from "react-router-dom";

const useAllAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();

  // console.log(isRole.email);

  // ?

  let hr_email = "none@gmail.com";

  const location = useLocation();
  const path = location?.pathname;
  // console.log(path);

  if (path === "/request_assets") {
    hr_email = isRole?.hr_email;
  } else {
    hr_email = isRole?.email;
  }

  const {
    data: assets = [],
    isPending: loadingAssets,
    refetch: refetchAssets,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets", { params: { hr_email } });

      return res.data;
    },
  });

  return [assets, loadingAssets, refetchAssets];
};

export default useAllAssets;
