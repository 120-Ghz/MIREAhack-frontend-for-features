import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [addLecture, setAddLecture] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesIndexes, setCoursesIndexes] = useState([]);
  const [courseDialogInd, setCourseDialogInd] = useState(1);
  let courseDialogStyles = ["addCourseDialogLeft", "addCourseDialogRight"];
  let courseDialogClass = "";

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

  let newCourse = () => {
    if (courseDialogInd) {
      setCourseDialogInd(0);
    } else {
      setCourseDialogInd(1);
    }
    courseDialogClass = courseDialogStyles[courseDialogInd];
    setAddCourse(!addCourse);
    console.log(
      "newCourse function: ",
      courseDialogClass,
      courseDialogInd,
      addCourse
    );
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
              <button
                className="courseBtn"
                onClick={() => changeCourseIndex(id)}
              >
                <div class="courseBtnTxt">{course["coursename"]}</div>
              </button>
              {coursesIndexes[id] ? (
                <div className="lecturesList">
                  {lectures.map((lecture, num) => {
                    return (
                      <div>
                        {lecture["courseId"] === course["courseId"] ? (
                          <div className="lectureTitle">{lecture["title"]}</div>
                        ) : (
                          <div />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>

      <div className="btnRow">
        <button className="addCourseBtn" onClick={() => newCourse()}>
          <div className="addLectureTxt">Добавить курс</div>
          {addCourse ? <div className={courseDialogClass}></div> : <div />}
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
