import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import ScheduleCalendar from "../components/schedule/ScheduleCalendar";
import ScheduleWeek from "../components/schedule/ScheduleWeek";


const Schedule = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

     const openModal = () => {
    if (!showModal) setShowModal(true);
    else setShowModal(false);
  };
  console.log(showModal);
    return (
        <div>
          <Header />
          <Wrap>
            <div>
              <ScheduleCalendar />
              <button
                onClick={() => {
                  openModal();
                  navigate("/addschedule");
                }}
              >
                기록하기
              </button>
            </div>
            <ScheduleWeek />
          </Wrap>
        </div>
      );
    };
    
    const Wrap = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin-top: 30px;
    `;

export default Schedule;