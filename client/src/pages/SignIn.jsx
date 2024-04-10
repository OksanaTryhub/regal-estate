import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section>
      <div className='container'></div>
      <div className=' max-w-lg mx-auto p-3'>
        <h1 className='text-3xl text-center font-medium my-7'>Sign In</h1>
        <form className='flex flex-col gap-4 mb-5'>
          <input
            id='email'
            type='text'
            placeholder='Email'
            className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
          />
          <input
            id='password'
            type='text'
            placeholder='Password'
            className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
          />
          <button className='text-white bg-dark-2 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'>
            Sign in
          </button>
          <button className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'>
            Continue with Google
          </button>
        </form>
        <div className='flex font-medium sm:text-lg gap-2'>
          <p className='text-black font-normal'>No account?</p>
          <Link to={"/sign-up"}>
            <span className='text-dark-1 font-semibold hover:text-gold-2 hover:underline hover:underline-custom'>
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
