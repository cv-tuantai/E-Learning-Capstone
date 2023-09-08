import React, { useState } from "react";
import imgReg from "../../../assets/images/login.webp";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Register() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <section style={{ backgroundColor: "#eee", paddingTop: 20 }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Đăng ký
                    </p>
                    <form className="mx-1 mx-md-4">
                      <label className="form-label ms-5">Họ tên</label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên của bạn"
                            style={{ fontSize: 15 }}
                          />
                        </div>
                      </div>
                      <label className="form-label ms-5">Tài khoản</label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tài khoản của bạn"
                            style={{ fontSize: 15 }}
                          />
                        </div>
                      </div>
                      <label className="form-label ms-5">Mật khẩu</label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu của bạn"
                            style={{ fontSize: 15 }}
                          />
                        </div>
                      </div>
                      <label className="form-label ms-5">Số điện thoại</label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-phone fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Nhập số điện thoại của bạn"
                            style={{ fontSize: 15 }}
                          />
                        </div>
                      </div>
                      <label className="form-label ms-5">Email</label>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Nhập email của bạn"
                            style={{ fontSize: 15 }}
                          />
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheck}
                        />
                        <label className="form-check-label">
                          Tôi đồng ý tất cả các tuyên bố trong{" "}
                          <a href="#!">Điều khoản dịch vụ</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-warning btn-lg"
                          disabled={!isChecked}
                        >
                          Đăng ký
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={imgReg}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
