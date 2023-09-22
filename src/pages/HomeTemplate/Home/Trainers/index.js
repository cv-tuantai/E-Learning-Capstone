import React from "react";
import trainer1 from "../../../../../src/assets/images/trainer-1.jpg";
import trainer2 from "../../../../../src/assets/images/trainer-2.jpg";
import trainer3 from "../../../../../src/assets/images/trainer-3.jpg";
import { useTranslation } from "react-i18next";

export default function Trainers() {
  const { t } = useTranslation();

  return (
    <section id="trainers" className="trainers">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{t("lecturers.lecturers")}</h2>
          <p>{t("lecturers.highlight")}</p>
        </div>
        <div className="row" data-aos="zoom-in" data-aos-delay={100}>
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member card-container">
              <img src={trainer1} className="img-fluid" alt="..." />
              <div className="member-content">
                <h4>Walter White</h4>
                <span>{t("lecturers.part1")}</span>
                <p>{t("lecturers.part2")}</p>
                <div className="social">
                  <a href="#!">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#!">
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
                <span>{t("lecturers.part3")}</span>
                <p>{t("lecturers.part2")}</p>
                <div className="social">
                  <a href="#!">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#!">
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
                <span>{t("lecturers.part4")}</span>
                <p>{t("lecturers.part2")}</p>
                <div className="social">
                  <a href="#!">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#!">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#!">
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
