const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB..."));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);
  //const courses = await Course.find({ isPublished: true, tags: "backend" })
  // .sort({ name: 1 })
  // .select({ name: 1, author: 1 });
  const courses = await Course.find();
  return courses;
}

async function updateCourse(id) {
  // Approach: Query first
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.auther - "Another Author";

  const result = await course.save();
  console.log(result);
}

async function removecourse(id) {
  const result = await Course.deleteOne({ _id: id });

  console.log(result);
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

getCourses();
