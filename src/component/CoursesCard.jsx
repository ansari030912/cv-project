import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  updateCourseField,
  toggleCourseAccordion,
  deleteCourse,
  setSingleOpenAccordion,
} from "../redux/coursesSlice";
import { Trash2 } from "lucide-react";

const CoursesCard = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const handleCourseChange = (index, field, value) => {
    dispatch(updateCourseField({ index, field, value }));
  };

  const handleAddCourse = () => {
    if (courses.length < 3) {
      // Add a new course and ensure it is the only open accordion
      dispatch(addCourse());
      dispatch(setSingleOpenAccordion(courses.length)); // Open the newly added course
    }
  };

  const handleToggleAccordion = (index) => {
    if (courses[index].isOpen) {
      // Close the accordion if it's already open
      dispatch(toggleCourseAccordion(index));
    } else {
      // Open the selected accordion and close others
      dispatch(setSingleOpenAccordion(index));
    }
  };

  const handleDeleteCourse = (index) => {
    dispatch(deleteCourse(index));
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Courses</h2>
      <p className="text-gray-600 mb-6">
        Add details of courses you've completed below.
      </p>

      {courses.map((course, index) => (
        <div
          key={course.id}
          className="mb-4 border border-gray-200 relative group"
        >
          {/* Accordion Header */}
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {course.title || "New Course"}
            </div>

            {/* Show delete icon */}
            <div
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggle when clicking delete
                handleDeleteCourse(index);
              }}
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {/* Accordion Content */}
          {course.isOpen && (
            <div className="p-4 bg-white grid gap-6 md:grid-cols-2">
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Course Title
                </label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) =>
                    handleCourseChange(index, "title", e.target.value)
                  }
                  placeholder="Enter course title"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  value={course.institution}
                  onChange={(e) =>
                    handleCourseChange(index, "institution", e.target.value)
                  }
                  placeholder="Enter institution name"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={course.start_date}
                  onChange={(e) =>
                    handleCourseChange(index, "start_date", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={course.end_date}
                  onChange={(e) =>
                    handleCourseChange(index, "end_date", e.target.value)
                  }
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Course Button */}
      <button
        onClick={handleAddCourse}
        className={`mt-4 ${
          courses.length >= 3
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={courses.length >= 3}
      >
        + Add new course
      </button>
    </div>
  );
};

export default CoursesCard;
