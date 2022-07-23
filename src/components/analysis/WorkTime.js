import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getRateDB } from "../../redux/modules/analysis";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// date 가공 라이브러리
import moment from "moment";
import "moment/locale/ko";
// 컴포넌트
import WorkTimeBarChart from "./WorkTimeBarChart";

const WorkTime = ({ workTimeData }) => {
  const dispatch = useDispatch();
  const rateData = useSelector((state) => state.analysis.rate);
  const [count, setCount] = useState(0);
  // const [rate, setRate] = useState(0);
  // rate = rateData.rate;
  // const end = rateData.rate !== NaN ? rateData.rate : 0;
  const end = rateData.rate;
  const start = 0;
  const duration = 1000;

  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const easeOutExpo = (number) => {
    return number === 1 ? 1 : 1 - Math.pow(2, -10 * number);
  };

  useEffect(() => {
    dispatch(getRateDB());
  }, []);

  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, totalFrame]);

  return (
    <>
      <Wrap>
        <TitleWrap>
          <SmileIcon>💪</SmileIcon>
          <Title>
            작년에 비해 올해 작업 시간이 <br />
            {count + "%"} {rateData.rateText ? rateData.rateText : "감소"}
            했어요
          </Title>
        </TitleWrap>
        <WorkTimeBarChart workTimeData={workTimeData} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  grid-column: 7 / 10;
  grid-row: 2 / 3;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
 
  }
  30% {
    opacity: 0.3;
    transform: translateY(6%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  animation: ${boxFade} 1s;
`;

const SmileIcon = styled.span`
  font-size: 24px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
`;

export default WorkTime;
