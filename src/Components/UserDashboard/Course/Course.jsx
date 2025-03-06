import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Course = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState({});

  // Load courses from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then((response) => {
        console.log("Fetched courses:", response.data);
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Load enrolled courses
  useEffect(() => {
    if (user?.userId) {
      axios.get(`http://localhost:5000/api/enrolled-courses/${user.userId}`)
        .then((response) => {
          const enrolled = {};
          response.data.forEach((course) => {
            enrolled[course.courseId] = course.status; // Store enrollment status
          });
          setEnrolledCourses(enrolled);
        })
        .catch((error) => console.error("Error fetching enrolled courses:", error));
    }
  }, [user?.userId]);

  const handleEnrollClick = async (courseId) => {
    if (enrolledCourses[courseId]) {
      alert("You are already enrolled in this course!");
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5000/api/enroll", {
        userId: user?.userId,
        courseId: courseId,
      });

      if (response.status === 201) {
        setEnrolledCourses({ ...enrolledCourses, [courseId]: "Pending" });
        alert("Enrollment successful! ");
      } else {
        alert("Enrollment failed.");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>
      <p>Welcome, {user?.email || "Guest"}!</p>
      <br />
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="card mb-3 p-3">
            <h3>{course.courseName}</h3>
            <p><strong>Lecturer:</strong> {course.lecturer}</p>
            <p><strong>Course ID:</strong> {course.courseId}</p>
            <p><strong>Start Date:</strong> {course.startDate}</p>
            <p><strong>End Date:</strong> {course.endDate}</p>
            <p><strong>Status:</strong> {course.status}</p>
            <p>{course.courseDescription}</p>

            {enrolledCourses[course.id] === "Pending" ? (
              <button className="btn btn-warning" disabled>Pending</button>
            ) : enrolledCourses[course.id] === "Enrolled" ? (
              <button className="btn btn-success" disabled>Enrolled</button>
            ) : (
              <button className="btn btn-danger" onClick={() => handleEnrollClick(course.id)}>Enroll</button>
            )}
            <br /><br />
          </div>
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default Course;
