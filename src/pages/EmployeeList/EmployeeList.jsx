/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import useAllEmployees from "../../hooks/useAllEmployees";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePaginationFunction from "../../hooks/usePaginationFunction";
import { Helmet } from "react-helmet-async";

const EmployeeList = () => {
  const [employees, loadingEmployees, refetchEmployees] = useAllEmployees();
  const axiosSecure = useAxiosSecure();
  // console.log(employees);

  const handleRemove = (_id) => {
    const hr_email = "unaffiliated@hostname.com";
    const companyLogo = "https://i.ibb.co.com/St0Nj3L/assetflow.png";
    // console.log(_id);

    // removing function
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove from team!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch("/users", {
            _id,
            hr_email,
            companyLogo,
          });
          // console.log(res);
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Removed!",
              text: "Employee has been removed from the team.",
              icon: "success",
            });
            // unaffiliatedUsersRefetch();
            refetchEmployees();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove employee from the team. Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while removing the employee from the team.",
            icon: "error",
          });
          console.error("Error updating employee:", error);
        }
      }
    });
  };

  // pagination
  const { paginate, paginatedItem, currentPage, itemsPerPage } =
    usePaginationFunction(employees, 5);

  return (
    <>
      <Helmet>
        <title>AssetFlow | Employee List</title>
      </Helmet>

      <div className="container mx-auto px-4 py-6 my-24">
        <PageTitle
          heading="All Employees List "
          subHeading="All the team members in a place with details."
        ></PageTitle>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[50px]">
                  S.No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40px]">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItem.map((employee, index) => (
                <tr
                  key={employee._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[50px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-[40px]">
                    <img
                      src={employee.photo}
                      alt={`${employee.name}'s photo`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {employee.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleRemove(employee._id)}
                      className="px-4 py-2 rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginate}
      </div>
    </>
  );
};

export default EmployeeList;
