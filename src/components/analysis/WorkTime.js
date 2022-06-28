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
      <TopWrap>
        <h3>작업시간</h3>
        <span>기간선택</span>
      </TopWrap>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={260}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 500px;
  height: 400px;
  border: none;
  border-radius: 18px;
  box-shadow: 0px 3px 6px #00000029;
  padding: 4px 18px;
  margin: 20px;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default WorkTime;
