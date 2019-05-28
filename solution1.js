const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises", {
  useNewUrlParser: true
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    //match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function createCourse() {
  const course = new Course({
    //name: "Angular Course",
    category: "-",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

createCourse();

//run();
