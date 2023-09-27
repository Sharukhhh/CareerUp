import React from 'react';
import Saved from '../../Components/user/postss/Saved';
import UserNav from '../../Components/user/Nav/UserNav';

const SavedPosts = () => {
  return (
    <>
        {/* <UserNav /> */}
        <div className='container mx-auto py-4 px-8 bg-blue-gray-50'>
            <h1 className='text-3xl font-bold mt-5 mb-4'>Saved Items</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Saved />
            </div>
        </div>
    </>
  )
}

export default SavedPosts