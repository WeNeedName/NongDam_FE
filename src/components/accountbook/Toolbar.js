import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAccountListDB, getYearMonthDB } from "../../redux/modules/account";

export default function ToolBar(props) {
  const dispatch = useDispatch();
  const [nowMonth, setNowMonth] = useState(null);
  const [click, setClick] = useState(false);
  // const [nowYear, setNowYear] = useState(null);

  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
    if (!click) setClick(true);
    else setClick(false);
  };

  const month = moment(date).format("MM");
  const year = moment(date).format("YYYY");
  const YYMM = { month: month, year: year };

  const accountList = useSelector((state) => state.account.accountList);

  useEffect(() => {
    dispatch(getAccountListDB(YYMM));
    // dispatch(getYearMonthDB(YYMM));
  }, [click]);

  return (
    <ToolbarWrap>
      {/* <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button> */}
      <Btn type="button" onClick={navigate.bind(null, "PREV")}>
        <TriangleIconL />
        {/* 이전 달 버튼 */}
      </Btn>
      <YearMonthTitle className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월`}</YearMonthTitle>
      <Btn type="button" onClick={navigate.bind(null, "NEXT")}>
        {/* 다음 달 버튼*/}
        <TriangleIconR />
      </Btn>
    </ToolbarWrap>
  );
}

const ToolbarWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
  align-items: center;
`;

const YearMonthTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin: 0px 12px;
  margin-bottom: 4px;
`;

const Btn = styled.button`
  width: 16px;
  height: 16px;
  background: #318f27;
  border: none;
  border-radius: 100%;
  position: relative;
  &:hover {
    background-color: #22631c;
  }
`;

const TriangleIconL = styled.div`
  width: 0;
  height: 0;
  color: white;
  border-bottom: 3.5px solid transparent;
  border-top: 3.5px solid transparent;
  border-left: 5.5px solid white;
  border-right: 5.5px solid transparent;
  position: absolute;
  right: 6px;
  top: 4.5px;
  transform: rotate(180deg);
`;

const TriangleIconR = styled.div`
  width: 0;
  height: 0;
  color: white;
  border-bottom: 3.5px solid transparent;
  border-top: 3.5px solid transparent;
  border-left: 5.5px solid white;
  border-right: 5.5px solid transparent;
`;
