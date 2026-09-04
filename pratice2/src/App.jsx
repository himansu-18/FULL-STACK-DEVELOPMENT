
import { useState } from "react";

export default function StudentForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    course: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${data.name}\nEmail: ${data.email}\nCourse: ${data.course}`);
  };

  return (
    <div>
      <h2>Student Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />

        <br />

        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <br />

        <input
          name="course"
          placeholder="Course"
          value={data.course}
          onChange={handleChange}
        />

        <br />

        <button>Submit</button>
      </form>
    </div>
  );
}

