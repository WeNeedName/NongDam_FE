import { React, useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInfoDB } from "../redux/modules/users";
import {
  getCurrentScheduleListDB,
  getScheduleListDB,
} from "../redux/modules/schedule";

// 컴포넌트
import Header from "../components/Header";
import ScheduleCalendar from "../components/schedule/ScheduleCalendar";
import ScheduleWeek from "../components/schedule/ScheduleWeek";
import AddSchedule from "../components/schedule/AddSchedule";
import FooterNav from "../components/FooterNav";
import Footer from "../components/Footer";

// 이미지
import chickenIcon from "../images/chickenIcon.png";
import presentIcon from "../images/presentIcon.png";

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.user);
  const yearMonth = useSelector((state) => state.schedule.yearMonth);
  //  상세 모달 열기
  const [isOpen, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  function toggleModal(id) {
    setOpen(!isOpen);
  }
  //유저 정보 받아오기
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  //최근 스케줄리스트 받아오기
  useEffect(() => {
    dispatch(getCurrentScheduleListDB());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getScheduleListDB(yearMonth));
  }, [yearMonth]);

  return (
    <>
      <Wrap>
        <Header currentPage="schedule" />
        <>
          <CalendarWrap>
            <ScheduleCalendar userInfo={userInfo} />
            {userInfo?.crops.length !== 0 && (
              <AddScheduleBtn
                onClick={() => {
                  toggleModal();
                }}
              >
                + 기록하기
              </AddScheduleBtn>
            )}
          </CalendarWrap>
          <CurrentListWrap>
            <ScheduleWeek />
          </CurrentListWrap>

          {isOpen && <AddSchedule isOpen={isOpen} toggleModal={toggleModal} />}
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
          <FooterNav currentPage="schedule" />
        </>
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
  width: 100vw;
  /* max-width: 1920px; */
  height: 100vh;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr minmax(600px, 780px) 25% 1fr;
  grid-template-rows: 80px minmax(640px, 740px) 1fr;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 26px;
  margin-bottom: 50px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr minmax(600px, 720px) 24% 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(610px, 700px) 1fr;
  }
`;

const CalendarWrap = styled.div`
  padding: 30px 30px 36px 30px;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  @media only screen and (max-width: 760px) {
    padding: 20px 10px 20px 10px;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-top: 10px;
    border-radius: 0px;
    width: 100%;
    margin-left: -10px;
  }
`;

const AddScheduleBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  width: auto;
  height: 26px;
  background: #55a349;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  position: absolute;
  top: 36px;
  right: 30px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
  }
  @media only screen and (max-width: 760px) {
    right: 16px;
  }
`;

const CurrentListWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid #dddddd;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    border-left: none;
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
  z-index: 10;
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
  z-index: 10;
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

export default Schedule;
