export const destinations = [
  {
    id: 1,
    name: "Kerala",
    country: "India",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    description: "Cruise through serene backwaters on a traditional houseboat, surrounded by lush palm trees and spice plantations.",
    price: 24999,
    category: "india"
  },
  {
    id: 2,
    name: "Himachal Pradesh",
    country: "India",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    description: "Explore majestic snow-capped peaks, lush pine forests, and charming mountain villages in the Himalayas.",
    price: 19999,
    category: "india"
  },
  {
    id: 3,
    name: "Ladakh",
    country: "India",
    image: "https://images.unsplash.com/photo-1599824436773-a3d82a1768fb?auto=format&fit=crop&w=800&q=80",
    description: "Discover a land of high mountain passes, pristine azure lakes, and ancient Tibetan Buddhist monasteries.",
    price: 34999,
    category: "india"
  },
  {
    id: 4,
    name: "Andaman",
    country: "India",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    description: "Relax on white-sand beaches, dive into crystal-clear waters, and explore vibrant coral reefs and marine life.",
    price: 29999,
    category: "india"
  },
  {
    id: 5,
    name: "Goa",
    country: "India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Unwind on golden beaches, savor seafood, and explore Portuguese heritage, historic churches, and lively nightlife.",
    price: 14999,
    category: "india"
  },
  {
    id: 6,
    name: "Kenya",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    description: "Witness the magnificent Big Five, experience incredible wildlife safaris, and see the Maasai Mara migration.",
    price: 119999,
    category: "international"
  },
  {
    id: 7,
    name: "Vietnam",
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    description: "Cruise around the limestone karsts of Ha Long Bay, walk through historic Hoi An, and enjoy vibrant street food.",
    price: 49999,
    category: "international"
  },
  {
    id: 8,
    name: "Tanzania",
    country: "Tanzania",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    description: "Explore the Serengeti plains, marvel at the Ngorongoro Crater, and relax on the white beaches of Zanzibar.",
    price: 129999,
    category: "international"
  },
  {
    id: 9,
    name: "Iceland",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    description: "Chase the Northern Lights, marvel at dramatic black sand beaches, thundering waterfalls, and thermal hot springs.",
    price: 159999,
    category: "international"
  },
  {
    id: 10,
    name: "Sri Lanka",
    country: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80",
    description: "Explore lush green tea plantations, climb the ancient Sigiriya fortress, and encounter elephants in the wild.",
    price: 39999,
    category: "international"
  }
];

export const indiaDestinations = destinations.filter(d => d.category === "india");
export const internationalDestinations = destinations.filter(d => d.category === "international");
