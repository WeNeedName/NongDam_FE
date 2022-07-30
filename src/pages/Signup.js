import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signUpDB } from "../redux/modules/users";
import { useNavigate } from "react-router-dom";
import nongdamLogo from "../images/nongdam_logo.png";
// alert 라이브러리
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const pwCheckRef = useRef("");

  const [email, setEmail] = useState("");
  const [userMail, setUserMail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userName, setUserName] = useState("");

  const userId = email + "@" + userMail;

  //이메일 검사
  const [userIdErr, setUserIdErr] = useState(false);

  const onChangeUserId = (e) => {
    const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
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
  const pwcheckText = pwCheckRef.current.value;

  const [pwCheckErr, setPwCheckErr] = useState(false);
  console.log(pwcheckText, pw);
  const onChangePwCheck = (e) => {
    if (pwcheckText !== "" && pwcheckText === pw) setPwCheckErr(false);
    else setPwCheckErr(true);
    setPwCheck(e.target.value);
  };

  useEffect(() => {
    if (pwcheckText !== "" && pwcheckText === pw) setPwCheckErr(false);
    else setPwCheckErr(true);
  }, [pw, pwcheckText]);

  const signUp = async () => {
    const userInfo = {
      email: userId,
      password: pw,
      nickname: userNickname,
      name: userName,
    };
    dispatch(signUpDB(userInfo));
    Swal.fire({
      title: "인증메일 전송 중입니다.",
      html: " <b></b> 잠시 후 완료됩니다.",
      timer: 2300,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  console.log(pwcheckText, pw);

  return (
    <ContainerWrap>
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

        <InputBoxesWrap>
          <EmailWrap>
            <LabelEmail>이메일</LabelEmail>
            <EmailInputWrap className="email">
              <EmailInputBox
                ref={emailRef}
                className="inputId"
                type="email"
                userIdErr={userIdErr}
                //userIdErr={userIdErr}
                // placeholder="이메일을 입력해주세요"
                onChange={(e) => {
                  onChangeUserId(e);
                }}
              />
              <Gol> @ </Gol>
              <SelectEM
                // userIdError={userIdError}
                onChange={(e) => setUserMail(e.target.value)}
              >
                <option value="">선택해주세요</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="daum.net">daum.net</option>
                <option value="gmail.com">gmail.com</option>
                <option value="nate.com">nate.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="icloud.com">icloud.com</option>
              </SelectEM>
            </EmailInputWrap>

            {userIdErr && <EmailErr>이메일 형식이 올바르지 않습니다.</EmailErr>}
            {!userIdErr && email !== "" && (
              <EmailOk>사용 가능한 이메일 형식 입니다.</EmailOk>
            )}
          </EmailWrap>
          <InputWrap className="password">
            <LabelPw pwErr={pwErr}>비밀번호</LabelPw>
            {/* <Info>영문, 숫자 포함한 8자 이상의 비밀번호 입력해주세요</Info> */}
            <InputBoxPw
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

          <InputWrap className="passwordCheck">
            <LabelPC>비밀번호 확인</LabelPC>
            <InputBox
              pwCheckErr={pwCheckErr}
              onChange={(e) => {
                onChangePwCheck(e);
              }}
              ref={pwCheckRef}
              //placeholder="비밀번호를 한 번 더 입력해주세요"
              type="password"
            />

            {pwCheck === "" && (
              <InfoPc>비밀번호를 한 번 더 입력해주세요.</InfoPc>
            )}
            {pwCheck !== pw && pwCheck !== "" && (
              <PwCheckErr>비밀번호가 일치하지 않습니다.</PwCheckErr>
            )}
            {pwCheck !== "" && pwCheck === pw && (
              <PwCheckOk>비밀번호가 일치합니다.</PwCheckOk>
            )}
          </InputWrap>

          <InputWrap className="name">
            <LabelName>이름</LabelName>
            <InputBox
              value={userName || ""}
              // placeholder="이름"
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputWrap>

          <InputWrap className="nickname">
            <LabelNickname>닉네임</LabelNickname>
            <InputBox
              // placeholder="닉네임"
              value={userNickname || ""}
              onChange={(e) => setUserNickname(e.target.value)}
            />
          </InputWrap>
        </InputBoxesWrap>
        <BtnWrap>
          <Info>
            회원가입 시{" "}
            <InfoLink
              onClick={() => {
                const openNewWindow = window.open("about:blank");
                openNewWindow.location.href =
                  "https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727";
              }}
            >
              이용약관{" "}
            </InfoLink>
            및{" "}
            <InfoLink
              onClick={() => {
                const openNewWindow = window.open("about:blank");
                openNewWindow.location.href =
                  "https://dust-sulfur-10c.notion.site/5ffc468037d54d608784aa3184ecdf44";
              }}
            >
              개인정보취급방침
            </InfoLink>
            에 동의하는 것으로 간주됩니다.
          </Info>
          <SignUpBtn
            type="submit"
            onClick={() => {
              signUp(email, pw, userName, userNickname);
            }}
            disabled={
              !email ||
              !pw ||
              pwcheckText !== pw ||
              !userName ||
              !userNickname ||
              userIdErr
                ? true
                : false
            }
          >
            회원가입
          </SignUpBtn>
        </BtnWrap>
      </Container>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Container = styled.div`
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
    font-size: 13px;
    margin-bottom: 20px;
    color: #666666;
  }
`;

const Logo = styled.img`
  width: 120px;
  margin-right: 26px;
  cursor: pointer;
`;

const InputBoxesWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const EmailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailInputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 3px;
`;

const LabelEmail = styled.label`
  /* margin-right: 219px; */
  margin-bottom: 5px;
  text-align: left;
  color: rgb(${(props) => (props.EmailErr ? "255, 119, 119" : "41, 41, 41")});
`;

const EmailInputBox = styled.input`
  width: 100px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 5px;
  :focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.userIdErr ? "rgb(255, 119, 119)" : "#55a349")};
  }
`;

const Gol = styled.span`
  margin: 0px 4px;
  font-size: 13px;
  color: #616161;
`;

const SelectEM = styled.select`
  width: 120px;
  height: 45px;
  position: relative;
  display: block;
  border-radius: 5px;
  font-size: 13px;
  color: #616161;
  line-height: 21px;
  resize: none;
  padding: 4px 8px;
  border: 1px solid #999999;
  &::placeholder {
    color: #424242;
  }
  &:focus {
    outline: none;
    border: 2px solid #55a349;
  }
  /* border-color: rgb(
    ${(props) => (props.userIdError ? "255, 119, 119" : "219, 219, 219")}
  ); */
`;

const EmailErr = styled.div`
  /* margin-right: 103px; */
  text-align: left;
  font-size: 11px;
  color: #ec0000;
`;

const EmailOk = styled.div`
  /* margin-right: 103px; */
  text-align: left;
  font-size: 11px;
  color: #0a9c19;
`;

const InputBox = styled.input`
  width: 240px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 5px;
  :focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.pwCheckErr ? "rgb(255, 119, 119)" : "#55a349")};
  }
