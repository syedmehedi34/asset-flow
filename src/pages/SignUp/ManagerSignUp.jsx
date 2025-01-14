import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import DatePicker from "react-datepicker";
import moment from "moment";

const ManagerSignUp = () => {
  const [, , , userRoleRefetch] = useRole();
  const axiosPublic = useAxiosPublic();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateOfBirth = moment(selectedDate).format("DD-MM-YYYY");
  // ?
  const packages = [
    {
      packageId: "starter",
      price: 5,
      title: "Starter Package - 5 Members",
      description:
        "Perfect for small teams. Manage up to 5 members for just $5",
    },
    {
      packageId: "basic",
      price: 8,
      title: "Growth Package - 10 Members",
      description: "Scale up with ease. Manage up to 10 members for only $8",
    },
    {
      packageId: "pro",
      price: 15,
      title: "Pro Package - 20 Members",
      description:
        "deal for larger teams. Manage up to 20 members for just $15.",
    },
  ];
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChange = (event) => {
    const selectedPkgId = event.target.value;
    setSelectedCard(selectedPkgId);
    // console.log(event.target.value);
  };

  // ?

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data?.name, data?.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            companyLogo: data.companyLogo,
            role: "hr_manager",
            package: selectedCard,
            dob: dateOfBirth,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
              userRoleRefetch();
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign Up</title>
      </Helmet>

      <div className="">
        <div className="w-3/4 mx-auto  bg-base-200 mt-24">
          <h1 className="text-center text-2xl">Manager Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* full name  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                // name="name"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            {/* company name  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                {...register("companyName", { required: true })}
                // name="name"
                placeholder="Company Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            {/* // ? : company logo  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Logo URL</span>
              </label>
              <input
                type="text"
                {...register("companyLogo", { required: true })}
                placeholder="Company Logo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>

            {/* email  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                // name="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>

            {/* dob  */}
            <div>
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>

              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="bg-white"
              />
            </div>

            {/* package */}
            <div>
              <div className="flex flex-row justify-center items-center gap-3">
                {packages.map((pkg, index) => (
                  <label
                    key={index}
                    className={`border rounded-lg p-4 w-64 text-center cursor-pointer ${
                      selectedCard == pkg.packageId
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="cardSelector"
                      value={pkg.packageId}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className="mb-4">{pkg.title}</div>
                    <div
                      className={`py-2 px-4 rounded ${
                        selectedCard == pkg.packageId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {selectedCard == pkg.packageId
                        ? "Selected"
                        : "Select This"}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* password  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="px-6">
            <small>
              Already have an account <Link to="/login">Login</Link>
            </small>
          </p>
        </div>
      </div>
    </>
  );
};

export default ManagerSignUp;
