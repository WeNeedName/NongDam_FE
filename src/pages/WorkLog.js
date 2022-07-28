import { React, useState, useEffect } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoadWorkLog from "../components/workLog/LoadWorkLog";
import DetailWorkLog from "./DetailWorkLog";
import styled, { keyframes } from "styled-components";
import { loadWorkLogListDB, loadWorkLogDB } from "../redux/modules/workLog";

import { useSelector, useDispatch } from "react-redux";
import FooterNav from "../components/FooterNav";
import Footer from "../components/Footer";

// 이미지
import chickenIcon from "../images/chickenIcon.png";
import presentIcon from "../images/presentIcon.png";

const WorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(loadWorkLogListDB());
  }, []);

  const workLogList = useSelector((state) => state?.workLog?.workLogList);

  return (
    <>
      <Container length={workLogList?.length}>
        <Header currentPage="workLog" />
        <LoadWorkLog workLogList={workLogList} />
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
        <FooterNav currentPage="workLog" />
      </Container>
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

const Container = styled.div`
  margin-top: 100px;
  background-color: #f5f5f5;
  margin-bottom: ${(props) =>
    props.length === 1 ? "400px" : props.length === 2 ? "200px" : "0"};
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
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 50px;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

export default WorkLog;
