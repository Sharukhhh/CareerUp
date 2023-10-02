import React , {useEffect , useState , lazy , Suspense} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
// import ThemeRootState from '../../../Redux/rootstate/themeRootstate';
// import {BsMoon , BsSunFill} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {ImHome} from 'react-icons/im';
// import {SetThemepayload , setTheme } from '../../../Redux/slices/theme';
import { logout } from '../../../Redux/slices/slice';
import toast from 'react-hot-toast';
const LazyProfileDropDown = lazy(() => import('../../../Pages/user/ProfileDropDown'));
import { Spinner } from '@material-tailwind/react';
import RootState from '../../../Redux/rootstate/rootState';
import { axiosInstance } from '../../../api/axiosInstance';

interface UserNavProps {
  handleUpdateUI : () => void
}


const UserNav:React.FC<UserNavProps> = ({handleUpdateUI}) => {
  // const {theme} = useSelector((state : ThemeRootState) => state.theme);
  const user = useSelector((state : RootState) => state.user.userCred);

  const [userData , setUserData] = useState<any>([]);

  const [openDropProfile , setOpenDropProfile] = useState<boolean>(false);
  const [searchQuery , setSearchQuery] = useState<string>('');


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

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      axiosInstance.get('/search', {params : {query : searchQuery}})
      .then((res) => {
        if(res.data.message){
          console.log(res.data.posts);

          handleUpdateUI();
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((error) => console.log(error , 'search error')
      )
    }, 300)

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

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

      <form className='hidden md:flex items-center justify-center'>
        <input type="text" placeholder='Search....' value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='border border-r-0 w-[12rem] lg:w-[24rem] rounded-l-full py-2 px-2 md:px-4' />

        <button type='submit' className='bg-[#0444a4] text-white px-4 py-2 rounded-r-full'>
          Search
        </button>
      </form>

      {/* Icons */}
      <div className='flex gap-3 md:gap-14 items-center text-ascent-1 text-md md:text-xl'>
            <NavLink to='/feed'>
                <ImHome className='hover:scale-125 dark:text-white' />
            </NavLink>
          
          {/* <button onClick={() => handleTheme()} >
            {theme === 'light' ? <BsMoon className='hover:scale-125'/> : <BsSunFill className='hover:scale-125' /> }
          </button> */}
            <IoMdNotificationsOutline className='hover:scale-125 dark:text-white' />

          <span onClick={() => setOpenDropProfile((prev) => !prev)}>
          {/* <CgProfile className='hover:scale-125' /> */}
          <img src={userData ? userData.profileImage : null} alt='' className='w-6 h-6 md:w-8 md:h-8 rounded-full object-cover hover:scale-125' />
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