import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TodayNews = () => {
  return (
    <Wrap>
      <Title>💬 오늘의 뉴스</Title>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 16px;
  grid-column: 3 / 4;
  grid-row: 6 / 7;
  background-color: #fff;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 9 / 10;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.4em;
  line-height: 10px;
`;

export default TodayNews;
