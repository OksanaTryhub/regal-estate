import { Link, useLocation } from "react-router-dom";

import logoLight from "../assets/images/logo-light.png";
// import logoDark from '../assets/images/logo-dark.png';
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <header className=' flex bg-light-1 shadow-md'>
      <div className='container flex items-center justify-between mx-auto p-3'>
        <div className='flex'>
          <Link to='/' className='w-[100px] sm:w-[150px]'>
            <img src={logoLight} alt='Logo' width={150} />
          </Link>
        </div>
        <form className='flex h-[52px]  items-center w-[150px] sm:w-[200px] md:w-[300px] bg-white border border-gold-1 rounded-lg p-3 text-dark-1 '>
          <input
            type='text'
            placeholder='Search...'
            className=' bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)]'
          />
          <FaSearch className='text-[rgba(71,58,63,0.7)] sm:text-xl cursor-pointer hover:text-gold-2' />
        </form>
        <nav className='flex items-center justify-center gap-5 pr-3'>
          <ul className='flex gap-5'>
            <li className='hidden sm:inline hover:underline hover:underline-custom '>
              <Link to='/'>Home</Link>
            </li>
            <li className='hidden sm:inline hover:underline hover:underline-custom'>
              <Link to='/about'>About</Link>
            </li>
            {currentUser && Object.keys(currentUser).length > 0 ? (
              <Link to='/profile'>
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.user.avatar}
                  alt='profile'
                />
              </Link>
            ) : (
              <li className='hidden sm:inline hover:underline hover:underline-custom'>
                {location.pathname === "/sign-in" ? (
                  <Link to='/sign-up'>Sign up</Link>
                ) : (
                  <Link to='/sign-in'>Sign in</Link>
                )}
              </li>
            )}
          </ul>
          <FaBars className='text-[rgba(71,58,63,0.7)] sm:hidden cursor-pointer hover:text-gold-2' />
        </nav>
      </div>
    </header>
  );
};

export default Header;
