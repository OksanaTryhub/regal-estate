import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const Listings = ({ items, handleItemDelete }) => {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [items]);

  return (
    <ul className='flex flex-col gap-2'>
      {sortedItems.map((item) => (
        <div
          key={item._id}
          className='flex items-center gap-4 bg-white border border-gold-1 rounded-lg p-3'
        >
          <Link to={`/listing/${item._id}`} className='flex flex-1 items-center gap-4'>
            <img
              src={item.imageUrls[0]}
              alt='Listing cover'
              className='w-20 h-20 object-cover rounded-lg'
            />

            <div>
              <h3 className='max-w-[250px] text-lg font-medium hover:underline hover:underline-custom truncate mb-2 '>
                {item.name}
              </h3>
              <p className='max-w-[250px] text-sm line-clamp-2 '>{item.description}</p>
            </div>
          </Link>
          <div className='flex flex-col gap-4'>
            <button
              type='button'
              className='text-red-500'
              onClick={() => handleItemDelete(item._id)}
            >
              Delete
            </button>
            <Link to={`/update-listing/${item._id}`} className='text-green-500'>
              Edit
            </Link>
          </div>
        </div>
      ))}
    </ul>
  );
};

Listings.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  handleItemDelete: PropTypes.func.isRequired,
};

export default Listings;
