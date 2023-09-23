import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { addCourse } from "../duck/AddCourse/actions";
import {
  updateCourse,
  updateCourseNoImage,
} from "../duck/UpdateCourse/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

export default function CourseModal(props) {
  const { dataCourse } = props;
  const dispatch = useDispatch();
  const [thumb, setThumb] = useState("");
  const { t } = useTranslation("adminTemplate");

  const courseCate = useSelector((state) => state.courseCategoryReducer.data);
  const listUser = useSelector((state) => state.listUserReducer.data);

  useEffect(() => {
    setThumb(dataCourse?.hinhAnh);
  }, [dataCourse]);

  const renderCourseCate = () => {
    return courseCate?.map((category, index) => {
      return (
        <option key={index} value={category.maDanhMuc}>
          {category.tenDanhMuc}
        </option>
      );
    });
  };

  const creator = JSON.parse(localStorage.getItem("user"));

  const renderListCreator = () => {
    const listGV = listUser?.filter((user) => user.maLoaiNguoiDung === "GV");
    return listGV?.map((user, index) => (
      <option key={index} value={user.taiKhoan}>
        {user.hoTen}
      </option>
    ));
  };

  const courseSchema = yup.object().shape({
    maKhoaHoc: yup
      .string()
      .min(2, t("modal.codeTooShort"))
      .max(20, t("modal.noMore20char"))
      .required(t("modal.codeNotBlank")),
    tenKhoaHoc: yup.string().required(t("modal.courseNameNotBlank")),
    maDanhMucKhoaHoc: yup.string().required(t("modal.cateNotBlank")),
    ngayTao: yup
      .string()
      .required(t("modal.dateNotBlank"))
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        t("modal.format"),
      ),
    danhGia: yup
      .number()
      .required(t("modal.review"))
      .min(0, t("modal.lowestRate"))
      .max(5, t("modal.highestRate")),
    luotXem: yup
      .number()
      .required(t("modal.viewNotBlank"))
      .min(0, t("modal.lowestView")),
    taiKhoanNguoiTao: yup.string().required(t("modal.creatorNotBlank")),
    moTa: yup.string().required(t("modal.descNotBlank")),
  });

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {dataCourse ? t("modal.updateCourse") : t("modal.addCourse")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <Formik
              enableReinitialize
              initialValues={{
                maKhoaHoc: dataCourse?.maKhoaHoc || "",
                biDanh: dataCourse?.biDanh || "",
                tenKhoaHoc: dataCourse?.tenKhoaHoc || "",
                maDanhMucKhoaHoc:
                  dataCourse?.danhMucKhoaHoc.maDanhMucKhoahoc || "",
                ngayTao:
                  dataCourse?.ngayTao ||
                  moment(Date.now()).format("DD/MM/YYYY"),
                danhGia: 0,
                luotXem: dataCourse?.luotXem || 0,
                taiKhoanNguoiTao:
                  dataCourse?.nguoiTao.taiKhoan || creator.taiKhoan,
                moTa: dataCourse?.moTa || "",
                hinhAnh: dataCourse?.hinhAnh || null,
                maNhom: "GP09",
              }}
              validationSchema={courseSchema}
              onSubmit={(values) => {
                Swal.fire({
                  icon: "question",
                  title: t("courses.confirm"),
                  text: t("modal.confirmText"),
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: t("modal.agree"),
                  cancelButtonText: t("courses.cancel"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    //Tạo formData
                    let formData = new FormData();
                    if (values.hinhAnh?.name) {
                      for (let key in values) {
                        if (key !== "hinhAnh") {
                          formData.append(key, values[key]);
                        } else {
                          formData.append(
                            "File",
                            values.hinhAnh,
                            values.hinhAnh.name,
                          );
                        }
                      }
                    }

                    dataCourse
                      ? values.hinhAnh?.name
                        ? dispatch(updateCourse(formData, t))
                        : dispatch(updateCourseNoImage(values, t))
                      : dispatch(addCourse(formData, t));
                  }
                });
              }}
            >
              {({ setFieldValue }) => (
                <Form className="mx-1 mx-md-4">
                  <div className="row justify-content-around">
                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.courseCode")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-book fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            type="text"
                            name="maKhoaHoc"
                            className="form-control"
                            placeholder={t("modal.codeInput")}
                            style={{ fontSize: 15 }}
                            disabled={dataCourse}
                          />
                          <ErrorMessage
                            name="maKhoaHoc"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.courseName")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            type="text"
                            name="tenKhoaHoc"
                            className="form-control"
                            placeholder={t("modal.courseInput")}
                            style={{ fontSize: 15 }}
                          />
                          <ErrorMessage
                            name="tenKhoaHoc"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.Categories")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-briefcase fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            as="select"
                            className="form-select"
                            name="maDanhMucKhoaHoc"
                            style={{ fontSize: 15 }}
                          >
                            <option
                              value={
                                dataCourse
                                  ? dataCourse.danhMucKhoaHoc.maDanhMucKhoahoc
                                  : ""
                              }
                            >
                              {dataCourse
                                ? dataCourse.danhMucKhoaHoc.tenDanhMucKhoaHoc
                                : t("modal.selectCate")}
                            </option>
                            {renderCourseCate()}
                          </Field>
                          <ErrorMessage
                            name="maDanhMucKhoaHoc"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.dateCreate")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-calendar-days fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            type="text"
                            name="ngayTao"
                            placeholder="DD/MM/YYYY"
                            className="form-control"
                            style={{ fontSize: 15 }}
                          />
                          <ErrorMessage
                            name="ngayTao"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.evaluate")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            type="number"
                            name="danhGia"
                            className="form-control"
                            placeholder={t("modal.rateInput")}
                            style={{ fontSize: 15 }}
                          />
                          <ErrorMessage
                            name="danhGia"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.view")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-eye fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            type="number"
                            name="luotXem"
                            className="form-control"
                            placeholder={t("modal.viewInput")}
                            style={{ fontSize: 15 }}
                          />
                          <ErrorMessage
                            name="luotXem"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.creator")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa fa-briefcase fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <Field
                            as="select"
                            className="form-select"
                            name="taiKhoanNguoiTao"
                            style={{ fontSize: 15 }}
                          >
                            <option
                              value={
                                dataCourse
                                  ? dataCourse.nguoiTao.taiKhoan
                                  : creator.taiKhoan
                              }
                            >
                              {dataCourse
                                ? dataCourse.nguoiTao.hoTen
                                : creator.hoTen}
                            </option>
                            {renderListCreator()}
                          </Field>
                          <ErrorMessage
                            name="taiKhoanNguoiTao"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-5">
                      <label className="form-label ms-5">
                        {t("modal.img")}
                      </label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-image fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="file"
                            name="hinhAnh"
                            accept="image/png, image/jpeg"
                            onChange={(e) => {
                              let file = e.target.files[0];
                              let reader = new FileReader();
                              if (file) {
                                reader.readAsDataURL(file);
                                reader.onload = (e) => {
                                  setThumb(e.target.result);
                                };
                                setFieldValue("hinhAnh", file);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          <img
                            className="img-fluid rounded"
                            src={thumb}
                            style={{
                              width: 250,
                              height: 150,
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                            alt="Hình ảnh"
                          />
                        </div>

                        <div className="col-8">
                          <Field
                            as="textarea"
                            name="moTa"
                            className="form-control"
                            placeholder={t("modal.descInput")}
                            style={{ height: 150 }}
                          />
                          <ErrorMessage
                            name="moTa"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">
                      {dataCourse ? t("modal.update") : t("modal.add")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
