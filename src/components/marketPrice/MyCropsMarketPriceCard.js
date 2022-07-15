import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyCropMarketPriceDB,
  getMyCropsMarketPriceDB,
} from "../../redux/modules/main";
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
  const marketPriceData = useSelector((state) => state.main.myCropsMarketPrice);

  const AllmarketPriceData = useSelector(
    (state) => state.main.myCropsMarketPrice
  );

  const [checkedInputs, setCheckedInputs] = useState("month");

  const userInfo = useSelector((state) => state.users.user);
  const marketName = userInfo?.address.split(" ")[0];

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  const data = "month";

  return (
    userInfo !== undefined &&
    userInfo?.crops.map((list, index) => {
      // 내 작물 월별 그래프 데이터
      // const monthDay =
      //   AllmarketPriceData !== undefined &&
      //   AllmarketPriceData[index][1] !== undefined
      //     ? AllmarketPriceData[index][1]?.dateList.map((date) => {
      //         return moment(date).format("YYYY.MM");
      //       })
      //     : AllmarketPriceData[index][1] !== undefined
      //     ? AllmarketPriceData[index][0]?.dateList.map((date) => {
      //         return moment(date).format("YYYY.MM");
      //       })
      //     : null;

      // const retailSalePriceList =
      //   AllmarketPriceData[index] !== undefined &&
      //   AllmarketPriceData[index][1]?.priceList.map((price) => {
      //     return Number(uncomma(price));
      //   });

      // const wholeSalePriceList =
      //   AllmarketPriceData[index] !== undefined &&
      //   AllmarketPriceData[index][0]?.priceList.length !== 0
      //     ? AllmarketPriceData[index][0]?.priceList.map((price) => {
      //         return Number(uncomma(price));
      //       })
      //     : null;

      const monthDay = ["2022", "2022", "2022", "2022", "2022", "2022", "2022"];
      const retailSalePriceList = [100, 200, 300, 200, 300, 200, 0];
      const wholeSalePriceList = [100, 300, 300, 0, 400, 200, 0];

      // 내 작물 시세 데이터
      const monthState = {
        series: [
          {
            name:
              AllmarketPriceData[index] !== undefined &&
              AllmarketPriceData[index][0]?.wholeSale,
            data: AllmarketPriceData[index] !== undefined && wholeSalePriceList,
          },
          {
            name:
              AllmarketPriceData[index] !== undefined &&
              AllmarketPriceData[index][1]?.wholeSale,
            data:
              AllmarketPriceData[index] !== undefined && retailSalePriceList,
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
                AllmarketPriceData[index][seriesIndex]?.crop +
                " " +
                monthState?.series[seriesIndex]?.name +
                '<span class="date-label">' +
                " " +
                monthDay[dataPointIndex] +
                "</span>" +
                "</span>" +
                "</div>" +
                '<div class="line-bottom">' +
                '<span class="label-data">' +
                comma(series[seriesIndex][dataPointIndex]) +
                '<span class="price-label">' +
                "원/" +
                AllmarketPriceData[index][seriesIndex]?.unit +
                "</span>" +
                "</span>" +
                "</div>" +
                "</div>"
              );
            },
          },
          xaxis: {
            categories: monthDay,
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
          <Wrap key={index}>
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
              {checkedInputs === "month" && AllmarketPriceData !== undefined ? (
                <>
                  <ChartBox>
                    <ApexCharts
                      options={monthState.options}
                      series={monthState.series}
                      type="line"
                      height={92 + "%"}
                    />

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
                  </ChartBox>
                  <XasisWrap>
                    {monthDay !== undefined &&
                      monthDay.map((data, id) => {
                        return <Xasis key={id}>{data}</Xasis>;
                      })}
                  </XasisWrap>
                </>
              ) : null}

              {checkedInputs === "year" && AllmarketPriceData !== undefined ? (
                <>
                  <ChartBox>
                    <ApexCharts
                      options={monthState.options}
                      series={monthState.series}
                      type="line"
                      height={92 + "%"}
                    />

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
                  </ChartBox>
                  <XasisWrap>
                    {monthDay !== undefined &&
                      monthDay.map((data, id) => {
                        return <Xasis key={id}>{data}</Xasis>;
                      })}
                  </XasisWrap>
                </>
              ) : null}
            </CategoryChartWrap>
          </Wrap>
        </>
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

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px;
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
  font-size: 16px;
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

const ChartBox = styled.div`
  width: 100%;
  margin-top: 30px;
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
  font-size: 11px;
  color: #666666;
`;

const YasisLabelBox = styled.div`
  padding: 4px 6px;
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
  margin-right: 6px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipB = styled.div`
  width: 7px;
  height: 3px;
  background: #7eb3e3;
  margin-right: 6px;
  margin-left: 10px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisLabel = styled.span`
  font-size: 11px;
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

const Div = styled.div`
  width: 400px;
  height: 100%;
`;

export default MyCropsMarketPriceCard;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyCropMarketPriceDB } from "../../redux/modules/main";
// // 컴포넌트
// import MarketPriceMonthChart from "./MyCropsMonthChart";
// import MarketPriceYearChart from "./MyCropsYearChart";

// // 차트 라이브러리
// import ApexCharts from "react-apexcharts";
// // 날짜 포맷 라이브러리
// import moment from "moment";
// import "moment/locale/ko";

// const MyCropsMarketPriceCard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const marketPriceData = useSelector((state) => state.main.myCropMarketPrice);
//   const AllmarketPriceData = useSelector((state) => state.main.myCropsMarketPrice);

//   const [checkedInputs, setCheckedInputs] = useState("month");

//   const userInfo = useSelector((state) => state.users.user);
//   const marketName = userInfo?.address.split(" ")[0];

//   // 항목 선택
//   const changeRadio = (e) => {
//     if (e.target.checked) {
//       setCheckedInputs(e.target.id);
//     }
//   };

//   console.log(checkedInputs, userInfo);

//   return (
//     userInfo !== undefined &&
//     userInfo?.crops.map((list, index) => {
//       return (
//         <Wrap>
//           <div>
//             <RowWrap>
//               <CategoryT>
//                 {marketName !== undefined
//                   ? marketName + " " + "도소매시장"
//                   : "서울 도소매시장"}
//               </CategoryT>
//               <Hr />
//               <CategoryT>{list.name}</CategoryT>
//             </RowWrap>
//           </div>

//           <CategoryChartWrap>
//             <CategoryWrap>
//               <Label>
//                 <FormCheckLeft
//                   type="radio"
//                   id="month"
//                   name={list.id}
//                   onChange={changeRadio}
//                   value={checkedInputs}
//                   defaultChecked
//                 />
//                 <FormCheckText>월별</FormCheckText>
//               </Label>
//               <Label>
//                 <FormCheckLeft
//                   type="radio"
//                   id="year"
//                   name={list.id}
//                   onChange={changeRadio}
//                   value={checkedInputs}
//                 />
//                 <FormCheckText>연도별</FormCheckText>
//               </Label>
//             </CategoryWrap>

//             {checkedInputs === "month" && (
//               <MarketPriceMonthChart
//                 MyCrops={list}
//                 checkedInputs={checkedInputs}
//                 index={index}
//               />
//             )}
//             {checkedInputs === "year" && (
//               <MarketPriceYearChart
//                 MyCrops={list}
//                 checkedInputs={checkedInputs}
//                 index={index}
//               />
//             )}
//           </CategoryChartWrap>
//         </Wrap>
//       );
//     })
//   );
// };

// const Wrap = styled.div`
//   width: 400px;
//   height: 100%;
//   border: none;
//   box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
//   border-radius: 10px;
//   padding: 20px 20px 16px 20px;
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   margin-right: 20px;
// `;

// const RowWrap = styled.div`
//   width: 400px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// const Hr = styled.div`
//   width: 1px;
//   height: 10px;
//   border-right: 1.6px solid black;
//   /* margin-top: 6px; */
//   margin: 2px 4px 0px 4px;
// `;

// const CategoryChartWrap = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   /* margin-left: 60px; */
//   @media only screen and (max-width: 760px) {
//     width: 100%;
//   }
// `;

// const CategoryT = styled.span`
//   font-weight: 700;
//   font-size: 1rem;
// `;

// const CategoryWrap = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin: 8px 0px;
// `;

// const FormCheckText = styled.span`
//   width: auto;
//   height: 26px;
//   font-weight: 400;
//   font-size: 11px;
//   line-height: 24px;
//   margin-right: 4px;
//   background: transparent;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-right: 10px;
//   cursor: pointer;
//   color: black;
//   &:hover {
//   }
// `;

// const FormCheckLeft = styled.input.attrs({ type: "radio" })`
//   &:checked {
//     display: inline-block;
//     background: none;
//     text-align: center;
//     display: none;
//   }
//   &:checked + ${FormCheckText} {
//     font-weight: 700;
//     border-bottom: 2px solid #000000;
//   }
//   display: none;
// `;

// const Label = styled.label``;

// export default MyCropsMarketPriceCard;
