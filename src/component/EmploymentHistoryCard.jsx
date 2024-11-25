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

  const calculateCharCount = (value) => {
    // Remove HTML tags and normalize spaces for plain text character count
    const plainText = value
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Count the number of line breaks (<p> tags)
    let lineBreaks = (value.match(/<p>/g) || []).length;

    // If content is empty, no character count
    if (plainText === "") return 0;

    // Exclude the first paragraph from the line break count
    lineBreaks = Math.max(0, lineBreaks - 1);

    // Total character count = plain text + (lineBreaks * 15)
    return plainText.length + lineBreaks * 15;
  };

  const getExcessCharacters = (value) => {
    const plainText = value
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const excessChars = plainText.length - 150;
    return excessChars > 0 ? plainText.slice(-excessChars) : null;
  };

  const handleFieldChange = (index, field, value) => {
    if (field === "description") {
      const charCount = calculateCharCount(value);

      // Prevent adding characters if the limit is reached
      if (
        charCount > 150 &&
        calculateCharCount(employmentHistory[index].description) === 150
      ) {
        return;
      }

      // Allow changes if within the limit or content is being removed
      if (
        charCount <= 150 ||
        value.length < employmentHistory[index].description.length
      ) {
        dispatch(updateEmploymentField({ index, field, value }));
      }
    } else {
      // Enforce character limits for other fields
      const limits = {
        job_title: 30,
        employer: 20,
        city: 20,
      };

      if (limits[field] && value.length > limits[field]) return;
      dispatch(updateEmploymentField({ index, field, value }));
    }
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleEmploymentAccordion(index));
  };

  const handleAddNewEmployment = () => {
    if (employmentHistory.length < 2) {
      dispatch(addEmployment());
    } else {
      alert("You can only add up to 2 employment entries.");
    }
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
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        Employment History
      </h2>
      <p className="text-gray-600 mb-6">Add your employment history below.</p>

      {employmentHistory.map((job, index) => {
        const charCount = calculateCharCount(job.description);
        const exceededChars = charCount > 150 ? charCount - 150 : 0;
        const excessText = charCount > 150 ? getExcessCharacters(job.description) : "";

        return (
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
                    ? `${job.start_date} - ${job.is_current ? "Present" : job.end_date}`
                    : "Dates not specified"}
                </div>
                <div
                  className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteEmployment(index);
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
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
                  <p
                    className={`text-sm mt-2 text-right ${
                      charCount < 100
                        ? "text-gray-500"
                        : charCount <= 120
                        ? "text-yellow-500"
                        : charCount <= 150
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span className="text-gray-500">Character Limit:</span>{" "}
                    {charCount}/{150}
                  </p>
                  {charCount > 150 && (
                    <p className="text-red-500 text-xs">
                      Exceeded limit by <strong>{exceededChars}</strong>{" "}
                      characters. Remove: <strong>{excessText}</strong>
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}

      <button
        onClick={handleAddNewEmployment}
        className={`mt-4 ${
          employmentHistory.length >= 2
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={employmentHistory.length >= 2}
      >
        + Add new job
      </button>
    </div>
  );
};

export default EmploymentHistoryCard;
