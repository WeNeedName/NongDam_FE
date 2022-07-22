import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const TotalHarvestYearChart = ({ totalHarvestData }) => {
  const day = ["2016", "2017", "2018", "2019", "2020", "2021"];

  const slaes = ["600", "400", "200", "0"];
  console.log(totalHarvestData);
  const seriesList =
    totalHarvestData.datas !== undefined &&
    totalHarvestData.datas.map((data) => {
      return data;
    });

  // 내 작물 name 리스트
  const cropNameList =
    totalHarvestData.datas !== undefined &&
    totalHarvestData.datas.map((data) => {
      return data.name;
    });

  // 내 작물 연도별 수확량 차트 state
  const state = {
    series:
      totalHarvestData.datas !== undefined
        ? seriesList
        : [{ name: "", data: ["0", "0", "0", "0", "0", "0"] }],
    options: {
      markers: {
        size: [2, 2, 2],
        colors: [
          "#3152bf",
          "#7EB3E3",
          "#7EE3AB",
          "#9FDE3A",
          "#FDD551",
          "#FDAE51",
          "#FD7951",
          "#AE51FD",
        ],
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
        width: [2, 2, 2],
        colors: [
          "#3152bf",
          "#7EB3E3",
          "#7EE3AB",
          "#9FDE3A",
          "#FDD551",
          "#FDAE51",
          "#FD7951",
          "#AE51FD",
        ], // 그래프 선 여기에 추가
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
            '<span class="crop-label">' +
            cropNameList[seriesIndex] +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span class="kg-label-data">' +
            series[seriesIndex][dataPointIndex] +
            '<span class="kg-label">' +
            "kg" +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories:
          totalHarvestData?.xlabel !== undefined && totalHarvestData?.xlabel,
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
        labels: {
          style: {
            colors: [],
            fontSize: "0px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  };

  return (
    <>
      <ChartWrap>
        {/* <YasisWrap>
          {data !== undefined &&
            data.map((list, id) => {
              return <Yasis key={id}>{list}</Yasis>;
            })}
        </YasisWrap> */}

        <ChartBox>
          <ApexCharts
            options={state.options}
            series={state.series}
            type="line"
            height={100 + "%"}
          />
          <YasisLabelBox>
            {cropNameList &&
              cropNameList.map((list, idx) => {
                return (
                  <YasisLabelWrap key={idx}>
                    <YasisColorTip index={idx} />
                    <YasisLabel>{list}</YasisLabel>
                  </YasisLabelWrap>
                );
              })}
          </YasisLabelBox>
        </ChartBox>
        <XasisWrap>
          {totalHarvestData?.xlabel !== undefined &&
            totalHarvestData?.xlabel.map((data, id) => {
              return <Xasis key={id}>{data}</Xasis>;
            })}
        </XasisWrap>
      </ChartWrap>
    </>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  height: 76%;
  /* display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px; */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-top: 12px;
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
  font-size: 11px;
  color: #666666;
`;

const ChartBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
`;

const YasisLabelBox = styled.div`
  width: auto;
  height: auto;
  background: #ffffff;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  right: -24px;
  top: -46px;
  margin: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 760px) {
    width: 100px;
    margin: 6px 10px;
  }
`;

const YasisLabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const YasisColorTip = styled.div`
  width: 7px;
  height: 3px;
  background: ${({ index }) =>
    index === 0
      ? "#3152bf"
      : index === 1
      ? "#7EB3E3"
      : index === 2
      ? "#7EE3AB"
      : index === 3
      ? "#9FDE3A"
      : index === 4
      ? "#FDD551"
      : index === 5
      ? "#FDAE51"
      : index === 6
      ? "#FD7951"
      : "#AE51FD"};

  margin-left: 4px;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisLabel = styled.span`
  font-size: 11px;
  color: #666666;
  margin-right: 8px;
`;

const XasisWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px 10px;
  /* grid-column: 2 / 3;
  grid-row: 2 / 3; */
`;

const Xasis = styled.span`
  font-size: 11px;
  color: #666666;
`;

export default TotalHarvestYearChart;
