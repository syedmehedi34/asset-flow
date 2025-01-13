import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isRole,
    isLoading: isRoleLoading,
    error,
    refetch: userRoleRefetch,
  } = useQuery({
    queryKey: [user?.email, "isRole"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });

  if (error) {
    console.error("Error fetching role:", error);
  }

  return [isRole, isRoleLoading, error, userRoleRefetch];
};

export default useRole;
