import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../redux/summarySlice";

const SummaryCard = () => {
  const summary = useSelector((state) => state.summary);
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

    // Total character count = plain text + (lineBreaks * 50)
    return plainText.length + lineBreaks * 50;
  };

  const handleDescriptionChange = (value) => {
    const charCount = calculateCharCount(value);

    // Prevent adding characters if the limit is reached
    if (charCount > 400 && calculateCharCount(summary.description) === 400) {
      return;
    }

    // Allow changes if within the limit or content is being removed
    if (charCount <= 400 || value.length < summary.description.length) {
      dispatch(setDescription(value));
    }
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  const charCount = calculateCharCount(summary.description);
  const exceededChars = charCount > 400 ? charCount - 400 : 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-blue-500">Summary</h2>
        <span
          className={`text-lg ${
            charCount > 400 ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-gray-500">Character Limit:</span> {charCount}/
          {400}
        </span>
      </div>
      {charCount > 400 && (
        <p className="text-red-500 text-sm mt-1">
          You have exceeded the limit by <strong>{exceededChars}</strong>{" "}
          characters. Please remove the extra characters to proceed.
        </p>
      )}
      <br />
      <div>
        <ReactQuill
          theme="snow"
          value={summary.description}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
          placeholder="Write something about you..."
          className="custom-quill"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;
