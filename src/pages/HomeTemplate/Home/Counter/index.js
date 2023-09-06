import React, { useEffect } from "react";
import CountUp from "countup";

export default function Counter() {
  useEffect(() => {
    const counters = document.querySelectorAll(".purecounter");
    counters.forEach((counter) => {
      const endValue = parseInt(counter.getAttribute("data-purecounter-end"));
      const startValue = parseInt(
        counter.getAttribute("data-purecounter-start") || 0,
      );
      const duration = parseInt(
        counter.getAttribute("data-purecounter-duration"),
      );

      new CountUp(counter, startValue, endValue, 0, duration).start();
    });
  }, []);

  return (
    <section id="counts" className="counts section-bg">
      <div className="container">
        <div className="row counters">
          <div className="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start={0}
              data-purecounter-end={9000}
              data-purecounter-duration={5}
              className="purecounter"
            />
            <p>Học viên</p>
          </div>
          <div className="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start={0}
              data-purecounter-end={1000}
              data-purecounter-duration={5}
              className="purecounter"
            />
            <p>Khóa học</p>
          </div>
          <div className="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start={0}
              data-purecounter-end={33200}
              data-purecounter-duration={5}
              className="purecounter"
            />
            <p>Giờ học</p>
          </div>
          <div className="col-lg-3 col-6 text-center">
            <span
              data-purecounter-start={0}
              data-purecounter-end={400}
              data-purecounter-duration={5}
              className="purecounter"
            />
            <p>Giảng viên</p>
          </div>
        </div>
      </div>
    </section>
  );
}
