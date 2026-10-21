import { useEffect, useState } from "react";
import PostCard from "../../PostCard/PostCard";
import { getAllPosts } from "../../service/PostApi";
import Loading from "../../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";


export default function Home() {
const [allPosts, setallPosts] = useState([])
 async function displayPosts() {

  let response=await getAllPosts()
  if (response.message==="success") {
    console.log(response.data.posts);
    setallPosts(response.data.posts)
    
    
  }
 }
 useEffect(() => {
    displayPosts()
 }, [])
 
    return (
    <>
  <div className="bg-gray-300 ">
    <CreatePost callback={getAllPosts}/>
        {allPosts.length>0 ? allPosts.map((posts,index)=>{return <PostCard callBack={displayPosts}  posts={posts} key={posts.id} index={index} />}): <Loading/>}

    </div>   
   
    
    </>
  )
}
