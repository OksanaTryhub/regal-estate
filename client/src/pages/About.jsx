import { useEffect, useState } from "react";
import { MdRealEstateAgent } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import Loader from "../components/Loader";
import LoaderDots from "../components/LoaderDots";
import logoLight from "../assets/images/logo-light.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css/bundle";

const About = () => {
  const [listings, setListings] = useState([]);

  const [usersQuantity, setUsersQuantity] = useState("0");
  const [offersQuantity, setOffersQuantity] = useState("0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch("/api/listings");
        const data = await res.json();

        if (data && data.length > 0) {
          setListings(data);
          fetchAllUsers();
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data && data.length > 0) {
          setUsersQuantity(data.length);
          fetchAllOffers();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllOffers = async () => {
      try {
        const res = await fetch("/api/listings?offer=true");
        const data = await res.json();
        if (data && data.length > 0) {
          setOffersQuantity(data.length);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllListings();
  }, []);
  return (
    <section>
      <div className='container mx-auto p-3'>
        {loading && !error && (
          <div className='flex w-full justify-center items-center mt-[200px]'>
            <Loader size={40} />
          </div>
        )}
        {error && !loading && (
          <div className='flex justify-center mt-20 gap-4'>
            <p>Oops... Something went wrong! Try again </p>
            <LoaderDots />
          </div>
        )}
        <div className='mx-auto p-3'>
          <h1 className='text-3xl text-center font-medium my-7'>About us</h1>
          <div className='flex flex-col sm:flex-row py-7 gap-4'>
            <div className='flex flex-col gap-4'>
              <p>
                <span className='font-semibold'>REGAL ESTATE</span> - marketplace for buying and
                renting housing
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae aliquid amet
                adipisci, quibusdam vel minus itaque vero deserunt suscipit nesciunt debitis
                explicabo unde ea eos eius cum temporibus doloremque fuga.
              </p>
            </div>
            <img src={logoLight} alt='logo' className='w-max h-max self-center' />
          </div>
        </div>
        <div className='relative '>
          <div>
            {listings && listings.length > 0 && (
              <Swiper
                loop
                lazy='true'
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {listings.map((listing) => (
                  <SwiperSlide key={listing._id}>
                    <div
                      className='h-[300px] opacity-45'
                      style={{
                        background: `url(${listing.imageUrls[0]}) center no-repeat`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className='absolute top-0 right-[300px] w-[150px] h-full bg-gradient-to-r from-transparent to-[rgba(234,189,77,0.8)] z-50'></div>
          <div className='absolute top-0 right-0 w-[300px] h-full z-50 bg-[rgba(234,189,77,0.8)] py-7 pr-7 flex flex-col gap-4'>
            <h2 className='text-xl text-center font-semibold '>
              Your dream home is easy to find on our marketplace!
            </h2>
            <p>
              If the dream is difficult to describe in words, use the filters on REGAL ESTATE. The
              website takes into account all wishes and gives exactly what is needed from all
              options.
            </p>
          </div>
        </div>
        <div className='flex items-center py-7'>
          <div className='flex flex-col items-center gap-2 grow'>
            <MdRealEstateAgent className='w-20 h-20 text-gold-1' />
            <p className='font-bold text-4xl'>
              {listings && listings.length > 0 ? listings.length : 0}
            </p>
            <p className='font-medium text-xl'>real estate objects</p>
          </div>
          <div className='flex flex-col items-center gap-2 grow'>
            <BiSolidOffer className='w-20 h-20 text-gold-1 ' />
            <p className='font-bold text-4xl'> {offersQuantity} </p>
            <p className='font-medium text-xl'>offers with a discount</p>
          </div>
          <div className='flex flex-col items-center gap-2 grow'>
            <FaUserCheck className='w-20 h-20 text-gold-1 ' />
            <p className='font-bold text-4xl'> {usersQuantity} </p>
            <p className='font-medium text-xl'>verified sellers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
