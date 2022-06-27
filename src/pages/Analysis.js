import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";

const Analysis = () => {
  return (
    <div>
      <Header />
      <div>통계페이지입니다.</div>
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export default Analysis;
