import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyCropMarketPriceDB,
  getMyCropsMarketPriceDB,
} from "../../redux/modules/main";

// 차트 라이브러리
import ApexCharts from "react-apexcharts";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const MyCropsMarketPriceCard = ({ checkedInputs }) => {
  const dispatch = useDispatch();
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // 윈도우 사이즈 추적
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  const userInfo = useSelector((state) => state.users.user);
  // const marketName = userInfo?.address.split(" ")[0];
  const AllmarketPriceData = useSelector(
    (state) => state.main.myCropsMarketPrice
  );

  const marketName =
    AllmarketPriceData !== undefined &&
    AllmarketPriceData[0] !== undefined &&
    AllmarketPriceData[0][0]?.country;

  // 유저 작물 전체 시세 리스트 요청
  useEffect(() => {
    dispatch(getMyCropsMarketPriceDB(checkedInputs));
  }, [checkedInputs]);

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
  // x축 월 리스트 만들기
  const today = new Date();
  const month =
    windowSize.innerWidth > 760
      ? moment(today).format("YYYY.MM")
      : moment(today).format("YY.MM");
  let day = new Date();
  const myDateList = Array.from([day, day, day, day, day, day], (x) =>
    x.setMonth(x.getMonth() - 2)
  );
  console.log(myDateList);

  const newMonthDateList = [];
  const newMyDateList = myDateList.map((list) => {
    if (windowSize.innerWidth > 760)
      newMonthDateList.push(moment(list).format("YYYY.MM"));
    else newMonthDateList.push(moment(list).format("YY.MM"));
  });

  newMonthDateList.unshift(month);
  const monthDate = newMonthDateList.reverse();

  // x축 연도 리스트 만들기
  const myYearList = Array.from([day, day, day, day, day], (x) =>
    x.setYear(x.getFullYear() - 1)
  );
  const newYearDateList = [];
  const newMyYearList = myYearList.map((list) => {
    return newYearDateList.push(moment(list).format("YYYY"));
  });
  let now = new Date();
  const year = moment(today).format("YYYY");
  newYearDateList.unshift(String(now.getFullYear() - 1));
  newYearDateList.unshift(year);
  const yearDate = newYearDateList.reverse();

  // 더미데이터
  const data = { id: 0, name: "", category: "", type: "" };
  const usersNewCropList = [];
  userInfo !== undefined &&
    userInfo?.crops.map((list) => {
      return usersNewCropList.push(list);
    });
  usersNewCropList.push(data);

  return (
    usersNewCropList !== undefined &&
    usersNewCropList.map((list, index) => {
      // 내 작물 도/소매 데이터
      const retailSalePriceList =
        AllmarketPriceData[index] !== undefined &&
        AllmarketPriceData[index][1]?.priceList.map((price) => {
          return Number(uncomma(price));
        });

      const wholeSalePriceList =
        AllmarketPriceData[index] !== undefined &&
        AllmarketPriceData[index][0]?.priceList.length !== 0
          ? AllmarketPriceData[index][0]?.priceList.map((price) => {
              return Number(uncomma(price));
            })
          : null;

      // 내 작물 시세 차트 데이터
      const monthState = {
        series: [
          {
            name: "도매",
            data:
              AllmarketPriceData[index] !== undefined &&
              wholeSalePriceList !== null
                ? wholeSalePriceList
                : [0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: "소매",
            data:
              AllmarketPriceData[index] !== undefined &&
              retailSalePriceList !== null
                ? retailSalePriceList
                : [0, 0, 0, 0, 0, 0, 0],
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
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
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
                // checkedInputs ===
                // "month"
                // ? monthDate[dataPointIndex]
                // : yearDate[dataPointIndex] +
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
            categories: checkedInputs === "month" ? monthDate : yearDate,
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
        <React.Fragment key={index}>
          {usersNewCropList.length !== index + 1 ? (
            AllmarketPriceData[index] !== undefined &&
            AllmarketPriceData[index][1]?.priceList?.length !== 0 ? (
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
                  {checkedInputs === "month" &&
                  AllmarketPriceData !== undefined ? (
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
                        {checkedInputs === "month"
                          ? monthDate.map((data, id) => {
                              return <Xasis key={id}>{data}</Xasis>;
                            })
                          : yearDate.map((data, id) => {
                              return <Xasis key={id}>{data}</Xasis>;
                            })}
                      </XasisWrap>
                    </>
                  ) : null}

                  {checkedInputs === "year" &&
                  AllmarketPriceData !== undefined ? (
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
                        {checkedInputs === "month"
                          ? monthDate.map((data, id) => {
                              return <Xasis key={id}>{data}</Xasis>;
                            })
                          : yearDate.map((data, id) => {
                              return <Xasis key={id}>{data}</Xasis>;
                            })}
                      </XasisWrap>
                    </>
                  ) : null}
                </CategoryChartWrap>
              </Wrap>
            ) : (
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
                  <ChartBoxB>
                    <NotFoundWrap>
                      <NotFoundNotice>
                        {list.name}의
                        {checkedInputs === "month" ? " 월별 " : " 연도별 "}
                        데이터를 조회할 수 없습니다
                      </NotFoundNotice>
                    </NotFoundWrap>
                  </ChartBoxB>
                </CategoryChartWrap>
              </Wrap>
            )
          ) : (
            <EndWrap>
              <RowWrap></RowWrap>
            </EndWrap>
          )}
        </React.Fragment>
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
  cursor: pointer;
  @media only screen and (max-width: 760px) {
    width: 340px;
  }
`;

const EndWrap = styled.div`
  width: 12%;
  height: 100%;
  border: none;
  background-color: #f5f5f5;
  @media only screen and (max-width: 760px) {
    width: 7%;
  }
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

const ChartBoxB = styled.div`
  width: 100%;
  margin-top: 30px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  margin-bottom: 22px;
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
  font-size: 14px;
`;

const NotFoundWrap = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default MyCropsMarketPriceCard;
