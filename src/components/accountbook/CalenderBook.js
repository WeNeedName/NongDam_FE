import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

// 달력 라이브러리
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendar.css";
// 컴포넌트
import Toolbar from "./Toolbar";
import Day from "./Day";

const CalendarBook = () => {
  const dispatch = useDispatch();

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const accountList = useSelector((state) => state.account.accountList);
  const yearMonth = useSelector((state) => state.account.yearMonth);
  console.log(accountList);
  console.log(yearMonth);

  useEffect(() => {
    dispatch(getAccountListDB(yearMonth));
  }, [dispatch]);

  return (
    <Calendar
      events={accountList.map((list, id) => {
        return {
          title:
            list.category === "수입"
              ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                "+" +
                String(list.price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
              : "-" +
                String(list.price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
          allDay: false,
          start: new Date(list.date),
          end: new Date(list.date),
        };
      })}
      localizer={localizer}
      style={{ height: 500, width: 600 }}
      components={{
        toolbar: Toolbar,
        month: {
          dateHeader: Day,
        },
      }}
    />
  );
};

export default CalendarBook;
