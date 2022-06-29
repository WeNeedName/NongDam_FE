import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// react-calendar 라이브러리
import Calendar from "react-calendar";
import "../../Calendar.css";

const AccountCalender = () => {
  const [value, onChange] = useState(new Date());
  const moment = require("moment");
  // 기록이 있는 날 리스트
  const marks = [
    "15-06-2022",
    "03-06-2022",
    "07-06-2022",
    "12-06-2022",
    "13-06-2022",
    "15-06-2022",
  ];

  return (
    <Wrap>
      <Calendar
        onChange={onChange}
        value={value}
        minDetail="month"
        maxDetail="month"
        locale="ko"
        navigationLabel={null}
        showNeighboringMonth={false} // 이전, 이후 달의 날짜는 보이지 않도록 설정
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
        // 일정이 있는 날 하이라이트
        tileClassName={({ date, view }) => {
          if (marks.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
            return "highlight";
          }
        }}
      />
      {moment(value).format("YYYY년 MM월 DD일")}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AccountCalender;
