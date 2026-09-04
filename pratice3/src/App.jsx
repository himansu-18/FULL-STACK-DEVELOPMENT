import { createContext, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const StudentContext = createContext();

const student = {
  name: "Himansu",
  college: "GIET",
};

function Home() {
  const student = useContext(StudentContext);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome {student.name}</h2>
      <p>College: {student.college}</p>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <h1>Courses</h1>
      <Link to="/course/react">React Course</Link>
      <br />
      <Link to="/course/python">Python Course</Link>
    </div>
  );
}

function Course() {
  const { id } = useParams();

  return <h2>Selected Course: {id}</h2>;
}

function About() {
  return <h1>About Page</h1>;
}

export default function App() {
  return (
    <StudentContext.Provider value={student}>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/courses">Courses</Link> |{" "}
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </StudentContext.Provider>
  );
}