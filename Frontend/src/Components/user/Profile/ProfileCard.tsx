import React from 'react';
import {Link} from 'react-router-dom';
// import {BsThreeDotsVertical} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi';
import {BsPersonFillAdd , BsBriefcase} from 'react-icons/bs';
import {CiLocationOn} from 'react-icons/ci';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';

interface ProfileCardProps {
    userData : any;
    openEditModal : () => void; 
}

const ProfileCard: React.FC<ProfileCardProps> = ({userData , openEditModal}) => {

    const user = useSelector((state : RootState) => state.user.userCred);

    
  return (
    <>
    <div>
        <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
            <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
                 <Link to='' className='flex gap-2'>
                    <img src={userData?.profileImage} alt="profile img" className='w-14 h-14 object-cover rounded-full bg-gray-600' />

                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-ascent-1'>
                            {user?.username}
                        </p>

                        <span className='text-ascent-2'>
                            {/* {user?.useremail} */}
                        </span>
                    </div>
                 </Link>

            {user?.userId === userData._id ? (
                <div className='' onClick={openEditModal}>
                    <BiEdit size={20} className='text-blue cursor-pointer hover:text-light-blue-300' />
                </div>
            ) : (
                <div className=''>
                    <BsPersonFillAdd size={20} className='text-blue cursor-pointer hover:text-light-blue-300' />
                </div>
            )}
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <div className='flex gap-2 items-center text-ascent-2'>
                    <CiLocationOn className='text-blue ' />
                    <span>
                        {userData?.location}
                    </span>
                </div>

                {/* <div className='flex gap-2 items-center text-ascent-2'>
                    <BsBriefcase />
                    <span>
                    {user?.useremail}
                    </span>
                </div> */}
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <p className='text-ascent-1'>Connections</p>

                <div className='flex items-center justify-between'>
                    {/* <span className='text-ascent-1'>Who viewed your profile</span> */}
                    <span></span>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='text-ascent-2'></span>
                </div>
            </div>   

            <div className='w-full flex flex-col gap-4 py-4 pb-6'>
                <p></p>
            </div>
        </div>
    </div>    
    </>
  )
}

export default ProfileCard