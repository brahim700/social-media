import axios from "axios";

export async function Signup(userData){
    try {
        const {data}= await axios.post("https://route-posts.routemisr.com/users/signup",userData)
        console.log(data);
        
        return data
        
    } catch (error) {

        console.log(error);
        
        
    }

}