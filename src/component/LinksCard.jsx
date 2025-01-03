import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addLink,
  toggleLinkAccordion,
  updateLinkField,
  deleteLink,
} from "../redux/linksSlice";
import { Trash2 } from "lucide-react";

const LinksCard = () => {
  const links = useSelector((state) => state.links);
  const dispatch = useDispatch();

  const handleFieldChange = (index, field, value) => {
    if (field === "label" && value.length > 20) return; // Limit label to 20 characters
    dispatch(updateLinkField({ index, field, value }));
  };

  const handleToggleAccordion = (index) => {
    dispatch(toggleLinkAccordion(index));
  };

  const handleAddNewLink = () => {
    if (links.length < 3) {
      dispatch(addLink());
    } else {
      alert("You can only add up to 3 links.");
    }
  };

  const handleDeleteLink = (index) => {
    dispatch(deleteLink(index)); // Delete any index, including the last one
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Links</h2>
      <p className="text-gray-600 mb-6">
        Add links to your profiles or websites below.
      </p>

      {links.map((link, index) => (
        <div
          key={link.id}
          className="mb-4 border border-gray-200 relative group"
        >
          <div
            onClick={() => handleToggleAccordion(index)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div className="text-lg font-semibold text-gray-800">
              {link.label || "New Link"}
            </div>

            {/* Delete Button: Always Visible */}
            <div
              className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent toggle when clicking delete
                handleDeleteLink(index);
              }}
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {link.isOpen && (
            <div className="p-4 bg-white">
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Label
                </label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  placeholder="Enter label (e.g., LinkedIn)"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {link.label.length}/20 characters
                </p>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  URL
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    handleFieldChange(index, "url", e.target.value)
                  }
                  placeholder="Enter URL (e.g., https://linkedin.com/in/username)"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleAddNewLink}
        className={`mt-4 ${
          links.length >= 3
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        disabled={links.length >= 3}
      >
        + Add new link
      </button>
    </div>
  );
};

export default LinksCard;
