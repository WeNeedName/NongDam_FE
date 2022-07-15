import React, { useEffect, useState } from "react";
import styled from "styled-components";
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

  // console.log(scheduleData[0].startTime, typeof scheduleData[0].startTime);
  // console.log(moment(scheduleData[0].startTime).format("HH:mm"));

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
                <ScheduleBox key={id}>
                  <Hr />
                  <ScheduleContent>{schedule?.toDo}</ScheduleContent>
                  <ScheduleTime>
                    {moment(schedule?.startTime).format("HH:mm")} -{" "}
                    {moment(schedule?.endTime).format("HH:mm")}
                  </ScheduleTime>
                </ScheduleBox>
              );
            })
          ) : (
            <Guide> 오늘 일정을 등록해주세요.</Guide>
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

const LoadWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Margin = styled.div`
  height: 10px;
  width: 100%;
  border-bottom: 0.5px solid #dddddd;
  margin-left: -20px;
  padding-right: 40px;
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
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 5 / 7;
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
  font-size: 20px;
  line-height: 10px;
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
`;

const Guide = styled.div`
  height: 90%;
  font-size: 14px;
  color: #02113b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 14px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -16px;
  padding-right: 32px;
  border-bottom: 0.5px solid #dddddd;
`;

const ScheduleContent = styled.span`
  font-weight: 700;
  font-size: 14px;
  margin-top: 14px;
`;

const ScheduleTime = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-top: 0px;
`;

export default TodayTodo;
