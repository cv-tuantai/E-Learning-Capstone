import React, { useEffect } from "react";

export default function BackToTop() {
  useEffect(() => {
    let backtotop = document.querySelector(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 5) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };

      window.addEventListener("load", toggleBacktotop);
      window.addEventListener("scroll", toggleBacktotop);

      return () => {
        window.removeEventListener("load", toggleBacktotop);
        window.removeEventListener("scroll", toggleBacktotop);
      };
    }
  }, []);

  return (
    <div>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
}
