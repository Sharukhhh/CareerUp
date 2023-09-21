import React , {useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeRootState from '../../../Redux/rootstate/themeRootstate';
import {BsMoon , BsSunFill} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {ImHome} from 'react-icons/im';
import {CgProfile} from 'react-icons/cg';
import {SetThemepayload , setTheme } from '../../../Redux/slices/theme';
import { logout } from '../../../Redux/slices/slice';
import toast from 'react-hot-toast';
import ProfileDropDown from '../../../Pages/user/ProfileDropDown';

interface UserNavProps {
  userData : any;
}


const UserNav:React.FC<UserNavProps> = ({userData}) => {
  const {theme} = useSelector((state : ThemeRootState) => state.theme);

  const [openDropProfile , setOpenDropProfile] = useState<boolean>(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.body.classList.add('dark');    dark:bg-[#0C0C0C]
  //   } else {
  //     document.body.classList.remove('dark');
  //   }
  // }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(token){
      console.log('token here');
    } else {
      navigate('/login');
    }
  }, []);

  const handleTheme = () => {
    const themeValue = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme({ theme: themeValue } as SetThemepayload));
  };     

  const handleLogout = () => {
    dispatch(logout());

    navigate('/login');

    toast.success('Logout Successfully');
  }
     
  return (
    <div className='w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
      <NavLink to='/feed' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 text-[#065ad8] rounded font-extrabold  text-xl'>
          <span>CareerUp</span>
        </div>
      </NavLink>

      {/* Icons */}
      <div className='flex gap-10 items-center text-ascent-1 text-md md:text-xl'>
            <NavLink to='/feed'>
                <ImHome className='hover:scale-125' />
            </NavLink>
          
          <button onClick={() => handleTheme()} >
            {theme === 'light' ? <BsMoon className='hover:scale-125'/> : <BsSunFill className='hover:scale-125' /> }
          </button>
            <IoMdNotificationsOutline className='hover:scale-125' />

          <span onClick={() => setOpenDropProfile((prev) => !prev)}>
          <CgProfile className='hover:scale-125' />
          </span>
            {
              openDropProfile && <ProfileDropDown userData={userData} />
            }

          <div>
            <button onClick={() => handleLogout()} className='inline-flex items-center rounded-full bg-[#065ad8] text-white text-sm px-4 md:px-6 py-1 md:py-2 hover:scale-105'>Log Out</button>
          </div>
      </div>
    </div>
  )
}

export default UserNav