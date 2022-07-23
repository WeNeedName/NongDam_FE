import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const AnalysisTotalHarvestChart = ({ totalHarvestData }) => {
  const navigate = useNavigate();

  // y축 [0 - 사잇값 - 최댓값] 배열 만들기
  const allDataList = [];
  totalHarvestData.datas !== undefined &&
    totalHarvestData.datas.map((list, idx) => {
      return allDataList.push(...list.data);
    });
  const allDataListSort = allDataList.sort((a, b) => b - a);
  const largestNumber = Number(allDataListSort[0]);
  const mathPow = Math.pow(10, allDataListSort[0]?.length - 1);
  const mathRound = Math.ceil(largestNumber / mathPow) * mathPow;

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const yaxis =
    allDataListSort[0] !== "0"
      ? range(0, mathRound, mathRound / 4).reverse()
      : ["0", "0", "0", "0", "0"];

  // 수확량 차트 state.series 값 배열
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

  const lineWidthArr = Array.from({ length: 7 }, (v, i) => (v = 2));

  // 내 작물 월별 수확량 차트 state
  const state = {
    series:
      totalHarvestData.datas !== undefined
        ? seriesList
        : [{ name: "", data: ["0", "0", "0", "0", "0", "0"] }],
    options: {
      markers: {
        size: lineWidthArr,
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
        width: lineWidthArr,
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
          left: 0,
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
        show: true,
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
        {allDataListSort[0] !== "0" ? (
          <>
            <YasisWrap>
              {yaxis !== undefined &&
                yaxis.map((list, id) => {
                  return <Yasis key={id}>{list}</Yasis>;
                })}
            </YasisWrap>

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
          </>
        ) : (
          <NoticeWrap>
            <NoticeT>
              지금 작업일지를 기록하고
              <br />
              수확량을 알아보세요!
            </NoticeT>
            <NoticeBtn
              onClick={() => {
                navigate("/worklog");
              }}
            >
              기록하러 가기
            </NoticeBtn>
          </NoticeWrap>
        )}
      </ChartWrap>
    </>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
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
    width: auto;
    margin: 6px 10px;
    top: -40px;
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
  margin: 0px 10px;
  /* margin-top: 4px; */
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const Xasis = styled.span`
  font-size: 11px;
  color: #666666;
`;

const NoticeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%,
    transparent 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 10px;
`;

const NoticeT = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
`;

const NoticeBtn = styled.button`
  padding: 8px 18px;
  margin-top: 4px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: #1aacff;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

export default AnalysisTotalHarvestChart;
