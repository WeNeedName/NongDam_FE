import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import { logInDB } from "../redux/modules/users";
import KakaoLogin from "../images/kakao_login_medium_narrow.png";
import { KAKAO_AUTH_URL } from "../shared/KakaoOauth";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import PersonIcon from "@mui/icons-material/Person";
import { Translate } from "@mui/icons-material";

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
    if (email === "" || pw === "") {
      window.alert("빈칸 다 채워줘요");
      return;
    }
    const userInfo = {
      email: email,
      password: pw,
    };
    dispatch(logInDB(userInfo));
  };

  useEffect(() => {
    idRef.current.focus();
  }, [userSignIn]);

  return (
    <>
      <Header />
      <Container>
        <TopWrap>
          <p className="title">Nongdam</p>
          <p className="slogan"> 농장을 한 눈에 담다, 농담!</p>
          <p className="desc">
            행복한 농사 생활을 위한 농담 <br />내 농장에 필요한 모든 걸 한 눈에
            보세요.
          </p>
        </TopWrap>

        <InputBoxes>
          <div className="icon">{/* <PersonIcon /> */}</div>
          <IdInput
            ref={idRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="이메일"
          />
          <PwInput
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            required
            placeholder="비밀번호"
          />
        </InputBoxes>
        <SubmitBtns>
          <LoginBtn
            type="submit"
            onClick={() => {
              logIn();
            }}
          >
            로그인
          </LoginBtn>

          <SocialBtn
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
            src={KakaoLogin}
          />
        </SubmitBtns>
        <ToSignUp>
          회원이 아니시라면?
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ marginLeft: "10px", fontWeight: "500", cursor: "pointer" }}
          >
            회원가입
          </span>
          {/* <a href="/signup"> 회원가입</a> */}
        </ToSignUp>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 150px;
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
    color: #318f27;
    margin-bottom: 40px;
  }
  .slogan {
    font-weight: 700;
    font-size: 20px;
  }
  .desc {
    font-size: 11px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #666666;
  }
`;

const InputBoxes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon {
    position: absolute;

    z-index: 1;
  }
`;

const IdInput = styled.input`
  width: 180px;
  height: 30px;
  border: 1px solid #999999;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;

  ::placeholder {
    font-size: 10px;
    padding-left: 20px;
  }
`;
const PwInput = styled.input`
  width: 180px;
  height: 30px;
  border: 1px solid #999999;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  ::placeholder {
    font-size: 10px;
    padding-left: 20px;
  }
`;

const SubmitBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  width: 185px;
  height: 35px;
  justify-content: center;
  text-align: center;
  padding: 4px 13px;
  background-color: #22631c;
  color: white;
  border-radius: 8px;
  border: none;
  size: 11px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const ToSignUp = styled.div`
  margin-top: 10px;
`;
const SocialBtn = styled.img`
  width: 185px;
  height: auto;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #142785;
  }
`;

export default Login;
