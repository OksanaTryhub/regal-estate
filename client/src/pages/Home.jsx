import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import ListingCard from "../components/ListingCard";

import "swiper/css/bundle";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listings?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listings?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listings?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <section>
      <div className="flex flex-col max-w-[1392px] mx-auto py-28 px-3 sm:px-8 md:px-[80px] gap-5">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold lg:leading-relaxed">
          Find your <span className="text-gold-1">perfect</span> place <br />
          with ease
        </h1>
        <div className="text-xs sm:text-sm lg:text-base">
          <p>
            Welcome to the <span className="font-semibold">Regal Estate</span>{" "}
            platform!
          </p>
          <p>
            We make finding your ideal home easy by offering the best rental and
            purchase options.
          </p>
        </div>
        <Link
          to={"/search"}
          className="font-semibold text-dark-2 hover:text-gold-1 underline underline-custom hover:no-underline"
        >
          Start your journey to a new home today!
        </Link>
      </div>

      {offerListings && offerListings.length > 0 && (
        <Swiper
          navigation
          loop
          lazy="true"
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={{
            "--swiper-navigation-color": "#EABD4D ",
            "--swiper-pagination-color": "#EABD4D",
          }}
        >
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex flex-col max-w-[1300px] mx-auto py-3 px-3 gap-10 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex flex-col sm:items-center mb-4">
              <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                Recent offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-xs sm:text-sm mb-3  text-dark-2 hover:text-gold-1 underline underline-custom hover:no-underline"
              >
                Show more offers
              </Link>
            </div>
            <ul className="grid grid-cols-custom gap-7">
              {offerListings.map((item) => (
                <ListingCard key={item._id} listing={item} />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex flex-col sm:items-center mb-4">
              <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-xs sm:text-sm mb-3  text-dark-2 hover:text-gold-1 underline underline-custom hover:no-underline"
              >
                Show more places for rent
              </Link>
            </div>
            <ul className="grid grid-cols-custom gap-7">
              {rentListings.map((item) => (
                <ListingCard key={item._id} listing={item} />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex flex-col sm:items-center mb-4">
              <h2 className="font-bold text-xl md:text-2xl lg:text-3xl">
                Recent places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-xs sm:text-sm mb-3  text-dark-2 hover:text-gold-1 underline underline-custom hover:no-underline"
              >
                Show more places for sale
              </Link>
            </div>
            <ul className="grid grid-cols-custom gap-7">
              {saleListings.map((item) => (
                <ListingCard key={item._id} listing={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
