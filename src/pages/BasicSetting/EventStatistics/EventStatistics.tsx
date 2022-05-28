import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { ApiGet, ApiGetNoAuth } from "../../../helper/API/ApiData";
import { numberWithCommas } from "../../../helper/util";
import "../../homepage/homepage.css";

const EventStatistics = () => {

  const [eventStatistics, setEventStatistics] = useState<any>();

  const { is_loggedin } = useSelector((state: RootStateOrAny) => state.login);

  const getData = () => {
    ApiGetNoAuth(`general/getDashboradByAdmin`)
      .then((res: any) => {
        setEventStatistics(res?.data)
      })
  }

  useEffect(() => {
    if (is_loggedin === true) {
      getData()
    }
  }, [is_loggedin])
  return (
    <div className="homepage-1">
      <div className="heading-1">
        <h1>이벤트 통계</h1>

        {/* <BootstrapTable keyField="id" data={data} columns={columns} /> */}
        {/* <span className="block-1 border-bottom border-dark"></span> */}
      </div>

      <div className="block-1 border-bottom"></div>
      <div className="main-cards">
        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/Accumulated.svg" className="Event-img" />
            <p> 누적 개인 회원 </p>
          </div>
          <h3>
            {" "}
            {eventStatistics?.generalCount} <sub>명</sub>{" "}
          </h3>
        </div>

        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-notifications.svg" className="Event-img" />
            <p> 누적 공고 등록 </p>
          </div>
          <h3>
            {" "}
            {eventStatistics?.eventCount} <sub>개</sub>{" "}
          </h3>
        </div>


        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-business.svg" className="Event-img" />
            <p> 누적 기업 회원 수 </p>
          </div>
          <h3>
            {" "}
            {eventStatistics?.businessCount} <sub>명</sub>{" "}
          </h3>
        </div>


        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/user-plus.svg" className="Event-img" />
            <p> 누적 방문자 수 </p>
          </div>
          <h3>
            {" "}
            {eventStatistics?.visitorCount} <sub>명</sub>{" "}


          </h3>
        </div>

        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/volume-plus.svg" className="Event-img" />
            <p> 누적 공고 조회 수 </p>
          </div>
          <h3>
            {" "}
            {/* {eventStatistics?.notificationReadCount} <sub>개</sub>{" "} */}
            {eventStatistics?.eventViewCount} <sub>명</sub>{" "}
          </h3>
        </div>


        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/bussiness-plus.svg" className="Event-img" />
            <p> 누적 총 예상 참가비 </p>
          </div>
          <h3>
            {" "}
            {numberWithCommas(eventStatistics?.participateTotalFee, ",")} <sub>원</sub>{" "}
          </h3>
        </div>


        {/* <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-notifications.svg" className="Event-img" />
            <p> 누적 공고 등록 </p>
          </div>
          <h3>
            {" "}
            542 <sub>개</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-business.svg" className="Event-img" />
            <p> 누적 기업 회원 수 </p>
          </div>
          <h3>
            {" "}
            653 <sub>명</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/Accumulated.svg" className="Event-img-1" />
            <img src="../img/pluse.svg" className="img" />
            <p> 누적 방문자 수 </p>
          </div>
          <h3>
            {" "}
            647 <sub>명</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-notifications.svg" className="Event-img-1" />
            <img src="../img/pluse.svg" className="img-1" />
            <p> 누적 공고 조회 수 </p>
          </div>
          <h3>
            {" "}
            432 <sub>개</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <div className="Accumulated">
            <img src="../img/accumulated-business.svg" className="Event-img-1" />
            <img src="../img/pluse.svg" className="img-2" />
            <p> 누적 총 예상 참가비 </p>
          </div>
          <h3>
            {" "}
            2,000,000 <sub>명</sub>{" "}
          </h3>
        </div> */}
      </div>
    </div>
  );
};

export default EventStatistics;
