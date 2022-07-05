import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherDB } from "../../redux/modules/main";
import "../../Tooltip.css";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.main.weather);
  const [checkedInputs, setCheckedInputs] = useState("hour");

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

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
        data: checkedInputs === "hour" ? hourTempArr : dayTempArr,
      },
      {
        name: "강수확률",
        data: checkedInputs === "hour" ? hourPopArr : dayPopArr,
      },
    ],
    options: {
      markers: {
        size: [2.5, 0],
        colors: ["#7EE3AB", "transparent"],
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
        width: 3,
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
          checkedInputs === "hour" ? hourDataFormatArr : dayDataFormatArr,
        labels: {
          formatter: function (value) {
            if (checkedInputs === "hour") return value + "시";
            else return value;
          },
          style: {
            colors: [],
            fontSize: "12px",
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label",
          },
        },

        position: "top",
        axisBorder: {
          show: false,
          color: "#78909C",
          height: 1,
          width: "100%",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: false,
          borderType: "solid",
          color: "#78909C",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        show: false,
        min: 24,
        max: 38,
      },
    },
  };

  return (
    <Wrap>
      <Title>⛅️ 농장 날씨</Title>
      <MiddleWrap>
        <MiddleLeftWrap>
          <Region>{weatherData.address}</Region>
          <IconWrap>
            <Icon iconURL={weatherData.iconURL} />
            <TempWrap>
              <Temp>{Math.floor(weatherData.temp)}°</Temp>
              <WeatherT>{weatherData.weather}</WeatherT>
            </TempWrap>
          </IconWrap>
        </MiddleLeftWrap>
        <MiddleRightWrap>
          <InfoWrap>
            <Info>강수량</Info>
            <Info>습도</Info>
            <Info>이슬점</Info>
            <Info>바람</Info>
          </InfoWrap>
          <InfoWrapRight>
            <InfoNum>{weatherData.rn} mm</InfoNum>
            <InfoNum>{weatherData.rhm} %</InfoNum>
            <InfoNum>{weatherData.dewPoint} ℃</InfoNum>
            <InfoNum>{weatherData.ws} m/s</InfoNum>
          </InfoWrapRight>
        </MiddleRightWrap>
      </MiddleWrap>
      <BottomWrap>
        <CategoryWrap>
          <Label>
            <FormCheckLeft
              type="radio"
              id="hour"
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
              defaultChecked
            />
            <FormCheckText>시간별</FormCheckText>
          </Label>
          <Label>
            <FormCheckLeft
              type="radio"
              id="day"
              name="radioButton"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>주간</FormCheckText>
          </Label>
        </CategoryWrap>
        <ChartBox>
          <ApexCharts
            options={state.options}
            series={state.series}
            type="line"
            height={100 + "%"}
          />
        </ChartBox>
      </BottomWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 16px;
  grid-column: 2 / 3;
  grid-row: 2 / 5;
  background-color: #fff;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 2 / 5;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.4em;
  line-height: 10px;
`;

const MiddleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 4px 0px;
`;

const MiddleLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleRightWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
`;

const Region = styled.span`
  font-weight: 400;
  font-size: 1.1em;
  line-height: 24px;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -14px;
`;

const TempWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Temp = styled.span`
  font-weight: 500;
  font-size: 3.8em;
  line-height: 48px;
`;

const WeatherT = styled.span`
  font-weight: 500;
  font-size: 1.1em;
  line-height: 28px;
  margin-left: -8px;
`;

const Icon = styled.div`
  width: 110px;
  height: 110px;
  background-image: url(${(props) => props.iconURL});
  /* background-image: url(http://openweathermap.org/img/wn/03d@2x.png); */
  background-position: center 30%;
  background-size: cover;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;
const InfoWrapRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
  margin-left: -6px;
`;

const Info = styled.span`
  font-size: 12px;
  line-height: 24px;
  color: #787c87;
`;

const InfoNum = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-left: 30px;
  color: #02113b;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: 40px;
  height: 26px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  margin-right: 4px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
  &:hover {
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    font-weight: 700;
    border-bottom: 2px solid #000000;
  }
  display: none;
`;

const Label = styled.label``;

const ChartBox = styled.div`
  margin-top: 14px;
  padding: 0px 30px 0px 20px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
`;

export default Weather;
