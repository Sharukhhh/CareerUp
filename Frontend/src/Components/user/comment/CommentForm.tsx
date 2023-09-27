import { Spinner } from '@material-tailwind/react';
import React from 'react'
interface CommentFormProps {
    id : string;
}

const CommentForm: React.FC<CommentFormProps> = ({id}) => {
  return (
    <>
      <form className='w-full border-b vorder-[#66666645]'>
        <div className='w-full flex items-center gap-2 py-4'>
          <img src="" alt="pro" className='w-10 h-10 rounded-full object-cover' />

          <input 
          className='w-full rounded-full py-3' 
          type="text" placeholder='comment'
          name="comment" id="" />
        </div>

        <div className='flex items-end justify-end pb-2'>
          {/* {loading ? ( */}
            <Spinner />
          {/* ):( */}
            <button className='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'>
              Submit
            </button>
          {/* )} */}
        </div>
      </form>
    </>
  )
}

export default CommentForm