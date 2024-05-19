import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./../components/Loader";
import LoaderDots from "../components/LoaderDots";
import ListingCard from "../components/ListingCard";
// import { IoIosMore } from "react-icons/io";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loaderColor, setLoaderColor] = useState("#EABD4D");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(false);
      setShowMore(false);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listings?${searchQuery}&limit=9`);
        const data = await res.json();

        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }

        setSearchResults(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    setLoading(false);
    setError(false);
    fetchSearchResults();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.name === "all" ||
      e.target.name === "sale" ||
      e.target.name === "rent"
    ) {
      setSidebarData({
        ...sidebarData,
        type: e.target.name,
      });
    } else if (
      e.target.name === "parking" ||
      e.target.name === "offer" ||
      e.target.name === "furnished"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.name]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    } else if (e.target.name === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({
        ...sidebarData,
        sort,
        order,
      });
    } else {
      setSidebarData({
        ...sidebarData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = searchResults.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/listings?${searchQuery}&limit=9`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setSearchResults([...searchResults, ...data]);
  };

  const handleMouseEnter = () => {
    setLoaderColor("#FFFFFF");
  };

  const handleMouseLeave = () => {
    setLoaderColor("#EABD4D");
  };

  return (
    <section className="max-w-8xl mx-auto">
      <div className="sm:flex mx-auto p-3">
        <div className=" p-3 border-b-2 sm:border-b-0 sm:border-r-2 sm:min-h-screen">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-5">
            <div>
              <h3 className="mb-2 font-medium">Search Term:</h3>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search..."
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="w-full sm:w-[270px] lg:w-[300px] bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3"
              />
            </div>

            <div>
              <h3 className="mb-2 font-medium">Type:</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 ">
                  <input
                    name="all"
                    id="all"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.type === "all"}
                  />
                  <label htmlFor="all" className="">
                    Rent & Sale
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    name="rent"
                    id="rent"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.type === "rent"}
                  />
                  <label htmlFor="rent" className="">
                    Rent
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    name="sale"
                    id="sale"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.type === "sale"}
                  />
                  <label htmlFor="sale" className="">
                    Sale
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    name="offer"
                    id="offer"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.offer === true}
                  />
                  <label htmlFor="offer" className="">
                    Offer
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Amenities:</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-2 ">
                  <input
                    name="parking"
                    id="parking"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.parking === true}
                  />
                  <label htmlFor="parking" className="">
                    Parking
                  </label>
                </div>
                <div className="flex gap-2 ">
                  <input
                    name="furnished"
                    id="furnished"
                    type="checkbox"
                    className=" w-5"
                    onChange={handleChange}
                    checked={sidebarData.furnished === true}
                  />
                  <label htmlFor="furnished" className="">
                    Furnished
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="sort_order" className=" font-medium">
                Sort:
              </label>
              <select
                name="sort_order"
                id="sort_order"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
                className="w-full sm:w-[225px] lg:w-[255px] bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-gold-1 rounded-lg p-3"
              >
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
              </select>
            </div>

            <button className="text-white bg-dark-1 rounded-lg p-3 sm:text-lg w-full hover:opacity-95 hover:text-gold-1 disabled:opacity-80">
              Search
            </button>
          </form>
        </div>
        <div className="w-full p-3">
          <div className="flex w-full justify-between px-10 mb-7 ">
            <h1 className="text-2xl font-medium ">Listing search results:</h1>
            <button
              onClick={() => navigate("/map")}
              className=" flex justify-center items-center p-4 font-semibold hover:text-white bg-white hover:bg-gold-1 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-gold-1 rounded-lg"
            >
              Show on map
            </button>
          </div>
          {loading && !error && (
            <div className="flex w-full justify-center items-center mt-[200px]">
              <Loader size={40} />
            </div>
          )}
          {error && !loading && (
            <div className="flex justify-center mt-20 gap-4">
              <p>Oops... Something went wrong! Try again </p>
              <LoaderDots />
            </div>
          )}
          {!loading && !error && searchResults.length === 0 && (
            <p className="flex justify-center mt-20">No listing found! </p>
          )}
          {!loading && !error && searchResults && searchResults.length > 0 && (
            <ul className="grid grid-cols-custom gap-7 mb-7">
              {searchResults.map((item) => (
                <ListingCard key={item._id} listing={item} />
              ))}
            </ul>
          )}
          {showMore && (
            <div className="group">
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onShowMoreClick}
                className=" flex gap-4 justify-center items-center p-4 mx-auto font-semibold hover:text-white bg-white hover:bg-gold-1 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border border-gold-1 rounded-lg"
              >
                Show more
                <LoaderDots color={loaderColor} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Search;
