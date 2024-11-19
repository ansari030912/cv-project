import React from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { setHobbiesDescription } from "../redux/hobbiesSlice";
import "react-quill/dist/quill.snow.css";

const HobbiesCard = () => {
  const hobbies = useSelector((state) => state.hobbies);
  const dispatch = useDispatch();
  const [isHobbiesAccordionOpen, setIsHobbiesAccordionOpen] =
    React.useState(true);

  const handleDescriptionChange = (value) => {
    dispatch(setHobbiesDescription(value));
  };

  const toggleHobbiesAccordion = () => {
    setIsHobbiesAccordionOpen((prev) => !prev);
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">Hobbies</h2>
      <p className="text-gray-600 mb-4">
        Add a description of your hobbies below.
      </p>
      <div className="mb-4 border border-gray-200">
        {isHobbiesAccordionOpen && (
          <div>
            <ReactQuill
              theme="snow"
              value={hobbies.description}
              onChange={handleDescriptionChange}
              modules={modules}
              formats={formats}
              placeholder="Start writing here..."
              className="custom-quill"
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HobbiesCard;
