import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInfoDB } from "../redux/modules/users";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import ScheduleCalendar from "../components/schedule/ScheduleCalendar";
import ScheduleWeek from "../components/schedule/ScheduleWeek";
import AddSchedule from "../components/schedule/AddSchedule";
import {
  getCurrentScheduleListDB,
  getScheduleListDB,
} from "../redux/modules/schedule";

const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.user);
  const yearMonth = useSelector((state) => state.schedule.yearMonth);
  //  상세 모달 열기
  const [isOpen, setOpen] = useState(false);
  const isLogin = sessionStorage.getItem("jwtToken")
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
  }, [dispatch]);
  




  return (
    <Wrap>
      <Header currentPage="schedule"/>
      {isLogin ? (
        <>
      <CalendarWrap>
        <ScheduleCalendar />
        <AddScheduleBtn
        onClick={() => {
          toggleModal();
        }}
      >
        + 기록하기
      </AddScheduleBtn>
      </CalendarWrap>
      <CurrentListWrap>
        <ScheduleWeek />
      </CurrentListWrap>  
      
      {isOpen && <AddSchedule isOpen={isOpen} toggleModal={toggleModal}/>}
      </>
      ): (
      
      
      <Blocked>
        <p className="plzLogin"> 로그인 회원만 이용 가능합니다.</p>
        </Blocked>
        
        )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  /* max-width: 1920px; */
  height: 100vh;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr minmax(600px, 670px) 22% 1fr;
  grid-template-rows: 70px minmax(580px, 650px) 1fr;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 26px;
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(320px, 400px) 1fr;
  }
  ::-webkit-scrollbar {
    display: none;
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
    padding: 20px 10px 16px 10px;

    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const AddScheduleBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  width: 80px;
  height: 24px;
  background: #318f27;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 10px;
  position: absolute;
  top: 36px;
  right: 30px;
  &:hover {
    background-color: #22631c;
  }
`;

const CurrentListWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  border-left: 1px solid #dddddd;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;

const Blocked = styled.div`
margin-top: 100px;
width : 100vw;
height: 100vh;
background-color: #ffffff;
opacity: 0.5;
position: relative;

.plzLogin{
  display : flex;
  justify-content: center;
  align-items: center;
  font-size : 10px;
  color : #000;
  position: absolute;
}
`



export default Schedule;
