import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import { ResponsiveLine } from "@nivo/line";
// import data from "./data.json";
import axios from "axios";

const TotalHarvest = () => {
  const [data, setData] = useState(null);

  //   React.useEffect(() => {
  //     return () => {
  //       axios({
  //         method: "get",
  //         url: "http://localhost:5001/data",
  //         headers: {
  //           "content-type": "application/json;charset=UTF-8",
  //           accept: "application/json,",
  //         },
  //       }).then((res) => {
  //         setData(res.data);
  //       });
  //     };
  //   }, []);

  axios({
    method: "get",
    url: "http://localhost:5001/data",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json,",
    },
  }).then((res) => {
    return setData(res.data);
  });

  return (
    <Wrap>
      <TopWrap>
        <h3>수확량</h3>
        <span>기간선택</span>
      </TopWrap>
      <ResponsiveLine
        data={data !== null ? data : null}
        margin={{ top: 10, right: 70, bottom: 100, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
          enableArea: true,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 10,
          tickPadding: 10,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 10,
          tickPadding: 10,
          tickRotation: 0,
          legend: "count",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 500px;
  height: 300px;
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

export default TotalHarvest;
