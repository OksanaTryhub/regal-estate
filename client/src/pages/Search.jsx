const Search = () => {
  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <section className='max-w-8xl mx-auto'>
      <div className='container sm:flex mx-auto p-3'>
        <div className=' p-3 border-b-2 sm:border-b-0 sm:border-r-2 sm:min-h-screen'>
          <form className='flex flex-col gap-6 mb-5'>
            <div>
              <h3 className='mb-2 font-medium'>Search Term:</h3>
              <input
                type='text'
                placeholder='Search...'
                // value={searchTerm}
                //   onChange={handleChangeSearch}
                className='w-full sm:w-[270px] lg:w-[300px] bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
              />
            </div>

            <div>
              <h3 className='mb-2 font-medium'>Type:</h3>
              <div className='flex flex-wrap gap-4'>
                <div className='flex gap-2 '>
                  <input
                    name='all'
                    id='all'
                    type='checkbox'
                    className=' w-5'
                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='all' className=''>
                    Rent & Sale
                  </label>
                </div>
                <div className='flex gap-2 '>
                  <input
                    name='rent'
                    id='rent'
                    type='checkbox'
                    className=' w-5'

                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='rent' className=''>
                    Rent
                  </label>
                </div>
                <div className='flex gap-2 '>
                  <input
                    name='sale'
                    id='sale'
                    type='checkbox'
                    className=' w-5'
                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='sale' className=''>
                    Sale
                  </label>
                </div>
                <div className='flex gap-2 '>
                  <input
                    name='offer'
                    id='offer'
                    type='checkbox'
                    className=' w-5'
                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='offer' className=''>
                    Offer
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className='mb-2 font-medium'>Amenities:</h3>
              <div className='flex flex-wrap gap-4'>
                <div className='flex gap-2 '>
                  <input
                    name='parking'
                    id='parking'
                    type='checkbox'
                    className=' w-5'
                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='parking' className=''>
                    Parking
                  </label>
                </div>
                <div className='flex gap-2 '>
                  <input
                    name='furnished'
                    id='furnished'
                    type='checkbox'
                    className=' w-5'

                    // onChange={handleChange}
                    // checked={formData.type === "sale"}
                  />
                  <label htmlFor='furnished' className=''>
                    Furnished
                  </label>
                </div>
              </div>
            </div>
            <div className='flex gap-2 items-center'>
              <label htmlFor='sort_order' className=' font-medium'>
                Sort:
              </label>
              <select
                name='sort_order'
                id='sort_order'
                className='w-full sm:w-[225px] lg:w-[255px] bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-gold-1 rounded-lg p-3'
              >
                <option value=''>Price high to low</option>
                <option value=''>Price low to high</option>
                <option value=''>Latest</option>
                <option value=''>Oldest</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg w-full hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
            >
              Search
            </button>
          </form>
        </div>
        <div className='w-full p-3'>
          <h1 className='text-2xl text-center font-medium '>Listing search results:</h1>
        </div>
      </div>
    </section>
  );
};

export default Search;
