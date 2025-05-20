import React from 'react';

const PlaceCard = ({ element }) => {

  if (!element) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden transform hover:scale-105 gap-4 m-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">{element.name}</h2>
        <p className="text-amber-700 text-base leading-relaxed mb-4">{element.description}</p>

      </div>
    </div>
  );
};

export default PlaceCard;