import React from 'react';
import { Link } from 'react-router-dom';
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
import {FaRegBookmark , FaBookmark} from 'react-icons/fa';
import {MdOutlineReportProblem} from 'react-icons/md';
import moment from 'moment';

interface SavedPostProps {
  savedPosts : any;
}

const Saved: React.FC<SavedPostProps> = ({savedPosts}) => {
  return (
    <>
    {savedPosts.map((post : any) => {
      return(
    <div className='mb-2 mt-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2 '>
              <Link to=''>
                <img src='' alt="profile" className='w-14 h-14 object-cover rounded-full bg-gray-600' />
              </Link>

            <div className='w-full flex justify-between'>
                <div className=''>
                  <Link to='' >
                    <p className='font-medium text-lg text-ascent-1'>
                      {post?.user?.name}
                    </p>
                  </Link>
                  <span className='text-ascent-2'>
                    {post?.user?.headine}
                  </span>
                </div>
                <span className='text-ascent-2'>
                    {moment(post?.createdAt ?? '2023-09-24').fromNow()}
                </span>
              </div>
            </div>

            <div>
              <p className='text-ascent-2'>
              {/* {isShowAll ? post?.description : post?.description.slice(0, 300)}
                  {post?.description.length > 301 && ( */}
                    <span
                    //   onClick={() => toggleShowAll(post._id)}
                      className='text-blue ml-2 font-medium cursor-pointer'>
                      {/* {isShowAll ? 'Show less' : 'Show more'} */}
                    </span>
                  {/* )} */}
              </p>
              
              {/* {post?.media && ( */}
                <img src='' className='w-full mt-2 rounded-lg'/>
            {/* //   )} */}
            </div>

            <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
              <p className='flex gap-2 items-center text-base cursor-pointer'>
                {/* {post?.likes?.includes(user?.userId) ? ( */}
                  {/* <span onClick={() => likeAndDislike(post?._id)}> */}
                    {/* <BiSolidLike size={20} className='text-blue' /> */}
                  {/* </span> */}
                {/* ) : ( */}
                  {/* <span onClick={() =>likeAndDislike(post?._id)}> */}
                    <BiLike size={20} className='text-blue' />
                  {/* </span> */}
                {/* )} */}
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
{/* 
            {showComments === post?._id && ( */}
              <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
                {/* <CommentForm id={post?._id} /> */}
              </div>
            {/* )} */}
          </div>
          )
          })}
    </>
  )
}

export default Saved