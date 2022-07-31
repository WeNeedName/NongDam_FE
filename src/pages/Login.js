import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import { logInDB } from "../redux/modules/users";
import KakaoLogin from "../images/kakao_login_large_wide.png";
import { KAKAO_AUTH_URL } from "../shared/KakaoOauth";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Translate } from "@mui/icons-material";

import nongdamLogo from "../images/nongdam_logo.png";

const Login = () => {
  const idRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.users.users);

  const logIn = () => {
    const userInfo = {
      email: email,
      password: pw,
    };
    dispatch(logInDB(userInfo));
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      logIn();
    }
  };

  useEffect(() => {
    idRef.current.focus();
  }, [userSignIn]);

  return (
    <>
      <Container>
        <TopWrap>
          <Logo
            onClick={() => {
              navigate("/");
              setHeaderNav(headerNav);
            }}
            src={nongdamLogo}
            alt="농담 로고"
          />
          <p className="slogan"> 농장을 한 눈에 담다, 농담!</p>
          <p className="desc">
            행복한 농사 생활을 위한 농담 <br />내 농장에 필요한 모든 걸 한 눈에
            보세요.
          </p>
        </TopWrap>

        <InputBoxes>
          <div className="icon">
            <PersonIcon fontSize="small" />
          </div>
          <IdInput
            ref={idRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="이메일"
            autocapitalize="off"
          />
          <div className="pwIcon">
            <LockIcon fontSize="small" />
          </div>
          <PwInput
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            required
            placeholder="비밀번호"
            autocapitalize="off"
            autoComplete="off"
            onKeyPress={onKeyPress}
          />
        </InputBoxes>
        <SubmitBtns>
          <LoginBtn
            type="submit"
            onClick={logIn}
            disabled={!email || !pw ? true : false}
          >
            로그인
          </LoginBtn>
          <span>or</span>
          <SocialBtn
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
            src={KakaoLogin}
          />
        </SubmitBtns>
        <ToSignUp>
          회원이 아니시라면?
          <ToSignUpBtn
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </ToSignUpBtn>
        </ToSignUp>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: relative;
`;

const TopWrap = styled.div`
  .title {
    font-weight: 700;
    font-size: 30px;
    color: #55a349;
    margin-bottom: 40px;
  }
  .slogan {
    font-weight: 700;
    font-size: 20px;
  }
  .desc {
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 28px;
    color: #666666;
  }
`;

const Logo = styled.img`
  width: 130px;
  margin-right: 26px;
  cursor: pointer;
`;

const InputBoxes = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    position: absolute;
    transform: translate(-100px, -15px);
    z-index: 1;
    color: #8b95a1;
  }
  .pwIcon {
    position: absolute;
    transform: translate(-100px, 20px);
    z-index: 1;
    color: #8b95a1;
    size: 5px;
  }
`;

const IdInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid #999999;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-left: 35px;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: 12px;
  }
`;
const PwInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid #999999;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-top: 3px;
  padding-right: 3px;
  padding-bottom: 3px;
  padding-left: 35px;

  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 12px;
  }
`;

const SubmitBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  width: 240px;
  height: 36px;
  justify-content: center;
  text-align: center;
  padding: 4px 13px;
  background-color: #55a349;
  color: white;
  border-radius: 5px;
  border: none;
  size: 11px;
  margin-top: 13px;
  margin-bottom: 5px;

  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 1;
    cursor: default;
  }
`;
const SocialBtn = styled.img`
  width: 240px;
  height: 36px;
  margin: 5px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
const ToSignUp = styled.div`
  margin-top: 30px;
`;

const ToSignUpBtn = styled.span`
  margin-left: 10px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;

export default Login;
