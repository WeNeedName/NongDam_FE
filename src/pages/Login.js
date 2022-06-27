import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./Signup";
import { logInDB } from "../redux/modules/users";

const Login = () => {
  const idRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.users.users);

  const logIn = () => {
    console.log(id, pw);
    const data = {
      email: id,
      password: pw,
    };
    dispatch(logInDB(data));
  };

  // useEffect(()=>{
  //     idRef.current.focus();

  // },[userSignIn])

  useEffect(() => {
    setErrMsg("");
  }, [id, pw]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setId();
    setPw();
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>로그인 성공</h1>
          <br />
          <p>
            <a href="#">메인으로 가기</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
            {errMsg}
          </p>
          <h1>로그인페이지</h1>

          <form onSubmit={handleSubmit}>
            <IdBox>
              {" "}
              <label className="id">ID</label>
              <input
                type="text"
                className="inputId"
                id="id"
                ref={idRef}
                autoComplete="off"
                onChange={(e) => setId(e.target.value)}
                value={id}
                required
              />
            </IdBox>

            <PwBox>
              {" "}
              <label className="pw">PW</label>
              <input
                type="text"
                className="inputPw"
                id="pw"
                onChange={(e) => setPw(e.target.value)}
                value={pw}
                required
              />
            </PwBox>
            <button
              style={{ width: "100px" }}
              onClick={() => {
                logIn();
              }}
            >
              {" "}
              로그인
            </button>
          </form>
          {/* <p>회원이 아니시라면? <br/>
                <span className="line">
                    <Signup />
                    <a href="#"> 회원가입</a>
                </span>
            </p> */}
        </section>
      )}
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

export default Login;
