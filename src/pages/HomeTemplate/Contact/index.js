import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

export default function Contact() {
  const schema = yup.object().shape({
    name: yup.string().required("Họ tên không để trống!"),
    email: yup.string().required("Email không để trống!"),
    subject: yup.string().required("Tiêu đề không để trống!"),
    message: yup.string().required("Tin nhắn không để trống!"),
  });

  return (
    <section id="contact" className="contact" style={{ paddingTop: "7rem" }}>
      <h2 className="text-center pb-3">Liên hệ chúng tôi!</h2>
      <div data-aos="fade-up">
        <iframe
          style={{ border: 0, width: "100%", height: 350 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.489093857469!2d106.67338085496098!3d10.773802525129996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fca39e3b493%3A0x865af6a617c57d82!2zVHJ1bmcgVMOibSDEkMOgbyBU4bqhbyBM4bqtcCBUcsOsbmggQ3liZXJTb2Z0IC0gQ8ahIFPhu58gUXXhuq1uIDMsIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1694018966187!5m2!1svi!2s"
          frameBorder={0}
          allowFullScreen
        />
      </div>
      <div className="container" data-aos="fade-up">
        <div className="row mt-5">
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt" />
                <h4>Địa chỉ:</h4>
                <p>112 Cao Thắng, Phường 4, Quận 3, Tp Hồ Chí Minh</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope" />
                <h4>Email:</h4>
                <p>cybersoft@example.com</p>
              </div>
              <div className="phone">
                <i className="bi bi-phone" />
                <h4>Điện thoại:</h4>
                <p>096.105.1014</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0">
            <Formik
              initialValues={{
                name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={schema}
            >
              {() => (
                <Form className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Tên của bạn"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <Field
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email của bạn"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <Field
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Tiêu đề"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <Field
                      className="form-control"
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Tin nhắn"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" onClick={(e) => e.preventDefault()}>
                      Send Message
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
