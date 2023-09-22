import React, { useEffect } from "react";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByCate } from "./duck/actions";
import { useParams } from "react-router-dom";
import CourseItem from "../Home/Courses/CourseItem";
import { useTranslation } from "react-i18next";

export default function CourseCate() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.coursesByCateReducer);
  const { cate } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCoursesByCate(cate));
  }, [cate]);

  const renderCourses = () => {
    if (loading) return <Loader />;
    return data?.map((course, index) => {
      return <CourseItem course={course} key={index} />;
    });
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title pt-5">
          <h2>{t("courses.courses")}</h2>
          <p>{t("courses.courseCate")}</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderCourses()}
        </div>
      </div>
    </section>
  );
}
