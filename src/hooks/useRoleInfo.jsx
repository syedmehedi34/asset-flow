import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRoleInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   console.log(user.email);

  const { data: isRoleInfo, isPending: isRoleInfoLoading } = useQuery({
    queryKey: [user?.email, "isRoleInfo"],
    enabled: !loading,
    queryFn: async () => {
      //   console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      // console.log(res.data);
      return res.data?.role;
    },
  });
  return [isRoleInfo, isRoleInfoLoading];
};

export default useRoleInfo;
