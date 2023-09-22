import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export default function UserTemplate() {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("lng") || "vi");
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
