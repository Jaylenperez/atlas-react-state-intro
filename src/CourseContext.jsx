import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => {
      if (prev.some((c) => c.courseNumber === course.courseNumber)) return prev;
      return [...prev, course];
    });
  };

  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prev) =>
      prev.filter((course) => course.courseNumber !== courseNumber)
    );
  };

  return (
    <CourseContext.Provider
      value={{ enrolledCourses, enrollCourse, dropCourse }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => useContext(CourseContext);
