import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FooterNav = () => {
  return (
    <Wrap>
      <span>하단 푸터</span>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 80px;
  background: #ffffff;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.08);
  z-index: 100;

  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: block;
  border-top: 0.5px solid #ddd;

  grid-column: 1 / 6;
  grid-row: 10 / 12;
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

export default FooterNav;
