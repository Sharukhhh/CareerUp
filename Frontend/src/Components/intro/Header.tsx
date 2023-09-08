import { useState, useEffect } from 'react';
import { Navbar, Typography, Button, IconButton, Collapse } from '@material-tailwind/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    });
  }, []);

  return (
    <>
      <Navbar className="bg-violet-100 mx-auto max-w-screen-xl ring-4 p-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            className="mr-4 text-violet-950 font-extrabold text-3xl cursor-pointer py-1.5 lg:ml-2"
          >
            CareerUp
          </Typography>
          <div className={`hidden gap-2 lg:flex ${menuOpen ? 'hidden' : 'block'}`}>
            <NavLink to="/login">
              <Button
                variant="text"
                className="bg-violet-950 p-2 text-violet-50 rounded-md me-5 hover:bg-violet-800"
                size="sm"
                color="blue-gray"
              >
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button
                variant="gradient"
                className="bg-violet-950 p-2 text-violet-50 rounded-md me-5 hover:bg-violet-800"
                size="sm"
              >
                Create New
              </Button>
            </NavLink>
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={menuOpen}>
          <div className={`flex w-full flex-nowrap items-center gap-2 lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
            <NavLink to="/login">
              <Button
                variant="text"
                className="bg-violet-950 p-2 text-violet-50 rounded-md me-5 hover:bg-violet-800"
                size="sm"
                color="blue-gray"
              >
                Sign In
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button
                variant="gradient"
                className="bg-violet-950 p-2 text-violet-50 rounded-md me-5 hover:bg-violet-800"
                size="sm"
              >
                Create New
              </Button>
            </NavLink>
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
