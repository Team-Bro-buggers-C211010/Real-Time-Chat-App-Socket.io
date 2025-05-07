import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const axiosSecure = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: true,
})

const useAxiosSecure = () => {
    return axiosSecure;
}
export default useAxiosSecure