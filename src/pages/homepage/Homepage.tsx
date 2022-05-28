import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage-1">
      <div className="heading-1">
        <h1>이벤트 통계</h1>
      </div>
      <div className="block-1"> 
        <div className=" border-bottom " />
      </div>

      <div className="main-cards">
        <div className="main-card">
          <h2> 누적 개인 회원 </h2>
          <img src="./img/log1.svg" />
          <h3> 300 </h3>
          <p>
            <sub>명</sub>
          </p>
        </div>
        <div className="main-card">
          <h2> 누적 공고 등록 </h2>
          <img src="./img/log2.svg" />
          <h3>
            {" "}
            542 <sub>개</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <h2> 누적 기업 회원 수 </h2>
          <img src="./img/log3.svg" />
          <h3>
            {" "}
            653 <sub>명</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <h2> 누적 방문자 수 </h2>
          <img src="./img/log1.svg" />
          <img src="./img/log4.svg" className="img-3" />
          <h3>
            {" "}
            647 <sub>명</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <h2> 누적 공고 조회 수 </h2>
          <img src="./img/log2.svg" />
          <img src="./img/log4.svg" className="img-4" />
          <h3>
            {" "}
            432 <sub>개</sub>{" "}
          </h3>
        </div>
        <div className="main-card">
          <h2> 누적 총 예상 참가비 </h2>
          <img src="./img/log3.svg" />
          <img src="./img/log4.svg" className="img-4" />
          <h3>
            {" "}
            2,000,000 <sub>명</sub>{" "}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
