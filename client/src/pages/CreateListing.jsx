import { useRef } from "react";

const CreateListing = () => {
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className='max-w-4xl mx-auto'>
      <div className='container mx-auto p-3'>
        <div className=' mx-auto p-3'>
          <h1 className='text-3xl text-center font-medium my-7'>Create a listing</h1>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 mb-5'>
            <div className='flex flex-col flex-1 gap-4 '>
              <input
                name='name'
                type='text'
                placeholder='Name'
                className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                maxLength='62'
                minLength='5'
                required
              />
              <textarea
                name='description'
                type='text'
                placeholder='Description'
                className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                required
              />
              <input
                name='address'
                type='text'
                placeholder='Address'
                className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                required
              />
              <div className='flex flex-wrap gap-6 '>
                <div className='flex gap-2 '>
                  <input name='sale' id='sale' type='checkbox' className=' w-5' />
                  <label htmlFor='sale' className=''>
                    Sell
                  </label>
                </div>

                <div className='flex gap-2 '>
                  <input name='rent' id='rent' type='checkbox' className=' w-5' />
                  <label htmlFor='rent' className=''>
                    Rent
                  </label>
                </div>

                <div className='flex gap-2 '>
                  <input name='parking' id='parking' type='checkbox' className=' w-5' />
                  <label htmlFor='parking' className=''>
                    Parking spot
                  </label>
                </div>

                <div className='flex gap-2 '>
                  <input name='furnished' id='furnished' type='checkbox' className=' w-5' />
                  <label htmlFor='furnished' className=''>
                    Furnished
                  </label>
                </div>
                <div className='flex gap-2 '>
                  <input name='offer' id='offer' type='checkbox' className=' w-5' />
                  <label htmlFor='offer' className=''>
                    Offer
                  </label>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <input
                    name='bedrooms'
                    id='bedrooms'
                    type='number'
                    min='1'
                    max='10'
                    defaultValue={1}
                    className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                    required
                  />
                  <label htmlFor='bedrooms' className=''>
                    Beds
                  </label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    name='bathrooms'
                    id='bathrooms'
                    type='number'
                    min='1'
                    max='10'
                    defaultValue={1}
                    className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                    required
                  />
                  <label htmlFor='bathrooms' className=''>
                    Baths
                  </label>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <input
                    name='regularPrice'
                    id='regularPrice'
                    type='number'
                    className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                    required
                  />
                  <label htmlFor='regularPrice' className='flex flex-col text-center '>
                    Regular price
                    <span>($ / Month)</span>
                  </label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    name='discountPrice'
                    id='discountPrice'
                    type='number'
                    className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                  />
                  <label htmlFor='discountPrice' className='flex flex-col text-center '>
                    Discounted price
                    <span>($ / Month)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col flex-1 gap-4 '>
              <p>
                <span className='font-medium underline underline-custom'>Images:</span>
                <span className='font-normal'>&nbsp;The first image will be the cover (max 6)</span>
              </p>
              <div className='flex w-full items-center'>
                <input
                  type='file'
                  ref={fileRef}
                  id='images'
                  name='images'
                  accept='image/*'
                  multiple
                  hidden
                />
                <button
                  type='button'
                  onClick={() => fileRef.current.click()}
                  className='  bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                >
                  Choose files
                </button>
                <p className='flex-1 text-center'>No file chosen</p>

                <button className='  text-white bg-dark-2 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:text-white'>
                  Upload
                </button>
              </div>
              <div className='flex flex-1 text-red-500'>Uploaded images will be displayed here</div>
              <button
                type='button'
                // onClick={handleClick}
                className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
              >
                Create listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateListing;
