import React from 'react';
import {Link} from 'react-router-dom';
import {LiaEditSolid} from 'react-icons/lia';
import {BsPersonFillAdd , BsBriefcase} from 'react-icons/bs'
import {CiLocationOn} from 'react-icons/ci';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';

const ProfileCard = () => {
    const user = useSelector((state : RootState) => state.user.userCred);

  return (
    <>
        <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
            <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
                 <Link to='' className='flex gap-2'>
                    <img src="" alt="profile img" className='w-14 h-14 object-cover rounded-full bg-gray-600' />

                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-ascent-1'>
                            {user?.username}
                        </p>

                        <span className='text-ascent-2'>
                            {user?.useremail}
                        </span>
                    </div>
                 </Link>

                 <div className=''>
                    <LiaEditSolid />
                 </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <div className='flex gap-2 items-center text-ascent-2'>
                    <CiLocationOn />
                    <span>
                        Location here
                    </span>
                </div>

                <div className='flex gap-2 items-center text-ascent-2'>
                    <BsBriefcase />
                    <span>
                        Profession here
                    </span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <p className='text-xl text-ascent-1 font-semibold'>total connections</p>

                <div className='flex items-center justify-between'>
                    <span>Who viewed your profile</span>
                    <span></span>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileCard