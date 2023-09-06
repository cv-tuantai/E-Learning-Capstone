import React, { useEffect, useState } from "react";
import CountUp from "countup";
import VisibilitySensor from "react-visibility-sensor";

export default function Counter() {
  const [viewedOnce, setViewedOnce] = useState(false);

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
  }, [viewedOnce]);

  return (
    <section id="counts" className="counts section-bg">
      <div className="container">
        <div className="row counters">
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isVisible && !viewedOnce) {
                setViewedOnce(true);
              }
            }}
          >
            <div className="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start={0}
                data-purecounter-end={9000}
                data-purecounter-duration={5}
                className="purecounter"
              />
              <p>Học viên</p>
            </div>
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isVisible && !viewedOnce) {
                setViewedOnce(true);
              }
            }}
          >
            <div className="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start={0}
                data-purecounter-end={1000}
                data-purecounter-duration={5}
                className="purecounter"
              />
              <p>Khóa học</p>
            </div>
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isVisible && !viewedOnce) {
                setViewedOnce(true);
              }
            }}
          >
            <div className="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start={0}
                data-purecounter-end={33200}
                data-purecounter-duration={5}
                className="purecounter"
              />
              <p>Giờ học</p>
            </div>
          </VisibilitySensor>
          <VisibilitySensor
            onChange={(isVisible) => {
              if (isVisible && !viewedOnce) {
                setViewedOnce(true);
              }
            }}
          >
            <div className="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start={0}
                data-purecounter-end={400}
                data-purecounter-duration={5}
                className="purecounter"
              />
              <p>Giảng viên</p>
            </div>
          </VisibilitySensor>
        </div>
      </div>
    </section>
  );
}
