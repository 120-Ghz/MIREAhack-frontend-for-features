import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export default function AdminPanel() {
    const [showDialog, setShowDialog] = useState([0, 0]);
    const [lectures, setLectures] = useState([]);
    const [courses, setCourses] = useState([]);
    const [coursesIndexes, setCoursesIndexes] = useState([]);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseTitleInSelect, setCourseTitleOnSelect] = useState('')
    const [lectureTitle, setLectureTitle] = useState("");
    const [lectureDescription, setLectureDescription] = useState("");
    const [lectureDate, setLectureDate] = useState("");
    const [lectureStart, setLectureStart] = useState("");
    const [lectureEnd, setLectureEnd] = useState("");

    const [cookies, setCookies] = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
        if (!cookies["access_token"] || cookies["access_token"] === "undefined") {
            navigate('/login')
        }
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
      <div className="titleRow">
        <div className="courseListTxt">Список курсов</div>
        <div className="courseListTxt">
          Список лекций (нажмите на нужный курс)
        </div>
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
                  <div className="lecturesContainer {">
                    {lectures.map((lecture, num) => {
                      return (
                        <div>
                          {lecture["courseId"] === course["courseId"] ? (
                            <div className="lectureTitle">
                              {lecture["title"]}
                            </div>
                          ) : (
                            <div />
                          )}
                        </div>
                      );
                    })}
                  </div>
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
                            <input className="inputCourseData" value={courseTitle} onChange={e => setCourseTitle(e.target.value)}></input>
                        </div>
                        <div className="inputRow">
                            Описание курса
                            <input className="inputCourseData" value={courseDescription} onChange={e => setCourseDescription(e.target.value)}></input>
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
                <div/>
            )}
            {showDialog[1] ? (
                <div className="addLectureDialog">
                    <div className="courseAddingTxt">Добавление лекции</div>
                    <div className="inputs">
                        <div className="inputRow">
                            Выберите курс
                            <select value={courseTitleInSelect} onChange={e => setCourseTitleOnSelect(e.target.value)}
                                    className="selectTitles">
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
                            <input className="inputCourseData" value={lectureTitle} onChange={e => setLectureTitle(e.target.value)}></input>
                        </div>
                        <div className="inputRow">
                            Описание лекции
                            <input className="inputCourseData" value={lectureDescription} onChange={e => setLectureDescription(e.target.value)}></input>
                        </div>
                        <div className="inputRow">
                            Дата лекции
                            <input
                                className="inputCourseData"
                                placeholder="ДД.ММ.ГГГГ"
                                value={lectureDate}
                                onChange={e => setLectureDate(e.target.value)}
                            ></input>
                        </div>
                        <div className="inputRow">
                            <div className="timeTxt">
                                <div>Время</div>
                                <div>начала</div>
                            </div>
                            <input className="timeInput" value={lectureStart} onChange={e => setLectureStart(e.target.value)}></input>
                            <div className="timeTxt">
                                <div>Время</div>
                                <div>окончания</div>
                            </div>
                            <input className="timeInput" value={lectureEnd} onChange={e => setLectureEnd(e.target.value)}></input>
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
                <div/>
            )}
        </div>
    );
}
