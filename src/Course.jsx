const Course = ({ course }) => {
  console.log(course);
  console.log(course.parts);
  if (!course.parts) {
    return <div>Loading...</div>;
  }
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((e) => (
          <li key={e.id}>
            {e.name} {e.exercises}
          </li>
        ))}
      </ul>
      <div>total of {total} courses</div>
    </>
  );
};

export default Course;