`;

const InputBoxPw = styled.input`
  width: 240px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 5px;
  :focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.pwErr ? "rgb(255, 119, 119)" : "#55a349")};
  }
`;

const InputBoxE = styled.input`
  width: 240px;
  height: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  padding: 5px;
  :focus {
    outline: none;
    border: 2px solid
      ${(props) => (props.pwErr ? "rgb(255, 119, 119)" : "#55a349")};
  }
`;

const LabelPw = styled.label`
  text-align: left;
  /* margin-right: 215px; */
  margin-bottom: 5px;
  color: rgb(${(props) => (props.PwErr ? "255, 119, 119" : "41, 41, 41")});
`;

const InfoPw = styled.div`
  margin-right: 57px;
  margin-top: 3px;
  font-size: 11px;
  color: #666666;
`;

const PwErr = styled.div`
  /* margin-right: 30px; */
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #ec0000;
`;

const PwOk = styled.div`
  /* margin-right: 145px; */
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #0a9c19;
`;

const LabelPC = styled.label`
  /* margin-right: 180px; */
  text-align: left;
  margin-bottom: 5px;
  color: rgb(${(props) => (props.PwCheckErr ? "255, 119, 119" : "41, 41, 41")});
`;

const PwCheckErr = styled.div`
  /* margin-right: 120px; */
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #ec0000;
`;

const InfoPc = styled.div`
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #666666;
`;

const PwCheckOk = styled.div`
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #0a9c19;
`;

const LabelName = styled.label`
  /* margin-right: 230px; */
  text-align: left;
  margin-bottom: 5px;
  // color: rgb(
  //   ${(props) => (props.NameErr ? "255, 119, 119" : "41, 41, 41")}
  // );
`;

const LabelNickname = styled.label`
  text-align: left;
  /* margin-right: 220px; */
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
  margin-top: 16px;
`;

const Info = styled.span`
  font-size: 11px;
  margin-bottom: 10px;
  color: #666666;
`;

const InfoLink = styled.span`
  font-size: 11px;
  margin-bottom: 6px;
  color: #666666;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
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
