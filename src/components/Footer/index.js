import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Cybersoft</h3>
              <p>
                {t("footer.street")}
                <br />
                {t("footer.district")}
                <br />
                {t("footer.city")} <br />
                <br />
                <strong>{t("contact.phone")}:</strong> 096.105.1014
                <br />
                <strong>Email:</strong> cybersoft@example.com
                <br />
              </p>
            </div>
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>{t("footer.link")}</h4>
              <ul>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                    {t("footer.home")}
                  </Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/all-courses">{t("header.courses")}</Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/info" onClick={() => window.scrollTo(0, 0)}>
                    {t("header.info")}
                  </Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                    {t("header.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>{t("header.courses")}</h4>
              <ul>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <a href="#!">Frontend</a>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <a href="#!">Backend</a>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <a href="#!">Fullstack</a>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <a href="#!">Mobile</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>{t("footer.sub")}</h4>
              <p>{t("footer.sub1")}</p>
              <form>
                <input type="email" name="email" />
                <input
                  type="submit"
                  defaultValue="Subscribe"
                  onClick={(e) => e.preventDefault()}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-md-flex py-4 align-items-center">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            © Copyright{" "}
            <strong>
              <span>2023</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="#!" className="twitter">
            <i style={{ fontSize: 15 }} className="bi bi-twitter"></i>
          </a>
          <a href="#!" className="facebook">
            <i style={{ fontSize: 15 }} className="bi bi-facebook"></i>
          </a>
          <a href="#!" className="instagram">
            <i style={{ fontSize: 15 }} className="bi bi-instagram"></i>
          </a>
          <a href="#!" className="google-plus">
            <i style={{ fontSize: 15 }} className="bi bi-google"></i>
          </a>
          <a href="#!" className="linkedin">
            <i style={{ fontSize: 15 }} className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
