
import { Link } from "react-router-dom";

export default function CommentCard({posts}) {
  const commentCreator = posts.topComment?.commentCreator;
  const userId = commentCreator?._id || commentCreator?.id;

  return (
    <>
    {/* comments */}
    <div className="flex items-center p-3 border-2 rounded-2xl ">
      {userId ? (
        <Link to={`/userprofile/${userId}`} aria-label={`View ${commentCreator.name}'s profile`}>
          <img alt={`${commentCreator.name}'s profile`} className="w-10 h-10 rounded-full" src={commentCreator.photo}/>
        </Link>
      ) : (
        <img alt={`${commentCreator?.name || "User"}'s profile`} className="w-10 h-10 rounded-full" src={commentCreator?.photo}/>
      )}
      <div className="ml-2">
        {userId ? (
          <Link to={`/userprofile/${userId}`} className="hover:underline">
            {commentCreator.name}
          </Link>
        ) : (
          <h5>{commentCreator?.name}</h5>
        )}
        <p className="text-xs font-normal text-grey mt-1">
          <span className="cursor-pointer hover:underline">
            {posts.topComment?.createdAt}
          </span>
          
        </p>
        <p>{posts.topComment?.content}</p>
      </div>
    </div>
    
    </>
  )
}
 