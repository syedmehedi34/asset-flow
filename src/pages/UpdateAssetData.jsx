// import PageTitle from "../../components/PageTitle";
import { Input, IconButton, Typography } from "@material-tailwind/react";

const UpdateAssetData = () => {
  return (
    <div className="my-24">
      {/* <PageTitle
        heading="Update Asset Information"
        subHeading="Fill in the details below to update an existing asset in your inventory."
      ></PageTitle> */}

      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Update Asset Information
          </h2>
          <form className="space-y-4">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-600"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Asset Type */}
            <div>
              <label
                htmlFor="assetType"
                className="block text-sm font-medium text-gray-600"
              >
                Asset Type
              </label>
              <select
                id="assetType"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Asset Type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            {/* Product Quantity */}
            <div className="w-80">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Select Amount
              </Typography>
              <div className="relative w-full">
                <Input
                  type="number"
                  className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <div className="absolute right-1 top-1 flex gap-0.5">
                  <IconButton size="sm" className="rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                    </svg>
                  </IconButton>
                  <IconButton size="sm" className="rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                  </IconButton>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-600"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
              />
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                Update Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAssetData;
