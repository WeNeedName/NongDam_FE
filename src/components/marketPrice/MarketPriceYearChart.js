import React, { useEffect, useState } from "react";
import styled from "styled-components";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const MarketPriceChart = () => {
  const day = [
    "2021.07",
    "2021.09",
    "2021.11",
    "2022.03",
    "2022.05",
    "2022.07",
  ];
  // 시간별 날씨 그래프 데이터
  const state = {
    series: [
      {
        name: "월별 평균 시세",
        data: ["300", "400", "300", "500", "300", "300"],
      },
    ],
    options: {
      markers: {
        size: [2.5, 0],
        colors: "#7EB3E3",
        hover: {
          size: undefined,
          sizeOffset: 2,
        },
      },
      legend: {
        show: false,
      },
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2.5,
        colors: "#7EB3E3",
      },
      grid: {
        borderColor: "#ddd",
        strokeDashArray: 1, // 가로축 점선
        row: {
          colors: ["transparent", "transparent"], // 배경색
        },
        column: {
          colors: ["transparent", "transparent"],
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true, // 그리드선
          },
        },
        padding: {
          top: -2,
          right: 20,
          bottom: -10,
          left: 20,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return (
            '<div class="tooltip-box">' +
            '<div class="line">' +
            '<span class="price-label">' +
            "2021년 9월" +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span class="label-data">' +
            series[seriesIndex][dataPointIndex] +
            '<span class="price-label">' +
            "원/kg" +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories: day,
        labels: {
          formatter: function (value) {
            return value;
          },
          style: {
            fontSize: "0px",
          },
        },
        position: "top", // x축 라벨
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
        min: undefined,
        max: undefined,
      },
    },
  };

  return (
    <>
      <ChartBox>
        <ApexCharts
          options={state.options}
          series={state.series}
          type="line"
          height={92 + "%"}
        />
      </ChartBox>
      <XasisWrap>
        {day.map((data, id) => {
          return <Xasis key={id}>{data}</Xasis>;
        })}
      </XasisWrap>
    </>
  );
};

const ChartBox = styled.div`
  width: 100%;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  cursor: pointer;
`;

const XasisWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 4px;
`;

const Xasis = styled.span`
  font-size: 8px;
  color: #666666;
`;

export default MarketPriceChart;
