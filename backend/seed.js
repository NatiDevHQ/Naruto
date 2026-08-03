const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Project = require('./models/Project');
const Profile = require('./models/Profile');

dotenv.config();

const projectsData = [
  {
    title: "Yuno App",
    description: "Gamified quiz app for students with leaderboards and progress tracking",
    label: "Mobile App",
    icon: "fas fa-gamepad",
    iconColor: "text-blue-400",
  },
  {
    title: "TalmidX",
    description: "Learning Management System with authentication and analytics",
    label: "Web App",
    icon: "fas fa-graduation-cap",
    iconColor: "text-purple-400",
    link: "https://talmidx.vercel.app/",
  },
  {
    title: "Gateway System",
    description: "NFC-based gate control with real-time requests and role-based access",
    label: "IoT",
    icon: "fas fa-door-open",
    iconColor: "text-green-400",
    link: "https://gate-one-nu.vercel.app/",
  },
  {
    title: "Hagare",
    description: "A modern web application built for the community.",
    label: "Web App",
    icon: "fas fa-globe-africa",
    iconColor: "text-yellow-400",
    link: "https://hagare.vercel.app/",
  },
  {
    title: "Disruptor",
    description: "Innovative web solution focused on modern disruption.",
    label: "Web App",
    icon: "fas fa-bolt",
    iconColor: "text-red-400",
    link: "https://disruptor-nine.vercel.app/",
  },
  {
    title: "Boulevard",
    description: "Elegant web interface showcasing digital presence.",
    label: "Web App",
    icon: "fas fa-road",
    iconColor: "text-gray-400",
    link: "https://boulevard-drab.vercel.app/",
  },
  {
    title: "Spax Clone",
    description: "A fully functional clone of a modern application.",
    label: "Web App",
    icon: "fas fa-clone",
    iconColor: "text-blue-500",
    link: "https://spax-clone.vercel.app/",
  },
  {
    title: "Bright Real Estate",
    description: "Property listing and real estate management platform.",
    label: "Website",
    icon: "fas fa-building",
    iconColor: "text-blue-300",
    link: "https://bright-realestate.com/",
  },
  {
    title: "Hamamat Spa",
    description: "Serene business website for spa and wellness center.",
    label: "Website",
    icon: "fas fa-spa",
    iconColor: "text-pink-400",
    link: "https://hamamatspa.netlify.app/",
  },
  {
    title: "Inhub Studio",
    description: "Creative studio portfolio and service showcase.",
    label: "Agency",
    icon: "fas fa-paint-brush",
    iconColor: "text-purple-500",
    link: "https://inhubstudio.com/",
  },
  {
    title: "Solo Industrial",
    description: "Corporate website for industrial manufacturing and services.",
    label: "Corporate",
    icon: "fas fa-industry",
    iconColor: "text-gray-500",
    link: "https://www.soloindustrial.et/",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing projects...');
    await Project.deleteMany();

    console.log('Inserting projects...');
    await Project.insertMany(projectsData);
    console.log('Projects successfully seeded!');

    console.log('Updating profile...');
    const profileData = {
      name: "Hey, I'm Natnael (nati)",
      bio: "Available for work",
      description: "I'm a creative software developer with experience in full-stack development, UI/UX design. I specialize in building engaging user experiences with great attention to detail and performance. I've helped improve app responsiveness by 20% and increased user engagement by 40% through optimized solutions.",
      profileImage: "images/natiIMG.jpg"
    };

    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      await Profile.create(profileData);
      console.log('Created new profile!');
    } else {
      await Profile.findByIdAndUpdate(existingProfile._id, profileData);
      console.log('Updated existing profile!');
    }

    console.log('Database successfully seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

