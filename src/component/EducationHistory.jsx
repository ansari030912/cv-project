import React from "react";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import {
  addEducation,
  toggleEducationAccordion,
  updateEducationField,
  deleteEducation,
} from "../redux/educationSlice";

import "react-quill/dist/quill.snow.css";
import { Trash2 } from "lucide-react";

const EducationHistory = () => {
  const educationList = useSelector((state) => state.education);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    dispatch(updateEducationField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleEducationAccordion(index));
  };

  const handleAddNewEducation = () => {
    dispatch(addEducation());
  };

  const handleDeleteEducation = (index) => {
    dispatch(deleteEducation(index));
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <p className="text-gray-600 mb-6">
        Add your educational background below.
      </p>

      {educationList.map((education, index) => (
        <div
          key={education.id}
          className="mb-4 border border-gray-200 relative group"
        >
          {/* Accordion Header */}
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {education.degree || "New Degree"}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                {education.start_date && education.end_date
                  ? `${education.start_date} - ${education.end_date}`
                  : "Date not specified"}
              </div>

              {/* Delete button, only show if there are multiple entries */}
              {educationList.length > 1 && (
                <div
                  className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle when clicking delete
                    handleDeleteEducation(index);
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
          </div>

          {/* Accordion Content */}
          {education.isOpen && (
            <>
              <div className="p-4 bg-white grid gap-6 md:grid-cols-2">
                <div className="mb-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={education.degree}
                    onChange={(e) =>
                      handleFieldChange(index, "degree", e.target.value)
                    }
                    placeholder="Enter degree"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    value={education.school_name}
                    onChange={(e) =>
                      handleFieldChange(index, "school_name", e.target.value)
                    }
                    placeholder="Enter school name"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={education.city}
                    onChange={(e) =>
                      handleFieldChange(index, "city", e.target.value)
                    }
                    placeholder="Enter city"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div className="mb-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={education.start_date}
                      onChange={(e) =>
                        handleFieldChange(index, "start_date", e.target.value)
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={education.end_date}
                      onChange={(e) =>
                        handleFieldChange(index, "end_date", e.target.value)
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 px-4 bg-white">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={education.description}
                  onChange={(value) =>
                    handleFieldChange(index, "description", value)
                  }
                  modules={modules}
                  formats={formats}
                  placeholder="Start writing here..."
                  className="custom-quill"
                  style={{ width: "100%" }}
                />
              </div>
            </>
          )}
        </div>
      ))}

      <button
        onClick={handleAddNewEducation}
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        + Add new education
      </button>
    </div>
  );
};

export default EducationHistory;
