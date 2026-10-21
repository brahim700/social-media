import { Button } from "@heroui/react";
import { useState } from "react";
import { CreatePosts } from "../../service/PostApi";

export default function CreatePost({callback}) {
const [postBody, setpostBody] = useState("")
const [Image, setImage] = useState("")
    async function addPost(e) {
        e.preventDefault()
        console.log("add");

        const formData=new FormData
        formData.append("body" , postBody?? "")
        formData.append("image" , Image)
    
        const response= await CreatePosts(formData)
        if (response.message=="success") {
            setpostBody("")
            setImage("")
           await callback()
            
        }
    }


    function handelImage(e){
           console.log( e.target.files[0]);
           setImage(e.target.files[0])
           e.target.value=""
    }

  return (
    <>
    <form onSubmit={addPost}>
        <div className="editor mx-auto w-250 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg ">
        <h2 className="text-center font-bold border-b-2 border-white m-2 ">POST</h2>
  <input value={postBody} onChange={(e)=>{setpostBody(e.target.value)}} className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Add Post" type="text" />
  <input  onChange={handelImage} type="file" id="postImg" className="hidden"/>
  <div className="icons flex text-gray-500 m-2">
    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <label htmlFor="postImg"><svg  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></label>
    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
  </div>
  {/* buttons */}
  <div className="buttons flex justify-end ">
    <Button onClick={addPost} className="bg-blue-600">Post </Button>
  </div>
</div>
    </form>

    </>
    
  )
}
