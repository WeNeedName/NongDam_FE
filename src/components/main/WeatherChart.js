import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getWeatherDB } from "../../redux/modules/main";
import "../../Tooltip.css";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const WeatherChart = (props) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.main.weather);

  useEffect(() => {
    dispatch(getWeatherDB());
  }, [dispatch]);

  // 시간 리스트
  const hourData = weatherData?.hour?.time;
  const hourDataFormatArr = [];
  hourData &&
    hourData.map((data) => {
      return hourDataFormatArr.push(moment(data * 1000).format("H"));
    });

  // 주간 요일 리스트
  const dayData = weatherData?.day?.day;
  const dayDataFormatArr = [];
  dayData &&
    dayData.map((data) => {
      return dayDataFormatArr.push(moment(data * 1000).format("dd"));
    });

  // 기온, 강수확률 배열
  const hourTempArr = weatherData?.hour?.temp;
  const dayTempArr = weatherData?.day?.temp;
  const hourPopArr = weatherData?.hour?.pop;
  const dayPopArr = weatherData?.day?.pop;

  // 시간별 날씨 그래프 데이터
  const state = {
    series: [
      {
        name: "기온",
        data: props.checkedInputs === "hour" ? hourTempArr : dayTempArr,
      },
      {
        name: "강수확률",
        data: props.checkedInputs === "hour" ? hourPopArr : dayPopArr,
      },
    ],
    options: {
      markers: {
        size: [2.5, 0],
        colors: ["#7EE3AB", "transparent"],
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
        colors: ["#7EE3AB", "transparent"],
      },
      grid: {
        borderColor: "#CCCCCC",
        strokeDashArray: 2,
        row: {
          colors: ["transparent", "transparent"],
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
            show: false, // 그리드선 제거
          },
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
            '<span class="label">' +
            "기온" +
            "</span>" +
            '<span class="label-data">' +
            series[seriesIndex][dataPointIndex] +
            "℃" +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span  class="label">' +
            "강수확률" +
            "</span>" +
            '<span class="label-data">' +
            series[seriesIndex][dataPointIndex] +
            "%" +
            "</span>" +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories:
          props.checkedInputs === "hour" ? hourDataFormatArr : dayDataFormatArr,
        labels: {
          formatter: function (value) {
            if (props.checkedInputs === "hour") return value + "시";
            else return value;
          },
          style: {
            colors: "#666666",
            fontSize: "12px",
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },

        position: "top",
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
        min: 16,
        max: 38,
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
          height={98 + "%"}
        />
      </ChartBox>
    </>
  );
};

const ChartBox = styled.div`
  margin-top: 14px;
  padding: 0px 20px 0px 20px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  cursor: pointer;
`;
export default WeatherChart;
