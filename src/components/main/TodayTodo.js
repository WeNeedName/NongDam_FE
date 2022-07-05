import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const TodayTodo = () => {
  return (
    <Wrap>
      <Title>📝 오늘의 할 일</Title>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 16px;
  grid-column: 2 / 3;
  grid-row: 5 / 7;
  padding: 16px 16px;
  background-color: #fff;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 5 / 6;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.4em;
  line-height: 10px;
`;

export default TodayTodo;
