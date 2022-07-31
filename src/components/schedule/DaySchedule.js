import React from "react";
import styled from "styled-components";

export default function Day(props) {
  const { date } = props;

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
                <DayLabel>
                  {String(date.getDate()).length === 1
                    ? "0" + String(date.getDate())
                    : String(date.getDate())}
                </DayLabel>
              </DayBtn>
            </DayWrap>
          </div>
        </div>
      </TopWrap>
    </>
  );
}
const TopWrap = styled.div`
  width: 100%;
  margin-top: 4px;
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

const DayLabel = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #22641c;
`;
