import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMarketPriceDB } from "../../redux/modules/main";
// 컴포넌트
import MarketPriceMonthChart from "./MyCropsMonthChart";
import MarketPriceYearChart from "./MyCropsYearChart";

// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const MyCropsMarketPriceCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const marketPriceData = useSelector((state) => state.main.marketPrice);

  const [checkedInputs, setCheckedInputs] = useState("month");

  const userInfo = useSelector((state) => state.users.user);
  const marketName = userInfo?.address.split(" ")[0];

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

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  useEffect(() => {
    dispatch(getMarketPriceDB(data));
  }, [checkedInputs]);

  console.log(checkedInputs, marketPriceData);

  const data = {
    cropId: userInfo?.id,
    data: checkedInputs,
  };

  const userCropsArr = [];
  const userCropsMap =
    userInfo !== undefined
      ? userInfo?.crops.map((crop) => {
          return userCropsArr.push(crop.id);
        })
      : null;

  console.log(userCropsArr);

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

  // 내 작물 데이터
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
    userInfo !== undefined &&
    userInfo?.crops.map((list, index) => {
      return (
        <Wrap>
          <div>
            <RowWrap>
              <CategoryT>
                {marketName !== undefined
                  ? marketName + " " + "도소매시장"
                  : "서울 도소매시장"}
              </CategoryT>
              <Hr />
              <CategoryT>{list.name}</CategoryT>
            </RowWrap>
          </div>

          <CategoryChartWrap>
            <CategoryWrap>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="month"
                  name={list.id}
                  onChange={changeRadio}
                  value={checkedInputs}
                  defaultChecked
                />
                <FormCheckText>월별</FormCheckText>
              </Label>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="year"
                  name={list.id}
                  onChange={changeRadio}
                  value={checkedInputs}
                />
                <FormCheckText>연도별</FormCheckText>
              </Label>
            </CategoryWrap>

            {checkedInputs === "month" && (
              <MarketPriceMonthChart
                MyCrops={list}
                checkedInputs={checkedInputs}
                index={index}
              />
            )}
            {checkedInputs === "year" && (
              <MarketPriceYearChart
                MyCrops={list}
                checkedInputs={checkedInputs}
                index={index}
              />
            )}
          </CategoryChartWrap>
        </Wrap>
      );
    })
  );
};

const Wrap = styled.div`
  width: 400px;
  height: 100%;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-right: 20px;
`;

const RowWrap = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Hr = styled.div`
  width: 1px;
  height: 10px;
  border-right: 1.6px solid black;
  /* margin-top: 6px; */
  margin: 2px 4px 0px 4px;
`;

const CategoryChartWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* margin-left: 60px; */
  @media only screen and (max-width: 760px) {
    width: 100%;
  }
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px;
`;

const FormCheckText = styled.span`
  width: auto;
  height: 26px;
  font-weight: 400;
  font-size: 11px;
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

export default MyCropsMarketPriceCard;
