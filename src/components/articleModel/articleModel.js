const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  articleId: { type: String, unique: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  dateOfCreation: { type: Date, default: Date.now },
  dateOfModification: { type: Date, default: Date.now },
  username: { type: String, required: true },
  comments: { type: Array, default: [] },
  status: { type: Boolean, default: true }, // Soft delete flag
});

// Export the model
const Articlescollections = mongoose.model("articles", ArticleSchema);
module.exports = Articlescollections;
