import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ScheduleModal from "./ScheduleModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import "moment/locale/ko";

const ScheduleWeek = () => {
  const [scheduleId, setScheduleId] = useState(null);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
    setScheduleId(id);
  }

  // 최근내역 영역 스크롤 감지
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  const currentScheduleList = useSelector(
    (state) => state.schedule.currentSchedule
  );

  console.log(currentScheduleList);

  return (
    <Wrap>
      <Title>이번 주 할 일</Title>
      <ScheduleBoxWrap scrollPosition={scrollPosition}>
        {currentScheduleList !== undefined
          ? currentScheduleList.map((sList, scheduleId) => {
              return (
                <ScheduleBox key={sList.id}>
                  <div>
                    <TopWrap>
                      <Todo>{sList.toDo}</Todo>
                      <MoreVertIcon
                        className="moreVertIcon"
                        onClick={() => {
                          toggleModal(sList.id);
                        }}
                      />
                    </TopWrap>
                    <TimeWrap>
                      <Date>{moment(sList.startTime).format("M월 D일")}</Date>
                      <Time>{moment(sList.startTime).format("HH:mm")}</Time>
                    </TimeWrap>
                    <TimeWrap>
                      <Date>{moment(sList.endTime).format("M월 D일")}</Date>
                      <Time>{moment(sList.endTime).format("HH:mm")}</Time>
                    </TimeWrap>
                  </div>
                  <BottomWrap>
                    <Crop>
                      {"[" + sList.crop.type + "]" + " " + sList.crop.name}
                    </Crop>
                  </BottomWrap>
                </ScheduleBox>
              );
            })
          : null}
      </ScheduleBoxWrap>
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
  padding: 30px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ScheduleBoxWrap = styled.div`
  width: 100%;
  padding-right: 70px;
  height: 530px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScheduleBox = styled.div`
  width: 80%;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0px;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .moreVertIcon {
    cursor: pointer;
  }
`;
const Todo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #02113b;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeWrap = styled.div`
  flex-direction: column;
  margin-bottom: 5px;
`;

const Date = styled.span`
  font-size: 14px;
  margin-right: 3px;
`;

const Time = styled.span`
  font-size: 14px;
`;
const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 6px;
`;

const Crop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #bfbfbf;
  color: #616161;
  border-radius: 100px;

  font-size: 8px;
  color: #616161;
`;

export default ScheduleWeek;
