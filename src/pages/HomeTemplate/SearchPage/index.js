import React, { useEffect } from "react";
import Loader from "../../../components/Loader";
import CourseItem from "../Home/Courses/CourseItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCourses } from "../Home/Courses/duck/actions";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);
  const { keyword } = useParams();
  const { t } = useTranslation();

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
          <h2>{t("searchPage.find")}</h2>
          <p>
            {data ? data.length : "0"} {t("searchPage.res")}
          </p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderSearchCourses()}
        </div>
      </div>
    </section>
  );
}
