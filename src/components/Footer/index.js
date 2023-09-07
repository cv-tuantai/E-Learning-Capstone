import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Cybersoft</h3>
              <p>
                112 Đ. Cao Thắng
                <br />
                Phường 4, Quận 3
                <br />
                Thành phố Hồ Chí Minh <br />
                <br />
                <strong>Phone:</strong> 096.105.1014
                <br />
                <strong>Email:</strong> cybersoft@example.com
                <br />
              </p>
            </div>
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Liên kết</h4>
              <ul>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/all-courses">Khóa học</Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/info" onClick={() => window.scrollTo(0, 0)}>
                    Thông tin
                  </Link>
                </li>
                <li>
                  <i
                    style={{ fontSize: 12 }}
                    className="bi bi-chevron-right"
                  ></i>
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Khóa học</h4>
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
                  <a href="#!">NodeJS</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Đăng ký theo dõi</h4>
              <p>Hãy đăng ký để nhận được những khóa học mới nhất nhé.</p>
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
