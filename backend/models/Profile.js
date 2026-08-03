const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Natnael (nati)"
  },
  bio: {
    type: String,
    required: true,
    default: "Available for work"
  },
  description: {
    type: String,
    required: true,
    default: "I'm a creative software developer..."
  },
  profileImage: {
    type: String,
    default: "images/natiIMG.jpg"
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
