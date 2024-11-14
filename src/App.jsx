import React, { useEffect, useState } from "react";
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
import ResumePage from "./component/ResumePage";

const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

const App = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall =
        window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT;
      setIsScreenSmall(isSmall);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isScreenSmall) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-center text-red-600">
          Your browser resolution is too small. Please increase your window size
          to at least 1280x720.
        </p>
      </div>
    );
  }
  return (
    <div
      style={{ maxWidth: "1870px", height: "100vh" }}
      className="p-4 mx-auto grid grid-cols-1 2xl:grid-cols-2 gap-4"
    >
      <div
        className="container overflow-y-auto"
        style={{ maxHeight: "100%", paddingRight: "33px" }}
      >
        <PersonalInfoCard />
        <br />
        <SummaryCard />
        <br />
        <SkillsCard />
        <br />
        <EducationHistory />
        <br />
        <LinksCard />
        <br />
        <EmploymentHistoryCard />
        <br />
        <CoursesCard />
        <br />
        <InternShipCard />
        <br />
        <HobbiesCard />
        <br />
        <LanguageCard />
      </div>
      <div
        style={{ maxWidth: "1366px", height: "100%" }}
        className="flex flex-col justify-start"
      >
        <ResumePage />
      </div>
    </div>
  );
};

export default App;
