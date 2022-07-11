import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

// 달력 라이브러리
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "../../BigCalendar.css";
// 컴포넌트
import ToolBar from "./ToolBar";
import Day from "./Day";
import Event from "./Event";
import AccountModal from "./AccountModal";
import EventModal from "./EventModal";

const CalendarBook = () => {
  const dispatch = useDispatch();
  const [eventInfo, setEventInfo] = useState(null);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const accountList = useSelector((state) => state.account.accountList);
  const yearMonth = useSelector((state) => state.account.yearMonth);

  useEffect(() => {
    dispatch(getAccountListDB(yearMonth));
  }, [dispatch]);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Calendar
        events={accountList.map((list, id) => {
          return {
            title:
              list.category === "수입"
                ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                  "+" +
                  String(list.price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
                : "-" +
                  String(list.price).replace(
                    /(\d)(?=(?:\d{3})+(?!\d))/g,
                    "$1,"
                  ),
            allDay: false,
            start: new Date(list.date),
            end: new Date(list.date),
          };
        })}
        localizer={localizer}
        style={{ height: 100 + "%", width: 100 + "%" }}
        components={{
          toolbar: ToolBar,
          month: {
            dateHeader: Day,
          },
        }}
        // onSelectSlot={(slotInfo) => {
        //   console.log(slotInfo);
        //   toggleModal();
        // }}
        onSelectEvent={(eventInfo) => {
          setEventInfo(eventInfo);
          toggleModal();
        }}
        eventPropGetter={Event}
      />
      {isOpen && (
        <EventModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          eventInfo={eventInfo}
          accountList={accountList}
        />
      )}
    </>
  );
};

export default CalendarBook;
