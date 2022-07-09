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

  return (
    <div>
      <ScheduleCalendar />
      <button
        onClick={() => {
          toggleModal();
        }}
      >
        기록하기
      </button>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 100px;
`;

export default Schedule;
