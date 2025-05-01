import React from 'react';
import { listData } from '../lib/dummy.js';
import Filter from '../components/Filter.jsx';
import Card from '../components/Card.jsx';
import Map from '../components/Map.jsx';

const ListPage = () => {
  const data = listData;

  return (
    <div className='min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-4 p-2  md:p-6'>
      <div className='w-full min-h-[calc(100%-100px)]    lg:w-2/3'>
        <Filter />
        <div className='mt-6 pr-0 lg:pr-6  h-[600px] overflow-y-scroll '>
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className='w-full min-h-[calc(100vh-100px)] rounded-2xl  lg:w-1/3 bg-[rgb(252,245,243)] flex items-center justify-center overflow-hidden shadow-md'>
          <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;