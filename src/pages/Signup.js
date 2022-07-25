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
  const [empty, setEmpty] = useState(false);

  const userSignUp = useSelector((state) => state.users.users);

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
    dispatch(signUpDB(userInfo)).then((res) => {
      window.alert(
        "회원가입이 완료되었습니다. 입력하신 이메일에서 메일 인증후 이용 가능합니다."
      );
      navigate("/login");
    });

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
    <Container>
      <TopWrap>
        <p className="title">Nongdam</p>
        <p className="slogan"> 농장을 한 눈에 담다, 농담!</p>
        <p className="desc">
          행복한 농사 생활을 위한 농담 <br />내 농장에 필요한 모든 걸 한 눈에
          보세요.
        </p>
      </TopWrap>

      <InputBoxesWrap>
        <InputWrap>
          <LabelEmail>이메일</LabelEmail>
          <InputBox
            ref={emailRef}
            className="inputId"
            type="email"
            //userIdErr={userIdErr}
            // placeholder="이메일을 입력해주세요"
            onChange={(e) => {
              onChangeUserId(e);
              autocapitalize = "off";
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
        </InputWrap>

        {userIdErr && <EmailErr>이메일 형식이 올바르지 않습니다.</EmailErr>}
        {!userIdErr && email !== "" && (
          <EmailOk>사용 가능한 이메일 형식 입니다.</EmailOk>
        )}

        <InputWrap>
          <LabelPw pwErr={pwErr}>비밀번호</LabelPw>
          {/* <Info>영문, 숫자 포함한 8자 이상의 비밀번호 입력해주세요</Info> */}
          <InputBox
            pwErr={pwErr}
            onChange={(e) => {
              onChangePw(e);
            }}
            // placeholder="비밀번호(영문, 숫자 포함 8자 이상)"
            type="password"
          />

          {pw === "" && (
            <InfoPw> 최소 8자, 하나 이상의 숫자를 포함해주세요.</InfoPw>
          )}
          {pwErr && (
            <PwErr>비밀번호는 영문, 숫자 포함 8자 이상이여야 합니다.</PwErr>
          )}
          {pw !== "" && !pwErr && <PwOk>올바른 비밀번호 입니다.</PwOk>}
        </InputWrap>

        <InputWrap>
          <LabelPC>비밀번호 확인</LabelPC>
          <InputBox
            pwCheckErr={pwCheckErr}
            onChange={(e) => {
              onChangePwCheck(e);
            }}
            //placeholder="비밀번호를 한 번 더 입력해주세요"
            type="password"
          />

          {pwCheck === "" && <InfoPc>비밀번호를 한 번 더 입력해주세요.</InfoPc>}
          {pwCheck !== "" && !pwErr && pwCheckErr && (
            <PwCheckErr>비밀번호가 일치하지 않습니다.</PwCheckErr>
          )}
          {pwCheck !== "" && !pwErr && !pwCheckErr && (
            <PwCheckOk>비밀번호가 일치합니다.</PwCheckOk>
          )}
        </InputWrap>

        <InputWrap>
          <LabelName>이름</LabelName>
          <InputBox
            value={userName || ""}
            // placeholder="이름"
            onChange={(e) => setUserName(e.target.value)}
          />
        </InputWrap>

        <InputWrap>
          <LabelNickname>닉네임</LabelNickname>
          <InputBox
            // placeholder="닉네임"
            value={userNickname || ""}
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </InputWrap>
      </InputBoxesWrap>
      <BtnWrap>
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
      </BtnWrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

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

const InputBoxesWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 3px;
`;

const LabelEmail = styled.label`
  margin-right: 220px;
  margin-bottom: 5px;
  color: rgb(${(props) => (props.EmailErr ? "255, 119, 119" : "41, 41, 41")});
`;

const InputBox = styled.input`
  width: 240px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 5px;
`;

const EmailErr = styled.div`
  margin-right: 105px;

  font-size: 11px;
  color: #ec0000;
`;

const EmailOk = styled.div`
  margin-right: 110px;

  font-size: 11px;
  color: #0a9c19;
`;

const LabelPw = styled.label`
  margin-right: 210px;
  margin-bottom: 5px;
  color: rgb(${(props) => (props.PwErr ? "255, 119, 119" : "41, 41, 41")});
`;

const InfoPw = styled.div`
  margin-right: 60px;
  margin-top: 3px;
  font-size: 11px;
  color: #666666;
`;

const PwErr = styled.div`
  margin-right: 30px;
  margin-top: 3px;
  font-size: 11px;
  color: #ec0000;
`;

const PwOk = styled.div`
  margin-right: 145px;
  margin-top: 3px;
  font-size: 11px;
  color: #0a9c19;
`;

const LabelPC = styled.label`
  margin-right: 180px;
  margin-bottom: 5px;
  color: rgb(${(props) => (props.PwCheckErr ? "255, 119, 119" : "41, 41, 41")});
`;

const PwCheckErr = styled.div`
  margin-right: 120px;
  margin-top: 3px;
  font-size: 11px;
  color: #ec0000;
`;

const InfoPc = styled.div`
  margin-right: 100px;
  margin-top: 3px;
  font-size: 11px;
  color: #666666;
`;

const PwCheckOk = styled.div`
  margin-right: 150px;
  margin-top: 3px;
  font-size: 11px;
  color: #0a9c19;
`;

const LabelName = styled.label`
  margin-right: 230px;
  margin-bottom: 5px;
  // color: rgb(
  //   ${(props) => (props.NameErr ? "255, 119, 119" : "41, 41, 41")}
  // );
`;

const LabelNickname = styled.label`
  margin-right: 220px;
  margin-bottom: 5px;
  // color: rgb(
  //   ${(props) => (props.NicknameErr ? "255, 119, 119" : "41, 41, 41")}
  // );
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpBtn = styled.button`
  width: 253px;
  height: 40px;
  flex-direction: center;
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
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export default Signup;
