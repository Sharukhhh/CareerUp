import React , {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ThemeRootState from '../../../Redux/rootstate/themeRootstate';
import RootState from '../../../Redux/rootstate/rootState';
import {BsMoon , BsSunFill} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {SetThemepayload , setTheme } from '../../../Redux/slices/theme';
import { logout } from '../../../Redux/slices/slice';
import toast from 'react-hot-toast';


const UserNav = () => {
  const {theme} = useSelector((state : ThemeRootState) => state.theme);

  const user = useSelector((state : RootState) => state.user.userCred);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.body.classList.add('dark');
  //   } else {
  //     document.body.classList.remove('dark');
  //   }
  // }, [theme]);

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
    <div className='w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary dark:bg-black'>
      <Link to='/feed' className='flex gap-2 items-center'>
        <div className='p-1 md:p-2 text-[#065ad8] rounded font-extrabold  text-xl'>
          <span>CareerUp</span>
        </div>
      </Link>

      {/* Icons */}
      <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
          <button onClick={() => handleTheme()} >
            {theme === 'light' ? <BsMoon/> : <BsSunFill /> }
          </button>
          <div className='hidden lg:flex'>
            <IoMdNotificationsOutline />
          </div>

          <div>
            <button onClick={() => handleLogout()} className='inline-flex items-center rounded-full bg-[#065ad8] text-white text-sm px-4 md:px-6 py-1 md:py-2'>Log Out</button>
          </div>
      </div>
    </div>
  )
}

export default UserNav