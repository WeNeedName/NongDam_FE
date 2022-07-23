import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getRateDB } from "../../redux/modules/analysis";
// 차트 라이브러리
import ReactApexChart from "react-apexcharts";
// date 가공 라이브러리
import moment from "moment";
import "moment/locale/ko";
import dayjs from "dayjs";

const WorkTimeBarChart = ({ workTimeData }) => {
  const [rateData, setRateData] = useState([]);
  const dispatch = useDispatch();

  // state.series 값 배열
  const seriesList =
    workTimeData.datas !== undefined &&
    workTimeData.datas.map((data) => {
      return data;
    });

  // 3. 데이터 label 리스트
  const dataLabelList =
    workTimeData.datas !== undefined &&
    workTimeData.datas.map((data) => {
      return data.name;
    });

  // 연도별 배열 만들기
  const lastYearDataList = [];
  workTimeData.datas !== undefined &&
    workTimeData.datas.map((list, idx) => {
      return lastYearDataList.push(Number(list.data[0]));
    });

  const thisYearDataList = [];
  workTimeData.datas !== undefined &&
    workTimeData.datas.map((list, idx) => {
      return thisYearDataList.push(Number(list.data[1]));
    });
  // 연도별 작업시간 총합 배열 만들기
  let sumList = [];
  const lastYearDataSum = lastYearDataList.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const thisYearDataSum = thisYearDataList.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  sumList.push(lastYearDataSum, thisYearDataSum);

  const sumListCopy = [];
  sumListCopy.push(lastYearDataSum, thisYearDataSum);
  const sumListSort = sumListCopy.sort((a, b) => b - a);

  // y축 [0 - 사잇값 - 최댓값] 배열 만들기
  const largestNumber = Number(sumListSort[0]);
  const smallestNumber = Number(sumListSort[sumListSort.length - 1]);

  const largeNumMathPow =
    String(largestNumber).length >= 2
      ? Math.pow(10, String(largestNumber).length - 1)
      : 1;
  const mathRound =
    Math.ceil(largestNumber / largeNumMathPow) * largeNumMathPow;

  const smallNumMathPow =
    String(smallestNumber).length >= 2
      ? Math.pow(10, String(smallestNumber).length - 1)
      : 1;
  const smallNumMathRound =
    Math.ceil(smallestNumber / smallNumMathPow) * smallNumMathPow;

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => {
      const num = start + i * step;
      const mathPow =
        String(num).length >= 2 ? Math.pow(10, String(num).length - 1) : 1;
      const mathRound = Math.ceil(num / mathPow) * mathPow;
      return mathRound;
    });
  const yaxis = range(0, mathRound, mathRound / 4);
  // yaxis.push(mathRound);
  // yaxis.unshift(0);

  // 증가율 구하기
  const rate = (sumListCopy[1] / sumListCopy[0]) * 100;
  const rateOfIncrease = 100 - Math.round(rate);

  const thisYearRate = sumList[0] < sumList[1] ? "증가" : "감소";

  useEffect(() => {
    setRateData(rateOfThisYear);
    dispatch(getRateDB(rateData));
  }, [workTimeData]);

  const rateOfThisYear = {
    rate: rateOfIncrease,
    rateText: thisYearRate,
  };

  const state = {
    series:
      workTimeData.datas !== undefined
        ? seriesList
        : [{ name: "", data: ["0", "0", "0", "0", "0", "0"] }],
    options: {
      legend: {
        show: false,
      },
      chart: {
        type: "bar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        stacked: true,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "40%",
          barHeight: "40%",
          colors: {
            ranges: [
              {
                from: 0,
                to: 100000,
                color: "#44D600",
              },
            ],
            // backgroundBarColors: ["#44D600", "#44D600", "#44D600", "#44D600"],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0,
          },
        },
      },
      stroke: {
        curve: "straight",
        width: 1,
        colors: ["white", "white", "white", "white"], // 바 테두리
      },
      grid: {
        borderColor: "#ddd",
        strokeDashArray: 1.6, // 배경 점선
        row: {
          colors: ["transparent", "transparent", "transparent"], // 배경색
        },
        column: {
          colors: ["transparent", "transparent", "transparent"],
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false, // 그리드선
          },
        },
        padding: {
          top: -2,
          right: 20,
          bottom: -30,
          left: -20,
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
            dataLabelList[seriesIndex] +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span class="kg-label-data">' +
            series[seriesIndex][dataPointIndex] +
            '<span class="kg-label">' +
            "시간" +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        show: false,
        categories: ["2021", "2022"],
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
    <ChartWrap>
      <YasisWrap>
        {workTimeData?.xlabel !== undefined &&
          workTimeData?.xlabel.map((data, id) => {
            return <Yasis key={id}>{data}</Yasis>;
          })}
      </YasisWrap>
      <ChartBox>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={156}
        />
      </ChartBox>
      <XasisWrap>
        {yaxis !== undefined &&
          yaxis.map((list, id) => {
            return <Yasis key={id}>{list}</Yasis>;
          })}
      </XasisWrap>
    </ChartWrap>
  );
};

const ChartWrap = styled.div`
  width: 100%;
  height: 60%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px;
  cursor: pointer;
  /* margin-bottom: 60px; */
`;

const ChartBox = styled.div`
  width: 100%;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
`;

const YasisWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin: 14px 0px;
`;

const Yasis = styled.span`
  font-size: 11px;
  color: #666666;
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

export default WorkTimeBarChart;
