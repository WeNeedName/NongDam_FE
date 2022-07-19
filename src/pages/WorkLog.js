import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import LoadWorkLog from "../components/workLog/LoadWorkLog";
import styled from "styled-components";
import loadWorkLogListDB from "../redux/modules/workLog";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import {logOutDB} from '../redux/modules/users'

const WorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(loadWorkLogListDB());
  }, []);

  const workLogList = useSelector((state) => state?.workLog?.workLogList);
  console.log(workLogList);

  return (
    <Container>
      <Header />
      <LoadWorkLog />
    </Container>
  );
};
const Container = styled.div`
  margin-top: 100px;
`;

export default WorkLog;
