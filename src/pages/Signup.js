import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signUpDB } from "../redux/modules/users";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  //const[userMail, setUserMail] = useState('')
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [success, setSuccess] = useState(false);

  const userSignUp = useSelector((state) => state.users.users);

  //const userId = email + "@" +userMail
  //이메일 검사
  const [userIdErr, setUserIdErr] = useState(false);

  const onChangeUserId = (e) => {
    const userIdRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setUserIdErr(false);
    else setUserIdErr(true);
    setEmail(e.target.value);
  };

  //비밀번호 검사
  const [pwErr, setPwErr] = useState(false);
  const onChangePw = (e) => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!e.target.value || pwRegex.test(e.target.value)) setPwErr(false);
    else setPwErr(true);

    if (!pwErr || e.target.value === pwErr) setPwCheckErr(false);
    else setPwCheckErr(true);
    setPw(e.target.value);
  };

  //확인용 비밀번호 검사
  const [pwCheckErr, setPwCheckErr] = useState(false);
  const onChangePwCheck = (e) => {
    if (e.target.value === pw) setPwCheckErr(false);
    else setPwCheckErr(true);
    setPwCheck(e.target.value);
  };

  //닉네임 유효성 검사
  // const [nickNameErr, setNicknameErr] = useState(false);

  // const NicknameCheck = (e) => {
  //     dispatch(NicknameDB(e.target.value));
  //     setUserNickname(e.target.value);
  // }

  const signUp = async () => {
    const userInfo = {
      email: email,
      password: pw,
      nickname: userNickname,
      name: userName,
    };
    dispatch(signUpDB(userInfo)).then(res => {
      window.alert("회원가입이 완료되었습니다. 입력하신 이메일에서 메일 인증후 이용 가능합니다.")
      navigate("/login")
    })
      
    //     if(userNickname?.response?.status === 400) {
    //         setNicknameErr(true);
    //         window.alert(userNickname?.response?.data);
    //     }else if(userNickname?.response?.data === "닉네임 중복"){
    //         setNicknameErr(true);
    //     }else setNicknameErr(false);
  };

  //console.log(userId, pw)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // userId;
    // setPw();
    setSuccess(true);
  };
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  return (
    <>
      <h1>회원가입</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <InputBoxes>
        <EmailWrap>
          <LabelEmail>이메일</LabelEmail>
          <input
            ref={emailRef}
            className="inputId"
            type="email"
            //userIdErr={userIdErr}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => {
              onChangeUserId(e);
            }}
          />
          {/* @
                            <SelectEM
                                onChange={(e) => setUserMail(e.target.value)}>
                                <option value="">선택해주세요</option>
                                <option value="naver.com">naver.com</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="daum.net">daum.net</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="nate.com">nate.com</option>
                                <option value="hotmail.com">hotmail.com</option>
                                <option value="outlook.com">outlook.com</option>
                                <option value="icloud.com">icloud.com</option>
                                <option value="direct">직접입력</option>
                        </SelectEM> */}
        </EmailWrap>

        {userIdErr && <EmailErr>이메일 형식이 올바르지 않다.</EmailErr>}

        <PWWrap>
          <LabelP pwErr={pwErr}>PW</LabelP>
          {/* <Info>영문, 숫자 포함한 8자 이상의 비밀번호 입력해주세요</Info> */}
          <InputPw
            pwErr={pwErr}
            onChange={(e) => {
              onChangePw(e);
            }}
            placeholder="비밀번호(영문, 숫자 포함 8자 이상)"
            type="password"
          />
          {pwErr && (
            <PwErr>비밀번호는 영문, 숫자 포함 8자 이상이여야 합니다.</PwErr>
          )}
        </PWWrap>

        <PwCheckWrap>
          <LabelPC>PW 체크</LabelPC>
          <InputPwCheck
            pwCheckErr={pwCheckErr}
            onChange={(e) => {
              onChangePwCheck(e);
            }}
            placeholder="비밀번호 확인"
            type="password"
          />
          {!pwErr && pwCheckErr && <PwErr>비밀번호가 일치하지 않습니다.</PwErr>}
        </PwCheckWrap>

        <NameWrap>
          <LabelN>이름</LabelN>
          <InputName
            value={userName || ""}
            placeholder="이름"
            onChange={(e) => setUserName(e.target.value)}
          />
        </NameWrap>
        <NicknameWrap>
          <LabelNN>닉네임</LabelNN>
          <InputNickname
            placeholder="닉네임"
            value={userNickname || ""}
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </NicknameWrap>
      </InputBoxes>

      <SignUpBtn
        type="submit"
        onClick={() => {
          signUp(email, pw, userName, userNickname);
        }}
        disabled={
          !email || !pw || !pwCheck || userIdErr || pwCheckErr ? true : false
        }
      >
        회원가입
      </SignUpBtn>
      {/* </form> */}
    </>
  );
};

const InputBoxes = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;
//이메일 스타일드 컴포넌트
const EmailWrap = styled.div`
  display: flex;
  margin: 10px;
`;

const LabelEmail = styled.label`
  color: rgb(
    ${(props) => (props.nickNameErr ? "255, 119, 119" : "41, 41, 41")}
  );
`;
const EmailErr = styled.div``;

//패스워드 스타일드컴포넌트
const PWWrap = styled.div`
  display: flex;
  margin: 10px;
`;

const LabelP = styled.label`
  color: rgb(
    ${(props) => (props.nickNameErr ? "255, 119, 119" : "41, 41, 41")}
  );
`;
const Info = styled.p``;
const InputPw = styled.input``;
const PwErr = styled.p``;

//패스워드확인 스타일드 컴포넌트
const PwCheckWrap = styled.div`
  display: flex;
  margin: 10px;
`;
const LabelPC = styled.label`
  color: rgb(
    ${(props) => (props.nickNameErr ? "255, 119, 119" : "41, 41, 41")}
  );
`;
const InputPwCheck = styled.input``;

//이름 스타일드 컴포넌트
const NameWrap = styled.div`
  display: flex;
  margin: 10px;
`;
const LabelN = styled.label`
  color: rgb(
    ${(props) => (props.nickNameErr ? "255, 119, 119" : "41, 41, 41")}
  );
`;
const InputName = styled.input``;

//닉네임 스타일드 컴포넌트
const NicknameWrap = styled.div`
  display: flex;
  margin: 10px;
`;
const LabelNN = styled.label`
  color: rgb(
    ${(props) => (props.nickNameErr ? "255, 119, 119" : "41, 41, 41")}
  );
`;
const InputNickname = styled.input``;

const SignUpBtn = styled.button``;

export default Signup;
