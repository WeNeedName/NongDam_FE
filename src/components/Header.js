import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDB } from "../redux/modules/users";
import { getInfoDB } from "../redux/modules/users";
import HeaderModal from "./HeaderModal";
// 이미지
import nongdamLogo from "../images/nongdam_logo.png";

const Haeder = ({ currentPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.user);

  const isLogin = sessionStorage.getItem("jwtToken");
  const [headerNav, setHeaderNav] = useState(currentPage);

  // 모달 열기
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  function toggleModal() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Wrap>
        <Nav>
          <NavLeft>
            <Logo
              onClick={() => {
                navigate("/");
                setHeaderNav(headerNav);
              }}
              src={nongdamLogo}
              alt="농담 로고"
            />
            {isLogin ? (
              <>
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
                    id="workLog"
                    onClick={() => {
                      navigate("/worklog");
                    }}
                    currentPage={headerNav}
                  >
                    농장일지
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
                </CategoryWrap>
              </>
            ) : null}
          </NavLeft>
          <ProfileWrap>
            {isLogin && (
              <UserProfile
                profileImage={userInfo?.profileImage}
                onClick={() => {
                  toggleModal();
                }}
              />
            )}
          </ProfileWrap>
        </Nav>
        {isOpen && (
          <HeaderModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            userInfo={userInfo}
          />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr repeat(3, 25.5%) 1fr;
  /* grid-column: 1 / 6;
  grid-row: 1 / 2; */
  position: fixed;
  top: 0;
  left: 0;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 28%) 1fr;
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

const Logo = styled.img`
  width: 90px;
  margin-right: 40px;
  cursor: pointer;
  @media only screen and (max-width: 760px) {
    width: 70px;
    height: auto;
  }
`;

const Menu = styled.span`
  margin-right: 30px;
  font-size: 12px;
`;

const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  cursor: pointer;
  background-image: url(${(props) => props.profileImage});
  /* background-image: url(https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/164422528068537909.jpeg?gif=1&w=1080); */
  background-position: center 30%;
  background-size: cover;
  @media only screen and (max-width: 760px) {
    width: 40px;
    height: 40px;
  }
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
  margin-right: 60px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.currentPage === props.id ? "#333" : " #666")};
  font-weight: ${(props) => (props.currentPage === props.id ? 600 : 400)};
  &:hover {
    font-weight: 600;
    color: #333;
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

export default Haeder;
