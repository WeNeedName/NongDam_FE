import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// date 가공 라이브러리
import moment from "moment";
import "moment/locale/ko";
import dayjs from "dayjs";

const WorkTime = () => {
  const day = ["2016", "2017", "2018", "2019", "2020", "2021"];

  const slaes = ["600", "400", "200", "0"];

  // 시간별 날씨 그래프 데이터
  const state = {
    series: [
      {
        name: "순이익",
        data: [-100, 100, 100, 300, 300, 100],
      },
    ],
    options: {
      markers: {
        size: [2, 2, 2.5],
        colors: "#7EE3AB",
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
        width: [1.5, 1.5, 2.5],
        colors: "#7EE3AB", // 그래프 선 여기에 추가
      },
      grid: {
        borderColor: "#ddd",
        strokeDashArray: 1.6, // 가로축 점선
        row: {
          colors: ["transparent", "transparent", "transparent"], // 배경색
        },
        column: {
          colors: ["transparent", "transparent", "transparent"],
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
            "시간" +
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
      <Wrap>
        <TitleWrap>
          <SmileIcon>💪</SmileIcon>
          <Title>
            작년에 비해 올해 작업 시간이 <br />
            20% 감소했어요
          </Title>
        </TitleWrap>
        <ChartWrap>
          <YasisWrap>
            {slaes.map((data, id) => {
              return <Yasis key={id}>{data}</Yasis>;
            })}
          </YasisWrap>

          <ChartBox>
            <ApexCharts
              options={state.options}
              series={state.series}
              type="line"
              height={100 + "%"}
            />
          </ChartBox>
          <XasisWrap>
            {day.map((data, id) => {
              return <Xasis key={id}>{data}</Xasis>;
            })}
          </XasisWrap>
        </ChartWrap>
      </Wrap>
    </>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px;
  cursor: pointer;
`;

const YasisWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const Yasis = styled.span`
  font-size: 8px;
  color: #666666;
`;

const ChartBox = styled.div`
  width: 100%;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
`;

const XasisWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0px 10px;
  /* margin-top: 4px; */
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const Xasis = styled.span`
  font-size: 8px;
  color: #666666;
`;

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
  font-size: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
`;

export default WorkTime;
