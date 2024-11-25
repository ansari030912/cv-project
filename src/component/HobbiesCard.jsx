import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setHobbiesDescription } from "../redux/hobbiesSlice";

const HobbiesCard = () => {
  const hobbies = useSelector((state) => state.hobbies);
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
    if (charCount > 250 && calculateCharCount(hobbies.description) === 250) {
      return;
    }

    // Allow changes if within the limit or content is being removed
    if (charCount <= 250 || value.length < hobbies.description.length) {
      dispatch(setHobbiesDescription(value));
    }
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  const charCount = calculateCharCount(hobbies.description);
  const exceededChars = charCount > 250 ? charCount - 250 : 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl text-blue-500">Hobbies</h2>
        <span
          className={`text-lg ${
            charCount > 250 ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-gray-500">Character Limit:</span> {charCount}/
          {250}
        </span>
      </div>
      {charCount > 250 && (
        <p className="text-red-500 text-sm mt-1">
          You have exceeded the limit by <strong>{exceededChars}</strong>{" "}
          characters. Please remove the extra characters to proceed.
        </p>
      )}
      <br />
      <div>
        <ReactQuill
          theme="snow"
          value={hobbies.description}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
          placeholder="Describe your hobbies..."
          className="custom-quill"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default HobbiesCard;
