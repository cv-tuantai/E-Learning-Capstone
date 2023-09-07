import React, { useEffect } from "react";
import Loader from "../../../components/Loader";
import CourseItem from "../Home/Courses/CourseItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCourses } from "../Home/Courses/duck/actions";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(fetchListCourses(keyword));
  }, [keyword]);

  const renderSearchCourses = () => {
    if (loading) return <Loader />;
    return data?.map((course, index) => {
      return <CourseItem course={course} key={index} />;
    });
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title pt-5">
          <h2>Tìm kiếm khóa học</h2>
          <p>Có {data ? data.length : "0"} kết quả</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderSearchCourses()}
        </div>
      </div>
    </section>
  );
}
