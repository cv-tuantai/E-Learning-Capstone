import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RegModal() {
  const dispatch = useDispatch();
  const [searchCourse, setSearchCourse] = useState("");
  const [courseInfo, setCourseInfo] = useState({});

  const unRegisteredCourse = useSelector(
    (state) => state.courseUnRegReducer.data,
  );

  const renderListUnregisteredCourse = (unRegisteredCourse) => {
    if (!unRegisteredCourse) return null;

    const filteredItems = unRegisteredCourse.filter((item) => {
      const searchTerm = searchCourse.trim().toLowerCase();
      const courseName = item.tenKhoaHoc.trim().toLowerCase();
      return searchTerm === "" || courseName.includes(searchTerm);
    });

    return filteredItems.map((item, index) => (
      <li
        key={index}
        onClick={() => {
          setCourseInfo(item);
          setSearchCourse(item.tenKhoaHoc);
        }}
        className="dropdown-item"
      >
        {item.tenKhoaHoc}
      </li>
    ));
  };

  return (
    <div
      className="modal fade"
      id="regModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticRegModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <div className="border-bottom border-secondary">
              <div className="row">
                <h5 className="text-left my-1 col-3"> Chọn khóa học</h5>

                <form className="form-group mb-2 col-6">
                  <input
                    onChange={(e) => setSearchCourse(e.target.value)}
                    value={searchCourse}
                    data-bs-toggle="dropdown"
                    placeholder="Nhập hoặc chọn khóa học"
                    type="text"
                    className="form-control dropdown-toggle"
                  />

                  <ul
                    className="dropdown-menu"
                    style={{
                      width: "50vh",
                      height: "50vh",
                      overflowY: "scroll",
                    }}
                  >
                    {renderListUnregisteredCourse(unRegisteredCourse)}
                  </ul>
                </form>
                <div className="col-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-success me-1">Ghi danh</button>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
