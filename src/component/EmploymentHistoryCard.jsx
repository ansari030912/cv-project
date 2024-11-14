import React from "react";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployment,
  toggleEmploymentAccordion,
  updateEmploymentField,
  deleteEmployment,
} from "../redux/employmentSlice";

import "react-quill/dist/quill.snow.css";
import { Trash2 } from "lucide-react";

const EmploymentHistoryCard = () => {
  const employmentHistory = useSelector((state) => state.employment);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    dispatch(updateEmploymentField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleEmploymentAccordion(index));
  };

  const handleAddNewEmployment = () => {
    dispatch(addEmployment());
  };

  const handleDeleteEmployment = (index) => {
    dispatch(deleteEmployment(index));
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Employment History</h2>
      <p className="text-gray-600 mb-6">Add your employment history below.</p>

      {employmentHistory.map((job, index) => (
        <div
          key={job.id}
          className="mb-4 border border-gray-200 relative group"
        >
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {job.job_title || "New Job"}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                {job.start_date && (job.is_current ? "Present" : job.end_date)
                  ? `${job.start_date} - ${
                      job.is_current ? "Present" : job.end_date
                    }`
                  : "Dates not specified"}
              </div>
              {employmentHistory.length > 1 && (
                <div
                  className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle when clicking delete
                    handleDeleteEmployment(index);
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
          </div>

          {job.isOpen && (
            <>
              <div className="p-4 bg-white grid gap-6 md:grid-cols-2">
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={job.job_title}
                    onChange={(e) =>
                      handleFieldChange(index, "job_title", e.target.value)
                    }
                    placeholder="Enter job title"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Employer
                  </label>
                  <input
                    type="text"
                    value={job.employer}
                    onChange={(e) =>
                      handleFieldChange(index, "employer", e.target.value)
                    }
                    placeholder="Enter employer"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={job.city}
                    onChange={(e) =>
                      handleFieldChange(index, "city", e.target.value)
                    }
                    placeholder="Enter city"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={job.start_date}
                      onChange={(e) =>
                        handleFieldChange(index, "start_date", e.target.value)
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
                      value={job.end_date}
                      onChange={(e) =>
                        handleFieldChange(index, "end_date", e.target.value)
                      }
                      disabled={job.is_current}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={job.is_current}
                    onChange={(e) =>
                      handleFieldChange(index, "is_current", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Currently working here
                  </label>
                </div>
              </div>
              <div className="mb-4 px-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={job.description}
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
        onClick={handleAddNewEmployment}
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        + Add new job
      </button>
    </div>
  );
};

export default EmploymentHistoryCard;
