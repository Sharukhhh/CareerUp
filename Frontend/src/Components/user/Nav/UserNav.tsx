import React , {useEffect , useState , lazy , Suspense} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import ThemeRootState from '../../../Redux/rootstate/themeRootstate';
// import {BsMoon , BsSunFill} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BsBriefcaseFill} from 'react-icons/bs';
import {GiWireframeGlobe} from 'react-icons/gi';
import {ImHome} from 'react-icons/im';
// import {SetThemepayload , setTheme } from '../../../Redux/slices/theme';
import { logout } from '../../../Redux/slices/slice';
import toast from 'react-hot-toast';
const LazyProfileDropDown = lazy(() => import('../../../Pages/user/ProfileDropDown'));
import { Spinner } from '@material-tailwind/react';
import RootState from '../../../Redux/rootstate/rootState';
import { axiosInstance } from '../../../api/axiosInstance';
import notificationRootState from '../../../Redux/rootstate/NotifyRootState';

interface UserNavProps {

}


const UserNav:React.FC<UserNavProps> = () => {
  // const {theme} = useSelector((state : ThemeRootState) => state.theme);
  const user = useSelector((state : RootState) => state.user.userCred);

  const notifcation = useSelector((state : notificationRootState) => state.notification.notificationCount);



  const [userData , setUserData] = useState<any>([]);

  const [openDropProfile , setOpenDropProfile] = useState<boolean>(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/profile/${user?.userId}`).then((res) => {
      
      if(res.data){
        setUserData(res.data.user);
      }
    }).catch((error) => console.log(error , 'axios')
    )
  })

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(token){
      console.log('token here' ,token);
    } else {
      navigate('/login');
    }
  }, []);

  // const handleTheme = () => {
  //   const themeValue = theme === 'light' ? 'dark' : 'light';
  //   dispatch(setTheme({ theme: themeValue } as SetThemepayload));
  // };     


  const handleLogout = () => {
    dispatch(logout());

    navigate('/login');

    toast.success('Logout Successfully');
  }

  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-between py-3 md:py-6 px-4 md:px-8 bg-primary ]'>
      <NavLink to='/feed' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 text-[#065ad8] rounded font-extrabold  text-xl'>
          <span className='dark:text-white'>CareerUp</span>
        </div>
      </NavLink>

      {/* <div className='flex gap-2 md:gap-14 items-center'> */}
        <form className='hidden md:flex items-center justify-center'>
          <input type="text" placeholder='Search....' 
          className='border border-r-0 w-[12rem] lg:w-[24rem] rounded-l-full py-2 px-2 md:px-4' />

          <button type='submit' className='bg-[#0444a4] text-white px-4 py-2 rounded-r-full'>
            Search
          </button>
        </form>
      {/* </div> */}

      {/* Icons */}
      <div className='flex gap-3 md:gap-14 items-center text-ascent-1 text-md md:text-xl cursor-pointer'>
            <NavLink to='/feed'>
              <ImHome className='hover:scale-125'/>
            </NavLink>

            <NavLink to={`/explore`}>
              <GiWireframeGlobe className='hover:scale-125'/>
            </NavLink>
          
            <NavLink to='/jobs'>
              <BsBriefcaseFill className='hover:scale-125'/>
            </NavLink>

            <NavLink to='/notifications'>
                <IoMdNotificationsOutline className='hover:scale-125'/>
                {notifcation  && notifcation.notificationCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                    {notifcation.notificationCount}
                  </span>
                )}
            </NavLink>

          
          <span onClick={() => setOpenDropProfile((prev) => !prev)}>
            {userData?.profileImage ? (
              <img src={userData?.profileImage} alt='' className='w-6 h-6 md:w-8 md:h-8 rounded-full object-cover hover:scale-125' />
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