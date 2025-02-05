import { Button } from '@/components/ui/button'
import React from 'react'
import { LuSend } from "react-icons/lu";

function InfoSection({trip}) {
  return (
    <div>
      
    <div className='flex justify-between items-center'>
    <div className='my-5 flex flex-col gap-2'>
        <h2 className='text-3xl font-semibold font-serif mt-2'>
        📍 {trip?.userSelection?.destination || 'No Destination'}
        </h2>

        <div className='flex gap-5'>
        <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-700 text-xs md:text-lg'>
        📅 {trip?.userSelection?.days} {trip?.userSelection?.days === "1" ? "Day" : "Days"}
        </h2>
        <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-700 text-xs md:text-lg'>
        💰 Budget: {trip?.userSelection?.budget}
        </h2>
        <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-700 text-xs md:text-lg'>
        👥 Travelers: {trip?.userSelection?.travelers}
        </h2>


        </div>
    </div>
    

    </div>
    

    </div>
  )
}

export default InfoSection
