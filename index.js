const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

async function createCourse() {
  const Course = mongoose.model("Course", courseSchema);
  const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const Course = mongoose.model("Course", courseSchema);

  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  const courses = await Course
    //.find({ price: { $gte: 10, $lte: 20 } })
    //.find({ price: { $in: [10, 15, 20] } })
    //.find({ author: "Mosh", isPublished: true })

    //.find()
    //.or([{ author: "Mosh" }, { isPublished: true }])
    //.and([{ author: "Mosh" }, { isPublished: true }])

    // Starts with Mosh (RegEx)
    .find({ author: /^Mosh/ })
    // Ends with Hamedani
    .find({ author: /Mamedani$/i })
    // Contains Mosh
    .find({ author: /.*Mosh.*/i })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .count(); Returns Count
  //.skip();
  console.log(courses);
}

getCourses();
