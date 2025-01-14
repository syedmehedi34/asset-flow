import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUnaffiliatedUsers = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const hr_email = "unaffiliated@hostname.com";

  const {
    data: unaffiliatedUsersList,
    isLoading: unaffiliatedUsersLoading,
    error,
    refetch: unaffiliatedUsersRefetch,
  } = useQuery({
    queryKey: [hr_email],
    enabled: !!hr_email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${hr_email}`);
      //   console.log(res.data);
      return res.data;
    },

    //

    // queryFn: async () => {
    //   try {
    //     const res = await axiosSecure.get(`/users/${hr_email}`);
    //     console.log(res); // Check the response in the browser console
    //     return res.data;
    //   } catch (error) {
    //     console.error("Error fetching unaffiliated users:", error);
    //     throw error; // Ensure the error is thrown so it can be caught by React Query
    //   }
    // },
  });

  if (error) {
    console.error("Error fetching role:", error);
  }

  return [
    unaffiliatedUsersList,
    unaffiliatedUsersLoading,
    error,
    unaffiliatedUsersRefetch,
  ];
};

export default useUnaffiliatedUsers;
