import React from "react";
import trainer1 from "../../../../../src/assets/images/trainer-1.jpg";
import trainer2 from "../../../../../src/assets/images/trainer-2.jpg";
import trainer3 from "../../../../../src/assets/images/trainer-3.jpg";

export default function Trainers() {
  return (
    <section id="trainers" className="trainers">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Giảng viên</h2>
          <p>Giảng viên nổi bật</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member card-container">
              <img src={trainer1} className="img-fluid" alt="..." />
              <div className="member-content">
                <h4>Walter White</h4>
                <span>Lập trình Frontend</span>
                <p>
                  Giảng viên giày dặn kinh nghiệm và có nhiều tâm huyết với
                  nghề, trải qua trên 10 năm kinh nghiệm
                </p>
                <div className="social">
                  <a href="#">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member card-container">
              <img src={trainer2} className="img-fluid" alt="..." />
              <div className="member-content">
                <h4>Sarah Jhinson</h4>
                <span>Lập trình Backend</span>
                <p>
                  Giảng viên giày dặn kinh nghiệm và có nhiều tâm huyết với
                  nghề, trải qua trên 10 năm kinh nghiệm
                </p>
                <div className="social">
                  <a href="#">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member card-container">
              <img src={trainer3} className="img-fluid" alt="..." />
              <div className="member-content">
                <h4>William Anderson</h4>
                <span>Lập trình Fullstack</span>
                <p>
                  Giảng viên giày dặn kinh nghiệm và có nhiều tâm huyết với
                  nghề, trải qua trên 10 năm kinh nghiệm
                </p>
                <div className="social">
                  <a href="#">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#">
                    <i className="bi bi-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
