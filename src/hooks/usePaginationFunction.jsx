import { useState } from "react";

// usePagination.js
const usePaginationFunction = (fetchedData, itemPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(fetchedData?.length / itemPerPage);
  const paginatedItem = fetchedData?.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );
  const changePage = (page) => {
    setCurrentPage(page);
  };
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const paginate = (
    <>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          {generatePageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => changePage(number)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                number === currentPage
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );

  return {
    paginate,
    paginatedItem,
  };
};
export default usePaginationFunction;
