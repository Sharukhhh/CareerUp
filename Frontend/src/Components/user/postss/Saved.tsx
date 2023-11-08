import React , {useState } from 'react';
import { Link } from 'react-router-dom';
import { BiComment, BiLike , BiSolidLike } from 'react-icons/bi';
import {FaRegBookmark  ,FaBookmark } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';
import { axiosInstance } from '../../../api/axiosInstance';
import { likeAndDislikePost, saveAndUnsavePost } from '../../../api/postsApiService';

interface SavedPostProps {
  savedPosts : any[];
  setUpdateUI :(data: any) => void;
}

const Saved: React.FC<SavedPostProps> = ({savedPosts , setUpdateUI}) => {
  const user = useSelector((state : RootState) => state.user.userCred);

  const [userData , setUserData] = useState<any>([]);

  const [showAll , setShowAll] = useState<{ [postId: string]: boolean }>({});

      axiosInstance.get(`/ownProfile`).then((res) => {
        if(res.data){
          setUserData(res.data.user);
        }
      }).catch((error) => {
        console.log(error , 'axios')
        // toast.error(error.response.data.message || error.response.data);
      }
      )

      // Function to toggle showAll state for a specific post
      const toggleShowAll = (postId: string) => {
        setShowAll((prevShowAll) => ({
          ...prevShowAll,
          [postId]: !prevShowAll[postId],
        }));
      };

      const likeAndDislike = (postId : string) => {
        likeAndDislikePost(postId)
        .then((success) => {
          if(success){
            setUpdateUI((prev : boolean)=> !prev);
          }
        })
      }

      const saveAndUnsave = (postId : string) => {
        saveAndUnsavePost(postId)
        .then((success)=> {
          if(success){
            setUpdateUI((prev : boolean)=> !prev);
          }
        })
      }

  return (
    <>
    {savedPosts?.map((post : any) => {
      const isShowAll = showAll[post?._id];
      return(
        <div className='mb-2 mt-2 bg-primary p-4 rounded-xl' key={post?._id}>
          <div className='flex gap-3 items-center mb-2 '>
          {user?.userId === post?.user?._id ? (
                <Link to={`/account`}>
                  <img src={post?.user?.profileImage || post?.company?.profileImage } 
                  alt='' 
                  className='w-14 h-14 object-cover rounded-full' />
                </Link>
              ) : (
                <Link to={`/account/${post?.user?._id}`}>
                  <img src={post?.user?.profileImage || post?.company?.profileImage} 
                  alt=''
                  className='w-14 h-14 object-cover rounded-full' />
                </Link>
              )}
            <div className='w-full flex justify-between'>
              <div className=''>
                <Link to='' >
                  <p className='font-medium text-lg text-ascent-1'>
                    {post?.user?.name}
                  </p>
                </Link>
                <span className='text-ascent-2'>
                  {post?.user?.headline}
                </span>
              </div>
            </div>
          </div>

                <div>
                  <p className='text-ascent-2'>
                  {isShowAll ? post?.description : post?.description?.slice(0, 300)}
                      {post?.description?.length > 301 && (
                        <span
                          onClick={() => toggleShowAll(post?._id)}
                          className='text-blue ml-2 font-medium cursor-pointer'>
                          {isShowAll ? 'Show less' : 'Show more'} 
                        </span>
                      )}
                  </p>
                  
                  {post?.media && (
                    <img src={post?.media} className='w-full mt-2 rounded-lg'/>
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
                    {post?.likes?.length} 
                  </p>

                  <p className='flex gap-2 items-center text-base cursor-pointer'>
                    <BiComment size={20}/>
                    {post?.comments?.length} 
                  </p>

                  <p className='flex gap-2 items-center text-base cursor-pointer'>
                    {userData?.savedPosts?.some((saved : any )=> saved?.postId?._id.toString() === post?._id.toString()) ? (
                      <span onClick={() => saveAndUnsave(post?._id)} >
                        <FaBookmark size={20} />
                      </span>
                    ) : (
                      <span onClick={() => saveAndUnsave(post?._id)} >
                        <FaRegBookmark size={20}/>
                      </span>
                    )}
                  </p>
                </div>

        </div>
          )
          })}
    </>
  )
}

export default Saved