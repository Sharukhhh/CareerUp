import React , {useEffect , useState , lazy , Suspense} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BsBriefcaseFill , BsChatSquareTextFill} from 'react-icons/bs';
import {GiWireframeGlobe} from 'react-icons/gi';
import {ImHome} from 'react-icons/im';
import { logout } from '../../../Redux/slices/slice';
import toast from 'react-hot-toast';
const LazyProfileDropDown = lazy(() => import('../../../Pages/user/ProfileDropDown'));
import { Spinner } from '@material-tailwind/react';
import { axiosInstance } from '../../../api/axiosInstance';
import RootState from '../../../Redux/rootstate/rootState';

interface UserNavProps {

}


const UserNav:React.FC<UserNavProps> = () => {

  const user = useSelector((state : RootState) => state.user.userCred);
  const [userData , setUserData] = useState<any>([]);

  const [openDropProfile , setOpenDropProfile] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/ownProfile`).then((res) => {
      
      if(res.data){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    )
  },[]);

  const token = localStorage.getItem('userToken');


  useEffect(() => {

    if(!token){
      navigate('/login');
    }
  }, [])


  const handleLogout = () => {
    dispatch(logout());

    navigate('/login');

    toast.success('Logout Successfully');
  }

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between py-3 md:py-6 px-4 md:px-8 bg-primary ]'>
      <NavLink to='/feed' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 text-[#065ad8] rounded font-extrabold  text-3xl'>
          <span className='dark:text-white'>CareerUp</span>
        </div>
      </NavLink>

      {/* <div className='flex gap-2 md:gap-14 items-center'> */}
        {/* <form className='hidden md:flex items-center justify-center'>
          <input type="text" placeholder='Search....' 
          className='border border-r-0 w-[12rem] lg:w-[24rem] rounded-l-full py-2 px-2 md:px-4' />

          <button type='submit' className='bg-[#0444a4] text-white px-4 py-2 rounded-r-full'>
            Search
          </button>
        </form> */}
      {/* </div> */}

      {/* Icons */}
      <div className='flex gap-3 md:gap-14 items-center text-ascent-1 text-md md:text-xl cursor-pointer'>
            <NavLink to='/feed' className={`hover:scale-125 ${window.location.pathname === '/feed' ? 'bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] rounded-full p-3' : ''}`}>
              <ImHome />
            </NavLink>

            <NavLink to={`/explore`} className={`hover:scale-125 ${window.location.pathname === '/explore' ? 'bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] rounded-full p-3' : ''}`}>
              <GiWireframeGlobe />
            </NavLink>
          
            <NavLink to='/jobs' className={`hover:scale-125 ${window.location.pathname === '/jobs' ? 'bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] rounded-full p-3' : ''}`}>
              <BsBriefcaseFill />
            </NavLink>

            {user?.role === 'Candidate' && (
              <NavLink to='/message' className={`hover:scale-125 ${window.location.pathname === '/message' ? 'bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] rounded-full p-3' : ''}`} >
                <BsChatSquareTextFill/>
              </NavLink>
            )}

            {/* <div className="relative"> */}
              <NavLink to="/notifications" className={`hover:scale-125 ${window.location.pathname === '/notifications' ? 'bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] rounded-full p-3' : ''}`}>
                <IoMdNotificationsOutline  />
                {/* {notificationCount && notificationCount.notificationCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {notificationCount.notificationCount}
                  </span>
                )} */}
              </NavLink>
            {/* </div> */}
          
          <span onClick={() => setOpenDropProfile((prev) => !prev)}>
            {userData?.profileImage ? (
              <img src={userData?.profileImage} alt='' className={`w-6 h-6 md:w-8 md:h-8 rounded-full object-cover hover:scale-125 `} />
            ) : (
              <img src={`https://cdn-icons-png.flaticon.com/512/3177/3177440.png`} alt="" className='w-6 h-6 md:w-8 md:h-8 rounded-full object-cover hover:scale-125' />
            )}
          </span>

            {
              openDropProfile && (
              <Suspense fallback={<div><Spinner/></div>}>
                <LazyProfileDropDown userData={userData} />
              </Suspense>
              )
            }

          <div>
            <button onClick={() => handleLogout()} className='inline-flex items-center rounded-full bg-[#065ad8] text-white text-sm px-4 py-1 md:px-6 md:py-2 hover:scale-105'>Log Out</button>
          </div>
      </div>
    </div>
  )
}

export default UserNav