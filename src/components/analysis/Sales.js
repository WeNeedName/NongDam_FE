import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const Sales = () => {
  const [data, setData] = useState(null);

  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowTime);

  const state = {
    defaultLocale: "ko",
    locales: [
      {
        name: "ko",
        options: {
          months: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
          ],
          shortMonths: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          days: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          toolbar: {
            download: ["Download SVG", "Download PNG", "Download CSV"],
            selection: "Selection",
            selectionZoom: "Selection Zoom",
            zoomIn: "Zoom In",
            zoomOut: "Zoom Out",
            pan: "Panning",
            reset: "Reset Zoom",
          },
        },
      },
    ],
    series: [
      {
        name: "수입",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "지출",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "순이익",
        data: [21, 8, -17, 19, 8, 57, 59],
      },
    ],
    colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      //   yaxis: {
      //     title: {
      //       text: "thousands",
      //     },
      //   },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-01-19T00:00:00.000Z",
          "2022-02-19T01:30:00.000Z",
          "2022-03-19T02:30:00.000Z",
          "2022-04-19T03:30:00.000Z",
          "2022-05-19T04:30:00.000Z",
          "2022-06-19T05:30:00.000Z",
        ],
      },
      fill: {
        opacity: 1,
        colors: ["#2E93fA", "#66DA26", "#E91E63"],
      },
      //   markers: {
      //     colors: ["#F44336", "#E91E63", "#9C27B0"],
      //   },

      tooltip: {
        x: {
          //   format: "dd/MM/yy HH:mm",
          format: "MM월",
        },
      },
    },
  };

  return (
    <Wrap>
      <TopWrap>
        <h3>매출현황</h3>
        <span>기간선택</span>
      </TopWrap>

      <ApexCharts
        options={state.options}
        series={state.series}
        type="area"
        height={250}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 500px;
  height: 340px;
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

export default Sales;
