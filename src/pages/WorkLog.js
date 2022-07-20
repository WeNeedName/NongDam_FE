import { React, useState, useEffect } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import Header from "../components/Header";
import LoadWorkLog from "../components/workLog/LoadWorkLog";
import DetailWorkLog from "../components/workLog/DetailWorkLog";
import styled from "styled-components";
import { loadWorkLogListDB, loadWorkLogDB } from "../redux/modules/workLog";

import { useSelector, useDispatch } from "react-redux";

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
  const workLogOne = useSelector((state) => state?.workLog?.workLog);
  console.log(workLogOne);
  return (
    <Container>
      <Header />
      <LoadWorkLog workLogList={workLogList} />
    </Container>
  );
};
const Container = styled.div`
  margin-top: 100px;
`;

export default WorkLog;
