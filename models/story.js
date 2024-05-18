const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Please enter a name."],
    },
    artist: {
      type: String,
      required: [true, "Please enter an artist."],
    },
    song: {
      type: String,
      required: [true, "Please enter a song."],
    },
    memory: {
      type: String,
      required: [true, "Please enter a memory."],
    },
  },
  {
    timestamps: true,
  }
);

const collectionName = "stories";
const Story = mongoose.model("Story", storySchema, collectionName);
module.exports = Story;
