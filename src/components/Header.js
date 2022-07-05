import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDB } from "../redux/modules/users";

// 이미지
import Profile from "../images/Profile.png";

const Haeder = ({ currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = sessionStorage.getItem("jwtToken");
  const [headerNav, setHeaderNav] = useState(currentPage);

  const changeHeaderRadio = (e) => {
    if (e.target.checked) {
      setHeaderNav(e.target.id);
    }
  };

  console.log(typeof headerNav);

  return (
    <Wrap>
      <Nav>
        <NavLeft>
          <Logo
            onClick={() => {
              navigate("/");
              setHeaderNav(headerNav);
            }}
          >
            Nongsa
          </Logo>

          <CategoryWrap>
            <Label>
              <FormCheckLeft
                type="radio"
                id="home"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  navigate("/");
                }}
              >
                홈
              </FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="analysis"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  navigate("/analysis");
                  setHeaderNav(headerNav);
                }}
              >
                농장 관리 현황
              </FormCheckText>
            </Label>

            <Label>
              <FormCheckLeft
                type="radio"
                id="marketPrice"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  navigate("/marketprice");
                  setHeaderNav(headerNav);
                }}
              >
                시세
              </FormCheckText>
            </Label>

            <Label>
              <FormCheckLeft
                type="radio"
                id="schedule"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  navigate("/schedule");
                  setHeaderNav(headerNav);
                }}
              >
                일정
              </FormCheckText>
            </Label>

            <Label>
              <FormCheckLeft
                type="radio"
                id="marketPrice"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  navigate("/accountbook");
                  setHeaderNav(headerNav);
                }}
              >
                장부
              </FormCheckText>
            </Label>

            <Label>
              <FormCheckLeft
                type="radio"
                id="marketPrice"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  // navigate("/accountbook");
                }}
              >
                영농일지
              </FormCheckText>
            </Label>

            {/* <Label>
              <FormCheckLeft
                type="radio"
                id="marketPrice"
                name="HeaderButton"
                onChange={changeHeaderRadio}
                value={headerNav}
              />
              <FormCheckText
                onClick={() => {
                  // navigate("/accountbook");
                }}
              >
                커뮤니티
              </FormCheckText>
            </Label> */}
          </CategoryWrap>
        </NavLeft>

        <ProfileWrap>
          {isLogin ? (
            <Menu
              onClick={() => {
                dispatch(logOutDB());
              }}
            >
              로그아웃
            </Menu>
          ) : (
            <Menu
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Menu>
          )}

          <UserProfile
            src={Profile}
            alt="프로필사진"
            onClick={() => {
              navigate("/mypage");
            }}
          />
        </ProfileWrap>
      </Nav>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.08);
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 25% 25% 25% 1fr;
  grid-column: 1 / 6;
  grid-row: 1 / 2;
  @media only screen and (max-width: 760px) {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
`;

const Nav = styled.div`
  /* max-width: 1350px; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: 2 / 5;
  grid-row: 1 / 2;
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.span`
  font-family: "SF Pro Rounded";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  color: #318f27;
  margin-right: 30px;
  cursor: pointer;
  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

const Menu = styled.span`
  margin-right: 30px;
`;

const UserProfile = styled.img`
  width: 40px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  margin-right: 30px;
  cursor: pointer;
  color: black;
  font-size: 14px;
  color: #666666;
  &:hover {
    font-weight: 500;
    color: #333333;
  }
  @media only screen and (max-width: 700px) {
    margin-right: 16px;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
  }
  &:checked + ${FormCheckText} {
    font-weight: 500;
    color: #333333;
  }
  display: none;
`;

const Label = styled.label``;

export default Haeder;
