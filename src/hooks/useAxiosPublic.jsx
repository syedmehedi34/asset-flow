import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5002",
  baseURL: "https://assetflow-livid.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
