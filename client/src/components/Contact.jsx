import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Contact = ({ onClick, listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLandlord();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-4'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span> for{" "}
            <span className='font-semibold'>{listing.name}</span>:
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            placeholder='Enter your message'
            onChange={handleChange}
            className='w-full bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
          ></textarea>
          <Link
            to={`mailto:${landlord.email}&subject=Regarding ${listing.name}&body=${message}`}
            type='button'
            onClick={onClick}
            className='text-white bg-dark-1 rounded-lg p-3 text-center sm:text-lg w-full hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
};

Contact.propTypes = {
  onClick: PropTypes.func.isRequired,
  listing: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Contact;
