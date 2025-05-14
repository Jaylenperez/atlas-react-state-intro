# <p align="center">React State Introduction</p>

[Link to site on Netify](https://atlas-react-state-intro-j-perez.netlify.app/)

## :bookmark: Table of Contents

<details>
        <summary>
        CLICK TO ENLARGE
        </summary>
        :memo: <a href="#description">Description</a>
        <br>
        :wrench: <a href="#installation">Installation</a>
        <br>
        :house: <a href="#project-structure">Project Structure</a>
        <br>
        :file_folder: <a href="#files">Important Files/Folders</a>
        <br>
        :mega: <a href="#commands">Important Commands</a>
        <br>
        :sparkles: <a href="#authors">Authors</a>
</details>

## :memo: <span id="description">Description</span>

This project is a **basic introduction to state management** in React. You will build a **school course directory** that:

- Loads course data from a JSON API
- Displays it in a searchable, sortable, paginated table
- Allows users to enroll in and drop courses
- Tracks enrolled courses via React Context

By the end, you’ll understand how to use the core React hooks—`useState`, `useEffect`, and `useContext`—to manage complex UI state without “prop drilling.”

## :wrench: <span id="installation">Installation</span>

**Clone the repository:**

`git clone https://github.com/Jaylenperez/atlas-react-state-intro.git`

**Install dependencies:**

`npm install`

**Run the development server:**

`npm run dev`

**Open your browser and navigate to `http://localhost:5173/`**

## :house: <span id="project-structure">Project Structure</span>

```plaintext
atlas-react-state-intro/
├── public/
│   ├── favicon.svg
│   └── api/
│       └── courses.json
├── src/
│   ├── context/
│   │   └── CourseContext.jsx
│   ├── App.jsx
│   ├── ClassSchedule.jsx
│   ├── Header.jsx
│   ├── SchoolCatalog.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## :file_folder: <span id="files">Important Files/Folders</span>

- `index.html`: This is the html file that appears when the dev server starts up.
- `src`: All javascript/jsx code goes in this directory
- `src/assets`: Any static assets such as images that are loaded through the javascript files goes here.
- `src/app.jsx`: The is the main app component for the entire app.

## :mega: <span id="commands">Important Commands</span>

- `npm run dev`: Starts dev server with Hot Module Reloading on port 5173. Anytime a file changes, the changes will automatocally be reflected in the browser
- `npm run lint`: Run the lint checker with eslint to check for known linting issues
- `npm run format`: Run prettier to automatically reformat files.

## :sparkles: <span id="authors">Authors</span>

**Jaylen Perez**

- Github: [@Jaylenperez](https://github.com/Jaylenperez)
