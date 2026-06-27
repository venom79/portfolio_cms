import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    tag: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    story: {
      type: String,
      required: true,
      trim: true,
    },

    techStack: [
      {
        type: String,
      },
    ],

    features: [
      {
        type: String,
      },
    ],

    github: {
      type: String,
      default: "",
    },

    liveDemo: {
      type: String,
      default: "",
    },

    thumbnail: {
      url: String,
      publicId: String,
    },

    gallery: [
      {
        url: String,
        publicId: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Completed", "In Progress", "Archived"],
      default: "Completed",
    },

    order: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
