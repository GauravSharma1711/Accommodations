import React from 'react'
import {Marker,Popup} from 'react-leaflet'
import { Link } from 'react-router-dom'

const Pin = ({item}) => {
  return (
    <Marker position={[item.latitude,item.longitude]}>
         <Popup>
        <div className=' flex gap-4 min-h-16 w-56 '>
            <img className=' w-32 h-17 rounded-md object-cover' src={item.img} alt="" />
            <div className=' flex flex-col justify-between'>
            <div><Link to={`/${item.id}`} >{item.title}</Link></div>
            <span>{item.bedroom} bedroom</span>
            <b>${item.price}</b>
            </div>
        
        </div>
         </Popup>
       </Marker>
  )
}

export default Pin