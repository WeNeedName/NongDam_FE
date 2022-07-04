import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAccountListDB } from "../redux/modules/account";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import AccountWeek from "../components/accountbook/AccountWeek";
import CalenderBook from "../components/accountbook/CalenderBook";
import AccountCalender from "../components/accountbook/AccountCalender";
import AccountWrite from "../components/accountbook/AccountWrite";

const AccountBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentAccountListDB());
  }, [dispatch]);

  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
  }

  return (
    <div>
      <Header />
      <Wrap>
        <div>
          <CalenderBook />
          {/* <AccountCalender /> */}
          <button
            onClick={() => {
              toggleModal();
            }}
          >
            기록하기
          </button>
        </div>
        <AccountWeek />
        {isOpen && <AccountWrite isOpen={isOpen} toggleModal={toggleModal} />}
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
