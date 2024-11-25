import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLeftComponents,
  updateRightComponents,
} from "./redux/orderSlice";
import CoursesCard from "./component/CoursesCard";
import EducationHistory from "./component/EducationHistory";
import EmploymentHistoryCard from "./component/EmploymentHistoryCard";
import HobbiesCard from "./component/HobbiesCard";
import InternShipCard from "./component/InternShipCard";
import LanguageCard from "./component/LanguageCard";
import LinksCard from "./component/LinksCard";
import PersonalInfoCard from "./component/PersonalInfoCard";
import SkillsCard from "./component/SkillsCard";
import SummaryCard from "./component/SummaryCrard";
import ResumePageThree from "./component/ResumePageThree";
import ResumePage from "./component/ResumePage";

const App = () => {
  const dispatch = useDispatch();
  const leftComponents = useSelector((state) => state.order.leftComponents);
  const rightComponents = useSelector((state) => state.order.rightComponents);

  const moveComponent = (index, direction, section) => {
    const components =
      section === "left" ? [...leftComponents] : [...rightComponents];

    if (direction === "up" && index > 0) {
      [components[index - 1], components[index]] = [
        components[index],
        components[index - 1],
      ];
    } else if (direction === "down" && index < components.length - 1) {
      [components[index + 1], components[index]] = [
        components[index],
        components[index + 1],
      ];
    }

    if (section === "left") {
      dispatch(updateLeftComponents(components));
    } else {
      dispatch(updateRightComponents(components));
    }
  };

  const renderSection = (components, section) =>
    components.map((item, index) => (
      <div key={`${item.name}-${index}`} className="mb-4 relative">
        <div className="absolute -left-16 flex flex-col">
          {/* Up Button */}
          <button
            onClick={() => moveComponent(index, "up", section)}
            disabled={index === 0}
            className={`mb-2 flex items-center justify-center w-10 h-10 rounded-full border ${
              index === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            title="Move Up"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.47 3.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 1 1-1.06 1.06l-4.72-4.72V20a.75.75 0 0 1-1.5 0V5.81l-4.72 4.72a.75.75 0 1 1-1.06-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Down Button */}
          <button
            onClick={() => moveComponent(index, "down", section)}
            disabled={index === components.length - 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full border ${
              index === components.length - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            title="Move Down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="none" />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 3.25a.75.75 0 0 1 .75.75v14.19l4.72-4.72a.75.75 0 1 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 1 1 1.06-1.06l4.72 4.72V4a.75.75 0 0 1 .75-.75"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <span>
          {item.component === "SummaryCard" && <SummaryCard />}
          {item.component === "EducationHistory" && <EducationHistory />}
          {item.component === "EmploymentHistoryCard" && (
            <EmploymentHistoryCard />
          )}
          {item.component === "CoursesCard" && <CoursesCard />}
          {item.component === "InternShipCard" && <InternShipCard />}
          {item.component === "SkillsCard" && <SkillsCard />}
          {item.component === "LinksCard" && <LinksCard />}
          {item.component === "LanguageCard" && <LanguageCard />}
          {item.component === "HobbiesCard" && <HobbiesCard />}
        </span>
        <br />
        {/* Add an <hr> only if it's not the last item */}
        {index < components.length - 1 && (
          <hr
            style={{
              border: "none",
              height: "5px",
              backgroundImage:
                "radial-gradient(circle, red 40%, transparent 0)",
              backgroundSize: "20px 20px",
              backgroundRepeat: "repeat-x",
              zIndex: "10000000",
            }}
          />
        )}
        <br />
      </div>
    ));

  return (
    <div
      style={{ maxWidth: "1870px", height: "100vh" }}
      className="p-4 mx-auto grid grid-cols-1 2xl:grid-cols-2 gap-4"
    >
      <div
        className="container overflow-y-auto pl-20"
        style={{ maxHeight: "100%", paddingRight: "33px" }}
      >
        <div className="mb-4">
          <PersonalInfoCard />
        </div>
        <hr
          style={{
            border: "none",
            height: "5px",
            backgroundImage: "radial-gradient(circle, red 40%, transparent 0)",
            backgroundSize: "20px 20px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <br />
        {renderSection(leftComponents, "left")}
        <hr style={{ border: "1px solid green" }} />
        <br />
        {renderSection(rightComponents, "right")}
      </div>
      <div
        style={{ maxWidth: "1366px", height: "100%" }}
        className="flex flex-col justify-start"
      >
        <ResumePageThree />
        {/* <ResumePage /> */}
      </div>
    </div>
  );
};

export default App;
