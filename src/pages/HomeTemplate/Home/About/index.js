import React from "react";
import aboutImg from "../../../../assets/images/about.webp";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay={100}
          >
            <img src={aboutImg} className="img-fluid" alt />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>Tại sao chọn E-Learning?</h3>
            <p className="fst-italic py-2">
              Học qua dự án thực tế, học đi đôi với hành, không lý thuyết lan
              man, phân tích cội nguồn của vấn đề, xây dựng từ các ví dụ nhỏ đến
              thực thi một dự án lớn ngoài thực tế để học viên học xong làm được
              ngay.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle" /> Lộ trình bài bản từ zero
                tới chuyên nghiệp, nâng cao.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Huấn luyện để phát triển
                năng lực và niềm đam mê lập trình.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Tự động chấm điểm trắc
                nghiệm và đưa câu hỏi tùy theo mức độ học viên.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Thống kê, so sánh khả năng
                học của các học viên cùng level để đưa ra mục tiêu.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Tương tác cùng mentor và
                giảng viên qua phần thảo luận.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Chấm bài và có thể vấn đáp
                trực tuyến để review.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Kết nối CV của bạn đến với
                các đối tác của V learning.
              </li>
              <li>
                <i className="bi bi-check-circle" /> Cơ hội thực tập tại các
                công ty lớn như FPT, Microsoft.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
