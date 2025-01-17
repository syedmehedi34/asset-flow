import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      // console.log(result.user);
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Logged In successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        role: "employee",
        hr_email: "unaffiliated@hostname.com",
        photo: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full justify-start gap-3"
        >
          <span>
            <img
              className="w-7 h-7"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt=""
            />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
