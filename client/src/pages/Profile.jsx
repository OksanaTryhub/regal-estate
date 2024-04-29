import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { LuRefreshCw } from "react-icons/lu";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice";
import Loader from "../components/Loader";
import Listings from "../components/Listings";
// import HttpError from "../../../api/helpers/HttpError";

const Profile = () => {
  const fileRef = useRef(null);

  const { currentUser, error, loading } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isListingsShown, setIsListingsShown] = useState(false);

  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadErr(true);
        console.log(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(data.message);
        return;
      }

      setUserListings(data);
      setIsListingsShown(true);
    } catch (error) {
      setShowListingsError(error.message);
    }
  };

  const handleListingDelete = async (listingId) => {
    console.log("Delete listing with ID:", listingId);

    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = res.json();

      if (data.success === false) {
        // HttpError(data.status, data.message);
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      // HttpError(error);
      console.log(error.message);
    }
  };

  return (
    <section>
      <div className='container mx-auto p-3'>
        <div className=' max-w-lg mx-auto p-3'>
          <h1 className='text-3xl text-center font-medium my-7'>Profile</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mb-5'>
            <input
              type='file'
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              accept='image/*'
            />
            <img
              src={formData.avatar || currentUser.avatar}
              alt='avatar'
              className='rounded-full border shadow-md h-24 w-24 object-cover self-center my-2 cursor-pointer'
              onClick={() => fileRef.current.click()}
            />
            <p className='text-sm self-center'>
              {fileUploadErr ? (
                <span className='text-red-500'>Error Image upload</span>
              ) : filePercentage > 0 && filePercentage < 100 ? (
                <span className='text-slate-700'> {`Uploading ${filePercentage}%`}</span>
              ) : filePercentage === 100 ? (
                <span className='text-green-700'>Image successfully uploaded!</span>
              ) : (
                ""
              )}
            </p>
            <input
              name='username'
              type='text'
              defaultValue={currentUser.username}
              onChange={handleChange}
              placeholder='User name'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <input
              name='email'
              type='email'
              defaultValue={currentUser.email}
              onChange={handleChange}
              placeholder='Email'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <input
              name='password'
              type='password'
              onChange={handleChange}
              placeholder='Password'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <button
              disabled={loading}
              className='text-white bg-dark-2 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:text-white'
            >
              {loading ? <Loader /> : "Update"}
            </button>
            <button
              type='button'
              className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
            >
              <Link to={"/create-listing"}>Create listing</Link>
            </button>
          </form>
          <p className='text-red-700 font-semibold'>{error ? error : ""}</p>
          <p className='text-green-700 font-semibold'>
            {updateSuccess ? "User is updated successfully!" : ""}
          </p>
          <div className='flex justify-between text-red-500'>
            <button onClick={handleDeleteUser} className='cursor-pointer'>
              Delete account
            </button>
            <button onClick={handleSignOut} className='cursor-pointer'>
              Sign out
            </button>
          </div>
          {isListingsShown ? (
            <div className='flex my-4 px-4'>
              <div className='flex flex-1 items-center justify-center'>
                <p className='font-medium text-xl '>My listings</p>
              </div>
              <button onClick={handleShowListings}>
                <LuRefreshCw className='text-[rgba(71,58,63,0.7)]  hover:text-gold-2 hover:rotate-180 transition-transform duration-300 ease-in-out' />
              </button>
            </div>
          ) : (
            <button onClick={handleShowListings} className='flex font-medium text-xl my-4 mx-auto'>
              Show listing
            </button>
          )}

          {showListingsError && <p className='text-red-500'>{showListingsError}</p>}
          {userListings && userListings.length > 0 && (
            <Listings items={userListings} handleItemDelete={handleListingDelete} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
