import React , {useEffect} from 'react';
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


const UserNav = () => {
  const {theme} = useSelector((state : ThemeRootState) => state.theme);


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
              <ImHome />
            </NavLink>
          

            <NavLink to='/profile'>
              <CgProfile />
            </NavLink>
           
          <button onClick={() => handleTheme()} >
            {theme === 'light' ? <BsMoon/> : <BsSunFill /> }
          </button>
            <IoMdNotificationsOutline />

          <div>
            <button onClick={() => handleLogout()} className='inline-flex items-center rounded-full bg-[#065ad8] text-white text-sm px-4 md:px-6 py-1 md:py-2'>Log Out</button>
          </div>
      </div>
    </div>
  )
}

export default UserNav