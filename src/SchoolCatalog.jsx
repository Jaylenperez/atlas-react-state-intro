import { useState, useEffect } from "react";
import { useCourseContext } from "./CourseContext";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0); // 👈 track page index

  const { enrolledCourses, enrollCourse } = useCourseContext();
  const rowsPerPage = 5;

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
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
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  // ✅ Calculate paginated slice
  const totalPages = Math.ceil(sortedCourses.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const paginatedCourses = sortedCourses.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(0); // reset to first page on sort
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return "";
    return sortDirection === "asc" ? " 🔼" : " 🔽";
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0); // reset to first page on search
        }}
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
          {paginatedCourses.map((course, index) => {
            const isEnrolled = enrolledCourses.some(
              (c) => c.courseNumber === course.courseNumber
            );
            return (
              <tr key={index}>
                <td>{course.trimester}</td>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>{course.semesterCredits}</td>
                <td>{course.totalClockHours}</td>
                <td>
                  <button
                    onClick={() => enrollCourse(course)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
