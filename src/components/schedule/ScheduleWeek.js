import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ScheduleModal from './ScheduleModal'


const ScheduleWeek = () => {
  const [scheduleId, setScheduleId] = useState(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  
  function toggleModal(id) {
    setOpen(!isOpen);
    setScheduleId(id);
  }


  const currentScheduleList = useSelector(
    (state) => state.schedule.currentSchedule
  );
  
  //console.log(currentScheduleList)

  return (
    <Wrap>
      <div>일정 최근내역입니다.</div>
      {currentScheduleList !== undefined ? 
      currentScheduleList.map((sList, scheduleId) =>{
        return(
        <ScheduleBox
        key={sList.id}
        onClick={() => {
          toggleModal(sList.id);
        }}
      >
          <div>
            <TimeSmallWrap>
              <SmallTitle>시작일</SmallTitle>
              <Time>{sList.startTime}</Time></TimeSmallWrap>
            <TimeSmallWrap>
              <SmallTitle>종료일</SmallTitle>
              <Time>{sList.endTime}</Time>
            </TimeSmallWrap>
          </div>
          <BottomWrap>
            <button>{sList.crop}</button>   
          </BottomWrap>
          <BottomWrap>
            <button>{sList.toDo}</button>
          </BottomWrap>
        </ScheduleBox>
      )})
    : null}
    {isOpen && (
        <ScheduleModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          scheduleId={scheduleId}
          currentScheduleList={currentScheduleList}
          
        />
      )}
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

const ScheduleBox = styled.div`
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

const TimeWrap = styled.div`
flex-direction:column;
`


const TimeSmallWrap = styled.div`
flex-direction: flex`

const SmallTitle = styled.span`
font-size: 20px;
font-weight: bold;
margin: 5px;
`
const Time = styled.span`
  font-size: 18px;
  
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
