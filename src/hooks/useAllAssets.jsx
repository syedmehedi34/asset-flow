import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";

const useAllAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();
  console.log(isRole.email);

  const hr_email = isRole?.email;

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
