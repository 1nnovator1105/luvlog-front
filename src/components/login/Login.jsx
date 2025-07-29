import React, { useState, useEffect, useRef } from "react";
import "./login.css";
import axios from "axios";
import logoImg from "../../static/luvlog512.png";

function Login(props) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    cover: "",
  });

  const makeCover = (value) => {
    let str = "";
    for (let i = 0; i < value.length; i++) {
      str += "*";
    }
    return str;
  };

  const makePassword = (value) => {
    let str = userInfo.password;
    str += value.substr(-1);
    return str;
  };

  const onChangeHandler = (e) => {
    const flag = e.target.name;
    if (flag === "username") {
      setUserInfo({ ...userInfo, username: e.target.value });
    } else {
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };

  const loginHandler = () => {
    if (!userInfo.username) {
      return alert("아이디를 입력하쇼~");
    } else if (!userInfo.password) {
      return alert("패스워드를 입력하쇼~");
    }

    const URL = "https://luvlog-server.vercel.app/api/login";
    const PARAMS = {
      username: userInfo.username,
      password: userInfo.password,
    };
    const HEADERS = {
      "Content-Type": "application/json",
    };

    axios({
      method: "post",
      url: URL,
      data: PARAMS,
      headers: HEADERS,
    })
      .then((res) => {
        if (res.data) {
          return res.data;
        }
      })
      .then((resJson) => {
        let authInfo = {
          username: resJson.USER_NAME,
          role: resJson.USER_ROLE,
        };
        props.setAuthInfo(authInfo);
      })
      .catch((err) => console.log(err));
  };

  const onKeyDownHandler = (e) => {
    let keyCode = e.keyCode;
    let key = e.key;

    let pw = userInfo.password;

    if (keyCode >= 48 && keyCode <= 111) {
      pw += key;
    } else if (keyCode === 8) {
      pw = pw.substr(0, pw.length - 1);
    }

    setUserInfo({ ...userInfo, password: pw });
  };

  return (
    <>
      <div className={"login-container"}>
        <div className={"login-form"}>
          <img src={logoImg} alt="luvlog-logo" />
          <div>
            <span className={"login-span"}>ID</span>
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <span className={"login-span"}>PW</span>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input type="button" value={"로그인"} onClick={loginHandler} />
            <input type="button" value={"회원가입"} />
          </div>
          <p className={"login-guest"}>
            &#x1F449;<span onClick={props.setGuestMode}>Guest</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
