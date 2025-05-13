import { CourseProvider, useCourseContext } from "./CourseContext";
import SchoolCatalog from "./SchoolCatalog";
import ClassSchedule from "./ClassSchedule";

function Header() {
  const { enrolledCourses } = useCourseContext();
  return (
    <header>
      <h1>Course Enrollment</h1>
      <p>Courses Enrolled: {enrolledCourses.length}</p>
    </header>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </>
  );
}

function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}

export default App;
