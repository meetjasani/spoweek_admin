import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Buttons from "../../component/Buttons/Buttons";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import { changeLoginState } from "../../redux/actions/loginAction";
import "./login.css";

interface loginFormState {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginFormState: loginFormState = {
    email: "",
    password: "",
  };

  const login_Err = {
    emailError: "",
    emailFormatErr: "",
    passError: "",
  };

  const [statelogin, setStatelogin] = useState(loginFormState);
  const [loginErrors, setLoginErrors] = useState(login_Err);
  const [stayLogedIn, setStayLogedIn] = useState(false);
  const [incorrectPass, setIncorrectPass] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  const loginValidation = () => {
    let login_Err = {
      emailError: "",
      emailFormatErr: "",
      passError: "",
    };

    const validEmail: any = new RegExp(
      "^[a-z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    if (statelogin.email && !validEmail.test(statelogin.email)) {
      login_Err.emailFormatErr = "잘못된 이메일.";
    }

    if (!statelogin.email) {
      login_Err.emailError = "필수 정보입니다.";
    }

    if (statelogin.password === "") {
      login_Err.passError = "비밀번호를 한번 더 확인해주세요.";
    }

    setLoginErrors(login_Err);
    setIncorrectPass("");

    if (
      !loginErrors.emailError &&
      !loginErrors.passError &&
      !loginErrors.emailFormatErr
    ) {
      return true;
    }

    return false;
  };

  const Login = () => {
    if (!loginValidation()) {
      setBtnDisabled(true);
      return;
    }

    ApiPost("admin/auth/login", {
      email: statelogin.email,
      password: statelogin.password,
    })
      .then((res: any) => {
        setStatelogin(loginFormState);
        dispatch(changeLoginState(true));

        AuthStorage.setStorageData(
          STORAGEKEY.token,
          res.data.token,
          stayLogedIn
        );
        delete res.data.token;
        AuthStorage.setStorageJsonData(
          STORAGEKEY.userData,
          res.data,
          stayLogedIn
        );

        history.push("/basicsettings/event-statistics");
      })
      .catch((error) => {
        if (error === "Wrong Email") {
          setIncorrectPass("");
          setInvalidEmail("필수 정보입니다.");
        }

        if (error === "Wrong Password") {
          setInvalidEmail("");
          setIncorrectPass("비밀번호를 한번 더 확인해주세요.");
        }
      });
  };

  const validityChack = () => {
    if (statelogin.email !== "" && statelogin.password !== "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  useEffect(() => {
    validityChack();
  }, [statelogin]);

  return (
    <>
      <div className="logo-img">
        <img src="./img/Frame.png" className="img-1" alt="" />
      </div>


      <div className="modal-dialog login-popup modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="">

            <div>
              <p className="login-heading">관리자 로그인</p>
            </div>
            <form className="login-form">
              <div className="relative-input">
                <input
                  type="email"
                  className="login-input mt-20"
                  name="email"
                  onChange={(e) => {
                    setLoginErrors({
                      ...loginErrors,
                      emailError: "",
                      emailFormatErr: "",
                    });
                    setInvalidEmail("")
                    setStatelogin({ ...statelogin, email: e.target.value });
                  }}
                  value={statelogin.email}
                  placeholder="이메일 주소를 입력하세요."
                />
                <label className="position-input-label">아이디</label>
              </div>
              <div className="position-relative">
                {loginErrors.emailError && (
                  <p className="error-color error-message">
                    {loginErrors.emailError}
                  </p>
                )}
                {loginErrors.emailFormatErr && (
                  <p className="error-color error-message">
                    {loginErrors.emailFormatErr}
                  </p>
                )}
                {!loginErrors.emailError &&
                  !loginErrors.emailFormatErr &&
                  invalidEmail && (
                    <p className="error-color error-message">
                      {invalidEmail}
                    </p>
                  )}
              </div>
              <div className="relative-input">
                <input
                  type="password"
                  className=""
                  name="password"
                  onChange={(e) => {
                    setLoginErrors({
                      ...loginErrors,
                      passError: "",
                    });
                    setIncorrectPass("");
                    setStatelogin({ ...statelogin, password: e.target.value });
                  }}
                  placeholder="비밀번호를 입력하세요."
                />
                <label className="position-input-label">비밀번호</label>
              </div>
              <div className="position-relative">
                {loginErrors.passError && (
                  <p className="error-color error-message">
                    {loginErrors.passError}
                  </p>
                )}
                {!loginErrors.passError && incorrectPass && (
                  <p className="error-color error-message">
                    {incorrectPass}
                  </p>
                )}
              </div>
              <Buttons
                type=""
                ButtonStyle={
                  btnDisabled
                    ? "bg-disable login-btn  cusrsor-not-allowed"
                    : "login-btn btn-active  "
                }
                onClick={Login}
                disabled={btnDisabled}
              >
                로그인
              </Buttons>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
