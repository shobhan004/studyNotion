const mongoose = require("mongoose");
const Course = require("./models/Course");

mongoose.connect("mongodb+srv://shobhanbhagwati2004:Y8FyEBS05ZSvuE9F@cluster0.nfc9q9v.mongodb.net/project")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const seedCourses = async () => {
  await Course.deleteMany(); // Purane delete ho jayenge
  const courses = [
{
    Id:1,
    title: "HTML & CSS Basics",
    description: "Learn how to build beautiful static websites using HTML and CSS.",
    price: 499,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHRtbCUyMGNzc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    reviews: 120
  },
  {
    Id:2,
    title: "JavaScript ",
    description: "Master JavaScript from scratch and build interactive web apps.",
    price: 799,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.7,
    reviews: 95
  },
  {
    Id:3,
    title: "React for Beginners",
    description: "Understand React.js concepts and build modern single-page applications.",
    price: 999,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhY3R8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    reviews: 80
  },
  {
    Id:3,
    title: "Java Programming",
    description: "Core Java programming concepts for beginners.",
    price: 699,
    category: "Programming Fundamentals",
    image: "https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amF2YXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.4,
    reviews: 60
  },
  {
    Id:4,
    title: "C++ Mastery",
    description: "Learn C++ and object-oriented programming in depth.",
    price: 799,
    category: "Programming Fundamentals",
    image: "https://images.unsplash.com/photo-1635775017492-1eb935a082a4?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YyUyQiUyQiUyMHByb2dyYW1taW5nfGVufDB8fDB8fHww",
    rating: 4.6,
    reviews: 70
  },
  {
    Id:5,
    title: "Python Essentials",
    description: "Get started with Python and explore data science basics.",
    price: 899,
    category: "Programming Fundamentals",
    image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?w=600h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9uJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D",
    rating: 4.7,
    reviews: 85
  },
  {
    Id:6,
    title: "Kotlin for Android",
    description: "Learn Kotlin and start building Android apps.",
    price: 999,
    category: "Android Development",
    image: "https://images.unsplash.com/photo-1588690154757-badf4644190f?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a290bGlufGVufDB8fDB8fHww",
    rating: 4.6,
    reviews: 40
  },
  {
    Id:7,
    title: "Flutter Development",
    description: "Cross-platform mobile apps with Flutter and Dart.",
    price: 1299,
    category: "Android Development",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmx1dHRlcnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.7,
    reviews: 55
  },
  {
    Id:8,
    title: "DSA in C++",
    description: "Learn Data Structures and Algorithms using C++.",
    price: 1499,
    category: "Data Structures",
    image: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=600&h=400&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    reviews: 100
  },
  {
    Id:9,
    title: "SQL & Databases",
    description: "Understand SQL and manage relational databases effectively.",
    price: 699,
    category: "Databases",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3FsfGVufDB8fDB8fHww",
    rating: 4.5,
    reviews: 50
  }
  ];

  await Course.insertMany(courses);
  console.log("Courses Seeded ✅");
  process.exit();
};

seedCourses();
