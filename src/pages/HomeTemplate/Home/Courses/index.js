import React, { useEffect } from "react";
import CourseItem from "./CourseItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCourses } from "./duck/actions";
import Loader from "../../../../components/Loader";
import { useTranslation } from "react-i18next";

export default function Courses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchListCourses());
  }, []);

  const renderCourses = () => {
    if (loading) return <Loader />;
    return data?.slice(0, 9).map((course, index) => {
      return <CourseItem course={course} key={index} />;
    });
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{t("courses.courses")}</h2>
          <p>{t("courses.highlight")}</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderCourses()}
        </div>
      </div>
    </section>
  );
}
