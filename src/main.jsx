import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { CourseProvider } from "./CourseContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <CourseProvider>
    <App />
  </CourseProvider>
);
