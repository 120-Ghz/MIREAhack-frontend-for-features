import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [addLecture, setAddLecture] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesIndexes, setCoursesIndexes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setLectures(result.lectures);
        setCourses(result.courses);
        let indexes = [];
        for (let i = 0; i < result.courses.length; i++) {
          indexes[i] = 0;
        }
        setCoursesIndexes(indexes);
      });
  }, []);
  console.log(lectures, courses);
  let changeCourseIndex = (ind) => {
    let indexes = [...coursesIndexes];
    indexes[ind] = !coursesIndexes[ind];
    setCoursesIndexes(indexes);
  };

  return (
    <div className="page">
      <div className="appBar">
        <h3 className="title">Admin tools</h3>
      </div>
      <div className="course-list">
        {courses.map((course, id) => {
          return (
            <div className="courLecRow">
              <button onClick={() => changeCourseIndex(id)}>
                <div className="courseBtn">{course["coursename"]}</div>
              </button>
              {coursesIndexes[id] ? (
                lectures.map((lecture) => {
                  return (
                    <div className="column">
                      {lectures[id]["courseId"] === course["courseId"]} ? (
                      {lectures[id]["title"]}) : (<div />)
                    </div>
                  );
                })
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>

      <div className="btnRow">
        <button
          className="addLectureBtn"
          onClick={() => setAddCourse(!addCourse)}
        >
          <div className="addLectureTxt">Добавить курс</div>
        </button>
        <button
          className="addLectureBtn"
          onClick={() => setAddLecture(!addLecture)}
        >
          <div className="addLectureTxt">Добавить лекцию</div>
        </button>
      </div>
    </div>
  );
}
