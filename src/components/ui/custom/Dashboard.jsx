import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';
import '/src/index.css';

function Dashboard() {
  return (
    <div className="flex flex-col items-center text-center font-serif">

      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-8 mt-20">
        <h1 className="font-semibold text-[50px] leading-tight">
          <span className="text-[#fd9c7e]">Your Adventure Awaits: </span><br />
          <span>AI-crafted itineraries tailored for an unforgettable experience!</span>
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Discover the world like never before, with every journey thoughtfully crafted to match your style, preferences, and dreams.
        </p>
        <Link to="/createTrip">
          <Button className="mt-6 text-lg px-12 py-6 w-auto bg-[#fd9c7e] text-white hover:bg-[#e68a66] shadow-lg">
            Start Exploring
          </Button>
        </Link>
      </div>

      {/* Scrolling Sections */}
      <div className="w-full max-w-6xl mx-auto mt-16 space-y-32">
        
        {/* Section 1 */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 px-8">
          <img src="public/paris.jpg" alt="Paris" className="w-[500px] h-[350px] object-cover rounded-lg shadow-lg" />
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-semibold text-[#7AB9B3]">🌍 AI-Powered Travel Plans</h2>
            <p className="text-lg text-gray-700 mt-3">
              WanderGen’s AI analyzes your interests, travel dates, and budget to create personalized itineraries. 
              Whether you love historical landmarks, scenic getaways, or vibrant city life, we design a journey that’s uniquely yours.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-12 px-8">
          <img src="public/maldives.jpg" alt="Maldives" className="w-[500px] h-[350px] object-cover rounded-lg shadow-lg" />
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-semibold text-[#7AB9B3]">🏝️ Hidden Gems Just for You</h2>
            <p className="text-lg text-gray-700 mt-3">
              Step off the beaten path and uncover the world’s best-kept secrets. Our AI recommends local hotspots, lesser-known attractions, 
              and immersive experiences that are perfect for travelers looking for something beyond the usual tourist traps.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 px-8">
          <img src="public/japan.jpg" alt="Japan" className="w-[500px] h-[350px] object-cover rounded-lg shadow-lg" />
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-semibold text-[#7AB9B3]">🍽️ Food & Culture Experiences</h2>
            <p className="text-lg text-gray-700 mt-3">
              Taste the world with curated recommendations for street food, fine dining, and authentic cultural experiences. 
              From sushi-making in Tokyo to wine tasting in Tuscany, our AI suggests activities that match your taste and curiosity.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-12 px-8">
          <img src="public/nature.jpg" alt="Nature Adventure" className="w-[500px] h-[350px] object-cover rounded-lg shadow-lg" />
          <div className="lg:w-1/2 text-left">
            <h2 className="text-3xl font-semibold text-[#7AB9B3]">⛰️ Adventure & Relaxation</h2>
            <p className="text-lg text-gray-700 mt-3">
              Whether you're an adrenaline junkie or a wellness enthusiast, we balance your itinerary with the perfect mix of adventure and relaxation. 
              From hiking breathtaking trails to unwinding on tranquil beaches, your trip is designed for ultimate enjoyment.
            </p>
          </div>
        </div>

      </div>

      {/* Final Call to Action */}
      <div className="mt-24 mb-16 text-center">
        <h2 className="text-4xl font-semibold text-[#fd9c7e]">
          Ready to Plan Your Next Trip?
        </h2>
        <p className="text-lg text-gray-700 mt-3">Let AI create a journey you'll never forget.</p>
        <Link to="/createTrip">
          <Button className="mt-6 text-lg px-12 py-6 w-auto bg-[#fd9c7e] text-white hover:bg-[#e68a66] shadow-lg">
            Start Now
          </Button>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;
