import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDB } from "../redux/modules/users";
import { getInfoDB } from "../redux/modules/users";

const FooterNav = ({ currentPage }) => {
  const navigate = useNavigate();

  const [headerNav, setHeaderNav] = useState(currentPage);

  return (
    <Wrap>
      <NavWrap>
        <CategoryWrap>
          <FormCheckText
            id="main"
            onClick={() => {
              navigate("/");
            }}
            currentPage={headerNav}
          >
            홈
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap>
          <FormCheckText
            id="marketPrice"
            onClick={() => {
              navigate("/marketprice");
              setHeaderNav(headerNav);
            }}
            currentPage={headerNav}
          >
            시세
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap>
          <FormCheckText
            id="schedule"
            onClick={() => {
              navigate("/schedule");
              setHeaderNav(headerNav);
            }}
            currentPage={headerNav}
          >
            일정
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap>
          <FormCheckText
            id="accountbook"
            onClick={() => {
              navigate("/accountbook");
              setHeaderNav(headerNav);
            }}
            currentPage={headerNav}
          >
            장부
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap>
          <FormCheckText
            id="workLog"
            onClick={() => {
              navigate("/worklog");
            }}
            currentPage={headerNav}
          >
            일지
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap>
          <FormCheckText
            id="analysis"
            onClick={() => {
              navigate("/analysis");
              setHeaderNav(headerNav);
            }}
            currentPage={headerNav}
          >
            농장 현황
          </FormCheckText>
        </CategoryWrap>
      </NavWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 80px;
  background: #ffffff;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08);
  z-index: 100;

  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: none;
  border-top: 0.5px solid #ddd;
  @media only screen and (max-width: 760px) {
    display: block;
  }
`;

const NavWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormCheckText = styled.span`
  margin: 0px 20px;
  cursor: pointer;
  font-size: 11px;
  color: ${(props) => (props.currentPage === props.id ? " #333333" : " #666")};
  font-weight: ${(props) => (props.currentPage === props.id ? 500 : 400)};
  &:hover {
    font-weight: 500;
    color: #333333;
  }
`;

export default FooterNav;
