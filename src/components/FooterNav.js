import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDB } from "../redux/modules/users";
import { getInfoDB } from "../redux/modules/users";
// 이미지
import homeIcon from "../images/home.png";
import accountIcon from "../images/account.png";
import scheduleIcon from "../images/schedule.png";
import marketpriceIcon from "../images/marketprice.png";
import workLogIcon from "../images/workLog.png";
import analysisIcon from "../images/analysis.png";

const FooterNav = ({ currentPage }) => {
  const navigate = useNavigate();

  const [headerNav, setHeaderNav] = useState(currentPage);

  return (
    <Wrap>
      <NavWrap>
        <CategoryWrap
          onClick={() => {
            navigate("/");
          }}
        >
          <Icon src={homeIcon} alt="홈" />
          <FormCheckText id="main" currentPage={headerNav}>
            홈
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap
          onClick={() => {
            navigate("/marketprice");
            setHeaderNav(headerNav);
          }}
        >
          <Icon src={marketpriceIcon} alt="시세" />
          <FormCheckText id="marketPrice" currentPage={headerNav}>
            시세
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap
          onClick={() => {
            navigate("/schedule");
            setHeaderNav(headerNav);
          }}
        >
          <IconB src={scheduleIcon} alt="일정" />
          <FormCheckText id="schedule" currentPage={headerNav}>
            일정
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap
          onClick={() => {
            navigate("/accountbook");
            setHeaderNav(headerNav);
          }}
        >
          <Icon src={accountIcon} alt="장부" />

          <FormCheckText id="accountbook" currentPage={headerNav}>
            장부
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap
          onClick={() => {
            navigate("/worklog");
          }}
        >
          <Icon src={workLogIcon} alt="일지" />
          <FormCheckText id="workLog" currentPage={headerNav}>
            일지
          </FormCheckText>
        </CategoryWrap>

        <CategoryWrap
          onClick={() => {
            navigate("/analysis");
            setHeaderNav(headerNav);
          }}
        >
          <Icon src={analysisIcon} alt="농장 현황" />
          <FormCheckText id="analysis" currentPage={headerNav}>
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
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
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
  cursor: pointer;
`;

const FormCheckText = styled.span`
  margin: 4px 18px;
  cursor: pointer;
  font-size: 13px;
  color: ${(props) => (props.currentPage === props.id ? " #333333" : " #666")};
  font-weight: ${(props) => (props.currentPage === props.id ? 600 : 400)};
  &:hover {
    font-weight: 500;
    color: #333333;
  }
`;

const Icon = styled.img`
  width: 26px;
  height: auto;
`;

const IconB = styled.img`
  width: 25px;
  height: auto;
`;

export default FooterNav;
