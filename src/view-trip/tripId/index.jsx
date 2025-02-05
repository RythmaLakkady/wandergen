import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';




function ViewTrip() {
    const {tripId}=useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    const GetTripData=async ()=>{
        const docRef = doc(db,'UserTrips',tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("document: ",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("no such doc");
            toast("no trip found")
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* information section */}
        <InfoSection trip={trip} />
      {/* recommended hotels */}
        <Hotels trip={trip} />
      {/* daily plan */}
        <Itinerary trip={trip} />
    </div>
  )
}

export default ViewTrip
