import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [showCourseLectures, setShowCourseLectures] = useState(false);
  const [addLecture, setAddLecture] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);

  function showThisCourseLectures() {}

  function addNewLecture() {}

  function addNewCourse() {}

  function changeCourseIndex() {}

  useEffect(() => {
      fetch("http://127.0.0.1:5000/courses", {
          method: 'GET'
      })
      .then(response => response.json())
      .then(result => {
          setLectures(result.lectures)
          setCourses(result.courses)
      })

  }, []);

  return (
    <div>
      <div className="appBar">
        <h3 className="title">Admin tools</h3>
      </div>
      {lectures.map((lec) => {
        return <div></div>;
      })}

      {showCourseLectures && <div></div>}
      <div className="course-list">
        {/* {% for course in coursesList %} */}
        <div className="row">
          {/* <button onclick="showLectures()">{{course.title}}</button> */}
        </div>
      </div>

      <div className="btnRow">
          <button className="addLectureBtn" onClick={addNewCourse()}>
          <div className="addLectureTxt">Добавить курс</div>
        </button>
          <button className="addLectureBtn" onClick={addNewLecture()}>
          <div className="addLectureTxt">Добавить лекцию</div>
        </button>
      </div>
    </div>
  );
}
