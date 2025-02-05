export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Exploring the world solo, one adventure at a time.",
    icon: "🗺️",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A romantic getaway for two, creating unforgettable memories.",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Friends",
    desc: "Traveling with your besties, making every moment count.",
    icon: "🎢",
    people: "5-10 people",
  },
  {
    id: 4,
    title: "Family",
    desc: "A fun-filled trip with your loved ones, perfect for all ages.",
    icon: "👨‍👩‍👧‍👦",
    people: "3-5 people",
  },
];


export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Low-Cost",
    desc: "Maximize the fun, minimize the cost—adventure on a budget!",
    icon: "💰",
  },
  {
    id: 2,
    title: "Affordable Comfort",
    desc: "A perfect balance of affordability and comfort—travel smart, stay cozy!",
    icon: "💸",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "First-class flights, five-star stays, and nothing but the best!",
    icon: "💎",
  }
];

export const AI_PROMPT = 'Generate a {days}-day travel itinerary for {travelers} traveling to {destination}, with a budget of {budget}. Provide details on hotel options, including the hotel name, address, price, image, geo-coordinates, rating, and description. Additionally, suggest an itinerary for each of the {eachday} days with the following details for each place: Place Name, Place Details (e.g., short description or what to expect), Place Image URI (link to a relevant image), Geo Coordinates, Ticket Pricing, Rating (e.g., user reviews or stars) and Time Travel (duration to reach from previous location).The itinerary should cover the best time to visit each location. The output should be in JSON format.'
