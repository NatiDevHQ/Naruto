const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Project",
  },
  icon: {
    type: String,
    default: "fas fa-code",
  },
  iconColor: {
    type: String,
    default: "text-blue-500",
  },
  link: {
    type: String,
    default: "#",
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
