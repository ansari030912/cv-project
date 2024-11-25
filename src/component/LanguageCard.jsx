import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addLanguage,
  toggleLanguageAccordion,
  updateLanguageField,
  deleteLanguage,
} from "../redux/languagesSlice";
import { Trash2 } from "lucide-react";

const LanguageCard = () => {
  const languages = useSelector((state) => state.languages);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    if (field === "language" && value.length > 20) return; // Limit language name to 20 characters
    dispatch(updateLanguageField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleLanguageAccordion(index));
  };

  const handleAddNewLanguage = () => {
    if (languages.length < 4) {
      dispatch(addLanguage());
    } else {
      alert("You can only add up to 4 languages.");
    }
  };

  const handleDeleteLanguage = (index) => {
    dispatch(deleteLanguage(index)); // Delete the selected language
  };

  const getProficiencyLabel = (level) => {
    switch (level) {
      case 5:
        return "Native";
      case 4:
        return "Very Good";
      case 3:
        return "Good";
      case 2:
        return "Weak";
      case 1:
        return "Poor";
      default:
        return "No Proficiency";
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Languages</h2>
      <p className="text-gray-600 mb-6">
        Add the languages you know and your proficiency level.
      </p>

      {languages.map((lang, index) => (
        <div
          key={lang.id}
          className="mb-4 border border-gray-200 relative group"
        >
          {/* Accordion Header */}
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {lang.language || "New Language"}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">
                {getProficiencyLabel(lang.proficiency)}
              </div>
              {/* Delete Button */}
              <div
                className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggle when clicking delete
                  handleDeleteLanguage(index);
                }}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Accordion Content */}
          {lang.isOpen && (
            <div className="p-4 bg-white">
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Language
                </label>
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) =>
                    handleFieldChange(index, "language", e.target.value)
                  }
                  placeholder="Enter language (e.g., English)"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {lang.language.length}/20 characters
                </p>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Proficiency
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        handleFieldChange(index, "proficiency", level)
                      }
                      className={`px-3 py-1 text-sm ${
                        lang.proficiency === level
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add New Language Button */}
      <button
        onClick={handleAddNewLanguage}
        className={`mt-4 ${
          languages.length >= 4
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={languages.length >= 4}
      >
        + Add new language
      </button>
    </div>
  );
};

export default LanguageCard;
