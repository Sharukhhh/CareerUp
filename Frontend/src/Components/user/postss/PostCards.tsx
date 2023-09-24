import React , {useState , useEffect} from 'react'
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
import {FaRegBookmark} from 'react-icons/fa';
import {MdOutlineReportProblem} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';
import CommentForm from '../comment/CommentForm';

const PostCards = () => {
  const user = useSelector((state : RootState) =>state.user.userCred);
  const [posts , setPosts] = useState<any>([])
  const [showAll , setShowAll] = useState<any>(0);
  const [comments , showComments] = useState<any>(0);

  useEffect(() => {
    axiosInstance.get('/getposts').then((res) => {
      if(res.data.message){
        setPosts(res.data.posts);
      }
    }).catch((err) => console.log(err, 'axios posts err')
    )
  }, []);

  return (
    <> 
    {posts.length > 0 ? (
      posts?.slice().reverse().map((post : any) => {
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
                {post?.description.slice(0, 300)}
                {post?.description?.length > 301 && (
                  showAll === post?._id ? (
                    <span onClick={() => setShowAll(0)}
                    className='text-blue ml-2 font-medium cursor-pointer'>Show less</span> 
                    ) : ( 
                    <span onClick={() => setShowAll(post?._id)}
                    className='text-blue ml-2 font-medium cursor-pointer'>Show more</span>
                  ))}
              </p>
              
              {post?.media && (
                <img src={post?.media ?? 'Not Found'} alt="img" className='w-full mt-2 rounded-lg'/>
              )}
            </div>

            <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
              <p className='flex gap-2 items-center text-base cursor-pointer'>
                {post?.likes?.includes(user?.userId) ? (
                  <BiSolidLike size={20} className='text-blue' />
                ) : (
                  <BiLike size={20} className='text-blue' />
                )}
                {post?.likes?.length} likes
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer'>
                <BiComment size={20}/>
                {post?.comments?.length} comments
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer'>
                <FaRegBookmark size={20} />
              </p>

              <p className='flex gap-2 items-center text-base cursor-pointer'>
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