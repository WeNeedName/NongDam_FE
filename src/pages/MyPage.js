import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import MyPageMenu from "../components/myPage/MyPageMenu";
import EditMemberInfo from "./EditMemberInfo";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInfoDB } from "../redux/modules/users";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const isLogin = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);
  //console.log(isLogin)
  // function logOut()
  // {
  //     sessionStorage.clear()
  //     navigate("/");
  // }
  return (
    <Wrap>
      <Header />
      <MyPageMenu />
      <EditMemberInfo />
    </Wrap>
  );
};
const Wrap = styled.div`
  height: 80vh;
  margin-top: 100px;
  margin-bottom: 100px;

  display: grid;
  grid-auto-rows: auto;

  grid-template-columns: 1fr minmax(18%, 18%) repeat(2, minmax(24%, 24%)) 1fr;

  justify-content: center;
  flex-flow: wrap;

  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  row-gap: 16px;
  column-gap: 60px;

  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 27%) 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
`;

export default MyPage;
