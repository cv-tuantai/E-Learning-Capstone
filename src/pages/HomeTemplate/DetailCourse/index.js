import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "./duck/GetDetail/actions";
import { registerCourse } from "./duck/RegisterCourse/actions";
import { useNavigate, useParams } from "react-router-dom";
import img1 from "../../../assets/images/hero-flex.png";
import img2 from "../../../assets/images/olstudy.png";
import img3 from "../../../assets/images/education-hero.png";
import imgError from "../../../assets/images/Nodejs.png";
import { useTranslation } from "react-i18next";

export default function DetailCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.detailCourseReducer);
  const { maKhoaHoc } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailCourse(maKhoaHoc));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section id="course-details" className="course-details mt-5">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-8">
              <img
                src={data?.hinhAnh}
                width="100%"
                alt="..."
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = { imgError };
                }}
              />
              <h3>{data?.tenKhoaHoc}</h3>
              <p>{data?.moTa}</p>
            </div>
            <div className="col-lg-4">
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{t("detail.courseName")}</h5>
                <p>{data?.tenKhoaHoc}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{t("detail.field")}</h5>
                <p>{data?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{t("lecturers.lecturers")}</h5>
                <p>{data?.nguoiTao.hoTen}</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{t("detail.price")}</h5>
                <p>$169</p>
              </div>
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{t("detail.students")}</h5>
                <p>{data?.soLuongHocVien}</p>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-success"
                  style={{ width: "200px" }}
                  onClick={() => {
                    if (localStorage.getItem("user")) {
                      const regInfo = {
                        taiKhoan: JSON.parse(localStorage.getItem("user"))
                          .taiKhoan,
                        maKhoaHoc,
                      };
                      dispatch(registerCourse(regInfo));
                    } else {
                      alert(t("detail.signInFirst"));
                      navigate("/user/login", { replace: true });
                    }
                  }}
                >
                  {t("detail.reg")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cource-details-tabs" className="cource-details-tabs">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-3">
              <ul className="nav nav-tabs flex-column">
                <li className="nav-item">
                  <a
                    className="nav-link active show"
                    data-bs-toggle="tab"
                    href="#tab-1"
                  >
                    {t("detail.part1")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                    {t("detail.part2")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                    {t("detail.part3")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 mt-4 mt-lg-0">
              <div className="tab-content">
                <div className="tab-pane active show" id="tab-1">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>{t("detail.part4")}</li>
                        <li>{t("detail.part5")}</li>
                        <li>{t("detail.part6")}</li>
                        <li>{t("detail.part7")}</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img1} alt="..." height={200} />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-2">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>{t("detail.part8")}</li>
                        <li>{t("detail.part9")}</li>
                        <li>{t("detail.part10")}</li>
                        <li>{t("detail.part11")}</li>
                        <li>{t("detail.part12")}</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img2} alt="..." height={200} />
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-3">
                  <div className="row">
                    <div className="col-lg-6 details order-2 order-lg-1">
                      <ul>
                        <li>{t("detail.part13")}</li>
                        <li>{t("detail.part14")}</li>
                        <li>{t("detail.part15")}</li>
                      </ul>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2">
                      <img src={img3} alt="..." height={200} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
