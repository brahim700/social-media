import axios from "axios";

export async function signin(userData) {
try {
    
    const{data }=await axios.post("https://route-posts.routemisr.com/users/signin", userData)
        console.log(data);
        
    return data

} catch (error) {
    console.log(error);
    
}
    
}