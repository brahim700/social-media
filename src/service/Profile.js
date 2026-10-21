import axios from "axios";
import toast from "react-hot-toast";

export async function profileApi(){
    try {
         const {data}=await axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
        headers:{
            token:localStorage.getItem("userToken")
        }

    })
    return data
    } catch (error) {
        return toast.error(error)
    }
   

}
export async function profileUsersApi(id){
    try {
         const {data}=await axios.get(`https://route-posts.routemisr.com/users/${id}/profile`,{
        headers:{
            token:localStorage.getItem("userToken")
        }

    })
    return data
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Unable to load user profile")
        return null
    }
   

}

export async function profilePhotoApi(formdata){
    try {
         const {data}=await axios.put(`https://route-posts.routemisr.com/users/upload-photo`,formdata ,{
        headers:{
            token:localStorage.getItem("userToken")
        }

    })
    return data
    } catch (error) {
        return toast.error(error)
    }
   

}