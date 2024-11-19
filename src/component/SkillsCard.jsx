import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  toggleSkillAccordion,
  updateSkillField,
  deleteSkill,
} from "../redux/skillsSlice";
import { Trash2 } from "lucide-react";

const SkillsCard = () => {
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    dispatch(updateSkillField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleSkillAccordion(index));
  };

  const handleAddNewSkill = () => {
    dispatch(addSkill());
  };

  const handleDeleteSkill = (index) => {
    dispatch(deleteSkill(index));
  };

  return (
    <div className="w-full max-w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Skills</h2>
      <p className="text-gray-600 mb-6">
        Add your skills and rate your proficiency.
      </p>

      {skills.map((skill, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-200 relative group"
        >
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {skill.name || "New Skill"}
            </div>
            <div className="text-sm text-gray-600">Level: {skill.level}</div>

            {/* Delete Button (Visible only if there are multiple skills) */}
            {skills.length > 1 && (
              <div
                className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggle when clicking delete
                  handleDeleteSkill(index);
                }}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
            )}
          </div>

          {skill.isOpen && (
            <div className="p-4 bg-white">
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  placeholder="Enter skill name"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Skill Level
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleFieldChange(index, "level", level)}
                      className={`px-2 py-1 text-sm ${
                        skill.level === level ? "bg-yellow-400" : "bg-gray-200"
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

      <button
        onClick={handleAddNewSkill}
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        + Add one more skill
      </button>
    </div>
  );
};

export default SkillsCard;
