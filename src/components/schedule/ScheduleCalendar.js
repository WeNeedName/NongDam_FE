import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendarSchedule.css";

// 컴포넌트
import ToolBarSchedule from "./ToolBarSchedule";
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

  console.log(scheduleList);
  // console.log(yearMonth)
  // console.log(nowMonth)

  //큰 달력에서 모달 열기
  const [isOpen, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [eventDate, setEventDate] = useState([]);
  const [view, setView] = useState("month");

  function toggleModal() {
    setOpen(!isOpen);
  }
  return (
    <>
      {view === "day" ? (
        <MonthChangeBtn
          onClick={(e) => {
            if (view === "month") {
              setView("day");
            } else {
              setView("month");
            }
          }}
        >
          {" "}
          month
        </MonthChangeBtn>
      ) : null}

      <Calendar
        events={scheduleList.map((list, id) => {
          // 여기에 달력 모달 내용 삽입
          <div key={id} />;
          return {
            title: list.toDo,
            allDay: false,
            start: new Date(list.startTime),
            end: new Date(list.endTime),
            crop: list.crop,
          };
        })}
        localizer={localizer}
        style={{ height: 100 + "%", width: 100 + "%" }}
        components={{
          toolbar: ToolBarSchedule,
          month: {
            dateHeader: Day,
          },
        }}
        defaultView="month"
        view={view}
        onView={(view) => setView(view)}
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
          scheduleList={scheduleList}
        />
      )}
    </>
  );
};

// const Nav = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 30px;
// `;

const MonthChangeBtn = styled.div`
  border: 1px solid #bfbfbf;
  border-radius: 13px;
  padding: 3.5px 13px;
  color: #616161;
  font-size: 14px;
  background-color: transparent;
  position: absolute;
  left: 75%;
  top: 4.7%;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media only screen and (max-width: 760px) {
    left: 74%;
    top: 4.8%;
  }
`;

export default ScheduleCalendar;
