import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";
// react-calendar 라이브러리
import Calendar from "react-calendar";
// import "../../Calendar.css";

const AccountCalender = () => {
  const dispatch = useDispatch();

  const [value, onChange] = useState(new Date());
  const moment = require("moment");
  // const [mark, setMark] = useState([]);

  const accountList = useSelector((state) => state.account.accountList);
  const yearMonth = useSelector((state) => state.account.yearMonth);
  console.log(accountList);
  console.log(yearMonth);
  console.log(value);
  useEffect(() => {
    dispatch(getAccountListDB(yearMonth));
  }, [dispatch]);

  // 기록이 있는 날 리스트
  const marks = [
    "15-07-2022",
    "03-06-2022",
    "07-06-2022",
    "12-06-2022",
    "13-06-2022",
    "15-06-2022",
  ];

  // 기록이 있는 날 리스트
  const mark = ["2022-06-26", "2022-07-26", "2022-06-22", "2022-07-01"];

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
        // tileClassName={({ date, view }) => {
        //   if (marks.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
        //     // return <Text>-5,000원</Text>;
        //     return "highlight";
        //   }
        // }}
        tileContent={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div>
                  <Dot></Dot>
                </div>
              </>
            );
          }
        }}
      />
      {moment(value).format("YYYY년 MM월 DD일")}
      {/* {marks.find((x) => x === moment(value).format("DD-MM-YYYY")) ? (
        <Text>-5,000원</Text>
      ) : null} */}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

// const Text = styled.span`
//   color: black;
//   z-index: 10;
// `;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: black;
  margin-left: 30px;
`;

export default AccountCalender;
