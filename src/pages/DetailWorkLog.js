import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { loadWorkLogDB } from "../redux/modules/workLog";

const DetailWorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const workLogOne = useSelector((state) => state.workLog.workLog);

  useEffect(() => {
    // dispatch(loadWorkLogDB(params.id));
  }, []);

  console.log(workLogOne);

  return (
    <>
      <Header />
      <Container>
        <Wrap>
          <div>{params.id}번째 영농일지 상세페이지</div>
        </Wrap>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 630px;
  padding: 30px;

  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
`;

export default DetailWorkLog;
