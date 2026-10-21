import axios from "axios";

export async function getAllPosts() {

    try {
        const { data } = await axios.get("https://route-posts.routemisr.com/posts", {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        
        return data
    } catch (error) {
           
           return error             
    }
}

export async function singlePosts(id) {

    try {
        const {data}=await axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
            return data
            

    } catch (error) {
    return error    
    }
    
}

export async function CreatePosts(formData) {

    try {
        const {data}=await axios.post(`https://route-posts.routemisr.com/posts`,formData,{
        headers:{
            token:localStorage.getItem("userToken")
        }
    })
    return data
    } catch (error) {
        return error?.response || error       
    }
}


export async function deletePost(id) {

    try {
        const {data}=await axios.delete(`https://route-posts.routemisr.com/posts/${id}`,
            {
                headers:{
                    token:localStorage.getItem("userToken")
                }
            }
        )
        return data
    } catch (error) {
        return error
        
    }
    
}