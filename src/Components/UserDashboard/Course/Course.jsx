import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext.jsx"; 
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from "@emailjs/browser";

const Course = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    if (user?.userId) {
      axios.get(`http://localhost:5000/api/enrolled-courses/${user.userId}`)
        .then((response) => {
          const enrolled = {};
          response.data.forEach((course) => {
            enrolled[course.courseId] = { 
              status: course.status, 
              orderId: course.orderId 
            };
          });
          setEnrolledCourses(enrolled);
        })
        .catch((error) => console.error("Error fetching enrolled courses:", error));
    }
  }, [user?.userId]);

  const handleEnrollClick = async (courseId, courseName, lecturer) => {
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
        const { orderId } = response.data;

        setEnrolledCourses({ 
          ...enrolledCourses, 
          [courseId]: { status: "Pending", orderId } 
        });

        alert(`Enrollment successful! Order ID: ${orderId}`);
        
        // Send email notification
        sendEmail(user.email, courseName, lecturer, orderId);
      } else {
        alert("Enrollment failed.");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll. Please try again.");
    }
  };

  const sendEmail = (userEmail, courseName, lecturer, orderId) => {
    const emailParams = {
      user_email: userEmail,
      course_name: courseName,
      lecturer_name: lecturer,
      order_id: orderId,
    };
  
    emailjs.send(
      "service_ekyud9w", // Your EmailJS Service ID
      "template_tfvhsob", // Your EmailJS Template ID
      emailParams, 
      "XCeRk44XQgEGM0Cft" // Your EmailJS Public Key
    )
    .then((response) => {
      console.log("Email sent successfully:", response);
      alert("Enrollment confirmation email sent!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    });
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

            {enrolledCourses[course.id]?.orderId && (
              <p>
                <strong>Order ID:</strong>  {enrolledCourses[course.id].orderId} 
                <br /><br />
                <button 
                  type="button" 
                  className="btn btn-dark" 
                  onClick={() => sendEmail(user.email, course.courseName, course.lecturer, enrolledCourses[course.id].orderId)}
                >
                  Send Email
                </button>
              </p>
            )}

            {enrolledCourses[course.id]?.status === "Pending" ? (
              <button className="btn btn-warning" disabled>Pending</button>
            ) : enrolledCourses[course.id]?.status === "Enrolled" ? (
              <button className="btn btn-success" disabled>Enrolled</button>
            ) : (
              <button 
                className="btn btn-danger" 
                onClick={() => handleEnrollClick(course.id, course.courseName, course.lecturer)}
              >
                Enroll
              </button>
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
