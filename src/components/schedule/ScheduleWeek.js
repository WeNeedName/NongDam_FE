import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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
        {currentScheduleList.length === 0 ? (
          <NoScheduleMsg>이번 주 일정이 없습니다</NoScheduleMsg>
        ) : null}
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
                    <Crop>{sList.crop.type}</Crop>
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
  padding: 10px 30px 10px 25px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 30px 0px;
    margin-right: 20px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    padding: 20px 0px;
  }
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ScheduleBoxWrap = styled.div`
  width: 80%;
  padding-right: 70px;
  height: 660px;
  overflow: auto;
  animation: ${boxFade} 1s;
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    max-width: 760px;
    width: 100%;
    margin-bottom: 60px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 110%;
    padding-right: 0px;
    margin-bottom: 60px;
  }
`;

const ScheduleBox = styled.div`
  width: 90%;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0px;

  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 95%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 85%;
    border-radius: 10px;
  }
`;

const NoScheduleMsg = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #8e8f93;
  padding-top: 20px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  .moreVertIcon {
    cursor: pointer;
  }
`;
const Todo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: #02113b;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 22px;
  }
`;

const TimeWrap = styled.div`
  flex-direction: column;
  margin-bottom: 5px;
`;

const Date = styled.span`
  font-size: 15px;
  margin-right: 3px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 18px;
  }
`;

const Time = styled.span`
  font-size: 15px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 18px;
  }
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
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: #616161;
`;

export default ScheduleWeek;
