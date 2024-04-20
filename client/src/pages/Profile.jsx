import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";

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

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
              // onClick={handleClick}
              className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
            >
              Create listing
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

          <div className='flex mt-4'>
            <span className='mx-auto cursor-pointer'>Show listing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
