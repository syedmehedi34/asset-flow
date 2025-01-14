/* eslint-disable no-unused-vars */
import useAllEmployees from "../../hooks/useAllEmployees";

const EmployeeList = () => {
  const [employees, loadingEmployees, refetchEmployees] = useAllEmployees();
  console.log(employees);
  return (
    <div className="my-24">
      <h1>Emp list </h1>
    </div>
  );
};

export default EmployeeList;
