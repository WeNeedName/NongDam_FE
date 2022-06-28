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
        position: "right",
        // fontSize: "8px",
      },
      responsive: [
        {
          breakpoint: 480,
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            // hollow: {
            //   margin: 15,
            //   size: '70%',
            //   image: '../../css/images/a-icon.jpg',
            //   imageWidth: 64,
            //   imageHeight: 64,
            //   imageClipped: false
            // },
            labels: {
              show: true,
              total: {
                showAlways: false,
                show: true,
                label: "총 금액",
                fontSize: "14px",
                color: "black",
              },
              value: {
                fontSize: "22px",
                show: true,
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
      <TopWrap>
        <h3>지출</h3>
        <span>기간선택</span>
      </TopWrap>

      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="480"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 500px;
  height: 440px;
  border: none;
  border-radius: 18px;
  box-shadow: 0px 3px 6px #00000029;
  padding: 4px 18px;
  margin: 20px;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default Expense;
