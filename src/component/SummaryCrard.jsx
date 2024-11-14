import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../redux/summarySlice";

const SummaryCard = () => {
  const summary = useSelector((state) => state.summary);
  const dispatch = useDispatch();

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value));
  };

  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "bullet" }]],
  };

  const formats = ["bold", "italic", "underline", "strike", "list", "bullet"];

  return (
    <div>
      <h2 className="font-bold text-3xl text-gray-700">Summary</h2>
      <br />
      <div>
        <ReactQuill
          theme="snow"
          value={summary.description}
          onChange={handleDescriptionChange}
          modules={modules}
          formats={formats}
          placeholder="Start writing here..."
          className="custom-quill"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;
