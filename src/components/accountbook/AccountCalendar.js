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

const CalendarBook = ({ accountList }) => {
  const dispatch = useDispatch();
  const [eventInfo, setEventInfo] = useState(null);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!isOpen);
  }

  // accountList 가공
  const convertCalendarData = (accountList) => {
    let mappedData = new Map();
    // 내역이 있는 날짜 수만큼 [0, 0] 만들기
    accountList !== undefined &&
      accountList.map((list) => {
        let original;
        let insertData = [];
        // 날짜별로 [0, 0] 생성 (만약 날짜가 중복되면 기존 value 그대로 get)
        if (mappedData.has(list.date)) original = mappedData.get(list.date);
        else original = [0, 0];
        // 수입이면 [+ 수입액, 0]
        if (list.type < 3) {
          insertData.push(original[0] + list.price);
          insertData.push(original[1]);
        }
        // 지출이면 [0, + 지출액]
        else {
          insertData.push(original[0]);
          insertData.push(original[1] + list.price);
        }
        // mappedData = {key :"2022-07-14" vaue:[10000, 0]}
        mappedData.set(list.date, insertData);
      });

    let convertedData = [];
    // Array.from(mappedData.keys()) = 내역있는 날짜 배열
    Array.from(mappedData.keys()).map((key) => {
      // value = (날짜별) [수입 누적액, 지출 누적액]
      const value = mappedData.get(key);
      // 수입누적액이 있으면 convertedData에 push
      if (value[0] > 0) {
        convertedData.push({
          title:
            "+" + String(value[0]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
          allDay: false,
          start: new Date(key),
          end: new Date(key),
        });
        // 지출누적액이 있으면 convertedData에 push
      }
      if (value[1] > 0) {
        convertedData.push({
          title:
            "-" + String(value[1]).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,"),
          allDay: false,
          start: new Date(key),
          end: new Date(key),
        });
      }
    });

    return convertedData;
  };

  return (
    <>
      <Calendar
        events={convertCalendarData(accountList)}
        localizer={localizer}
        style={{ height: 100 + "%", width: 100 + "%" }}
        components={{
          toolbar: ToolBar,
          month: {
            dateHeader: Day,
          },
        }}
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
