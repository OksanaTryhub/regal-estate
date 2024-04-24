import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";

const BurgerMenu = ({ onClose, isOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed top-0 right-0 w-screen h-screen z-50 ${
        isOpen ? "" : "hidden"
      } bg-[rgba(71,58,63,0.5)]`}
    >
      <div className='flex flex-col p-4 fixed top-0 right-0 bg-white opacity-100 w-[200px] h-screen'>
        <nav className='flex flex-col flex-1 w-full items-center gap-5 pr-3'>
          <ul className='flex flex-col gap-5 text-center'>
            {currentUser && Object.keys(currentUser).length > 0 ? (
              <li>
                <Link to='/profile' onClick={onClose}>
                  <img
                    className='rounded-full h-14 w-14 object-cover mt-5 mb-10'
                    src={currentUser.avatar}
                    alt='profile'
                  />
                </Link>
              </li>
            ) : (
              <li className=' underline underline-custom hover:text-gold-2 mt-5 mb-10'>
                {location.pathname === "/sign-in" ? (
                  <Link to='/sign-up' onClick={onClose}>
                    Sign up
                  </Link>
                ) : (
                  <Link to='/sign-in' onClick={onClose}>
                    Sign in
                  </Link>
                )}
              </li>
            )}

            <li className=' hover:underline hover:underline-custom '>
              <Link to='/' onClick={onClose}>
                Home
              </Link>
            </li>
            <li className=' hover:underline hover:underline-custom'>
              <Link to='/about' onClick={onClose}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <CiLogout
          onClick={onClose}
          className='text-[rgba(71,58,63,0.7)] w-6 h-6 cursor-pointer hover:text-gold-2 stroke-1'
        />
      </div>
    </div>
  );
};

BurgerMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default BurgerMenu;
