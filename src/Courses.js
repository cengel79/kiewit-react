import React from "react";
import * as courseApi from "./api/courseApi.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class Courses extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    courseApi
      .getCourses()
      .then(courses => {
        this.setState({ courses: courses });
      })
      .catch(error => {
        toast.error("Failed to get course work. Error: " + error.message);
      });
  }

  async deleteCourse(event, courseId) {
    try {
      await courseApi.deleteCourse(courseId);
      const courses = this.state.courses.filter(
        course => course.id !== courseId
      );
      this.setState({ courses });
    } catch (error) {
      toast.error("Sorry, delete failed. Error: " + error.message);
    }
  }

  renderTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {this.state.courses.map(course => (
            <tr key={course.id}>
              <td>
                <button onClick={event => this.deleteCourse(event, course.id)}>
                  Delete
                </button>
              </td>
              <td>{course.id}</td>
              <td>
                <Link to={"course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <>
        <h1>Courses</h1>
        <ToastContainer />
        {this.renderTable()}
      </>
    );
  }
}

export default Courses;
