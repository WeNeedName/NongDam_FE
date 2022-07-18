import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ReactApexChart from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const Expense = () => {
  const [data, setData] = useState(null);

  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowTime);

  const donutData = {
    series: [100, 40, 60, 30, 20, 20, 50, 0, 0, 20],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        show: false,
        position: "right",
        // fontSize: "8px",
      },

      responsive: [
        {
          breakpoint: 480,
        },
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "right",
        distributed: true,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          colors: [
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
            "white",
          ],
        },
        dropShadow: {
          enabled: true,
          color: "#aaa",
        },
      },

      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                // 데이터 라벨 커스텀
                show: true,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 700,
                color: undefined,
                offsetY: 6,
                formatter: function (val) {
                  return val;
                },
              },

              total: {
                showAlways: false,
                show: true,
                label: "수입",
                fontSize: "18px",
                fontWeight: "700",
                color: "black",
              },
              value: {
                fontSize: "22px",
                show: false,
                color: "blue",
              },
            },
          },
        },
      },
      labels: [
        "비료",
        "종자/종묘",
        "농약",
        "농기계",
        "기타 농자재",
        "유통비 및 판매 경비",
        "고용노동비",
        "임차료",
        "수도광열비",
        "기타 지출",
      ],
    },
  };

  return (
    <Wrap>
      {/* <TopWrap> */}
      {/* <h3>지출</h3> */}
      {/* <span>기간선택</span> */}
      {/* </TopWrap> */}

      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="260"
      />
      <Legend>
        <span>비료</span>
        <span>종자/종묘</span>
        <span>농약</span>
        <span>농기계</span>
        <span>기타 농자재</span>
        {/* <span>유통비 및 판매 경비</span>
        <span>고용노동비</span>
        <span>임차료</span>
        <span>수도광열비</span>
        <span>기타 지출</span> */}
      </Legend>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 8px;
    margin: 2px;
  }
`;

export default Expense;
