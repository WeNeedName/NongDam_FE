import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import AccountCalender from "../components/accountbook/AccountCalender";
import AccountWeek from "../components/accountbook/AccountWeek";

const AccountBook = () => {
  return (
    <div>
      <Header />
      <Wrap>
        <AccountCalender />
        <AccountWeek />
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;

export default AccountBook;
