import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoLight from "../assets/images/logo-light.png";

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className='flex flex-col gap-4 w-full sm:w-[330px] bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden '
    >
      <div className='relative overflow-hidden'>
        <img
          src={
            listing.imageUrls && listing.imageUrls[0].startsWith("https://firebasestorage")
              ? listing.imageUrls[0]
              : logoLight
          }
          alt='Listing cover'
          className='h-[320px] sm:h-[220px] object-cover w-full hover:scale-110 transition-scale duration-500 ease-in-out'
        />
        <div className='absolute  bottom-0 left-0 w-full bg-[rgba(107,60,78,0.5)] text-right p-3'>
          <p className='font-semibold text-gold-1'>
            {listing.discountPrice && listing.discountPrice > 0
              ? listing.discountPrice.toLocaleString("ru-RU")
              : listing.regularPrice.toLocaleString("ru-RU")}{" "}
            $ {listing.type === "rent" ? "/ month" : ""}
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-2 w-full p-3'>
        <h1 className='text-lg font-semibold truncate'>{listing.name}</h1>
        <div className='flex gap-2 h-[40px]'>
          <FaMapMarkerAlt className='w-4 h-4 text-gold-1' />
          <p className='text-xs line-clamp-2'>{listing.address}</p>
        </div>
        <div className=' h-[40px]'>
          <p className='text-xs line-clamp-2'>{listing.description}</p>
        </div>

        <div className='flex flex-col  mt-2 gap-2'>
          {/* <p className='font-semibold text-gold-1'>
            ${" "}
            {listing.discountPrice && listing.discountPrice > 0
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            {listing.type === "rent" ? "/ month" : ""}
          </p> */}
          <div className='flex text-xs font-semibold gap-4'>
            <p className='grow border-r-2 text-center'>
              {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
            </p>
            <p className='grow text-center'>
              {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    bathrooms: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    discountPrice: PropTypes.number.isRequired,
    furnished: PropTypes.bool.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    offer: PropTypes.bool.isRequired,
    parking: PropTypes.bool.isRequired,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
};

export default ListingCard;
