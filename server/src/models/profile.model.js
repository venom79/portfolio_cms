import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      required: true,
      trim: true,
    },

    profileImage: {
      url: String,
      publicId: String,
    },

    resume: {
      url: String,
      publicId: String,
    },

    about: {
      type: String,
      required: true,
    },

    quote: {
      type: String,
      required: true,
    },

    contacts: {
      github: String,
      linkedin: String,
      email: String,
    },

    stats: {
      role: String,
      learning: String,
      stronghold: String,
      activeMission: String,
      preferredArms: String,
      sideQuest: String,
    },

    beyondCode: {
      type: String,
      default: "",
    },

    skills: {
      backend: [String],
      frontend: [String],
      tools: [String],
    },

    experience: [experienceSchema],
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
