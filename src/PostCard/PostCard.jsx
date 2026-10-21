import { Link } from 'react-router-dom';
import CommentCard from '../CommentCard/CommentCard';
import { deletePost } from '../service/PostApi';

export default function PostCard({posts ,callBack}) {

  // 1. اجعل المعامل متغيراً عاماً هنا وليس posts.id مباشرة
  async function deletePosts(postId) {
    const response = await deletePost(postId); // 2. استخدم المتغير هنا
    
    if (response && response?.message === "success") {
      
      console.log(response);
      await callBack()
    }



  }
  const userId = posts.user?._id || posts.user?.id;

  return (
    <>
      <div className="bg-gray-500 p-3  w-250 m-auto ">
        <div >
          <div className="bg-white shadow mt-4 p-3 pb-0 rounded-3xl relative ">
            
            {/* 3. قم بتمرير posts.id أو posts._id هنا عند الضغط */}
            <div  className=' flex justify-end cursor-pointer ' onClick={() => { deletePosts( posts.id); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="flex items-center">
              {userId ? (
                <Link to={`/userprofile/${userId}`} aria-label={`View ${posts.user.name}'s profile`}>
                  <img alt={`${posts.user.name}'s profile`} className="w-10 h-10 rounded-full" src={posts.user.photo} />
                </Link>
              ) : (
                <img alt={`${posts.user?.name || "User"}'s profile`} className="w-10 h-10 rounded-full" src={posts.user?.photo} />
              )}
              <div className="ml-2">
                {userId ? (
                  <Link to={`/userprofile/${userId}`} className="cursor-pointer hover:underline">
                    {posts.user.name}
                  </Link>
                ) : (
                  <h5>{posts.user?.name}</h5>
                )}
                <p className="text-xs font-normal text-grey mt-1">
                  <span className="cursor-pointer hover:underline">
                    {posts.createdAt}
                  </span>
                </p>
              </div>
            </div>

            <div className="absolute pin-r pin-t mt-3 mr-3"></div>

            <Link to={`/about/${posts._id || posts.id}`} >
              {posts.body && <h5 className="text-sm font-normal my-3">{posts.body}</h5>}
            </Link>

            <Link to={`/about/${posts._id || posts.id}`} >
              {posts.image && <div className="border">
                <img className='object-cover w-full h-142' alt src={posts.image} />
              </div>}
            </Link>

            {/* باقي الأزرار وبقية الكود كما هو ... */}
            <div className="flex py-1">
              {/* أزرار التفاعل (Love, Comment, Share) */}
            </div>
            
            <CommentCard posts={posts} />
          </div>
        </div>
      </div>
    </>
  )
}