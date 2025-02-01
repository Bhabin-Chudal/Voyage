const sampleListings = [
    {
      title: "Cozy Beachfront Cottage",
      description: "Charming cottage with stunning ocean views",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 150,
      location: "Malibu",
      country: "USA"
    },
    {
      title: "Mountain Retreat Cabin",
      description: "Rustic cabin surrounded by pine forests",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 120,
      location: "Aspen",
      country: "USA"
    },
    {
      title: "Modern City Apartment",
      description: "Sleek apartment in the heart of downtown",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 200,
      location: "New York City",
      country: "USA"
    },
    {
      title: "Tuscan Villa",
      description: "Elegant villa with vineyard views",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 300,
      location: "Florence",
      country: "Italy"
    },
    {
      title: "Tropical Beach Bungalow",
      description: "Private bungalow steps away from the beach",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 180,
      location: "Bali",
      country: "Indonesia"
    },
    {
      title: "Alpine Ski Chalet",
      description: "Cozy chalet with easy access to ski slopes",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      price: 250,
      location: "Zermatt",
      country: "Switzerland"
    },
    {
      title: "Historic Downtown Loft",
      description: "Spacious loft in a converted warehouse",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 160,
      location: "Chicago",
      country: "USA"
    },
    {
      title: "Seaside Villa",
      description: "Luxurious villa with private beach access",
      image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      price: 400,
      location: "Santorini",
      country: "Greece"
    },
    {
      title: "Rainforest Treehouse",
      description: "Unique treehouse experience in the jungle",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 140,
      location: "Costa Rica",
      country: "Costa Rica"
    },
    {
      title: "Desert Oasis Resort",
      description: "Luxury resort with stunning desert views",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      price: 280,
      location: "Dubai",
      country: "United Arab Emirates"
    }
  ];

  module.exports = { data: sampleListings };
  