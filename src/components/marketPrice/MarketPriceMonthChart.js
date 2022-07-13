import React, { useEffect, useState } from "react";
import styled from "styled-components";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const MarketPriceChart = ({ marketPriceData, selectedCrops }) => {
  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }
  // 숫자만 입력가능
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  console.log(marketPriceData);
  console.log(selectedCrops);

  const day =
    marketPriceData[1] !== undefined
      ? marketPriceData[1].dateList.map((date) => {
          return moment(date).format("YY.MM");
        })
      : marketPriceData[1] !== undefined
      ? marketPriceData[0].dateList.map((date) => {
          return moment(date).format("YY.MM");
        })
      : null;

  const retailSalePriceList = marketPriceData[1]?.priceList.map((price) => {
    return Number(uncomma(price));
  });

  const wholeSalePriceList =
    marketPriceData[0]?.priceList.length !== 0
      ? marketPriceData[0]?.priceList.map((price) => {
          return Number(uncomma(price));
        })
      : null;

  const cropName =
    selectedCrops === 21 ? null : selectedCrops?.label.split(" ")[1];

  // 선택 작물 월별 데이터
  const state = {
    series: [
      {
        name: marketPriceData[0]?.wholeSale,
        data: wholeSalePriceList,
      },
      {
        name: marketPriceData[1]?.wholeSale,
        data: retailSalePriceList,
      },
    ],
    options: {
      markers: {
        size: [2, 2],
        colors: ["#7EB3E3", "#7EE3AB"],
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
        width: [2, 2],
        colors: ["#7EB3E3", "#7EE3AB"],
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
            '<div class="line-B">' +
            '<span class="data-name-label">' +
            marketPriceData[seriesIndex].crop +
            " " +
            state?.series[seriesIndex]?.name +
            '<span class="date-label">' +
            " " +
            day[dataPointIndex] +
            " 기준" +
            "</span>" +
            "</span>" +
            "</div>" +
            '<div class="line-bottom">' +
            '<span class="label-data">' +
            comma(series[seriesIndex][dataPointIndex]) +
            '<span class="price-label">' +
            "원/" +
            marketPriceData[seriesIndex]?.unit +
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
      {(marketPriceData !== undefined &&
        marketPriceData[0]?.priceList.length !== 0) ||
      marketPriceData[1]?.priceList.length !== 0 ? (
        <>
          <ChartBox>
            <ApexCharts
              options={state.options}
              series={state.series}
              type="line"
              height={92 + "%"}
            />
            {marketPriceData[0] !== undefined &&
            marketPriceData[1] !== undefined ? (
              <YasisLabelBox>
                <YasisLabelWrap>
                  <YasisColorTipA />
                  <YasisLabel>소매</YasisLabel>
                </YasisLabelWrap>
                <YasisLabelWrap>
                  <YasisColorTipB />
                  <YasisLabel>도매</YasisLabel>
                </YasisLabelWrap>
              </YasisLabelBox>
            ) : null}
          </ChartBox>
          <XasisWrap>
            {day &&
              day.map((data, id) => {
                return <Xasis key={id}>{data}</Xasis>;
              })}
          </XasisWrap>
        </>
      ) : (
        <NotFoundNoticeWrap>
          <NotFoundNotice>
            {cropName}의 월별 데이터가 존재하지 않습니다.
          </NotFoundNotice>
        </NotFoundNoticeWrap>
      )}
    </>
  );
};

const ChartBox = styled.div`
  width: 100%;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  position: relative;
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

const YasisLabelBox = styled.div`
  max-width: 150px;
  width: 24%;
  height: auto;
  background-color: #ffffff;
  /* border: 1px solid #e3e3e3; */
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  right: -20px;
  top: -34px;
  margin: 6px 20px;
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

const YasisColorTipA = styled.div`
  width: 7px;
  height: 3px;
  background: #7ee3ab;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipB = styled.div`
  width: 7px;
  height: 3px;
  background: #7eb3e3;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisLabel = styled.span`
  font-size: 8px;
  color: #666666;
`;

const NotFoundNoticeWrap = styled.div`
  height: 165px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundNotice = styled.div`
  color: #6f6f6f;
`;

export default MarketPriceChart;
