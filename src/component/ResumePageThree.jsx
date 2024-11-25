import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const LEFT_PAGE_PADDING = 2;
const RIGHT_PAGE_PADDING = 7;
const LEFT_CONTENT_HEIGHT = A4_HEIGHT - LEFT_PAGE_PADDING * 160;
const RIGHT_CONTENT_HEIGHT = A4_HEIGHT - RIGHT_PAGE_PADDING * 54;

export default function ResumePageThree() {
  const personalInfo = useSelector((state) => state.personalInfo);
  const courses = useSelector((state) => state.courses);
  const education = useSelector((state) => state.education);
  const employment = useSelector((state) => state.employment);
  const hobbies = useSelector((state) => state.hobbies);
  const internships = useSelector((state) => state.internships);
  const languages = useSelector((state) => state.languages);
  const links = useSelector((state) => state.links);
  const skills = useSelector((state) => state.skills);
  const summary = useSelector((state) => state.summary);
  const RightOrder = useSelector((state) => state.order.rightComponents);
  const leftOrder = useSelector((state) => state.order.leftComponents);

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("/bg-img-4.jpg");
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
              // padding: `${Math.max(LEFT_PAGE_PADDING, RIGHT_PAGE_PADDING)}px`,
              display: "flex",
              flexDirection: "column",
              fontSize: "14px",
              backgroundColor: "#A3ADB3",
              overflow: "hidden",
              boxSizing: "border-box",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {/* Top Section */}
            {/* {i === 0 && ( // Only display the top section on the first page */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#F6EEE3",
                padding: "20px",
                textAlign: "left",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                marginTop: "-5px",
                minHeight: "180px",
              }}
            >
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  margin: "0 0 5px 0",
                  color: "#333",
                  paddingLeft: "22px",
                  paddingRight: "22px",
                }}
              >
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "normal",
                  margin: 0,
                  color: "#555",
                  paddingLeft: "22px",
                  paddingRight: "22px",
                }}
              >
                <strong>
                  <b>JOB TITLE •</b>
                </strong>{" "}
                <i>{personalInfo.jobTitle}</i>
              </h2>
            </div>
            {/* )} */}
            <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
              <div
                style={{ width: "65%", paddingLeft: `${RIGHT_PAGE_PADDING}px` }}
              >
                {rightPages[i] || null}
              </div>
              <div
                style={{
                  width: "35%",
                  paddingRight: `${LEFT_PAGE_PADDING}px`,
                  paddingTop: "10px",
                }}
              >
                {leftPages[i] || null}
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
    leftOrder,
    RightOrder,
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
      <div className="bg-#808080 border border-gray-300 shadow-lg overflow-hidden">
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
              fontSize: "20px",
              padding: "5px 0",
              fontWeight: "bold",
              color: "gray",
              borderBottom: "3px solid #808080",
              paddingBottom: "10px",
              marginTop: "-5px",
            }}
          >
            Personal Info
          </h1>
          <ul style={{ fontSize: "14px", padding: "5px 0", color: "#A3ADB3" }}>
            <li style={{ display: "flex" }}>
              <span style={{ fontSize: "16px" }}>📍 </span>
              <span style={{ marginTop: "0px" }}>
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
        {RightOrder.map((item) => {
          switch (item.component) {
            case "SkillsCard":
              return (
                <section className="px-7" key={item.name}>
                  <h1
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginTop: "-5px",
                    }}
                  >
                    Skills
                  </h1>
                  <ul
                    style={{
                      paddingLeft: "10px",
                      fontSize: "14px",
                      color: "#A3ADB3",
                    }}
                  >
                    {skills.map((skill, index) => (
                      <li key={index} style={{ marginBottom: "8px" }}>
                        • {skill.name} <br />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            case "LinksCard":
              return (
                <section className="px-7" key={item.name}>
                  <h1
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginTop: "-5px",
                    }}
                  >
                    Links
                  </h1>
                  <ul
                    style={{
                      fontSize: "14px",
                      marginLeft: "-20px",
                      color: "#A3ADB3",
                    }}
                  >
                    {links.map((link, i) => (
                      <li
                        key={link.id}
                        style={{
                          marginBottom: "8px",
                          display: "flex",
                        }}
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
              );
            case "LanguageCard":
              return (
                <section className="px-7" key={item.name}>
                  <h1
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginTop: "-5px",
                    }}
                  >
                    Language
                  </h1>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#A3ADB3",
                      paddingTop: "10px",
                    }}
                  >
                    {languages.map((language) => (
                      <div
                        key={language.id}
                        style={{
                          marginBottom: "8px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <i>{language.language || "N/A"}</i>
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
              );
            case "HobbiesCard":
              return (
                <section className="px-7" key={item.name}>
                  <h1
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    Hobbies
                  </h1>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#A3ADB3",
                      // textAlign: "justify",
                      wordWrap: "break-word", // Ensures long words wrap to the next line
                      overflowWrap: "break-word",
                    }}
                    dangerouslySetInnerHTML={{ __html: hobbies.description }}
                  ></div>
                </section>
              );
            default:
              return null;
          }
        })}
      </div>

      <div ref={rightContainerRef} className="hidden mt-2">
        {leftOrder.map((item) => {
          switch (item.component) {
            case "SummaryCard":
              return (
                <section className="px-7" key={item.name}>
                  <h2
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                    }}
                  >
                    Summary
                  </h2>
                  <div
                    className="default-font"
                    style={{
                      color: "#a5a5a5",
                      textAlign: "justify",
                      overflowWrap: "break-word", // Break words if they exceed the container width
                      wordWrap: "break-word", // Legacy support for older browsers
                      wordBreak: "break-word", // Additional word-breaking for better compatibility
                      whiteSpace: "pre-wrap", // Preserve line breaks and spacing
                      paddingTop: "10px",
                    }}
                  >
                    <p
                      dangerouslySetInnerHTML={{ __html: summary.description }}
                    ></p>
                  </div>
                </section>
              );
            case "EducationHistory":
              return (
                <section className="px-7" key={item.name}>
                  <h2
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    Education
                  </h2>
                  {education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "18px",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            className="font-bold"
                            style={{ color: "#80A6FF" }}
                          >
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
                          wordWrap: "break-word", // Ensures long words wrap to the next line
                          overflowWrap: "break-word", // Ensures proper wrapping for overflowing content
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
                        <span>
                          {edu.start_date
                            ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(edu.start_date))
                            : "Invalid Date"}{" "}
                          -{" "}
                          {edu.end_date
                            ? new Intl.DateTimeFormat("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }).format(new Date(edu.end_date))
                            : "Invalid Date"}
                        </span>
                      </p>
                    </div>
                  ))}
                </section>
              );
            case "EmploymentHistoryCard":
              return (
                <section className="px-7" key={item.name}>
                  <h2
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    Employment History
                  </h2>
                  {employment.map((job) => (
                    <div key={job.id} style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <b
                          style={{
                            fontSize: "18px",
                            marginBottom: "5px",
                          }}
                        >
                          <span
                            className="font-semibold"
                            style={{ color: "#80A6FF" }}
                          >
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
                          wordWrap: "break-word", // Ensures long words wrap to the next line
                          overflowWrap: "break-word",
                        }}
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      ></div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "gray",
                          marginBottom: "5px",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <p>
                          {new Date(job.start_date).toLocaleDateString()} -{" "}
                          {job.is_current
                            ? "Present"
                            : new Date(job.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              );
            case "CoursesCard":
              return (
                <section className="px-7" key={item.name}>
                  <h2
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
                      paddingBottom: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    Course
                  </h2>
                  {courses.map((course) => (
                    <div key={course.id} style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
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
              );
            case "InternShipCard":
              return (
                <section className="px-7" key={item.name}>
                  <h2
                    style={{
                      fontSize: "20px",
                      padding: "5px 0",
                      fontWeight: "bold",
                      color: "gray",
                      borderBottom: "3px solid #808080",
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
                          __html:
                            job.description ||
                            "<p>Description Not Available</p>",
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
                            ? `${new Date(
                                job.start_date
                              ).toLocaleDateString()} - ${
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
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
