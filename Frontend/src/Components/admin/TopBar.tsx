import {useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { adminSignOut } from '../../Redux/slices/adminSlice';

const TopBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleLogout = () => {
        dispatch(adminSignOut());
        navigate('/admin');

        toast.success('Logout successfully', {duration : 4000 , style : {color : '#fff' , background : 'black'}});
    }
  return (
    <>
                <div>
            <nav className="border-gray-200 bg-cyan-400 ring-4">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <a href="#" className="flex items-center">
                        <span className="self-center text-2xl lg:mb-1 lg:text-3xl font-extrabold lg:font-bold whitespace-nowrap dark:text-white">ADMIN</span>
                    </a>

                    <button
                        data-collapse-toggle="navbar-solid-bg"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
                        aria-controls="navbar-solid-bg"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>

                    <div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-solid-bg">
                        <ul className="flex flex-col mt-4 cursor-pointer rounded-lg text-lg font-semibold bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent">
                            <li>
                                <NavLink to= '/admin/dashboard'>
                                    <p
                                        className="block py-2 pl-3 pr-4 lg:text-lg  bg rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        AdminDashboard
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                            <NavLink to= '/admin/users'>
                                    <p
                                        className="block py-2 pl-3 pr-4 lg:text-lg  rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        Users
                                    </p>
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to= '/admin/categories'>
                                    <p
                                        className="block py-2 pl-3 pr-4 lg:text-lg  rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        Job Category
                                    </p>
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to= '/admin/companies'>
                                    <p
                                        className="block py-2 pl-3 pr-4 lg:text-lg rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        Companies
                                    </p>
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to= '/admin/posts'>
                                    <p
                                        className="block py-2 pl-3 pr-4 lg:text-lg rounded lg:bg-transparent lg:p-0 "
                                        aria-current="page">
                                        Posts
                                    </p>
                            </NavLink>
                            </li>
                            <li>
                                <p
                                    className="block py-2 pl-3 pr-4 lg:text-lg text-gray-900 rounded lg:border-0  lg:p-0"
                                    onClick={handleLogout}>
                                    Logout
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default TopBar