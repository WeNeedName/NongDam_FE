import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import Signup from "./Signup";
import { logInDB } from "../redux/modules/users";

const Login = () => {
  const idRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userSignIn = useSelector((state) => state.users.users);

  const logIn = (email, pw) => {
    //console.log(email, pw);
    console.log("로그인 시도")
    if (email === ""|| pw === "") {
      console.log("빈칸 채워줘야죠")
      window.alert("빈칸을 모두 채워주세요");
      return;
    }
    const userInfo = {
      email: email,
      password: pw,
    };
    dispatch(logInDB(userInfo));
  };

  useEffect(()=>{
      idRef.current.focus();

  },[])
  useEffect(() => {
    setErrMsg("");
  }, [email, pw]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setEmail();
    // setPw();
    // setSuccess(true);
  };

  return (
    <>
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            // aria-live="assertive"
          >
            {" "}
            {errMsg}
          </p>
          <h1>로그인페이지</h1>

          {/* <form onSubmit={handleSubmit}> */}
            <EmailBox>
              {" "}
              <label className="id">이메일</label>
              <InputEmail
                type="text"
                ref={idRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                
                placeholder="이메일을 입력해주세요"
              />
            </EmailBox>

            <PwBox>
              {" "}
              <label className="pw">PW</label>
              <InputPw
                type="text"
                className="inputPw"
                id="pw"
                onChange={(e) => setPw(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
            </PwBox>
            <LoginBtn
              style={{ width: "100px" }}
              type="submit"
              onClick={() => {
                logIn(email, pw)
                navigate("/");
              }}
            >
              {" "}
              로그인
            </LoginBtn>
          {/* </form> */}
        </section>

    </>
  );
};

const InputBoxes = styled.div`
  display: flex;
  flex-direction: column;

  .inputId {
    margin: 10px;
  }
  .inputPw {
    margin: 10px;
  }
`;

const EmailBox = styled.div`
  display: flex;
`;
const InputEmail = styled.input``


const PwBox = styled.div`
  display: flex;
`;
const InputPw = styled.input``
const LoginBtn = styled.button``
export default Login;
