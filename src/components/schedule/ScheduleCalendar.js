import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// react-calendar 라이브러리
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendarSchedule.css";

// 컴포넌트
import ToolbarSchedule from "./ToolbarSchedule";
import Day from "./DaySchedule";
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
  console.log(yearMonth);

  useEffect(() => {
    dispatch(getScheduleListDB(yearMonth));
  }, [dispatch]);

  return (
    <Calendar
      events={scheduleList.map((list, id) => {
        return {
          title: list.crop,
          allDay: false,
          start: new Date(list.startTime),
          end: new Date(list.endTime),
        };
      })}
      localizer={localizer}
      style={{ height: 500, width: 600 }}
      components={{
        toolbar: ToolbarSchedule,
        month: {
          dateHeader: Day,
        },
      }}
      setNowMonth={setNowMonth}
    />
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
