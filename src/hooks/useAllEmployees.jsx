import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useRole from "./useRole";

const useAllEmployees = () => {
  const axiosSecure = useAxiosSecure();
  const [isRole] = useRole();
  // console.log(isRole.hr_email);

  let hr_email = "";
  let role = isRole?.role;

  if (role === "employee") {
    hr_email = isRole?.hr_email;
  } else if (role === "hr_manager") {
    hr_email = isRole?.email;
  }

  const {
    data: employees = [],
    isPending: loadingEmployees,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { hr_email },
      });

      return res.data;
    },
  });

  return [employees, loadingEmployees, refetchEmployees];
};

export default useAllEmployees;
