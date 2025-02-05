import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-semibold font-serif text-2xl mt-10'>Hotel Recommendations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotel_name + " " + hotel?.address}
            target='_blank'
            key={index}
            aria-label={`View ${hotel?.hotel_name} on Google Maps`}
          >
            <div className='my-5 shadow-lg hover:scale-105 transition-all cursor-pointer'>
              <div className='flex flex-col h-full bg-white rounded-lg overflow-hidden'>
                
                {/* Hotel Information Section */}
                <div className='p-6 flex flex-col justify-between flex-grow'>
                  <h2 className='font-semibold text-xl text-gray-800 truncate'>{hotel?.hotel_name}</h2>
                  <p className='text-sm text-gray-600 truncate'>📍 {hotel?.address}</p>
                  <p className='text-sm font-medium text-gray-700 mt-1'>💰 {hotel?.price}</p>
                  <p className='text-sm font-medium text-gray-700 mt-1'>⭐ {hotel?.rating}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
