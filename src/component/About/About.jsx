import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { singlePosts } from '../../service/PostApi';
import PostCard from '../../PostCard/PostCard';
import Loading from '../../Loading/Loading';

export default function About() {
  let {id}=useParams()
const [postDetails, setpostDetails] = useState(null)
  console.log(id);
  
   async function DisplaySinglePost() {
    const response = await singlePosts(id)
    console.log(response);
    if (response.message==="success") {
      setpostDetails(response.data.post)
      
    }
  }
  useEffect(() => {
    DisplaySinglePost(id)
    
  }, [])
  
  return (


    <>
   {postDetails?<PostCard posts={postDetails}/>:<Loading/>}
    </>
  )
}
