import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function Day(props) {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };
  // 현재 년도, 월
  const nowYear = moment().format("DD");
  //   console.log(typeof nowYear, nowYear);
  //   console.log(date.getDate());

  return (
    <>
      <TopWrap className="rbc-month-row" role="rowgroup">
        <div className="rbc-row-bg" role="rowgroup">
          <Wrap className="rbc-day-bg"></Wrap>
        </div>
        <div className="rbc-row-content" role="rowgroup">
          <div className="rbc-row ">
            <DayWrap className="rbc-date-cell" role="cell">
              <DayBtn type="button" role="cell">
                {String(date.getDate()).length === 1
                  ? "0" + String(date.getDate())
                  : String(date.getDate())}
              </DayBtn>
            </DayWrap>
          </div>
        </div>
      </TopWrap>
    </>
  );
}
const TopWrap = styled.div`
  /* border-top: 1px solid #ddd; */
  width: 100%;
`;

const Wrap = styled.div`
  border-left: none;
`;

const DayWrap = styled.div`
  padding: 0px;
`;

const DayBtn = styled.button`
  background-color: transparent;
  border: none;
`;
