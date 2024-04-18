import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import OAuth from "./../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        setFormData({
          email: "",
          password: "",
          username: "",
        });
        setError(null);
        navigate("/");
        //Add Modal Success Registration
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className='container mx-auto p-3'>
        <div className=' max-w-lg mx-auto p-3'>
          <h1 className='text-3xl text-center font-medium my-7'>Create your account</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mb-5'>
            <input
              name='username'
              type='text'
              value={formData.username}
              onChange={handleChange}
              placeholder='User name'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <input
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
            />
            <button
              disabled={loading || Object.values(formData).some((value) => !value)}
              className='text-white bg-dark-2 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:text-white'
            >
              {loading ? <Loader /> : "Sign up"}
            </button>
            <OAuth />
          </form>
          <div className='flex font-medium sm:text-lg gap-2'>
            <p className='text-black font-normal'>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className='text-dark-1 font-semibold hover:text-gold-2 hover:underline hover:underline-custom'>
                Sign in
              </span>
            </Link>
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
