import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentAccountListDB } from "../redux/modules/account";

// 이미지
import Profile from "../images/Profile.png";

// 컴포넌트
import Header from "../components/Header";
import AccountWeek from "../components/accountbook/AccountWeek";
import CalenderBook from "../components/accountbook/CalenderBook";
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
    <Wrap>
      <Header currentPage="accountbook" />
      <BodyWrap>
        <div>
          <CalenderBook />
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
      </BodyWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 70px;
`;

export default AccountBook;
