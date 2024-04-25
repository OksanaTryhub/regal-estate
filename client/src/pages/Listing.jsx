import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import Loader from "../components/Loader";
import LoaderDots from "../components/LoaderDots";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  console.log("🚀 ~ Listing ~ listing:", listing);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;

      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/${listingId}`);

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

  return (
    <main>
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
      </div>
    </main>
  );
};

export default Listing;
