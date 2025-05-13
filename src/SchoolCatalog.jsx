import { useState, useEffect } from "react";
import { useCourseContext } from "./CourseContext";

const COURSES_PER_PAGE = 5;

export default function SchoolCatalog() {
  const { enrollCourse } = useCourseContext();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortColumn) return 0;

    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (!isNaN(valA) && !isNaN(valB)) {
      return sortDirection === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return sortDirection === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return "";
    return sortDirection === "asc" ? " 🔼" : " 🔽";
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedCourses = sortedCourses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const isNextDisabled = currentPage * COURSES_PER_PAGE >= sortedCourses.length;
  const isPreviousDisabled = currentPage === 1;

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>
              Trimester{getSortIndicator("trimester")}
            </th>
            <th onClick={() => handleSort("courseNumber")}>
              Course Number{getSortIndicator("courseNumber")}
            </th>
            <th onClick={() => handleSort("courseName")}>
              Course Name{getSortIndicator("courseName")}
            </th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits{getSortIndicator("semesterCredits")}
            </th>
            <th onClick={() => handleSort("totalClockHours")}>
              Total Clock Hours{getSortIndicator("totalClockHours")}
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enrollCourse(course)}>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={isPreviousDisabled}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={isNextDisabled}>
          Next
        </button>
      </div>
    </div>
  );
}
