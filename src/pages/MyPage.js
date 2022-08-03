import { React, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import MyPageMenu from "../components/myPage/MyPageMenu";
import MemberInfo from "../components/myPage/MemberInfo";
import EditMemberInfo from "../components/myPage/EditMemberInfo";
import EditPw from "../components/myPage/EditPw";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getInfoDB } from "../redux/modules/users";
import Footer from "../components/Footer";

// 이미지
import chickenIcon from "../images/chickenIcon.png";
import presentIcon from "../images/presentIcon.png";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalCloseRef = useRef();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const isLogin = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const userInfo = useSelector((state) => state.users.user);

  return (
    <>
      <Wrap>
        <Header />
        <MyPageMenu />
        <Routes>
          <Route path="/" element={<MemberInfo />} />
          <Route path="/editmemberinfo" element={<EditMemberInfo />} />
          <Route path="/editpw" element={<EditPw userInfo={userInfo} />} />
        </Routes>
        <Icon
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          Image={presentIcon}
          chickenIcon={chickenIcon}
          onClick={() => {
            const openNewWindow = window.open("about:blank");
            openNewWindow.location.href =
              "https://docs.google.com/forms/d/e/1FAIpQLSfdZk0LhMOcp8FVaChB2mvIvixRKmY4A_iErl-UsoI0qPJVLg/viewform?usp=sf_link";
          }}
        />
        {isHovering ? (
          <Info>
            <Emoji>🥳 </Emoji> 설문조사 참여하고 치킨받기
          </Info>
        ) : null}
      </Wrap>
      <Footer currentpage="schedule" />
    </>
  );
};

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFadeC = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Wrap = styled.div`
  height: 100vh;
  margin-top: 100px;
  margin-bottom: 50px;

  display: grid;
  grid-auto-rows: auto;

  grid-template-columns: 1fr repeat(4, 18.75%) 1fr;
  justify-content: center;
  flex-flow: wrap;

  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  row-gap: 16px;
  /* column-gap: 15px; */

  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 25%) 1fr;
  }
  @media only screen and (max-width: 760px) {
    margin-top: 90px;
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 0px repeat(2, auto) 0px;
  }
`;

const Info = styled.div`
  width: 240px;
  height: 60px;
  border-radius: 8px;
  position: absolute;
  position: fixed;
  right: 190px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: ${boxFadeB} 1s;
  z-index: 1000;
  @media only screen and (max-width: 760px) {
    bottom: 120px;
    right: 150px;
  }
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.Image});
  background-position: center 30%;
  background-size: cover;
  position: fixed;
  bottom: 90px;
  right: 70px;
  z-index: 110;
  border-radius: 100px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    animation: ${boxFadeC} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

export default MyPage;
