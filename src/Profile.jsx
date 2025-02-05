import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";

function Profile() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log("Current User:", currentUser);

    if (currentUser) {
      setUser(currentUser);
      fetchUserTrips(currentUser.email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserTrips = async (userEmail) => {
    setLoading(true);
    try {
      console.log("Fetching trips for:", userEmail);

      const q = query(collection(db, "UserTrips"), where("userEmail", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips found for user:", userEmail);
      }

      const userTrips = querySnapshot.docs.map((doc) => {
        const tripData = doc.data().tripData || {};
        console.log("Trip Data:", tripData);
        return {
          id: doc.id,
          tripName: tripData.trip_name || "Untitled Trip",
          destination: tripData.location || "Unknown Destination",
          duration: tripData.duration || "Unknown Duration",
          travelers: tripData.travelers || "Not Specified",
          timestamp: doc.data().timestamp || null,
        };
      });

      setTrips(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "No Date";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-4xl p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-serif font-semibold text-[#7AB9B3] my-4 text-center">
          Your Profile
        </h2>

        {/* Email Box */}
        <div className="bg-[#FD9C7E] p-6 rounded-lg text-white font-serif text-lg mb-6 shadow-md">
          {user && (
            <div className="text-center">
              <p className="text-xl font-semibold">📧 Email</p>
              <p className="mt-1">{user.email}</p>
            </div>
          )}
        </div>

        {/* Trips Summary Box */}
        <div className="bg-[#7AB9B3] p-6 rounded-lg text-white font-serif text-lg mb-6 shadow-md text-center">
          <h3 className="text-xl font-semibold">🧳 Your Trips</h3>
          <p className="mt-1 text-lg">
            You have {trips.length} {trips.length === 1 ? "trip" : "trips"} planned.
          </p>
        </div>

        {/* Previous Trips */}
        <h3 className="text-xl font-serif font-semibold mt-6 text-center">
          Your Previous Trips
        </h3>
        {loading ? (
          <p className="text-gray-500 text-center">Loading trips...</p>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {trips.map((trip) => (
              <div key={trip.id} className="p-4 border rounded-lg shadow hover:shadow-md bg-white">
                <h3 className="text-lg font-serif font-semibold">{trip.tripName}</h3>
                <p className="text-gray-600">📍 Destination: {trip.destination}</p>
                <p className="text-gray-600">🕒 Duration: {trip.duration}</p>
                <p className="text-gray-600">👥 Travelers: {trip.travelers}</p>
                <p className="text-gray-600">📅 Created on: {trip.timestamp ? formatDate(trip.timestamp) : "No Date"}</p>
                
                <Link to={`/view-trip/${trip.id}`} className="text-[#7AB9B3] hover:underline mt-2 block">
                  View Trip Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No trips found.</p>
        )}

        {/* Sign Out Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleSignOut}
            className="py-2 px-6 bg-[#7AB9B3] text-white rounded hover:bg-[#66a19b] shadow-md"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
