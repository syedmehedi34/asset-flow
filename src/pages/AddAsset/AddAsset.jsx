import PageTitle from "../../components/PageTitle";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddAsset = () => {
  const [quantity, setQuantity] = useState(0);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.productQuantity = quantity;
    const assetData = data;
    console.log(assetData);

    // post api
    const res = await axiosSecure.post("/assets", assetData);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "New asset has been added",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setQuantity(0);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="my-24">
      <PageTitle
        heading="Add a New Asset"
        subHeading="Fill in the details below to add a new asset to your inventory."
      ></PageTitle>

      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Add New Asset Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("productName", {
                  required: "Product Name is required",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.productName && (
                <span className="text-red-500 text-sm">
                  {errors.productName.message}
                </span>
              )}
            </div>

            {/* asset type */}
            <div>
              <label
                htmlFor="assetType"
                className="block text-sm font-medium text-gray-600"
              >
                Asset Type
              </label>
              <select
                id="AssetType"
                {...register("assetType", {
                  required: "Asset Type is required",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Asset Type</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
              {errors.assetType && (
                <span className="text-red-500 text-sm">
                  {errors.assetType.message}
                </span>
              )}
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
                  value={quantity}
                  {...register("productQuantity", {
                    required: "Product Name is required",
                    min: 1,
                  })}
                  onChange={(e) => {
                    const newValue = Math.max(0, Number(e.target.value));
                    setQuantity(newValue);
                    setValue("productQuantity", newValue); // Sync the value with react-hook-form
                  }}
                  className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <div className="absolute right-1 top-1 flex gap-0.5">
                  <IconButton
                    size="sm"
                    className="rounded"
                    onClick={() =>
                      setQuantity((cur) => (cur === 0 ? 0 : cur - 1))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                    </svg>
                  </IconButton>
                  <IconButton
                    size="sm"
                    className="rounded"
                    onClick={() => setQuantity((cur) => cur + 1)}
                  >
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
              {errors.productQuantity && (
                <span className="text-red-500 text-sm">
                  {errors.productQuantity.message}
                </span>
              )}
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
                {...register("productDescription", {
                  required: "Product Description is required",
                })}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
              />
              {errors.productDescription && (
                <span className="text-red-500 text-sm">
                  {errors.productDescription.message}
                </span>
              )}
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              >
                Add Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
