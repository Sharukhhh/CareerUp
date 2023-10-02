import { useState, useEffect } from 'react';
import { Navbar, Typography, Button, IconButton , Collapse } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <>
    <Navbar className="bg-blue-gray-200 ring-4 mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          className="mr-4 text-violet-900 cursor-pointer py-1.5 font-bold text-3xl"
        >
          CareerUp
        </Typography>
        {/* <div className="hidden lg:block">{navList}</div> */} 
        <div className="hidden gap-2 lg:flex">
        <NavLink to='/login'>
          <Button  size="sm" className="hidden me-8 rounded-md lg:inline-block bg-black hover:bg-gray-800">
            <span>Sign in</span>
          </Button>
        </NavLink>  
        <NavLink to='/register'>
          <Button  size="sm" className="hidden me-5 rounded-md lg:inline-block bg-black hover:bg-gray-800">
            <span>Create New</span>
          </Button>
        </NavLink>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg

              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg

              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <NavLink to='/login'>
            <Button variant="gradient" size="sm" fullWidth className="my-8 bg-bgColor">
              <span>Sign in</span>
            </Button>
          </NavLink> 
          <NavLink to='/register'>
            <Button variant="gradient" size="sm" fullWidth className="mb-3">
              <span>Create New</span>
            </Button>
          </NavLink> 
        </div>
      </Collapse>
    </Navbar>
    </>
  )
};

export default Header;
