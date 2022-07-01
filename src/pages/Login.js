import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import { logInDB } from "../redux/modules/users";
import KakaoLogin from "../images/kakao_login_medium_narrow.png"
import {KAKAO_AUTH_URL} from "../shared/KakaoOauth"
import { useNavigate } from "react-router";


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


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setId();
  //   setPw();
  //   setSuccess(true);
  // };

  const logIn = () => {
    if(email === "" || pw === ""){
      window.alert("빈칸 다 채워줘요")
      return;
    }
   
      dispatch(logInDB({
        email: email,
        password: pw,
      }
      ));
    };
  

  useEffect(()=>{
    idRef.current.focus();
},[userSignIn])

  return (
    <>
        <section>
          <h1>로그인페이지</h1>

          {/* <form onSubmit={handleSubmit}> */}
            <IdBox>
              {" "}
              <label className="id">ID</label>
              <input
                ref={idRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </IdBox>

            <PwBox>
              {" "}
              <label className="pw">PW</label>
              <input
                type="text"
                onChange={(e) => setPw(e.target.value)}
                value={pw}
                required
              />
            </PwBox>
            <p><LoginBtn
              type="submit"
              style={{ width: "100px" }}
              onClick={() => {
                logIn()
                navigate("/");
              }}
            >
              {" "}
              로그인
            </LoginBtn></p>

            <p><SocialBtn
             onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
            src={KakaoLogin} />
           </p>   
          {/* </form> */}
          <p>회원이 아니시라면? <br/>
                <span className="line">
                    <a href="/signup"> 회원가입</a>
                </span>
            </p>
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

const IdBox = styled.div`
  display: flex;
`;

const PwBox = styled.div`
  display: flex;
`;
const LoginBtn = styled.button`
`
const SocialBtn = styled.img`  
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #142785;
  }

`
export default Login;
