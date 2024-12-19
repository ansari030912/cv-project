import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const LEFT_PAGE_PADDING = 1;
const RIGHT_PAGE_PADDING = 7;
const LEFT_CONTENT_HEIGHT = A4_HEIGHT - LEFT_PAGE_PADDING * 120;
const RIGHT_CONTENT_HEIGHT = A4_HEIGHT - RIGHT_PAGE_PADDING * 32;

export default function ResumePage() {
  const personalInfo = useSelector((state) => state.personalInfo);
  const courses = useSelector((state) => state.courses);
  const education = useSelector((state) => state.education);
  const employment = useSelector((state) => state.employment);
  console.log("🚀 ~ ResumePage ~ employment:", employment);
  const hobbies = useSelector((state) => state.hobbies);
  const internships = useSelector((state) => state.internships);
  const languages = useSelector((state) => state.languages);
  const links = useSelector((state) => state.links);
  const skills = useSelector((state) => state.skills);
  const summary = useSelector((state) => state.summary);
  const order = useSelector((state) => state.order);
  console.log("🚀 ~ ResumePage ~ order:", order)

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [backgroundImage] = useState("/bg-img-3.jpg");
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);

  useEffect(() => {
    const calculatePages = () => {
      const processContainer = (
        containerRef,
        width,
        contentHeight,
        padding
      ) => {
        if (!containerRef.current) return [[]];

        const sections = Array.from(containerRef.current.children);
        const containerPages = [[]];
        let currentPageHeight = 0;
        let currentPageIndex = 0;

        sections.forEach((section) => {
          const sectionClone = section.cloneNode(true);
          const tempDiv = document.createElement("div");
          tempDiv.style.width = `${width - padding * 2}px`;
          tempDiv.style.visibility = "hidden";
          tempDiv.appendChild(sectionClone);
          document.body.appendChild(tempDiv);

          const sectionHeight = tempDiv.offsetHeight;
          document.body.removeChild(tempDiv);

          if (currentPageHeight + sectionHeight > contentHeight) {
            currentPageIndex++;
            containerPages[currentPageIndex] = [];
            currentPageHeight = 0;
          }

          containerPages[currentPageIndex].push(
            <div
              key={Math.random().toString(36).substr(2, 9)}
              style={{ fontSize: "8px", padding: `${padding}px` }}
            >
              <div dangerouslySetInnerHTML={{ __html: section.outerHTML }} />
            </div>
          );

          currentPageHeight += sectionHeight;
        });

        return containerPages;
      };

      const leftPages = processContainer(
        leftContainerRef,
        A4_WIDTH * 0.35,
        LEFT_CONTENT_HEIGHT,
        LEFT_PAGE_PADDING
      );
      const rightPages = processContainer(
        rightContainerRef,
        A4_WIDTH * 0.65,
        RIGHT_CONTENT_HEIGHT,
        RIGHT_PAGE_PADDING
      );

      const maxPages = Math.max(leftPages.length, rightPages.length);
      const combinedPages = [];

      for (let i = 0; i < maxPages; i++) {
        combinedPages.push(
          <div
            key={i}
            id={`page-${i}`}
            style={{
              width: `${A4_WIDTH}px`,
              height: `${A4_HEIGHT}px`,
              padding: `${Math.max(LEFT_PAGE_PADDING, RIGHT_PAGE_PADDING)}px`,
              display: "flex",
              flexDirection: "column",
              fontSize: "14px",
              backgroundColor: "white",
              overflow: "hidden",
              boxSizing: "border-box",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
              <div
                style={{
                  width: "35%",
                  paddingRight: `${LEFT_PAGE_PADDING}px`,
                  paddingTop: "10px",
                }}
              >
                {leftPages[i] || null}
              </div>
              <div
                style={{ width: "65%", paddingLeft: `${RIGHT_PAGE_PADDING}px` }}
              >
                {rightPages[i] || null}
              </div>
            </div>
            <br />
          </div>
        );
      }
      setPages(combinedPages);
    };

    calculatePages();
    window.addEventListener("resize", calculatePages);
    return () => window.removeEventListener("resize", calculatePages);
  }, [
    personalInfo,
    courses,
    education,
    employment,
    hobbies,
    internships,
    languages,
    links,
    skills,
    summary,
    backgroundImage,
  ]);

  const generatePDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const originalPage = currentPage;

    for (let i = 0; i < pages.length; i++) {
      setCurrentPage(i);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const pageElement = document.getElementById(`page-${i}`);
      const canvas = await html2canvas(pageElement, {
        scale: 2,
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = 595.28;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    }

    setCurrentPage(originalPage);
    pdf.save("resume.pdf");
  };

  const CustomButton = ({ children, onClick, disabled, label }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-2 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={label}
      style={{ fontSize: "12px", padding: "6px 12px" }}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col items-center py-3">
      <div className="bg-white border border-gray-300 shadow-lg overflow-hidden">
        {pages.map((page, index) => (
          <div
            id={`page-${index}`}
            key={index}
            style={{ display: index === currentPage ? "block" : "none" }}
          >
            {page}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <CustomButton
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </CustomButton>

        <span style={{ fontSize: "12px" }}>
          Page {currentPage + 1} of {pages.length}
        </span>

        <CustomButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1))
          }
          disabled={currentPage === pages.length - 1}
          label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </CustomButton>
        <CustomButton onClick={generatePDF} label="Download PDF">
          Download PDF
        </CustomButton>
      </div>

      {/* LEFT SECTION */}
      <div ref={leftContainerRef} className="hidden mt-2">
        <section className="px-7">
          <h1
            style={{
              fontSize: "30px",
              padding: "2px 0",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <ul style={{ fontSize: "14px", padding: "5px 0", color: "white" }}>
            <li style={{ display: "flex" }}>
              <span style={{ fontSize: "16px" }}>📍 </span>
              <span style={{ marginTop: "6px" }}>
                {personalInfo.country} , {personalInfo.city}
              </span>
            </li>
            <li>
              ✉️ <span>{personalInfo.email}</span>
            </li>
            <li>
              📞 <span>{personalInfo.phone}</span>
            </li>
          </ul>
        </section>

        <section className="px-7 py-1">
          <h1
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "#d3d3d3",
              borderBottom: "3px solid white",
              paddingBottom: "10px",
            }}
          >
            Skills
          </h1>
          <ul
            style={{ paddingLeft: "10px", fontSize: "14px", color: "#dadada" }}
          >
            {skills.map((skill, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                • {skill.name} <br />
              </li>
            ))}
          </ul>
        </section>
        <section className="px-7 py-1">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "#d3d3d3",
              borderBottom: "3px solid white",
              paddingBottom: "10px",
            }}
          >
            Links
          </h2>
          <ul style={{ fontSize: "14px",  }}>
            {links.map((link, i) => (
              <li
                key={link.id}
                style={{ marginBottom: "8px", display: "flex" }}
              >
                🔗
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#80a6ff", paddingLeft: "4px" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="px-7 py-1">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "#d3d3d3",
              borderBottom: "3px solid white",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            Language
          </h2>
          <div style={{ fontSize: "14px", color: "#dadada" }}>
            {languages.map((language) => (
              <div
                key={language.id}
                style={{
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <i style={{}}>{language.language || "N/A"}</i>
                <div>
                  {language.proficiency === 5
                    ? "Native"
                    : language.proficiency === 4
                    ? "Very Good"
                    : language.proficiency === 3
                    ? "Good"
                    : language.proficiency === 2
                    ? "Weak"
                    : language.proficiency === 1
                    ? "Poor"
                    : "Proficiency"}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="px-7 py-1">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "#d3d3d3",
              borderBottom: "3px solid white",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            Hobbies
          </h2>
          <div
            style={{ fontSize: "10px", color: "#dadada" }}
            className="default-font"
          >
            <i
              style={{
                fontSize: "16px",
                color: "#dadada",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: hobbies.description }}
            ></i>
          </div>
        </section>
      </div>

      <div ref={rightContainerRef} className="hidden mt-2">
        <section className="px-7">
          <h2
            style={{
              fontSize: "28px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "#707070",
            }}
          >
            Job Title
          </h2>
          <p
            className="font-semibold text-gray-400"
            style={{ fontSize: "15px", padding: "5px 0" }}
          >
            {personalInfo.jobTitle}
          </p>
        </section>
        <section className="px-7">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #c6c6c6",
              paddingBottom: "10px",
            }}
          >
            Summary
          </h2>
          <div
            className="default-font"
            style={{ color: "#a5a5a5", textAlign: "justify" }}
          >
            <p dangerouslySetInnerHTML={{ __html: summary.description }}></p>
          </div>
        </section>
        <section className="px-7">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #c6c6c6",
              paddingBottom: "10px",
              marginBottom: "8px",
            }}
          >
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "5px",
                  }}
                >
                  <span className="font-bold" style={{ color: "#80A6FF" }}>
                    {edu.degree}
                  </span>
                </p>
                <i
                  className="font-semibold text-nowrap"
                  style={{
                    fontSize: "14px",
                    marginBottom: "5px",
                    color: "gray",
                  }}
                >
                  {edu.city}
                </i>
              </div>
              <i
                className="font-bold text-nowrap flex justify-start"
                style={{
                  fontSize: "16px",
                  marginBottom: "3px",
                  color: "#808080",
                }}
              >
                • {edu.school_name}
              </i>
              <div
                style={{
                  fontSize: "14px",
                  color: "#a5a5a5",
                  marginBottom: "3px",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: edu.description }}
              ></div>
              <p
                style={{
                  fontSize: "14px",
                  color: "gray",
                  marginBottom: "5px",
                  textAlign: "right",
                }}
              >
                <i>
                  {new Date(edu.start_date).toLocaleDateString()} -{" "}
                  {new Date(edu.end_date).toLocaleDateString()}
                </i>
              </p>
            </div>
          ))}
        </section>
        <section className="px-7">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #c6c6c6",
              paddingBottom: "10px",
              marginBottom: "8px",
            }}
          >
            Employment History
          </h2>
          {employment.map((job) => (
            <div key={job.id} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b
                  style={{
                    fontSize: "18px",
                    marginBottom: "5px",
                  }}
                >
                  <span className="font-semibold" style={{ color: "#80A6FF" }}>
                    {job.job_title}
                  </span>
                </b>
                <div
                  style={{
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  <i className="font-bold" style={{ color: "#a5a5a5" }}>
                    {job.city}
                  </i>
                </div>
              </div>
              <i
                className="font-bold text-nowrap flex justify-start"
                style={{
                  fontSize: "15px",
                  marginBottom: "3px",
                  color: "#808080",
                }}
              >
                • {job.employer}
              </i>
              <div
                style={{
                  fontSize: "14px",
                  color: "#a5a5a5",
                  marginBottom: "3px",
                  textAlign: "justify",
                }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>
              <div
                style={{
                  fontSize: "14px",
                  color: "gray",
                  marginBottom: "5px",
                  // textAlign: "right",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "gray",
                    marginBottom: "5px",
                    // textAlign: "right",
                  }}
                >
                  {new Date(job.start_date).toLocaleDateString()} -{" "}
                  {job.is_current
                    ? "Present"
                    : new Date(job.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="px-7">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #c6c6c6",
              paddingBottom: "10px",
              marginBottom: "8px",
            }}
          >
            Course
          </h2>
          {courses.map((course) => (
            <div key={course.id} style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  className="font-semibold"
                  style={{
                    fontSize: "16px",
                    color: "#80A6FF",
                    marginBottom: "5px",
                  }}
                >
                  {course.title}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "gray",
                    marginBottom: "5px",
                  }}
                >
                  {new Date(course.start_date).toLocaleDateString()} -{" "}
                  {course.isOpen
                    ? "Ongoing"
                    : new Date(course.end_date).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "gray",
                  marginBottom: "5px",
                }}
              >
                <p className="font-semibold text-nowrap">
                  {course.institution}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="px-7">
          <h2
            style={{
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #c6c6c6",
              paddingBottom: "10px",
              marginBottom: "8px",
            }}
          >
            Internship History
          </h2>
          {internships.map((job) => (
            <div
              key={job.id}
              style={{
                marginBottom: "15px",
                // borderBottom: "3px solid #bababa",
                // paddingBottom: "14px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#80A6FF",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  className="font-semibold"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {job.job_title || "N/A"}
                </p>
                <i style={{ color: "gray" }}>
                  <b>{job.city || "City Not Available"}</b>
                </i>
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "gray",
                  // marginBottom: "5px",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <i>
                  <b>• {job.company || "Company Not Available"}</b>
                </i>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#a5a5a5",
                  marginBottom: "10px",
                }}
                dangerouslySetInnerHTML={{
                  __html: job.description || "<p>Description Not Available</p>",
                }}
              ></div>
              <div
                style={{
                  fontSize: "15px",
                  color: "gray",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <p>
                  {job.start_date
                    ? `${new Date(job.start_date).toLocaleDateString()} - ${
                        job.isOpen
                          ? "Present"
                          : new Date(job.end_date).toLocaleDateString()
                      }`
                    : "Date Not Available"}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
