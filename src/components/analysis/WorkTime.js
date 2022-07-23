import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// date 가공 라이브러리
import moment from "moment";
import "moment/locale/ko";
// 컴포넌트
import WorkTimeBarChart from "./WorkTimeBarChart";

const WorkTime = ({ workTimeData }) => {
  const rateData = useSelector((state) => state.analysis.rate);

  return (
    <>
      <Wrap>
        <TitleWrap>
          <SmileIcon>💪</SmileIcon>
          <Title>
            작년에 비해 올해 작업 시간이 <br />
            {rateData.rate ? rateData.rate + "%" : "00%"}{" "}
            {rateData.rateText ? rateData.rateText : "감소"}
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

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
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
