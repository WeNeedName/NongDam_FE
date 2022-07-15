import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherDB } from "../../redux/modules/main";
import { useNavigate } from "react-router";
import WeatherChart from "./WeatherChart";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerCircularImage } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";
import "../../App.css";

const Weather = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const weatherData = useSelector((state) => state.main.weather);
  const [checkedInputs, setCheckedInputs] = useState("hour");
  const is_loaded = useSelector((state) => state.main.weather_is_loaded);
  const userInfo = useSelector((state) => state.users.user);

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  useEffect(() => {
    dispatch(getWeatherDB());
  }, [dispatch]);

  return (
    <Wrap>
      {is_loaded ? (
        <>
          {userInfo?.address === "" ? (
            <NoticeWrap>
              <NoticeT>
                마이페이지에서 지역을 등록하시면
                <br />
                실시간 날씨를 확인하실 수 있습니다
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                등록하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : userInfo?.crops.length === 0 ? (
            <NoticeWrap>
              <NoticeT>
                마이페이지에서 지역과 작물을 등록하시면
                <br />내 작물의 오늘 시세를 확인하실 수 있습니다
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                등록하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : null}
          <Title>⛅️ 농장 날씨</Title>
          <MiddleWrap>
            <MiddleLeftWrap>
              <Region>{weatherData.address}</Region>
              <IconWrap>
                <Icon iconURL={weatherData.iconURL} />
                <TempWrap>
                  <Temp>{weatherData.temp}°</Temp>
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
            <WeatherChart checkedInputs={checkedInputs} />
          </BottomWrap>
        </>
      ) : (
        <>
          <ShimmerTitle
            className="thumNail-news-title"
            line={1}
            gap={10}
            variant="secondary"
          />
          <ThumNailWrap>
            <ThumNail>
              <ShimmerCircularImage size={110} />
              <ShimmerText
                className="thumNail-text"
                line={3}
                gap={10}
                variant="secondary"
              />
            </ThumNail>

            <ShimmerThumbnail
              className="thumNail-weather"
              height={160}
              rounded
            />
          </ThumNailWrap>
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  grid-column: 2 / 3;
  grid-row: 2 / 6;
  background-color: #fff;
  position: relative;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 2 / 5;
  }
`;

const ThumNailWrap = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ThumNail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
`;

const MiddleWrap = styled.div`
  width: 100%;
  height: 36%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px 0px 4px 0px;
`;

const MiddleLeftWrap = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleRightWrap = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

const Region = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 12px;
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
  margin-left: 6px;
`;

const Temp = styled.span`
  font-weight: 500;
  font-size: 46px;
  line-height: 48px;
  margin-bottom: 4px;
`;

const WeatherT = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  margin-left: -8px;
`;

const Icon = styled.div`
  width: 90px;
  height: 90px;
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
  font-size: 14px;
  line-height: 24px;
  color: #787c87;
  margin-bottom: 2px;
`;

const InfoNum = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin-left: 30px;
  color: #02113b;
  margin-bottom: 2px;
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
  width: auto;
  height: 26px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  margin-right: 4px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
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
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.9) 100%,
    transparent 100%
  );
  position: absolute;
  top: 0;
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
  color: #318f27;
  text-align: center;
`;

const NoticeBtn = styled.button`
  padding: 8px 18px;
  margin-top: 20px;
  background-color: #318f27;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
  }
`;

export default Weather;
