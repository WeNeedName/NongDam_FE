import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editPwDB } from "../../redux/modules/users";
import { logOutDB } from "../../redux/modules/users";
import { positionFromAngle } from "@nivo/core";
import { relativeTimeRounding } from "moment";

const MyPageMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.user);
  console.log(userInfo);
  return (
    <Wrap>
      <ContentWrap>
        <ProfileImg
          style={{ backgroundImage: `url(${userInfo?.profileImage})` }}
        />
        <SmallInfo>
          <UserNickname>{userInfo?.nickname}</UserNickname>
          <UserEmail>{userInfo?.email}</UserEmail>
        </SmallInfo>

        <BottomWrap>
          <span
            className="EditInfo"
            onClick={() => {
              navigate("/mypage/editmemberinfo");
            }}
          >
            회원정보 수정
          </span>

          <span
            className="ChangePw"
            onClick={() => {
              navigate("/mypage/editpw");
            }}
          >
            비밀번호 변경
          </span>
          <span
            className="logOut"
            onClick={() => {
              dispatch(logOutDB());
            }}
          >
            로그아웃
          </span>
        </BottomWrap>
      </ContentWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  border: none;
  width: 100%;
  height: auto;
  background-color: #fff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 20px 20px 16px 20px;
  grid-column: 2 /3;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const ContentWrap = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-content: center;
  @media only screen and (max-width: 760px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  background-size: cover;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 70%;
  align-self: center;
  @media only screen and (max-width: 760px) {
    width: 100px;
    height: 100px;
  }
`;

const SmallInfo = styled.div`
  color: #02113b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const UserNickname = styled.span`
  font-size: 18px;
  font-weight: 700;
  height: 25px;
  align-items: center;
  text-align: center;
  font-feature-settings: "tnum" on, "lnum" on;
  margin-top: 10px;
`;
const UserEmail = styled.span`
  font-size: 13px;
  margin: 0;
  align-items: center;
  text-align: center;
  font-feature-settings: "tnum" on, "lnum" on;
`;

const BottomWrap = styled.div`
  margin-top: 50px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #02113b;
  display: flex;
  flex-direction: column;
  line-height: 35px;

  font-feature-settings: "tnum" on, "lnum" on;
  .EditInfo {
    cursor: pointer;
  }
  .ChangePw {
    margin-top: 6px;
    cursor: pointer;
  }
  .myContent {
    cursor: pointer;
  }
  .logOut {
    margin-top: 6px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 760px) {
    margin-top: 30px;
  }
`;

export default MyPageMenu;
