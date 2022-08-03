import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getRateDB } from "../../redux/modules/analysis";
// 로딩 효과
import { ShimmerThumbnail } from "react-shimmer-effects";

// 컴포넌트
import WorkTimeBarChart from "./WorkTimeBarChart";

const WorkTime = ({ workTimeData }) => {
  const dispatch = useDispatch();
  const rateData = useSelector((state) => state.analysis.rate);
  const [count, setCount] = useState(0);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const is_loaded = useSelector((state) => state.analysis.worktime_is_loaded);

  useEffect(() => {
    dispatch(getRateDB());
  }, []);

  const end = rateData.rate && rateData.rate;
  const start = 0;
  const duration = 1000;

  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  const easeOutExpo = (number) => {
    return number === 1 ? 1 : 1 - Math.pow(2, -10 * number);
  };

  // 숫자 카운팅 애니메이션
  useEffect(() => {
    let currentNumber = start;
    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentNumber / totalFrame);
      if (rateData.rate) setCount(Math.round(end * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameRate);
  }, [end, frameRate, start, totalFrame]);

  // 윈도우 사이즈 추적
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <>
      <Wrap>
        <TitleWrap>
          <SmileIcon>💪</SmileIcon>
          {windowSize.innerWidth > 760 ? (
            <Title>
              작년에 비해 올해 작업 시간이 <br />
              {rateData.rate ? count + "%" : "0%"}{" "}
              {rateData.rateText ? rateData.rateText : "증가"}
              했어요
            </Title>
          ) : (
            <TitleM>
              작년에 비해 <br /> 올해 작업 시간이 <br />
              {rateData.rate ? count + "%" : "0%"}{" "}
              {rateData.rateText ? rateData.rateText : "증가"}
              했어요
            </TitleM>
          )}
        </TitleWrap>
        {is_loaded ? (
          <WorkTimeBarChart workTimeData={workTimeData} />
        ) : (
          <ShimmerThumbnail className="thumNail-weather" height={160} rounded />
        )}
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
  @media only screen and (max-width: 760px) {
    padding: 20px 20px 30px 20px;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
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

const TitleM = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
  margin-bottom: 30px;
`;

export default WorkTime;
