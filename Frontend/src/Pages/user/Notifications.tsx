import React , {useEffect , useState} from 'react'
import UserNav from '../../Components/user/Nav/UserNav'
import { axiosInstance } from '../../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { addNotification, clearNotification } from '../../Redux/slices/notificationSlice';

const Notifications = () => {
    const user = useSelector((state : RootState) => state.user.userCred);

    const dispatch = useDispatch();


    const [notifcations , setNotifications] = useState<any[]>([]);
    const [updateUI , setUpdateUI] = useState<boolean>(false);

    useEffect(() => {
        dispatch(clearNotification());

        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/notifies');

                if(response.data.message){
                    setNotifications(response.data.notifications);

                    response.data.notifications.forEach((notification : any) => {
                        dispatch(addNotification(notification));
                    });

                    setUpdateUI((prev) => !prev);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchNotifications();
    } , [updateUI]);

  return (
    <>
        <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
            <UserNav/>

            <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
                <div className='flex-1 max-w-4xl mx-auto bg-white pt-5 pb-10 flex flex-col rounded gap-6 overflow-y-auto'>
                    <h1 className='font-bold text-2xl ml-4'>Notifcations</h1>

                    <hr className='mb-3 border-2 mx-4' />

                                {/* <div  className='flex items-start p-4 mx-4 bg-gray-100 border rounded shadow-md'>
                                    <div className='flex items-center justify-center w-12 h-12 bg-primary rounded-full'>
                                        <img
                                        src=""
                                        alt='User'
                                        className='w-8 h-8 rounded-full'
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <p className='text-lg font-semibold'>
                                            
                                        </p>
                                        <div className='mt-4'>
                                            <button className='bg-blue text-white px-4 py-2 mr-4 rounded'>
                                                Accept
                                            </button>
                                            <button className='bg-red-500 text-white px-4 py-2 rounded'>
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                        {/* <div></div> */}
                    
                    {notifcations.length > 0 ? (
                        notifcations?.map((notifcation : any) => (
                        <div key={notifcation?._id} className='flex items-start p-4 mx-4 bg-gray-100 border rounded shadow-md'>
                            <div className='flex items-center justify-center w-12 h-12 bg-primary rounded-full'>
                                <img
                                src={notifcation?.senderUser?.profileImage}
                                alt='User'
                                className='w-12 h-12 rounded-full object-cover'
                                />
                            </div>
                            <div className='ml-4'>
                                {/* <p className='text-lg font-semibold'></p> */}
                                <p className='text-gray-500'>{notifcation?.message}</p>
                                {notifcation?.type === 'posts' && (
                                    <img
                                    src={notifcation?.post?.media}
                                    alt='Post'
                                    className='w-24 h-24 mt-2 rounded-lg'
                                    />
                                )}    
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className='flex justify-center p-40 bg-blue-gray-50 mx-4'>
                            <p className='text-xl font-medium'>No New Notifications</p>
                        </div>
                    )}

                    {/* {/* Notification type 2 */}
                    {/* <div className='flex items-start p-4  mx-4 bg-gray-100 border rounded shadow-md'>
                        <div className='flex items-center justify-center w-12 h-12 bg-primary rounded-full'>
                            <img
                            src=''
                            alt='User'
                            className='w-8 h-8 rounded-full'
                            />
                        </div>
                        <div className='ml-4'>
                            <p className='text-lg font-semibold'>User Name sent you a request</p>
                            <div className='mt-4'>
                                <button className='bg-blue text-white px-4 py-2 mr-4 rounded'>
                                    Accept
                                </button>
                                <button className='bg-red-500 text-white px-4 py-2 rounded'>
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div> */} 
                </div>
            </div>
        </div>
    </>
  )
}

export default Notifications