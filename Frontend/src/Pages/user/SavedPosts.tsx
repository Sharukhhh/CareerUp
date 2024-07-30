import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {IoArrowBackCircle} from 'react-icons/io5';
import Saved from '../../Components/user/postss/Saved';
import { axiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const SavedPosts = () => {
  const [savedPosts , setSavedPosts] = useState<any[]>([]);
  const [updateUI , setUpdateUI] = useState<boolean>(false);

  useEffect(() => {
    axiosInstance.get('/savedposts')
    .then((res) => {
      if(res.data.message){
        setSavedPosts(res.data.posts);
      }

      if(res.data.error){
        toast.error(res.data.error);
      }
    })
  } ,[updateUI]);
  return (
    <>
      <Helmet>
        <title>Saved Items - CareerUp</title>
      </Helmet>
        <div className='container mx-auto max-w-5xl py-4 px-8 bg-blue-gray-50'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold mt-5 mb-4'>Saved Items</h1>
            <div className='flex'>
              <Link to='/feed'>
              Back <IoArrowBackCircle />
              </Link>
            </div>
          </div>
          <hr className='border border-black mb-3' />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Saved savedPosts={savedPosts} setUpdateUI={setUpdateUI}  />
            </div>
        </div>
    </>
  )
}

export default SavedPosts