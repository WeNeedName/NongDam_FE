import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";


const ScheduleWeek = () => {
  const [scheduleId, setScheduleId] = useState(null);
  
  const [isOpen, setOpen] = useState(false);
  function toggleModal(id) {
    setOpen(!isOpen);
    setScheduleId(id);
  }


  return (
    <Wrap>
      <div>일정 최근내역입니다.</div>
      <AccountBox
                //key={list.id}
                // onClick={() => {
                //   toggleModal();
                // }}
              >
                <div>
                  <Day>5일</Day>
                </div>
                <div>
                  12:00~15:00
                </div>
                <BottomWrap>
                <button>복숭아</button>   
                </BottomWrap>
                <BottomWrap>
                <button>비료뿌리기</button>
                </BottomWrap>
              </AccountBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 35%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  padding: 40px 0px;
`;

const AccountBox = styled.div`
  width: 300px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Day = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
`;
const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: 60px;
  height: 30px;
  padding-bottom: 4px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default ScheduleWeek;
