import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actTryLogout } from "../UserTemplate/Login/duck/actions";

export default function HomeTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actTryLogout(navigate));
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
