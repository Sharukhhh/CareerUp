import React from 'react'
import { IoMdClose } from 'react-icons/io'

const EditProfile = () => {
    const handleClose = () => {}
  return (
    <>
        <div className='fixed z-50 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-[#131313] opacity-70'>
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                        
                        </span>
                        &#8203;

                        <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                            role='dialog' aria-modal = 'true' aria-labelledby='modal-headline'>
                            
                            <div className='flex justify-between px-6 pt-5 pb-2'>
                                <label 
                                htmlFor="name"
                                className='block font-medium text-xl text-ascent-1 text-left'>Edit Profile
                                </label>

                                <button className='text-ascent-1' onClick={handleClose}>
                                    <IoMdClose size={22} />

                                </button>

                            </div>
                            <form className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6'>
                                <label htmlFor="name">Name</label>
                                <input type="text" value='' name='name' className='' />

                                <label htmlFor="name">Email</label>
                                <input type="text" value='' name='email' className='w-full' />

                                <label htmlFor="name">Headline</label>
                                <input type="text" value='' name='healine' className='w-full' />

                                <label htmlFor="name">Location</label>
                                <input type="text" value='' name='location' className='w-full' />

                                <label htmlFor="name">Profile Picture</label>
                                <input type="file" value='' name='profileImage' className='w-full' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditProfile