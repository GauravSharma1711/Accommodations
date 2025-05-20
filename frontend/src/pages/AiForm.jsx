import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import PlaceCard from '../components/PlaceCard'

const AiForm = () => {

    const [city, setCity] = useState("");
    const [loading,setLoading] = useState("");
     const [arr, setArr] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/v1/ai',{
                city
            })
            setLoading(false);
            console.log(res.data.data);
            setArr(res.data.data);
            setCity("");
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }

    }
    
  return (
    <div className=' flex flex-col p-4 h-full w-full bg-amber-100'>
    <div className=' flex items-center justify-center'> 
        <form>
            <input 
            className=' bg-amber-50 px-6 py-2 m-2 rounded-md'
            type="text"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            placeholder='Enter city name'
            />
            <button
            className=' py-2 px-4 rounded-xl bg-amber-500'
             onClick={handleSubmit} 
             >Submit</button>
        </form>

    </div>
    <div>
        {loading ? (
           <p>loading...</p> 
        ):(
            arr.map((element, index) => (
    <div key={index} className='flex gap-4'>
        <PlaceCard element={element} />
    </div>
            ))

        )}
     </div>
</div>
  )
}

export default AiForm