import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ReactApexChart from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

const Income = () => {
  const [data, setData] = useState(null);

  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowTime);

  const donutData = {
    series: [80, 40, 20],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        show: false,
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
                label: "지출",
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
      labels: ["농산물 판매", "정부보조금", "기타수입"],
    },
  };

  return (
    <Wrap>
      <ReactApexChart
        options={donutData.options}
        series={donutData.series}
        type="donut"
        width="230"
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  /* width: 500px;
  height: 440px;
  border: none;
  border-radius: 18px;
  box-shadow: 0px 3px 6px #00000029;
  padding: 4px 18px;
  margin: 20px; */
`;

export default Income;
