import "./Header.css";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { changeMenuState } from "../../redux/actions/activeMenuAction";
import { changeLoginState } from "../../redux/actions/loginAction";
import AuthStorage from "../../helper/AuthStorage";
function Header() {
  const location = useLocation();
  const loctionPath = location.pathname.split("/")[1];
  const history = useHistory();
  const dispatch = useDispatch();
  const { is_toggleMenu } = useSelector(
    (state: RootStateOrAny) => state.menuToggle
  );

  const showMenuBar = (type: string) => {
    if (type === "basicsettings") {
      history.push("/basicsettings/event-statistics");
    }
    if (type === "member") {
      history.push("/member/member-list");
    }
    if (type === "event") {
      history.push("/event/manage-event");
    }
    dispatch(changeMenuState(type));
  };

  const closeopenClass = is_toggleMenu ? "openmenu" : "closemenu";

  const Logout = () => {
    dispatch(changeLoginState(false));
    AuthStorage.deauthenticateUser();
    history.push("/");
  };

  return (
    <>
      <div className={closeopenClass}>
        <Container fluid className="p-0 container-fluid">
          <Navbar
            collapseOnSelect
            expand="lg"
            className="header-bg position-fixed"
          >
            <Navbar.Brand className="text-white logo-text">
              <div className="header-link">
                <img src="/img/Frame.svg" alt="" className="img-h-w" onClick={() => { history.push("/basicsettings/event-statistics"); }} />
                <span
                  className={
                    loctionPath === "basicsettings" ? "header-tab-active cursor-pointer" : "header-tab cursor-pointer"
                  }
                  onClick={() => {
                    showMenuBar("basicsettings");
                  }}
                >
                  기본설정
                </span>
                <span
                  className={
                    loctionPath === "member"
                      ? "header-tab-active cursor-pointer"
                      : "header-tab cursor-pointer"
                  }
                  onClick={() => {
                    showMenuBar("member");
                  }}
                >
                  회원설정
                </span>
                {/* <span className="compastrips_name" onClick={() => { showMenuBar("Member") }}>회원설정</span> */}
                <span
                  className={
                    loctionPath === "event" ? "header-tab-active cursor-pointer" : "header-tab cursor-pointer"
                  }
                  onClick={() => {
                    showMenuBar("event");
                  }}
                >
                  이벤트 설정
                </span>
              </div>
            </Navbar.Brand>

            <Dropdown className="ml-auto logout-btn-header">
              <Dropdown.Toggle id="dropdown-basic" className="text-center text-black d-flex align-items-center profile-dropdown">
                <img src="/img/logo5.svg  " className="mr-14 profile" />
                관리자
                <img
                  src="/img/logo6.svg"
                  className="ml-15 mt-2 arrow"
                  alt=""
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="profile-dropdown-menu">
                <Dropdown.Item onClick={Logout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar>
        </Container>
      </div>
    </>
  );
}

export default Header;
