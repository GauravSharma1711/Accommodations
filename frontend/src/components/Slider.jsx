import React from 'react';

const Slider = ({ images }) => {
  if (!images || images.length === 0) {
    return <div>No images available.</div>;
  }

  const mainImage = images[0];
  const otherImages = images.slice(1, 4);

  return (
    <div className=" h-80 flex flex-col md:flex-row gap-4 rounded-md shadow-md overflow-hidden">
      
      {mainImage && (
        <div className="w-full md:w-2/3 aspect-video overflow-hidden">
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        {otherImages.map((img, index) => (
          <div key={index} className="aspect-square overflow-hidden">
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Handle cases with fewer than 3 additional images if needed */}
      </div>
    </div>
  );
};

export default Slider;