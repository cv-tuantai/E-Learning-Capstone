import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Carousel() {
  const { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      id="hero"
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="container position-relative"
        data-aos="zoom-in"
        data-aos-delay={100}
      >
        <h1>
          Learning Today
          <br />
          Leading Tomorrow
        </h1>
        <h2 className="pt-3">{t("carousel.welcome")}</h2>
        <Link to="/all-courses" className="btn-get-started">
          {t("carousel.start")}
        </Link>
      </div>
    </section>
  );
}
