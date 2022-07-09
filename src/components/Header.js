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

  console.log(headerNav);

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
            <FormCheckText
              id="main"
              onClick={() => {
                navigate("/");
              }}
              currentPage={headerNav}
            >
              홈
            </FormCheckText>

            <FormCheckText
              id="analysis"
              onClick={() => {
                navigate("/analysis");
                setHeaderNav(headerNav);
              }}
              currentPage={headerNav}
            >
              농장 관리 현황
            </FormCheckText>

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

            <FormCheckText
              id="workTime"
              onClick={() => {
                navigate("/writeworklog");
              }}
              currentPage={headerNav}
            >
              영농일지
            </FormCheckText>
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
  width: 100vw;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.08);
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr repeat(3, 24%) 1fr;
  /* grid-column: 1 / 6;
  grid-row: 1 / 2; */
  position: fixed;
  top: 0;
  left: 0;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 27%) 1fr;
  }
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
  @media only screen and (max-width: 760px) {
    font-size: 26px;
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
  font-size: 14px;
  color: ${(props) => (props.currentPage === props.id ? " #333333" : " #666")};
  font-weight: ${(props) => (props.currentPage === props.id ? 500 : 400)};
  &:hover {
    font-weight: 500;
    color: #333333;
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

export default Haeder;
