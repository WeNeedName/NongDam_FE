import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAccountListDB } from "../redux/modules/account";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import AccountCalender from "../components/accountbook/AccountCalender";
import AccountWeek from "../components/accountbook/AccountWeek";

const AccountBook = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentAccount_list = useSelector((state) => state.account);
  console.log(currentAccount_list);
  useEffect(() => {
    dispatch(getCurrentAccountListDB());
  }, [dispatch]);

  const openModal = () => {
    if (!showModal) setShowModal(true);
    else setShowModal(false);
  };
  console.log(showModal);

  return (
    <div>
      <Header />
      <Wrap>
        <div>
          <AccountCalender />
          <button
            onClick={() => {
              openModal();
              navigate("/accountwrite");
            }}
          >
            기록하기
          </button>
        </div>
        <AccountWeek />
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;

export default AccountBook;
