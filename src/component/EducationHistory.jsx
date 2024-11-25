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

    // Total character count = plain text + (lineBreaks * 20)
    return plainText.length + lineBreaks * 20;
  };

  const handleFieldChange = (index, field, value) => {
    if (field === "description") {
      const charCount = calculateCharCount(value);

      // Prevent adding characters if the limit is reached
      if (
        charCount > 150 &&
        calculateCharCount(educationList[index].description) === 150
      ) {
        return;
      }

      // Allow changes if within the limit or content is being removed
      if (
        charCount <= 150 ||
        value.length < educationList[index].description.length
      ) {
        dispatch(updateEducationField({ index, field, value }));
      }
    } else {
      // Apply character limits for specific fields
      const limits = {
        degree: 30,
        school_name: 40,
        city: 12,
      };
      if (limits[field] && value.length > limits[field]) return;
      dispatch(updateEducationField({ index, field, value }));
    }
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleEducationAccordion(index));
  };

  const handleAddNewEducation = () => {
    if (educationList.length < 3) {
      dispatch(addEducation());
    } else {
      alert("You can only add up to 3 education entries.");
    }
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
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Education</h2>
      <p className="text-gray-600 mb-6">
        Add your educational background below.
      </p>

      {educationList.map((education, index) => {
        const charCount = calculateCharCount(education.description);
        const exceededChars = charCount > 150 ? charCount - 150 : 0;

        return (
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
                    ? `${new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(
                        new Date(education.start_date)
                      )} - ${new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(education.end_date))}`
                    : "Date not specified"}
                </div>

                {/* Delete button */}
                <div
                  className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle when clicking delete
                    handleDeleteEducation(index);
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </div>
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
                  <div className="text-right">
                    {" "}
                    <div className=" mt-2">
                      <span
                        className={`text-sm ${
                          charCount > 150 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        <span className="text-gray-500">Character Limit:</span>{" "}
                        {charCount}/{150}
                      </span>
                      {charCount > 150 && (
                        <p className="text-red-500 text-xs">
                          Exceeded limit by <strong>{exceededChars}</strong>{" "}
                          characters.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}

      <button
        onClick={handleAddNewEducation}
        className={`mt-4 ${
          educationList.length >= 3
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={educationList.length >= 3}
      >
        + Add new education
      </button>
    </div>
  );
};

export default EducationHistory;
