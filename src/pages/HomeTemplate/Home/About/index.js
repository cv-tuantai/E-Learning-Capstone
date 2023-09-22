import React from "react";
import aboutImg from "../../../../assets/images/about.webp";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay={100}
          >
            <img src={aboutImg} className="img-fluid" alt="..." />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>{t("about.why")}</h3>
            <p className="fst-italic py-2">{t("about.introduce")}</p>
            <ul>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part1")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part2")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part3")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part4")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part5")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part7")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part7")}
              </li>
              <li>
                <i className="bi bi-check-circle" /> {t("about.part8")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
