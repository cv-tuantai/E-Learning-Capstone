import React, { useEffect, useState } from "react";
import CourseItem from "../Home/Courses/CourseItem";
import Loader from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchListCourses } from "../Home/Courses/duck/actions";

export default function AllCourses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listCoursesReducer);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 6;
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = data?.slice(indexOfFirstCourse, indexOfLastCourse);

  useEffect(() => {
    dispatch(fetchListCourses());
  }, []);

  const renderCourses = () => {
    if (loading) return <Loader />;
    return currentCourses?.map((course, index) => {
      return <CourseItem course={course} key={index} />;
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(data?.length / coursesPerPage);
  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i < pageNumbers; i++) {
      pagination.push(
        <li
          key={i}
          className={i === currentPage ? "page-item active" : "page-item"}
        >
          <a className="page-link" href="#" onClick={() => paginate(i)}>
            {i}
          </a>
        </li>,
      );
    }
    return pagination;
  };

  return (
    <section id="popular-courses" className="courses">
      <div className="container" data-aos="fade-up">
        <div className="section-title pt-5">
          <h2>Khóa học</h2>
          <p>Tất cả khóa học</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          {renderCourses()}
        </div>

        <ul className="pagination justify-content-center">
          {renderPagination()}
        </ul>
      </div>
    </section>
  );
}
