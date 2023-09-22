import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actTryLogout } from "../UserTemplate/Login/duck/actions";
import { useTranslation } from "react-i18next";

export default function AdminTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(actTryLogout(navigate));
    i18n.changeLanguage(localStorage.getItem("lng") || "vi");
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
