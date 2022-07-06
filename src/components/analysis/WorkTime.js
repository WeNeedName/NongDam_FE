import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ReactApexChart from "react-apexcharts";
// date 가공 라이브러리
import moment from "moment";
import "moment/locale/ko";
import dayjs from "dayjs";

const WorkTime = () => {
  const [data, setData] = useState(null);

  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowTime);

  const state = {
    series: [
      {
        name: "1분기",
        data: [10, 13],
      },
      {
        name: "2분기",
        data: [17, 20],
      },
      {
        name: "3분기",
        data: [44, 46],
      },
      {
        name: "4분기",
        data: [21, 27],
      },
      //   {
      //     name: "Tank Picture",
      //     data: [12, 17, 11, 9, 15, 11, 20],
      //   },
      //   {
      //     name: "Bucket Slope",
      //     data: [9, 7, 5, 8, 6, 9, 4],
      //   },
      //   {
      //     name: "Reborn Kid",
      //     data: [25, 12, 19, 32, 25, 24, 10],
      //   },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      //   title: {
      //     text: "Fiction Books Sales",
      //   },
      xaxis: {
        categories: [2022, 2021],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  return (
    <Wrap>
      <TitleWrap>
        <SmileIcon>😀</SmileIcon>
        <Title>
          작년에 비해 올해 작업 시간이 <br />
          20% 감소했어요
        </Title>
      </TitleWrap>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={200}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  grid-column: 7 / 10;
  grid-row: 2 / 3;
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
