import React from 'react'
import {BiImages, BiSolidVideo} from 'react-icons/bi';
import UserNav from '../../Components/user/Nav/UserNav'
import ProfileCard from '../../Components/user/Profile/ProfileCard'
import ConnectionCard from '../../Components/user/cards/ConnectionCard'
import PostCards from '../../Components/user/cards/PostCards'

const UserFeed = () => {
  return (
    <>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav />

            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>

                {/* left-side */}
                <div className='w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
                    <ProfileCard />
                    <ConnectionCard />
                </div>

                {/* center */}
                <div className='flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto'>
                    <form className="bg-primary px-4 rounded-md mb-3">
                        <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                            <img 
                            src="" 
                            alt=""
                            className="w-14 h-14 rounded-full object-cover bg-gray-700"
                            />
                            <div className='w-full flex flex-col mt-2'>
                                <input type="text" name="description" 
                                className="bg-secondary rounded border border-[#66666645] outline-none text-sm 
                                text-ascent-1 px-4 py-6 w-full placeholder:text-[#666]" placeholder="Add a Post!" 
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between py-4'>
                            <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                                <input type="file" className='hidden' accept='.jpg .png .jpeg' id='imgUpload' />
                                <BiImages />
                                <span>Images</span>
                            </label>

                            <label htmlFor="videUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'>
                                <input type="file" className='hidden' accept='' id='videoUpload' />
                                <BiSolidVideo />
                                <span>Videos</span>
                            </label>

                            <button className='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm' type='submit' title='post'>Post</button>
                        </div>
                    </form>

                    <PostCards />
                </div>

                {/* right-side */}
                <div className='w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span></span>
                        </div>
                    
                        <div className="w-full flex flex-col gap-4 pt-4">
                            <div className="flex items-center justify-between">
                    
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden mt-4"></div>

                    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
                        <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                            <span>Expand your connections</span>
                        </div>
                        <div className='w-full flex flex-col gap-4 pt-4'>
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>
  )
}

export default UserFeed