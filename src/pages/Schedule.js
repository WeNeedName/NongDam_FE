import { React, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getInfoDB} from "../redux/modules/users"

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import ScheduleCalendar from "../components/schedule/ScheduleCalendar";
import ScheduleWeek from "../components/schedule/ScheduleWeek";
import AddSchedule from "../components/schedule/AddSchedule";


const Schedule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.users.user);
  //  상세 모달 열기
  const [isOpen, setOpen] = useState(false);
  function toggleModal(id) {
    setOpen(!isOpen);
  }
  
  useEffect(() => {
    dispatch(getInfoDB());
  }, []); 

    return (
        <div>
          <Header />
          <Wrap>
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
            <ScheduleWeek />
            {isOpen && <AddSchedule isOpen={isOpen} toggleModal={toggleModal} />}
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