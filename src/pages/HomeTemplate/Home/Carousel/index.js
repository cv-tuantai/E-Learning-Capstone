import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Carousel() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
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
        <h2 className="pt-3">Chào mừng đến với hệ thống E-learning</h2>
        <a href="courses.html" className="btn-get-started">
          Bắt đầu nào
        </a>
      </div>
    </section>
  );
}
