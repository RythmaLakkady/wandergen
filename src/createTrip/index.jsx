import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from "@/constants/options";
import { chatSession } from "@/service/AImodel";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/custom/modal";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from "sonner";
import { db } from "../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    travelers: "",
    people: "",
  });

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);  // User is logged in
      } else {
        setIsLoggedIn(false);  // User is logged out
      }
    });

    return () => unsubscribe();  // Clean up listener on component unmount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setFormData((prev) => ({ ...prev, destination: value }));

    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://api.locationiq.com/v1/autocomplete.php?key=${import.meta.env.VITE_LOCATIONIQ_API_KEY}&q=${value}&limit=5&format=json`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    } else {
      setResults([]);
    }
  };

  const onGenerateTrip = async () => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // Show modal if not logged in
      return;
    }

    const { destination, days, budget, travelers } = formData;

    // Check if any field is empty
    if (destination === '' || days === '' || budget === '' || travelers === '') {
      toast("Please make sure all fields are filled before proceeding.");
      return;
    }

    // Check if days are greater than 20
    if (days >= 20) {
      toast("Looks like your trip is over 20 days! We recommend a maximum of 20 days.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{destination}', destination)
      .replace('{days}', days)
      .replace('{budget}', budget)
      .replace('{travelers}', travelers)
      .replace('{eachday}', days);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());

    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate login action
    setIsModalOpen(false); // Close the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal without logging in
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = auth.currentUser; // Get the currently logged-in user
    if (!user) {
      toast("You must be logged in to save your trip.");
      return;
    }

    const docId = Date.now().toString();
    await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,  // Store user's email
      userSelection: formData,
      tripData: JSON.parse(TripData),
      timestamp: serverTimestamp(), // Store timestamp for sorting
    });
    setLoading(false);
    toast("Trip generated successfully!");
    navigate('/view-trip/'+docId)
  };

  return (
    <div className="sm:px-20 md:px-32 lg:px-56 xl:px-10 px-10 py-6 mt-10 flex-center text-center">
      <h2 className="font-serif font-semibold text-[30px]">
        Your Perfect Trip Starts Here!✈️✨
      </h2>
      <p className="mt-4 font-serif text-[20px] text-gray-600">
        Tell us a little about your travel preferences, and we’ll design the perfect itinerary just for you.
      </p>

      <div className="mt-20 flex flex-col gap-7">
        {/* Destination */}
        <h2 className="my-3 font-serif text-[20px]">
          Where would you like to go on your next trip?
        </h2>
        <div className="relative w-3/4 mx-auto">
          <input
            type="text"
            name="destination"
            value={query}
            onChange={handleSearch}
            placeholder="Search your next getaway..."
            className="w-full p-2 border border-gray-300 rounded-md text-center"
          />
        </div>

        {results.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md mt-2">
            {results.map((place) => (
              <li
                key={place.place_id}
                onClick={() => {
                  setSelectedPlace(place);
                  setQuery(place.display_name);
                  setFormData((prev) => ({ ...prev, destination: place.display_name }));
                  setResults([]);
                }}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}

        {/* Days */}
        <h2 className="my-3 font-serif text-[20px]">For how many days are you planning your trip?</h2>
        <div className="relative w-3/4 mx-auto">
          <Input
            name="days"
            placeholder="Ex. 3"
            type="number"
            value={formData.days}
            onChange={handleInputChange}
            className="text-center"
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="font-serif text-[20px]">What’s your budget for this trip?</h2>
          <h2 className="text-gray-600">Let’s find the perfect balance between cost and experience!</h2>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer border-gray-300 rounded-lg hover:shadow-lg hover:shadow-[#fd9c7e] hover:border-[#fd9c7e] ${formData.budget === item.title ? "border-[#fd9c7e] border-2 shadow-lg shadow-[#fd9c7e]" : ""}`}
              onClick={() => setFormData((prev) => ({ ...prev, budget: item.title }))}
            >
              <h2 className="my-3 font-serif text-[40px]">{item.icon}</h2>
              <h2 className="my-3 font-serif text-[20px] font-semibold">{item.title}</h2>
              <h2 className="my-3 font-serif text-[16px] text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>

        {/* Travelers */}
        <div>
          <h2 className="font-serif text-[20px]">Who are you traveling with on this trip?</h2>
        </div>
        <div className="grid grid-cols-4 gap-10">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer border-gray-300 rounded-lg hover:shadow-lg hover:shadow-[#fd9c7e] hover:border-[#fd9c7e] ${formData.travelers === item.title ? "border-[#fd9c7e] shadow-lg shadow-[#fd9c7e] border-2" : ""}`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  travelers: item.title,
                  people: item.people,
                }))
              }
            >
              <h2 className="my-3 font-serif text-[40px]">{item.icon}</h2>
              <h2 className="my-3 font-serif text-[20px] font-semibold">{item.title}</h2>
              <h2 className="my-3 font-serif text-[16px] text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-20">
        <Button
          className="px-12 py-3 bg-[#7AB9B3] text-white text-lg font-semibold rounded-lg hover:bg-[#6a9f9c]"
          onClick={onGenerateTrip}
          disabled={loading} 
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" /> 
          ) : (
            "Generate Trip"
          )}
        </Button>




        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default CreateTrip;
