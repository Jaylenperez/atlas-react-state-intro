import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    Object.values(course).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort courses if a column is selected
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
          {sortedCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
