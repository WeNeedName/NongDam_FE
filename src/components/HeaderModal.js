import { Opacity } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutDB } from "../redux/modules/users";
// alert 라이브러리
import Swal from "sweetalert2";

const HeaderModal = ({ isOpen, toggleModal, userInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutConfirm = () => {
    Swal.fire({
      title: "정말 나가시겠어요?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#55A349",
      cancelButtonColor: "#ddd",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logOutDB());
      }
    });
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onEscapeKeydown={toggleModal}
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggleModal}
      style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
    >
      <MenuWrap>
        {/* <Nickname>{userInfo?.nickname}님</Nickname>
            <Email>{userInfo?.email}</Email> */}
        <Menu
          onClick={() => {
            navigate("/mypage");
          }}
        >
          마이페이지
        </Menu>
        <Hr />
        <LogOut
          onClick={() => {
            logOutConfirm();
          }}
        >
          로그아웃
        </LogOut>
      </MenuWrap>
    </StyledModal>
  );
};

const StyledModal = styled(ReactModal)`
  max-width: 200px;
  width: 90%;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  top: 90px;
  right: 10%;
  border: 1px solid #eee;
  z-index: 1000;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 1220px) {
    top: 10%;
    right: 5%;
  }
  @media only screen and (max-width: 760px) {
    top: 90px;
    right: 5%;
  }
`;

const MenuWrap = styled.span`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-size: 16px;
  margin-bottom: 4px;
`;

const Email = styled.span`
  font-size: 12px;
  margin-bottom: 20px;
  color: #bbb;
`;

const Menu = styled.span`
  width: 100%;
  height: auto;
  font-size: 16px;
  margin-bottom: 14px;
  &:hover {
    font-weight: 500;
  }
  /* font-weight: 500; */
  cursor: pointer;
`;

const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  border-bottom: 0.5px solid #ccc;
  margin-left: -20px;
  padding-right: 40px;
`;

const LogOut = styled.span`
  width: 100%;
  height: auto;
  margin-top: 16px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
`;

export default HeaderModal;
