import React  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {BiEdit} from 'react-icons/bi';
import { BsFillChatLeftTextFill} from 'react-icons/bs';
import {HiOutlineSaveAs} from 'react-icons/hi';
import {CiLocationOn} from 'react-icons/ci';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';

interface ProfileCardProps {
    userData : any;
    openEditModal : () => void; 
}

const ProfileCard: React.FC<ProfileCardProps> = ({userData, openEditModal }) => {

    // const [userConnections, setUserConnections] = useState<any>([]);

    const navigate = useNavigate();

    const user = useSelector((state : RootState) => state.user.userCred);

    const navigateChat = () => {
        navigate('/message');
    }

    
  return (
    <>
    <div>
        <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
            <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
                <Link to='' className='flex gap-2'>
                    {userData?.profileImage ? (
                        <img src={userData?.profileImage} alt="profile img" className='w-14 h-14 object-cover rounded-full' />
                    ) : (
                        <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" className='w-14 h-14 object-cover rounded-full opacity-70' />
                    )}
                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-ascent-1'>
                            {userData?.name}
                        </p>

                        <span className='text-ascent-2'>
                            {userData?.headline}
                        </span>
                    </div>
                </Link>

            {user?.userId === userData?._id && (
                <div className='' onClick={openEditModal}>
                    <BiEdit size={20} className='text-blue cursor-pointer hover:text-light-blue-300' />
                </div>
            // ) : (
                
            //     <div className=''>
            //         <BsPersonFillAdd size={20} className='text-blue cursor-pointer hover:text-light-blue-300' />
            //     </div>
            )}
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <div className='flex gap-2 items-center text-ascent-2'>
                    <CiLocationOn className='text-blue ' />
                    <span>
                        {userData?.location}
                    </span>
                </div>
                {user?.userId === userData?._id && (
                    <Link to={`/saved`}>
                        <div className='flex gap-2 items-center text-ascent-2 cursor-pointer hover:underline underline-offset-2'>
                            <HiOutlineSaveAs className='text-blue ' />
                            <span >Saved items</span>
                        </div>
                    </Link>
                )}
            </div>

            {user?.role === 'Candidate' && (
                <div className='w-full flex flex-col gap-2 py-4 '>
                    <div className='flex items-center justify-between text-ascent-1 '>
                        <span>Connections</ span>
                        <span>
                            {userData?.connections?.length}
                        </span>
                    </div>
                    {user.userId !== userData?._id && (
                        <div className='w-full flex flex-col gap-4 pt-4'>
                            {userData?.connections?.map((connection : any) => {
                                return(
                                <div className='flex items-center justify-between' key={connection?._id}>
                                    <Link to={`/account/${connection?.userId?._id}`} className='w-full flex gap-4 items-center cursor-pointer'>
                                        {connection?.userId?.profileImage ? (
                                            <img src={connection?.userId?.profileImage}
                                            className='w-10 h-10 object-cover rounded-full' alt="" 
                                            />
                                        ) : (
                                            <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt=""
                                            className='w-10 h-10 object-cover rounded-full opacity-70'/>
                                        )}
                                        <div className='flex-1'>
                                            <p className='text-base font-medium text-ascent-1'>
                                                {connection?.userId?.name}
                                            </p>
                                            <span className='text-sm text-ascent-2'>
                                                {connection?.userId?.headline}
                                            </span>
                                        </div>
                                    </Link>

                                    {user?.userId === userData?._id && (
                                    <div className='flex gap-1'>
                                        <button 
                                        className='text-sm p-1 rounded text-blue'
                                        >
                                            <BsFillChatLeftTextFill onClick={navigateChat} size={20} />
                                        </button>
                                    </div>
                                    )}
                                </div>       
                                )
                            })}
                        </div>
                    )}

                    {/* <p className='text-ascent-1'>{userData?.connections?.length} Connections</p> */}

                    {/* <div className='flex items-center justify-between'>
                        {/* <span className='text-ascent-1'>Who viewed your profile</span> */}
                        {/* <span></span>
                    </div> */} 

                    {/* <div className='flex items-center justify-between'>
                        <span className='text-ascent-2'></span>
                        <span></span>
                    </div> */}
                </div>
            )} 
        </div>
    </div>    
    </>
  )
}

export default ProfileCard