import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actTryLogout } from "../UserTemplate/Login/duck/actions";
import { useTranslation } from "react-i18next";

export default function HomeTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(actTryLogout(navigate));
    i18n.changeLanguage(localStorage.getItem("lng") || "vi");
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </div>
  );
}
