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
  }, [dispatch]);

  return (
    <Wrap>
      <Header currentPage="schedule" />
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

        {isOpen && <AddSchedule isOpen={isOpen} toggleModal={toggleModal} />}
      </>
    </Wrap>
  );
};

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
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr minmax(600px, 720px) 24% 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 95% 1fr;
    grid-template-rows: 70px minmax(320px, 400px) 1fr;
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
  width: auto;
  height: 26px;
  background: #318f27;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  position: absolute;
  top: 36px;
  right: 30px;
  cursor: pointer;
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

export default Schedule;
