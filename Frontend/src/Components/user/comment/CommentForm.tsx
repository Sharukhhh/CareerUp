
import React, {useState} from 'react'
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';

interface CommentFormProps {
    id : string;
    userData : any
    setUpdateUI :(data: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({id ,  userData , setUpdateUI}) => {

  const [comment , setComment] = useState<string>('');

  const submitCommentForm = (e: React.FormEvent<HTMLFormElement> , postId : string) => {
    e.preventDefault();

    axiosInstance.post(`/postcomment/${postId}`, {text : comment})
    .then((res)=> {
      if(res.data.message){
        toast.success(res.data.message);
        setComment('');
        setUpdateUI((prev : any) => !prev);
      }

      if(res.data.error){
        toast.error(res.data.error);
      }
    }).catch((error) => console.log('comment post error' ,error)
    )
  }
  return (
    <>
      <form onSubmit={(e) => submitCommentForm(e ,id)} className='w-full border-b border-[#66666645]'>
        <div className='w-full flex items-center gap-2 py-4'>
          <img src={userData?.profileImage} alt="pro" className='w-10 h-10 rounded-full object-cover' />

          <input value={comment} onChange={(e) => setComment(e.target.value)}
          className='w-full border border-black bg-blue-gray-50 rounded-full py-3 px-2' 
          type="text" placeholder='Comment here....'
          name="comment" id="" />
        </div>

        <div className='flex items-end justify-end pb-2'>
            <button className='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'>
              Submit
            </button>
        </div>
      </form>
    </>
  )
}

export default CommentForm