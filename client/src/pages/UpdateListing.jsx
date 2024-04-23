import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { app } from "../firebase";
import Loader from "../components/Loader";

const UpdateListing = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;
      const res = await fetch(`/api/listing/${listingId}`);

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImagesUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log("🚀 ~ handleImagesUpload ~ err:", err);
          setImageUploadError("Image upload failed (2MB max per image");
          setUploading(false);
        });
    } else {
      setUploading(false);
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "sale" || e.target.name === "rent") {
      setFormData({
        ...formData,
        type: e.target.name,
      });
    } else if (
      e.target.name === "parking" ||
      e.target.name === "offer" ||
      e.target.name === "furnished"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1) return setError("You must upload at least one image!");

    if (+formData.regularPrice < +formData.discountPrice)
      return setError("Discounted price must be lower than regular price!");

    try {
      setLoading(true);
      setLoading(false);

      const res = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='max-w-4xl mx-auto'>
      <div className='container mx-auto p-3'>
        <div className=' mx-auto p-3'>
          <h1 className='text-3xl text-center font-medium my-7'>Update a listing</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 mb-5'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex flex-col flex-1 gap-4 '>
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
                  className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                  maxLength='62'
                  minLength='5'
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
                <textarea
                  name='description'
                  type='text'
                  placeholder='Description'
                  className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                  required
                  onChange={handleChange}
                  value={formData.description}
                />
                <input
                  name='address'
                  type='text'
                  placeholder='Address'
                  className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                  required
                  onChange={handleChange}
                  value={formData.address}
                />
                <div className='flex flex-wrap gap-6 '>
                  <div className='flex gap-2 '>
                    <input
                      name='sale'
                      id='sale'
                      type='checkbox'
                      className=' w-5'
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                    />
                    <label htmlFor='sale' className=''>
                      Sell
                    </label>
                  </div>

                  <div className='flex gap-2 '>
                    <input
                      name='rent'
                      id='rent'
                      type='checkbox'
                      className=' w-5'
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                    />
                    <label htmlFor='rent' className=''>
                      Rent
                    </label>
                  </div>

                  <div className='flex gap-2 '>
                    <input
                      name='parking'
                      id='parking'
                      type='checkbox'
                      className=' w-5'
                      onChange={handleChange}
                      checked={formData.parking}
                    />
                    <label htmlFor='parking' className=''>
                      Parking spot
                    </label>
                  </div>

                  <div className='flex gap-2 '>
                    <input
                      name='furnished'
                      id='furnished'
                      type='checkbox'
                      className=' w-5'
                      onChange={handleChange}
                      checked={formData.furnished}
                    />
                    <label htmlFor='furnished' className=''>
                      Furnished
                    </label>
                  </div>
                  <div className='flex gap-2 '>
                    <input
                      name='offer'
                      id='offer'
                      type='checkbox'
                      className=' w-5'
                      onChange={handleChange}
                      checked={formData.offer}
                    />
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
                      className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                      required
                      onChange={handleChange}
                      value={formData.bedrooms}
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
                      className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                      required
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                    <label htmlFor='bathrooms' className=''>
                      Baths
                    </label>
                  </div>
                </div>
                <div className='flex flex-wrap items-center gap-4'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <input
                      name='regularPrice'
                      id='regularPrice'
                      type='number'
                      className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                      required
                      onChange={handleChange}
                      value={formData.regularPrice}
                    />
                    <label htmlFor='regularPrice' className='flex flex-col text-center '>
                      Regular price
                      <span>($ / Month)</span>
                    </label>
                  </div>
                  {formData.offer && (
                    <div className='flex flex-wrap items-center gap-2'>
                      <input
                        name='discountPrice'
                        id='discountPrice'
                        type='number'
                        className=' bg-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-lg sm:placeholder:text-lg placeholder:text-[rgba(71,58,63,0.5)] border border-gold-1 rounded-lg p-3'
                        onChange={handleChange}
                        value={formData.discountPrice}
                      />
                      <label htmlFor='discountPrice' className='flex flex-col text-center '>
                        Discounted price
                        <span>($ / Month)</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col flex-1 gap-4 '>
                <p>
                  <span className='font-medium'>Images:</span>
                  <span className='font-normal'>
                    &nbsp;The first image will be the cover (max 6)
                  </span>
                </p>
                <div className='flex items-center'>
                  <input
                    type='file'
                    ref={fileRef}
                    onChange={(e) => setFiles(e.target.files)}
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

                  {files.length === 0 ? (
                    <p className='flex-1 text-center'>No file chosen</p>
                  ) : files.length === 1 ? (
                    <p className='flex-1 text-center'>{files[0].name} chosen</p>
                  ) : files.length < 7 ? (
                    <p className='flex-1 text-center'>{files.length} files chosen</p>
                  ) : (
                    <p className='flex-1 text-center text-red-500'>
                      A maximum of 6 images can be uploaded.
                    </p>
                  )}

                  <button
                    type='button'
                    onClick={handleImagesUpload}
                    disabled={uploading}
                    className='text-white bg-dark-2 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-50 disabled:hover:opacity-50 disabled:hover:text-white min-w-[100px]'
                  >
                    {uploading ? <Loader /> : "Upload"}
                  </button>
                </div>
                <p className=' text-red-500'>{imageUploadError && imageUploadError}</p>

                <div className='flex flex-col flex-1 gap-2'>
                  {formData.imageUrls && formData.imageUrls.length > 0 ? (
                    formData.imageUrls.map((url, i) => (
                      <div
                        key={url}
                        className='flex justify-between bg-white border border-gold-1 rounded-lg p-3'
                      >
                        <img
                          src={url}
                          alt='listing image'
                          className='w-20 h-20 object-cover rounded-lg'
                        />
                        <button
                          type='button'
                          onClick={() => handleDeleteImage(i)}
                          className=' font-bold text-red-700'
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className=' font-bold text-green-500'>
                      Uploaded images will be displayed here
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={loading || uploading}
              className='text-white bg-dark-1 rounded-lg p-3 sm:text-lg hover:opacity-95 hover:text-gold-1 disabled:opacity-80'
            >
              {loading ? <Loader /> : "Update listing"}
            </button>
            {error && <p className='text-red-500'>{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateListing;
