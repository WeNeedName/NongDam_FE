import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadTodayScheduleDB } from "../../redux/modules/main";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const TodayTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scheduleData = useSelector((state) => state.main.todayScheduleList);
  const is_loaded = useSelector((state) => state.main.toDo_is_loaded);

  useEffect(() => {
    dispatch(loadTodayScheduleDB());
  }, [dispatch]);

  return (
    <Wrap>
      {is_loaded ? (
        <>
          <TopWrap>
            <Title>📝 오늘의 할 일</Title>
            <ShowMoreBtn
              onClick={() => {
                navigate("/schedule");
              }}
            >
              더 보기
            </ShowMoreBtn>
          </TopWrap>
          {scheduleData.length >= 1 ? (
            scheduleData.slice(0, 2).map((schedule, id) => {
              return (
                <React.Fragment key={id}>
                  <Hr />
                  <ScheduleBox>
                    <ScheduleContent>{schedule?.toDo}</ScheduleContent>
                    <ScheduleTime>
                      {moment(schedule?.startTime).format("HH:mm")} -{" "}
                      {moment(schedule?.endTime).format("HH:mm")}
                    </ScheduleTime>
                  </ScheduleBox>
                </React.Fragment>
              );
            })
          ) : (
            <Guide> 오늘 일정을 등록해주세요</Guide>
          )}
        </>
      ) : (
        <>
          <ShimmerTitle
            className="thumNail-news-title"
            line={1}
            gap={10}
            variant="secondary"
          />
          <Margin />
          <LoadWrap>
            <ShimmerText className="thumNail-toDo-text" line={3} gap={10} />
          </LoadWrap>
          <Margin />
          <LoadWrap>
            <ShimmerText className="thumNail-toDo-text" line={3} gap={10} />
          </LoadWrap>
          <Margin />
        </>
      )}
    </Wrap>
  );
};

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

const LoadWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Margin = styled.div`
  height: 10px;
  width: 100%;
  border-bottom: 0.5px solid #dddddd;
  margin-left: -18px;
  padding-right: 36px;
`;

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  grid-column: 2 / 3;
  grid-row: 6 / 8;
  padding: 16px 16px;
  background-color: #fff;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-column: 2 / 3;
    grid-row: 5 / 7;
    height: 200px;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 10px;
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Guide = styled.div`
  height: 90%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #bbb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${boxFade} 1s;
`;

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${boxFade} 1s;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -16px;
  padding-right: 32px;
  border-bottom: 0.5px solid #dddddd;
  margin-top: 14px;
`;

const ScheduleContent = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 14px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ScheduleTime = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 4px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export default TodayTodo;
