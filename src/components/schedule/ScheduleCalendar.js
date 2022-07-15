import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendarSchedule.css";

// 컴포넌트
import ToolBar from "./ToolbarSchedule";
import Day from "./DaySchedule";
import EventSchedule from "./EventSchedule";
import EventScheduleModal from "./EventScheduleModal";
import {
  getCurrentScheduleListDB,
  getScheduleListDB,
} from "../../redux/modules/schedule";

const ScheduleCalendar = () => {
  const dispatch = useDispatch();
  const [nowMonth, setNowMonth] = useState(null);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const yearMonth = useSelector((state) => state.schedule.yearMonth);

  console.log(scheduleList)
  // console.log(yearMonth)
  // console.log(nowMonth)
 
//큰 달력에서 모달 열기
const [isOpen, setOpen] = useState(false);
const [eventInfo, setEventInfo] = useState(null);
const [eventDate, setEventDate] = useState([]);

function toggleModal() {
  setOpen(!isOpen);
}
  return (
    <>
    <Calendar
      events={scheduleList.map((list, id) => {
        // 여기에 모달의 내용을 넣어볼까
        return {
          title:
            list.toDo,
            allDay: false,
            start: new Date(list.startTime),
            end: new Date(list.endTime),
            crop : list.crop

        };
      })}
      localizer={localizer}
      style={{ height: 500, width: 600 }}
      components={{
        toolbar: ToolBar,
        month: {
          dateHeader: Day,
        },
      }}
      setNowMonth={setNowMonth}

      onSelectEvent={(eventInfo) => {
        setEventInfo(eventInfo);
        toggleModal();
      }}
      eventPropGetter={EventSchedule}
    />
    {isOpen && (
    <EventScheduleModal
      isOpen={isOpen}
      toggleModal={toggleModal}
      eventInfo={eventInfo}
      scheduleList={scheduleList}/>)}
   </>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export default ScheduleCalendar;
