import React from 'react'
import { BiComment, BiLike, BiSave, BiSolidReport } from 'react-icons/bi';
import {Link} from 'react-router-dom';

const PostCards = () => {
  return (
    <>
      <div className='mb-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2 '>
          <Link to=''>
            <img src="" alt="" className='w-14 h-14 object-cover rounded-full bg-gray-600' />
          </Link>

          <div className='w-full flex justify-between'>
            <div className=''>
              <Link to='' >

              </Link>
              <span className='text-ascent-2'></span>
            </div>
            <span className='text-ascent-2'></span>
          </div>
        </div>

        <div>
          <p className='text-ascent-2'>

          </p>

          {/* <img src="" alt="img" className='w-full mt-2 rounded-lg'/> */}
        </div>

        <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
          <p className='flex gap-2 items-center text-base cursor-pointer'>
            <BiLike size={20} />
          </p>

          <p className='flex gap-2 items-center text-base cursor-pointer'>
            <BiComment size={20}/>
          </p>
        </div>

        <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
          
        </div>

      </div>
    </>
  )
}

export default PostCards