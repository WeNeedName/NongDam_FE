import React, { useEffect, useState } from "react";
import styled from "styled-components";
// 이미지
import nongdamLogoGrey from "../images/nongdam_logo_grey.png";

const FooterNav = ({ currentPage }) => {
  return (
    <Wrap>
      <InfoWrap>
        <Logo logoImage={nongdamLogoGrey} />
        <RightWrap>
          <LinkWrap>
            <Link
              onClick={() => {
                const openNewWindow = window.open("about:blank");
                openNewWindow.location.href =
                  "https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727";
              }}
            >
              이용약관
            </Link>
            <Div />
            <Link
              onClick={() => {
                const openNewWindow = window.open("about:blank");
                openNewWindow.location.href =
                  "https://dust-sulfur-10c.notion.site/5ffc468037d54d608784aa3184ecdf44";
              }}
            >
              개인정보취급방침
            </Link>
          </LinkWrap>
          <span>Copyright ⓒ 2022 (주)농담 All Rights Reserved.</span>
        </RightWrap>
      </InfoWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 180px;
  background: #fafafa;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  grid-column: 1 / 6;
  grid-row: 10 / 12;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`;

const InfoWrap = styled.div`
  width: 75%;

  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1220px) {
    width: 82.5%;
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Div = styled.div`
  width: 1px;
  height: 5px;
  padding-top: 8px;
  margin: 0px 4px;
  border-right: 1px solid black;
`;

const Link = styled.span`
  font-weight: 600;
  margin-bottom: 4px;
  margin-top: -3px;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 100px;
  height: 30px;
  background-image: url(${(props) => props.logoImage});
  background-position: center 30%;
  background-size: cover;
  opacity: 0.8;
`;

export default FooterNav;
