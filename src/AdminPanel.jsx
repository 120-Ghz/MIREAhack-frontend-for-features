import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [showDialog, setShowDialog] = useState([0, 0]);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesIndexes, setCoursesIndexes] = useState([]);

  let courseTitle = "";
  let courseDescription = "";

  let courseTitleInSelect = "";
  let lectureTitle = "";
  let lectureDescription = "";
  let lectureDate = "";
  let lectureStart = "";
  let lectureEnd = "";

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
  console.log(lectures);

  let changeCourseIndex = (ind) => {
    let indexes = [...coursesIndexes];
    indexes[ind] = !coursesIndexes[ind];
    setCoursesIndexes(indexes);
  };

  let newCourse = () => {
    setShowDialog([!setShowDialog[0], 0]);
  };

  let newLecture = () => {
    setShowDialog([0, !setShowDialog[1]]);
  };

  let back = () => {
    setShowDialog([0, 0]);
  };

  let cutString = (string) => {
    return string.length > 30 ? string.slice(0, 30) + "..." : string;
  };

  return (
    <div className="page">
      <div className="appBar">
        <h3 className="title">Admin tools</h3>
      </div>
      <div className="courseListTxt">Список курсов</div>
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
        </button>
        <button className="addLectureBtn" onClick={() => newLecture()}>
          <div className="addLectureTxt">Добавить лекцию</div>
        </button>
      </div>
      {showDialog[0] ? (
        <div className="addCourseDialog">
          <div className="courseAddingTxt">Добавление курса</div>
          <div className="inputs">
            <div className="inputRow">
              Название курса
              <input className="inputCourseData"></input>
            </div>
            <div className="inputRow">
              Описание курса
              <input className="inputCourseData"></input>
            </div>
            <div className="dialogButtons">
              <button onClick={() => back()} className="backBtn">
                Отмена
              </button>
              <button className="confirmAdding">Добавить</button>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
      {showDialog[1] ? (
        <div className="addLectureDialog">
          <div className="courseAddingTxt">Добавление лекции</div>
          <div className="inputs">
            <div className="inputRow">
              Выберите курс
              <select value={courseTitleInSelect} className="selectTitles">
                {courses.map((course) => {
                  return (
                    <option value={course["coursename"]}>
                      {cutString(course["coursename"])}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="inputRow">
              Название лекции
              <input className="inputCourseData"></input>
            </div>
            <div className="inputRow">
              Описание лекции
              <input className="inputCourseData"></input>
            </div>
            <div className="inputRow">
              Дата лекции
              <input
                className="inputCourseData"
                placeholder="ДД.ММ.ГГГГ"
              ></input>
            </div>
            <div className="inputRow">
              <div className="timeTxt">
                <div>Время</div> <div>начала</div>
              </div>
              <input className="timeInput"></input>
              <div className="timeTxt">
                <div>Время</div> <div>окончания</div>
              </div>
              <input className="timeInput"></input>
            </div>
            <div className="dialogButtons">
              <button onClick={() => back()} className="backBtn">
                Отмена
              </button>
              <button className="confirmAdding">Добавить</button>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
