import React from "react";
import ReactQuill from "react-quill";
import { useSelector, useDispatch } from "react-redux";
import {
  addInternship,
  toggleInternshipAccordion,
  updateInternshipField,
  deleteInternship,
} from "../redux/internshipsSlice";
import "react-quill/dist/quill.snow.css";
import { Trash2 } from "lucide-react";

const InternShipCard = () => {
  const internships = useSelector((state) => state.internships);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    const limits = {
      job_title: 30,
      company: 40,
      city: 20,
      description: 150,
    };

    // Enforce character limits
    if (limits[field] && value.length > limits[field]) return;
    dispatch(updateInternshipField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleInternshipAccordion(index));
  };

  const handleAddNewInternship = () => {
    if (internships.length < 3) {
      dispatch(addInternship());
    } else {
      alert("You can only add up to 3 internships.");
    }
  };

  const handleDeleteInternship = (index) => {
    dispatch(deleteInternship(index));
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Internships</h2>
      <p className="text-gray-600 mb-6">
        Add details of your internships below.
      </p>

      {internships.map((internship, index) => (
        <div
          key={internship.id}
          className="mb-4 border border-gray-200 relative group"
        >
          {/* Accordion Header */}
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {internship.job_title || "New Internship"}
            </div>
            {/* Delete Button */}
            <div
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteInternship(index); // Delete any index, including the last one
              }}
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {/* Accordion Content */}
          {internship.isOpen && (
            <>
              <div className="p-4 bg-white grid gap-6 md:grid-cols-2">
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={internship.job_title}
                    onChange={(e) =>
                      handleFieldChange(index, "job_title", e.target.value)
                    }
                    placeholder="Enter job title"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    value={internship.company}
                    onChange={(e) =>
                      handleFieldChange(index, "company", e.target.value)
                    }
                    placeholder="Enter company name"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    value={internship.city}
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
                      value={internship.start_date}
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
                      value={internship.end_date}
                      onChange={(e) =>
                        handleFieldChange(index, "end_date", e.target.value)
                      }
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 px-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <ReactQuill
                  theme="snow"
                  value={internship.description}
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
                    internship.description.length < 100
                      ? "text-gray-500"
                      : internship.description.length <= 120
                      ? "text-yellow-500"
                      : internship.description.length <= 150
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <span className="text-gray-500">Character Limit:</span>{" "}
                  {internship.description.length}/{150}
                </p>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        onClick={handleAddNewInternship}
        className={`mt-4 ${
          internships.length >= 3
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={internships.length >= 3}
      >
        + Add new internship
      </button>
    </div>
  );
};

export default InternShipCard;
