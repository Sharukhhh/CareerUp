import React , {useState , lazy , Suspense ,useEffect} from 'react'
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
import {FaRegBookmark , FaBookmark} from 'react-icons/fa';
import {MdOutlineDeleteOutline, MdOutlineReportProblem} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';
import CommentForm from '../comment/CommentForm';
const ReportBox = lazy(() => import('../modal/ReportModal'));

interface PostCardProps { 
  posts : any;
  showAllposts : boolean,
  userData : any;
  setUpdateUI :(data: any) => void;
}

const PostCards : React.FC<PostCardProps> = ({posts , showAllposts, userData  , setUpdateUI}) => {
  const user = useSelector((state : RootState) =>state.user.userCred);
  const [showAll , setShowAll] = useState<{ [postId: string]: boolean }>({});
  const [comments , setShowComments] = useState<any>([]);

  const [showReportModal , setReportModal] = useState<boolean>(false);
  const [selectedPostId , setSelectedPostId] = useState<string | null>(null);

  const openReportModal = (postId : string) => {
    setReportModal(true);
    setSelectedPostId(postId);
  }

  const closeReportModal = () => {
    setReportModal(false);
  }

  const filteredPosts = showAllposts
  ? posts
  : posts.filter((post: any) => post.user?._id === user?.userId);

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

    const deletePost = (postId : string) => {
      axiosInstance.patch(`/deletepost/${postId}`)
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message);

          setUpdateUI((prev : boolean) => !prev);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log(err , 'err occured post delete')
      )
    }

    const deleteComment = (commentId : string) => {

    }

    // const getComments = async (postId : string) => {
    //   axiosInstance.get(`/comments/${postId}`)
    //   .then((res) =>{
    //     if(res.data.message){
    //       setShowComments(res.data.comments);
    //     }

    //     if(res.data.error){
    //       toast.error(res.data.error);
    //     }
    //   }).catch((error) => console.log('axios comment get err' , error)
    //   )
    // }

    // useEffect(() => {
    //   const getComments = async (postId : string) => {
    //     axiosInstance.get(`/comments/${postId}`)
    //     .then((res) =>{
    //       if(res.data.message){
    //         setShowComments(res.data.comments);
    //       }

    //       if(res.data.error){
    //         toast.error(res.data.error);
    //       }
    //     }).catch((error) => console.log('axios comment get err' , error)
    //     )
    //   }
    // }, []);

  return (
    <> 
    {filteredPosts.length > 0 ? (
      filteredPosts
      .filter((post :any) => !post.isDeleted)
      .slice().reverse().map((post : any) => {
        const isShowAll = showAll[post._id];
        return (
          <div className='mb-2 mt-2 bg-primary p-4 rounded-xl' key={post?._id}>
            <div className='flex gap-3 items-center mb-2 '>
              <Link to=''>
                <img src={post?.user?.profileImage || post?.company?.profileImage} alt="profile" className='w-14 h-14 object-cover rounded-full bg-gray-600' />
              </Link>

              <div className='w-full flex justify-between'>
                <div className=''>
                  <Link to='' >
                    <p className='font-medium text-lg text-ascent-1'>
                      {post?.user?.name || post?.company?.name}
                    </p>
                  </Link>
                  <span className='text-ascent-2'>{post?.user?.headline || post?.company?.headline}</span>
                </div>
                <span className='text-ascent-2'>{moment(post?.createdAt ?? '2023-09-24').fromNow()}</span>
              </div>
            </div>

            <div>
              <p className='text-ascent-2'>
              {isShowAll ? post?.description : post?.description?.slice(0, 300)}
                  {post?.description?.length > 301 && (
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

              <p onClick={() => {
                setShowComments(comments === post._id ? null : post._id);
                // getComments(post?._id)
              }}
              className='flex gap-2 items-center text-base cursor-pointer'>
                <BiComment size={20}/>
                {post?.comments?.length} comments
              </p>

              {user?.userId === post?.user?._id && (
                <div onClick={() => deletePost(post?._id)}
                className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer'>
                  <MdOutlineDeleteOutline size={20} />
                  <span>Delete</span>
                </div>
              )}

              <p className='flex gap-2 items-center text-base cursor-pointer'>
                  {userData?.savedPosts?.some((saved : any )=> saved.postId === post?._id) ? (
                    <span onClick={() => saveAndUnsave(post._id)} >
                      <FaBookmark size={20} />
                    </span>
                  ) : (
                    <span onClick={() => saveAndUnsave(post._id)} >
                      <FaRegBookmark size={20}/>
                    </span>
                  )}
              </p>

              <p onClick={() => openReportModal(post?._id)} className='flex gap-2 items-center text-base cursor-pointer hover:text-[#e5d463]'>
                <MdOutlineReportProblem size={20} />
              </p>
            </div>

            {comments === post?._id && (
              <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
                <CommentForm setUpdateUI={setUpdateUI} userData={userData} id={post?._id}
                />

                {
                  post?.comments?.length > 0 ? (
                    post?.comments?.map((comment : any) =>{
                    return (
                    <div className='w-full py-2' key={comment._id}>
                      <div className='flex gap-3 items-center mb-1'>
                        <Link to=''>
                          <img src={comment?.userId?.profileImage || comment?.companyId?.profileImage} alt="" 
                          className='w-10 h-10 rounded-full object-cover'/>
                        </Link>
                        <div>
                          <Link to=''>
                            <p className='font-medium text-base text-ascent-1'>
                              {comment?.userId?.name || comment?.companyId?.profileImage}
                            </p>
                          </Link>
                          <span className='text-ascent-2 text-sm'>
                          {moment(comment?.createdAt ?? '2023-10-02').fromNow()}
                          </span>
                        </div>
                      </div>

                      <div className='ml-12'>
                        <p className='text-ascent-2'>{comment?.text}</p>

                        <div className='mt-2 flex gap-6'>
                          <span onClick={() => deleteComment(comment._id)} className='text-blue hover:bg-[#3b509c2b] cursor-pointer'>
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                    )
                    })
                  ) : (
                    <span className='flex text-sm py-4 text-ascent-2 text-center'>
                      No Comments yet, be the first to Comment
                    </span>
                  )}
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

    <Suspense fallback={<Spinner />}>
      <ReportBox visible={showReportModal} closeReportModal={closeReportModal} postId={selectedPostId} />
    </Suspense>
    </>
  )
}

export default PostCards