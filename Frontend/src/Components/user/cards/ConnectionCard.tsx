import React from 'react';
import { useSelector } from 'react-redux';
import {BsFillChatLeftTextFill} from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import RootState from '../../../Redux/rootstate/rootState';

interface ConnectionCardProps{
    userData : any;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({userData}) => {

    const user = useSelector((state : RootState) => state.user.userCred );
    const isCandidate = user?.role === 'Candidate';

    const navigate = useNavigate();

    const navigateChat = () => {
        navigate('/message');
    }

  return (
    <>
        <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
            <div className='flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>CONNECTIONS</ span>
                <span>
                    {userData?.connections?.length}
                </span>
            </div>

            {isCandidate ?  (
            <div className='w-full flex flex-col gap-4 pt-4'>
                {userData?.connections?.map((connection : any) => {
                    return(
                    <div className='flex items-center justify-between' key={connection._id}>
                        <Link to={`/account/${connection?._id}`} className='w-full flex gap-4 items-center cursor-pointer'>
                            <img src={connection?.userId?.profileImage}
                            className='w-10 h-10 object-cover rounded-full' alt="" 
                            />
                            <div className='flex-1'>
                                <p className='text-base font-medium text-ascent-1'>
                                    {connection?.userId?.name}
                                </p>
                                <span className='text-sm text-ascent-2'>
                                    {connection?.userId?.headline}
                                </span>
                            </div>
                        </Link>

                        {user.userId === userData._id && (
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
            ) : (
                <div className='w-full flex flex-col gap-4 pt-4'>
                    <p className="text-ascent-2 text-center py-4">
                        Loading....................
                    </p>
                </div>
            )}
        </div>
    </>
  )
}

export default ConnectionCard