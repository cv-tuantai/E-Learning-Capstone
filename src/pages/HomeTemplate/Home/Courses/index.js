import React, { useEffect } from "react";
import CourseItem from "./CourseItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCourses } from "./duck/actions";
import Loader from "../../../../components/Loader";

export default function Courses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);

  useEffect(() => {
    dispatch(fetchListCourses());
  }, []);

  const renderCourses = () => {
    if (loading) return <Loader />;
    return data?.slice(0, 9).map((course) => {
      return <CourseItem course={course} key={course.maKhoaHoc} />;
    });
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Khóa học</h2>
          <p>Khóa học nổi bật</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderCourses()}
        </div>
      </div>
    </section>
  );
}