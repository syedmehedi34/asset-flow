import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";

const useAllEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();
  console.log(isRole.email);

  const hr_email = isRole?.email;

  const {
    data: employees = [],
    isPending: loadingEmployees,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", { params: { hr_email } });

      return res.data;
    },
  });

  return [employees, loadingEmployees, refetchEmployees];
};

export default useAllEmployees;
