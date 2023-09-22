import React from "react";
import img1 from "../../../assets/images/hero-flex.png";
import img2 from "../../../assets/images/education-hero.png";
import img3 from "../../../assets/images/olstudy.png";
import img4 from "../../../assets/images/students.png";
import { useTranslation } from "react-i18next";

export default function Info() {
  const { t } = useTranslation();

  return (
    <>
      <section className="Info">
        <div className="sliderInfo">
          <div className="sliderContentInfo text-white">
            <p className="titleSliderInfo">{t("info.part1")} </p>
            <h6>{t("info.part2")}</h6>
            <p>{t("info.part3")}</p>
          </div>
        </div>
        <div className="InfoItem">
          <div className="row">
            <div className="col-md-6">
              <h6>{t("info.part4")}</h6>
              <h5>{t("info.part5")}</h5>
              <p>{t("info.part6")}</p>
            </div>
            <div className="col-md-6 bgInfoGreen">
              <img src={img1} alt="..." />
            </div>
          </div>
        </div>
        <div className="InfoItem ">
          <div className="row reInfoItem">
            <div className="col-md-6 bgInfoBlue ">
              <img src={img2} alt="..." />
            </div>
            <div className="col-md-6">
              <h6>{t("info.part7")}</h6>
              <h5>{t("info.part8")}</h5>
              <p>{t("info.part9")}</p>
            </div>
          </div>
        </div>
        <div className="InfoItem">
          <div className="row">
            <div className="col-md-6">
              <h6>{t("info.part10")}</h6>
              <h5>{t("info.part11")}</h5>
              <p>{t("info.part12")}</p>
            </div>
            <div className="col-md-6 bgInfoGreen">
              <img src={img3} alt="..." />
            </div>
          </div>
        </div>
        <div className="InfoItem">
          <div className="row reInfoItem">
            <div className="col-md-6 bgInfoBlue">
              <img src={img4} alt="" />
            </div>
            <div className="col-md-6">
              <h6>{t("info.part13")}</h6>
              <h5>{t("info.part14")}</h5>
              <p>{t("info.part15")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
