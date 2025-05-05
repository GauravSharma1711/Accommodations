import React , {useState} from "react";
import apiRequest from "../lib/apiRequest.js";
import UploadWidget from "../components/UploadWidget";
import { useNavigate } from "react-router-dom";


const NewPostPage= () => {


  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [images,setImages] = useState([]);

  const navigate = useNavigate();


  const handleSubmit  = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
const inputs = Object.fromEntries(formData)
console.log(inputs);
try {
  const res = await apiRequest.post('/post/createPost',
    {
      postData: {
        title: inputs.title,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: inputs.city,
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
        type: inputs.type,
        property: inputs.property,
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        images: images,
        propertysize: parseInt(inputs.propertysize),
      },
      postDetails: {
        desc: value,
        utilities: inputs.utilities,
        pet: inputs.pet,
        income: inputs.income,
        roomsize: parseInt(inputs.roomsize),
        bedroomsize: parseInt(inputs.roomsize),
        bathroomsize: parseInt(inputs.roomsize),
        school: parseInt(inputs.school),
        bus: parseInt(inputs.bus),
        restaurant: parseInt(inputs.restaurant),
      },
    }
  )
 
  navigate('/'+res.data.data.data._id);
} catch (error) {
  console.log(error);
  
}

  }

    return (
      <div className="flex h-full">
        {/* Form Container */}
        <div className="flex-3 overflow-scroll p-10">
          <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
          <div className="flex justify-between flex-wrap gap-5">


            <form 
            onSubmit={handleSubmit}
            className="w-full flex flex-wrap gap-5">
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" className="p-4 border rounded" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="desc">Description</label>
                <textarea id="desc" 
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                 name="desc" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="bedroom">Bedroom Number</label>
                <input min={1} id="bedroom" name="bedroom" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="bathroom">Bathroom Number</label>
                <input min={1} id="bathroom" name="bathroom" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="latitude">Latitude</label>
                <input id="latitude" name="latitude" type="text" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" type="text" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="type">Type</label>
                <select name="type" className="p-4 border rounded">
                  <option value="RENT" defaultChecked>
                    RENT
                  </option>
                  <option value="BUY">BUY</option>
                </select>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="property">Property</label>
                <select name="property" className="p-4 border rounded">
                  <option value="APARTMENT">APARTMENT</option>
                  <option value="HOUSE">HOUSE</option>
                  {/* <option value="condo">Condo</option> */}
                  <option value="LAND">LAND</option>
                </select>
              </div>
  
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="utilities">Utilities Policy</label>
                <select name="utilities" className="p-4 border rounded">
                  <option value="owner">Owner is responsible</option>
                  <option value="tenant">Tenant is responsible</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="pet">Pet Policy</label>
                <select name="pet" className="p-4 border rounded">
                  <option value="allowed">Allowed</option>
                  <option value="not-allowed">Not Allowed</option>
                </select>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="income">Income Policy</label>
                <input
                  id="income"
                  name="income"
                  type="text"
                  placeholder="Income Policy"
                  className="p-4 border rounded"
                />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="size">Property Size (sqft)</label>
                <input min={0} id="propertysize" name="propertysize" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="size">Room Size (sqft)</label>
                <input min={0} id="roomsize" name="roomsize" type="number" className="p-4 border rounded" />
              </div>

              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="size">BedRoom Size (sqft)</label>
                <input min={0} id="bedroomsize" name="bedroomsize" type="number" className="p-4 border rounded" />
              </div>

              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="size">BathRoom Size (sqft)</label>
                <input min={0} id="bathroomsize" name="bathroomsize" type="number" className="p-4 border rounded" />
              </div>

              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="school">School</label>
                <input min={0} id="school" name="school" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="bus">Bus</label>
                <input min={0} id="bus" name="bus" type="number" className="p-4 border rounded" />
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                <label htmlFor="restaurant">Restaurant</label>
                <input min={0} id="restaurant" name="restaurant" type="number" className="p-4 border rounded" />
              </div>
              <button className="w-1/3 bg-teal-500 text-white p-4 rounded mt-5 font-semibold cursor-pointer">Add</button>
              {error && <span className="text-red-500 text-sm">error</span>  }
            </form>
          </div>
        </div>
  
        {/* Image Upload Container */}
        <div className="flex-2 bg-[#fcf5f3] flex flex-col items-center justify-center gap-5 p-5">
          {images.map((image,index)=>(
            <img src={image} key={index} alt="" />
          ))}
           <UploadWidget uwConfig={{
            cloudName:"dgxuc0gyp",
            uploadPreset:"accommodation",
            multiple:true,
            folder:"posts"
          }} 
          setState={setImages}
          />
        </div>
      </div>
    );
  }
  
  export default NewPostPage;
  


