import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet'
import Pin from './Pin'

const Map = ({items}) => {
  return (
    <MapContainer 
    
     center={items.length===1 ?
      [items[0].latitude,items[0].longitude]
      :
      [30.3165,78.0322]}

      zoom={11} scrollWheelZoom={false}
     className=' h-full w-full rounded-sm'
     >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
       {items.map(item=>(
        <Pin item={item} key={item._id} />
       ))}
  </MapContainer>
  )
}

export default Map