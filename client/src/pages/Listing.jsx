import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";

import { FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

import Loader from "../components/Loader";
import LoaderDots from "../components/LoaderDots";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;

      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listings/${listingId}`);

        const data = await res.json();
        if (data.success === false) {
          setListing(null);
          setError(true);
          setLoading(false);
          console.log(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setListing(null);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  const handleShareBtnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2500);
  };

  function generateGoogleMapsUrl(listing) {
    if (!listing || !listing.address) {
      return;
    }

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      listing.address
    )}`;
    return googleMapsUrl;
  }

  const handleContactToggle = () => {
    if (showContacts) {
      setShowContacts(false);
    } else setShowContacts(true);
  };

  const handleSendMessage = () => {
    handleContactToggle();
  };

  return (
    <section>
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{ background: `url(${url}) center no-repeat`, backgroundSize: "cover" }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      <div className='container mx-auto p-3'>
        <div className='group fixed top-[100px] right-[30px] sm:top-[150px] sm:right-[50px] z-40 flex flex-col gap-2 '>
          <button
            type='button'
            title='Copy link'
            onClick={handleShareBtnClick}
            className='ml-auto p-4 bg-white text-dark-2 border border-gold-1 rounded-full shadow group-hover:bg-gold-1 group-hover:text-white transition duration-500'
            // className='fixed top-[100px] right-[30px] sm:top-[150px] sm:right-[50px] z-40 p-4 bg-white  text-dark-2  border border-gold-1 rounded-full shadow-md hover:bg-gold-1 hover:text-white transition ease-in-out duration-500'
          >
            <FiShare2 className='w-5 h-5' />
          </button>
          {/* <span className='tooltip-text bg-white text-dark-2 border border-gold-1 text-xs rounded py-2 px-4 opacity-0 group-hover:opacity-100 delay-300 transition-opacity duration-500'>
            Copy link
          </span> */}
          {isLinkCopied && (
            <p className=' bg-white text-dark-2 border border-gold-1 text-xs rounded py-2 px-4 '>
              Link copied
            </p>
          )}
        </div>
        <div className='max-w-4xl mx-auto p-3'>
          {loading && !error && (
            <div className='flex w-full justify-center items-center mt-[200px]'>
              <Loader size={40} />
            </div>
          )}
          {error && !loading && (
            <div className='flex justify-center mt-20 gap-4'>
              <p>Something went wrong! Try again </p>
              <LoaderDots />
            </div>
          )}

          {listing && (
            <>
              <h1 className='text-2xl font-semibold my-7'>
                {listing.name} - $
                {listing.offer
                  ? ` ${listing.discountPrice.toLocaleString("en-US")}`
                  : ` ${listing.regularPrice.toLocaleString("en-US")}`}
                {listing.type === "rent" && " / month"}
              </h1>

              <div className='flex flex-col gap-4 mb-7'>
                <a
                  href={generateGoogleMapsUrl(listing)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 hover:underline hover:underline-custom'
                >
                  <FaMapMarkerAlt className='w-5 h-5 text-gold-1' />
                  <p>{listing.address}</p>
                </a>
                {/* <div className='flex items-center gap-2'>
                  <FaMapMarkerAlt className='w-5 h-5 text-gold-1' />
                  <p>{listing.address}</p>
                </div> */}
                <div className='flex flex-wrap gap-4'>
                  <p className='p-4 w-[200px] rounded-lg bg-dark-2 text-white text-center self-center'>
                    {listing.type === "rent" ? "For Rent" : "For Sale"}
                  </p>
                  {listing.offer && (
                    <p className='p-4 rounded-lg bg-gold-1  text-dark-2 text-center self-center'>
                      $ {(+listing.regularPrice - +listing.discountPrice).toLocaleString("en-US")}{" "}
                      discount
                    </p>
                  )}
                </div>
                <p>
                  <span className='font-semibold'> Description</span>: {listing.description}
                </p>
                <ul className='flex flex-wrap gap-6 font-semibold'>
                  <li className='flex gap-2 items-center'>
                    <FaBed className='text-dark-2 w-5 h-5' />
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                  </li>
                  <li className='flex gap-2 items-center'>
                    <FaBath className='text-dark-2 w-5 h-5' />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} baths`
                      : `${listing.bathrooms} bath`}
                  </li>
                  <li className='flex gap-2 items-center'>
                    <FaParking className='text-dark-2 w-5 h-5' />
                    {listing.parking ? "Parking spot" : "No parking"}
                  </li>
                  <li className='flex gap-2 items-center'>
                    <FaChair className='text-dark-2 w-5 h-5' />
                    {listing.furnished ? "Furnished" : "Not furnished"}
                  </li>
                </ul>
              </div>

              {currentUser &&
                listing.userRef !== currentUser._id &&
                (!showContacts ? (
                  <button
                    type='button'
                    onClick={handleContactToggle}
                    className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg w-full hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
                  >
                    Contact landlord
                  </button>
                ) : (
                  <Contact onClick={handleSendMessage} listing={listing} />
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Listing;
