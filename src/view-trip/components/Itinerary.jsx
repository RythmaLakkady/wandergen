import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function Itinerary({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || typeof itinerary !== 'object') {
    return (
      <div>
        <p>Itinerary is not available or in the expected format.</p>
      </div>
    );
  }

  const sortedDays = Object.keys(itinerary)
    .sort((a, b) => {
      const dayA = parseInt(a.replace('day', ''));
      const dayB = parseInt(b.replace('day', ''));
      return dayA - dayB;
    })
    .map((dayKey) => itinerary[dayKey]);

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-2xl font-serif font-semibold text-gray-800 mt-6 mb-4 ml-2 mr-2">
        Places to Visit
      </h2>

      <div>
        {sortedDays.map((day, index) => (
          <div key={index} className="my-6 ml-2 mr-2">
            <h3 className="text-xl font-serif font-semibold text-gray-700">
              {`Day ${index + 1}: ${day?.theme || "No Theme"}`}
              {day?.best_time && day?.best_time !== "N/A" && (
                <span className="text-sm text-gray-600 ml-2">🌅|🌃 Best Time: {day?.best_time}</span>
              )}
            </h3>

            {day?.map && (
              <div className="my-4">
                <h4 className="text-lg font-serif font-medium text-gray-700">Map 📍</h4>
                <iframe
                  src={day?.map}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
            )}

            {Array.isArray(day?.activities) && day?.activities.length > 0 && (
              <div>
                <h4 className="text-lg font-serif font-medium text-gray-700 mt-4">Activities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {day?.activities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="my-4 shadow-md hover:scale-105 transition-all cursor-pointer flex flex-col"
                    >
                      <div className="mt-3 ml-2 mr-2">
                        {activity?.place_name && (
                          <h5 className="text-md font-serif font-semibold text-gray-700">
                            {activity?.place_name}
                          </h5>
                        )}
                        {activity?.place_details && (
                          <p className="text-sm text-gray-600">{activity?.place_details} </p>
                        )}
                        {activity?.rating && activity?.rating !== "N/A" && (
                          <p className="text-sm text-gray-600">⭐ {activity?.rating}</p>
                        )}
                        {activity?.ticket_pricing && activity?.ticket_pricing !== "N/A" && (
                          <p className="text-sm text-gray-600">💸 {activity?.ticket_pricing}</p>
                        )}
                        {activity?.time_travel && activity?.time_travel !== "N/A" && (
                          <p className="text-sm text-gray-600">⏱️ {activity?.time_travel}</p>
                        )}

                        {activity?.geo_coordinates && (
                          <Link
                            to={`https://www.google.com/maps/search/?api=1&query=${activity?.geo_coordinates.latitude},${activity?.geo_coordinates.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-[#FD9C7E] hover:text-[#7AB9B3]"
                          >
                            <GrMapLocation className="mr-1" /> View on Map
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
