import React , {useState , useEffect} from 'react'
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
import {FaRegBookmark , FaBookmark} from 'react-icons/fa';
import {MdOutlineReportProblem} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';
import CommentForm from '../comment/CommentForm';

interface PostCardProps { 
  posts : any;
  showAllposts : boolean,
  userData : any;
  setUpdateUI :(data: any) => void;
}

const PostCards : React.FC<PostCardProps> = ({posts , showAllposts, userData  , setUpdateUI}) => {
  const user = useSelector((state : RootState) =>state.user.userCred);
  const [showAll , setShowAll] = useState<{ [postId: string]: boolean }>({});
  const [comments , showComments] = useState<any>(0);

  const filteredPosts = showAllposts
  ? posts
  : posts.filter((post: any) => post.user._id === user?.userId);

    // Function to toggle showAll state for a specific post
    const toggleShowAll = (postId: string) => {
      setShowAll((prevShowAll) => ({
        ...prevShowAll,
        [postId]: !prevShowAll[postId],
      }));
    };

    const likeAndDislike = (postId : string) => {
      axiosInstance.get(`/like/${postId}`)
      .then((res) =>{
        if(res.data.message){
          toast.success(res.data.message);

          setUpdateUI((prev :boolean) => !prev);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log(err , 'err occured liking')
      )
    }

    const saveAndUnsave = (postId : string) => {
      axiosInstance.get(`/save/${postId}`)
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message);
          setUpdateUI((prev : boolean)=> !prev);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log(err , 'err occured saving')
      )
    }

  return (
    <> 
    {filteredPosts.length > 0 ? (
      filteredPosts?.slice().reverse().map((post : any) => {
        const isShowAll = showAll[post._id];
        // if (!showAllPosts && post.user.userId !== user?.userId) {
        //   return null; // Skip posts that don't belong to the logged-in user
        // }
        return (
          <div className='mb-2 mt-2 bg-primary p-4 rounded-xl' key={post?._id}>
            <div className='flex gap-3 items-center mb-2 '>
              <Link to=''>
                <img src={post?.user?.profileImage} alt="profile" className='w-14 h-14 object-cover rounded-full bg-gray-600' />
              </Link>

              <div className='w-full flex justify-between'>
                <div className=''>
                  <Link to='' >
                    <p className='font-medium text-lg text-ascent-1'>
                      {post?.user?.name}
                    </p>
                  </Link>
                  <span className='text-ascent-2'>{post?.user?.headine}</span>
                </div>
                <span className='text-ascent-2'>{moment(post?.createdAt ?? '2023-09-24').fromNow()}</span>
              </div>
            </div>

            <div>
              <p className='text-ascent-2'>
              {isShowAll ? post?.description : post?.description.slice(0, 300)}
                  {post?.description.length > 301 && (
                    <span
                      onClick={() => toggleShowAll(post._id)}
                      className='text-blue ml-2 font-medium cursor-pointer'>
                      {isShowAll ? 'Show less' : 'Show more'}
                    </span>
                  )}
              </p>
              
              {post?.media && (
                <img src={post?.media ?? 'Not Found'}  className='w-full mt-2 rounded-lg'/>
              )}
            </div>

            <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
              <p className='flex gap-2 items-center text-base cursor-pointer'>
                {post?.likes?.includes(user?.userId) ? (
                  <span onClick={() => likeAndDislike(post?._id)}>
                    <BiSolidLike size={20} className='text-blue' />
                  </span>
                ) : (
                  <span onClick={() =>likeAndDislike(post?._id)}>
                    <BiLike size={20} className='text-blue' />
                  </span>
                )}
                {post?.likes?.length} likes
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer'>
                <BiComment size={20}/>
                {post?.comments?.length} comments
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer'>
                  {userData?.savedPosts.some((saved : any )=> saved.postId === post?._id) ? (
                    <span onClick={() => saveAndUnsave(post._id)} >
                      <FaBookmark size={20} />
                    </span>
                  ) : (
                    <span onClick={() => saveAndUnsave(post._id)} >
                      <FaRegBookmark size={20}/>
                    </span>
                  )}
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer hover:text-yellow-700'>
                <MdOutlineReportProblem size={20} />
              </p>
            </div>

            {showComments === post?._id && (
              <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
                <CommentForm id={post?._id} />
              </div>
            )}
          </div>
      )
      })
    ) : (
      <div className='flex w-full items-center justify-center'>
        <p className='text-lg text-ascent-2'>No posts Available</p>
      </div>
    )}
    </>
  )
}

export default PostCards