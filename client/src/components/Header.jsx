import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BurgerMenu from "./BurgerMenu";

import logoLight from "../assets/images/logo-light.png";
// import logoDark from '../assets/images/logo-dark.png';
import {
  FaSearch,
  FaBars,
  // FaMoon
} from "react-icons/fa";
// import { IoSunny } from "react-icons/io5";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showBurger, setShowBurger] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleShowBurger = () => {
    setShowBurger(true);
  };

  const handleCloseBurger = () => {
    setShowBurger(false);
  };

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm", searchTerm);
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search, searchTerm]);

  return (
    <header className=' flex bg-light-1 shadow-md'>
      <div className='container flex items-center justify-between mx-auto p-3'>
        <div className='flex'>
          <Link to='/' className='w-[100px] sm:w-[150px]'>
            <img src={logoLight} alt='Logo' width={150} />
          </Link>
        </div>
        {location.pathname === "/search" ? (
          ""
        ) : (
          <form
            onSubmit={handleSubmit}
            className='flex h-[52px]  items-center w-[150px] sm:w-[200px] md:w-[300px] bg-white border border-gold-1 rounded-lg p-3 text-dark-1 '
          >
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleChangeSearch}
              className=' bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)]'
            />
            <button>
              <FaSearch className='text-[rgba(71,58,63,0.7)] sm:text-xl cursor-pointer hover:text-gold-2' />
            </button>
          </form>
        )}

        <nav className='hidden sm:flex items-center justify-center gap-5 pr-3'>
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
                  src={currentUser.avatar}
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
        </nav>
        {/* <button className='flex w-[70px] items-center gap-1 p-1 border rounded-full bg-red-200 dark:bg-blue-300'>
          <div className='flex items-center justify-center p-1 border rounded-full'>
            <IoSunny className='text-[rgba(71,58,63,0.7)] cursor-pointer hover:text-gold-2 ' />
          </div>
          <div className='flex items-center justify-center p-1  border rounded-full'>
            <FaMoon className='text-[rgba(71,58,63,0.7)] cursor-pointer hover:text-gold-2' />
          </div>
        </button> */}
        <div className='flex sm:hidden items-center justify-center gap-5 pr-3'>
          <FaBars
            onClick={handleShowBurger}
            className='text-[rgba(71,58,63,0.7)] cursor-pointer hover:text-gold-2'
          />
        </div>
      </div>
      <BurgerMenu onClose={handleCloseBurger} isOpen={showBurger} />
    </header>
  );
};

export default Header;
