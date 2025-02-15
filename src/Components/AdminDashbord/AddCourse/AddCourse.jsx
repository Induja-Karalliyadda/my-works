import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserCourse() {
  const [course, setCourse] = useState({
    courseId: "",
    courseName: "",
    lecturer: "",
    duration: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handleChange = (e) => setCourse({ ...course, [e.target.name]: e.target.value });
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await axios.put(`http://localhost:5000/api/courses/${editingCourseId}`, course);
      } else {
        await axios.post("http://localhost:5000/api/courses", course);
      }
      fetchCourses();
      setShowModal(false);
      setCourse({ courseId: "", courseName: "", lecturer: "", duration: "", startDate: "", endDate: "", status: "Active" });
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  const handleEdit = (c) => {
    setCourse({ ...c });
    setEditingCourseId(c.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        fetchCourses();
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Online Course Management</h2>
      <input type="text" className="form-control mb-4" placeholder="Search by Course ID or Name" value={searchQuery} onChange={handleSearchChange} />
      <button className="btn btn-primary mb-4" onClick={() => { setShowModal(true); setEditingCourseId(null); }}>Add Course</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Lecturer</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((c) => (
            <tr key={c.id}>
              <td>{c.courseId}</td>
              <td>{c.courseName}</td>
              <td>{c.lecturer}</td>
              <td>{c.duration} hours</td>
              <td>{c.startDate}</td>
              <td>{c.endDate}</td>
              <td>{c.status}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(c)}>Edit</button>
                <br />
                
                <button className="btn btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingCourseId ? "Edit Course" : "Add Course"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Course ID</label>
                    <input type="text" className="form-control" name="courseId" value={course.courseId} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input type="text" className="form-control" name="courseName" value={course.courseName} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Lecturer</label>
                    <input type="text" className="form-control" name="lecturer" value={course.lecturer} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration (hours)</label>
                    <input type="number" className="form-control" name="duration" value={course.duration} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={course.startDate} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" name="endDate" value={course.endDate} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={course.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">{editingCourseId ? "Update Course" : "Add Course"}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCourse;
