export const courses = [
  {
    id: 1,
    title: "HTML & CSS Basics",
    description: "Learn how to build beautiful static websites using HTML and CSS.",
    price: 499,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&h=400&fit=crop",
    rating: 4.5,
    reviews: 120,
    duration: "10h 20m"
  },
  {
    id: 2,
    title: "JavaScript Mastery",
    description: "Master JavaScript from scratch and build interactive web apps.",
    price: 799,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 95,
    duration: "25h 15m"
  },
  {
    id: 3,
    title: "React for Beginners",
    description: "Understand React.js concepts and build modern single-page applications.",
    price: 999,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 80,
    duration: "30h 00m"
  },
  {
    id: 4,
    title: "Java Programming",
    description: "Core Java programming concepts for beginners.",
    price: 699,
    category: "Programming",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=400&fit=crop",
    rating: 4.4,
    reviews: 60,
    duration: "40h 45m"
  },
  {
    id: 5,
    title: "C++ Mastery",
    description: "Learn C++ and object-oriented programming in depth.",
    price: 799,
    category: "Programming",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&h=400&fit=crop",
    rating: 4.6,
    reviews: 70,
    duration: "35h 20m"
  },
  {
    id: 6,
    title: "Python Essentials",
    description: "Get started with Python and explore data science basics.",
    price: 899,
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 85,
    duration: "22h 10m"
  },
  {
    id: 7,
    title: "Flutter Development",
    description: "Cross-platform mobile apps with Flutter and Dart.",
    price: 1299,
    category: "Mobile Dev",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?q=80&w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 55,
    duration: "50h 15m"
  },
  {
    id: 8,
    title: "DSA in C++",
    description: "Learn Data Structures and Algorithms using C++.",
    price: 1499,
    category: "Data Structures",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 100,
    duration: "80h 00m"
  },
  {
    id: 9,
    title: "SQL & Databases",
    description: "Understand SQL and manage relational databases effectively.",
    price: 699,
    category: "Databases",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&h=400&fit=crop",
    rating: 4.5,
    reviews: 50,
    duration: "15h 45m"
  },
  {
    id: 10,
    title: "MERN Stack Mastery 2026",
    description: "Build a production-ready SaaS platform using MongoDB, Express, React, and Node.",
    price: 4999,
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 210,
    duration: "45h 30m"
  },
  {
    id: 11,
    title: "Real-time Systems with WebSockets",
    description: "Master Socket.io and WebRTC to build collaborative tools like SyncCode.",
    price: 2499,
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 145,
    duration: "18h 15m"
  },
  {
    id: 12,
    title: "Advanced DSA for Placements",
    description: "Cracking the coding interview with 400+ solved problems on LeetCode.",
    price: 3500,
    category: "Interview Prep",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&h=400&fit=crop",
    rating: 5.0,
    reviews: 320,
    duration: "60h 00m"
  }
];


// Add this helper component or constant in your Courses file
// const CourseIllustration = ({ category }) => {
//   switch (category) {
//     case "Web Development":
//       return (
//         <svg viewBox="0 0 200 120" className="w-full h-full p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
//           <rect x="20" y="20" width="160" height="80" rx="10" fill="white" stroke="#3b82f6" strokeWidth="2" />
//           <path d="M40 40h120M40 60h80M40 80h40" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
//           <circle cx="150" cy="80" r="15" fill="#3b82f6" fillOpacity="0.2" />
//           <text x="142" y="85" fill="#3b82f6" fontSize="12" fontWeight="bold">JS</text>
//         </svg>
//       );
//     case "Data Structures":
//       return (
//         <svg viewBox="0 0 200 120" className="w-full h-full p-8 bg-gradient-to-br from-slate-50 to-blue-100">
//           <circle cx="100" cy="30" r="12" fill="white" stroke="#3b82f6" strokeWidth="2" />
//           <circle cx="60" cy="80" r="12" fill="white" stroke="#3b82f6" strokeWidth="2" />
//           <circle cx="140" cy="80" r="12" fill="white" stroke="#3b82f6" strokeWidth="2" />
//           <line x1="90" y1="40" x2="70" y2="70" stroke="#3b82f6" strokeWidth="2" />
//           <line x1="110" y1="40" x2="130" y2="70" stroke="#3b82f6" strokeWidth="2" />
//         </svg>
//       );
//     case "Full Stack":
//       return (
//         <svg viewBox="0 0 200 120" className="w-full h-full p-8 bg-gradient-to-br from-indigo-50 to-purple-100">
//           <rect x="40" y="30" width="120" height="60" rx="8" fill="white" stroke="#6366f1" strokeWidth="2" />
//           <rect x="30" y="40" width="120" height="60" rx="8" fill="white" stroke="#818cf8" strokeWidth="2" opacity="0.6" />
//           <circle cx="100" cy="60" r="10" fill="#6366f1" />
//         </svg>
//       );
//     default:
//       return (
//         <svg viewBox="0 0 200 120" className="w-full h-full p-8 bg-slate-100">
//           <path d="M60 40l40 20-40 20V40z" fill="#3b82f6" />
//           <rect x="110" y="45" width="40" height="5" rx="2" fill="#cbd5e1" />
//           <rect x="110" y="60" width="30" height="5" rx="2" fill="#cbd5e1" />
//         </svg>
//       );
//   }
// };

// export const courses = [
//   {
//     id: 1,
//     title: "MERN Stack Mastery 2026",
//     description: "Production-grade SaaS architecture with advanced patterns.",
//     price: 4999,
//     category: "Full Stack",
//     imageType: "svg", // New flag
//     rating: 4.9,
//     reviews: 210,
//     duration: "45h 30m"
//   },
//   {
//     id: 2,
//     title: "Advanced DSA for Placements",
//     description: "Mastering competitive programming and system design.",
//     price: 3500,
//     category: "Data Structures",
//     imageType: "svg",
//     rating: 5.0,
//     reviews: 320,
//     duration: "60h 00m"
//   },
//   {
//     id: 3,
//     title: "Real-time WebSockets",
//     description: "Building collaborative tools like SyncCode using Socket.io.",
//     price: 2499,
//     category: "Web Development",
//     imageType: "svg",
//     rating: 4.8,
//     reviews: 145,
//     duration: "18h 15m"
//   }
// ];