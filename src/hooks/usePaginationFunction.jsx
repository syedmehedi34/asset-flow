import React, { useState } from "react";

// Custom Hook: usePaginationFunction
const usePaginationFunction = (fetchedData, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(fetchedData?.length / itemsPerPage);

  // Get paginated items for the current page
  const paginatedItem = fetchedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change the current page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // Generate dynamic page numbers
  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);

      // Add ellipsis if current page is far from the beginning
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Show 2 pages before and after the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if current page is far from the end
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Pagination component for rendering
  const paginate = (
    <>
      <div className="flex justify-center mt-4">
        {/* Previous Button */}
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {generatePageNumbers().map((number, index) => (
            <React.Fragment key={index}>
              {number === "..." ? (
                <span className="px-4 py-2 text-sm font-medium text-gray-600">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => changePage(number)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    number === currentPage
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600"
                  }`}
                >
                  {number}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
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

  // Return values from the custom hook
  return {
    paginate, // Pagination component for rendering
    paginatedItem, // Current page data
    currentPage, // Current page number
    itemsPerPage, // Number of items per page
    totalPages, // Total number of pages
  };
};

export default usePaginationFunction;
