import axios from "axios";
import toast from "react-hot-toast";

export async function ChangePasswordApi(password) {
    try {
        const { data } = await axios.patch(
            `https://route-posts.routemisr.com/users/change-password`, 
            password, 
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        );
        return data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return error.response?.data;
    }
}