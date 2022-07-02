import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherDB } from "../../redux/modules/main";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";
// moment().format('HH')
const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.main.weather);

  const [checkedInputs, setCheckedInputs] = useState("전체");
  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  // const time = weatherData?.hour[0]?.time;
  // console.log(time);
  console.log(weatherData);
  useEffect(() => {
    dispatch(getWeatherDB());
  }, [dispatch]);

  console.log(weatherData);
  // 시간별 날씨 그래프 데이터
  const state = {
    series: [
      {
        name: "기온",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
      {
        name: "강수확률",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      markers: {
        size: 2.5,
        colors: ["#7EE3AB"],
      },
      legend: {
        show: false,
      },
      chart: {
        height: 350,
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
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"],
        },
        column: {
          colors: ["transparent", "transparent"],
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          // 시간 리스트
          // time,
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
        labels: {
          format: "HH",
        },
      },
      yaxis: {
        show: false,
      },
    },
  };

  return (
    <Wrap>
      <h3>⛅️ 농장 날씨</h3>
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
            <InfoNum>{weatherData.rn} mm</InfoNum>
          </InfoWrap>
          <InfoWrap>
            <Info>습도</Info>
            <InfoNum>{weatherData.rhm} %</InfoNum>
          </InfoWrap>
          <InfoWrap>
            <Info>이슬점</Info>
            <InfoNum>{weatherData.dewPoint} ℃</InfoNum>
          </InfoWrap>
          <InfoWrap>
            <Info>바람</Info>
            <InfoNum>{weatherData.ws} m/s</InfoNum>
          </InfoWrap>
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
            height={200}
          />
        </ChartBox>
      </BottomWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 420px;
  height: 500px;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 4px 30px;
  margin: 20px;
`;

const MiddleWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const MiddleLeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleRightWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
`;

const Region = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -10px;
`;

const TempWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Temp = styled.span`
  font-weight: 500;
  font-size: 48px;
  line-height: 48px;
`;

const WeatherT = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin-left: -8px;
  margin-top: 4px;
`;

const Icon = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(${(props) => props.iconURL});
  /* background-image: url(http://openweathermap.org/img/wn/03d@2x.png); */
  background-position: center 30%;
  background-size: cover;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Info = styled.span`
  font-size: 16px;
  color: #787c87;
`;

const InfoNum = styled.span`
  font-weight: 400;
  font-size: 16px;
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
  width: 48px;
  height: 30px;
  font-weight: 400;
  font-size: 16px;
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
  width: 409px;
  height: 215px;
  left: 29px;
  top: 263px;
  margin-top: 18px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
`;

export default Weather;
