import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountDB, getAccountListDB } from "../../redux/modules/account";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerButton } from "react-shimmer-effects";

// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";
// 컴포넌트
import AccountModal from "./AccountModal";
import AccountListModal from "./AccountListModal";

const AccountWeek = ({ currentAccount_list, accountList, yearMonth }) => {
  const dispatch = useDispatch();

  const [checkedInputs, setCheckedInputs] = useState("전체");
  const [render, setRender] = useState(false);
  const [accountId, setAccountId] = useState(null);
  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);
  // 장부 전체내역 모달 열기
  const [isOpenList, setOpenList] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
    setAccountId(id);
  }

  function MonthListToggleModal() {
    setOpenList(!isOpenList);
  }

  // 최근내역 영역 스크롤 감지
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  // 최근내역 필터항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  const is_loaded = useSelector((state) => state.account.is_loaded);

  console.log(yearMonth.year + "-" + yearMonth.month);
  console.log(accountList);

  // 항목(전체, 수입, 지출) 필터링
  const filteredCategory =
    currentAccount_list !== undefined &&
    currentAccount_list.filter((v) => v.category === checkedInputs);

  // 월 전체내역 수입 총합
  const filterMonth =
    accountList &&
    accountList.filter(
      (v) =>
        (v =
          moment(v.date).format("YYYY-MM") ===
          yearMonth?.year + "-" + yearMonth?.month)
    );
  const filteredIncome =
    filterMonth && filterMonth.filter((v) => v.category === "수입");
  const filteredIncomePrice =
    filteredIncome &&
    filteredIncome.map((v) => {
      return v.price;
    });
  const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 월 전체내역 지출 총합
  const filtereExpense =
    filterMonth && filterMonth.filter((v) => v.category === "지출");
  const filteredExpensePrice =
    filtereExpense &&
    filtereExpense.map((v) => {
      return v.price;
    });

  const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const month = moment(yearMonth.year + "-" + yearMonth.month).format("M");

  return (
    <Wrap>
      <MonthAccountBox>
        <TopWrap>
          <Title>{month}월 결산</Title>
          <ShowMoreBtn
            onClick={() => {
              MonthListToggleModal();
            }}
          >
            더보기
          </ShowMoreBtn>
        </TopWrap>
        <BodyWrap>
          <CategoryA>수입</CategoryA>
          <PriceNum>
            {"+" +
              String(IncomeSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "원"}
          </PriceNum>
        </BodyWrap>
        <BodyWrap>
          <CategoryB>지출</CategoryB>
          <PriceNum>
            {"-" +
              String(ExpenseSum).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") +
              "원"}
          </PriceNum>
        </BodyWrap>
      </MonthAccountBox>
      <Title>최근 내역</Title>
      <CategoryWrap>
        <Label>
          <FormCheckLeft
            type="radio"
            id="전체"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
            defaultChecked
          />
          <FormCheckText>전체</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="수입"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>수입</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="지출"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>지출</FormCheckText>
        </Label>
      </CategoryWrap>
      <>
        <AccountBoxWrap scrollPosition={scrollPosition}>
          {currentAccount_list !== undefined && checkedInputs === "전체"
            ? currentAccount_list.map((list, accountId) => {
                return (
                  <AccountBox key={list.id}>
                    <BoxTopWrapB>
                      <BoxTopWrap>
                        <Day>{moment(list.date).format("M월 D일")}</Day>

                        <Category category={list.category}>
                          {list.category === "수입" ? "수입" : "지출"}
                        </Category>
                      </BoxTopWrap>
                      <DotWrap
                        onClick={() => {
                          toggleModal(list.id);
                        }}
                      >
                        <Dot />
                        <Dot />
                        <Dot />
                      </DotWrap>
                    </BoxTopWrapB>

                    <PriceNum>
                      {list.category === "수입"
                        ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                          "+" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"
                        : "-" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"}
                    </PriceNum>
                    <WhereTo>사용처</WhereTo>
                    <BottomWrap>
                      <WhereToUseType>
                        {list.type === 0 && "농산물 판매"}
                        {list.type === 1 && "정부보조금"}
                        {list.type === 2 && "기타수입"}
                        {list.type === 3 && "비료"}
                        {list.type === 4 && "종자/종묘"}
                        {list.type === 5 && "농약"}
                        {list.type === 6 && "농기계"}
                        {list.type === 7 && "기타 농자재"}
                        {list.type === 8 && "유통비 및 판매 경비"}
                        {list.type === 9 && "고용노동비"}
                        {list.type === 10 && "임차료"}
                        {list.type === 11 && "수도광열비"}
                        {list.type === 12 && "기타 지출"}
                      </WhereToUseType>
                    </BottomWrap>
                  </AccountBox>
                );
              })
            : currentAccount_list !== undefined &&
              filteredCategory.map((list, id) => {
                return (
                  <AccountBox
                    key={list.id}
                    onClick={() => {
                      toggleModal(list.id);
                    }}
                  >
                    <BoxTopWrapB>
                      <BoxTopWrap>
                        <Day>{moment(list.date).format("M월 D일")}</Day>

                        <Category category={list.category}>
                          {list.category === "수입" ? "수입" : "지출"}
                        </Category>
                      </BoxTopWrap>
                      <DotWrap
                        onClick={() => {
                          toggleModal(list.id);
                        }}
                      >
                        <Dot />
                        <Dot />
                        <Dot />
                      </DotWrap>
                    </BoxTopWrapB>

                    <PriceNum>
                      {list.category === "수입"
                        ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                          "+" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"
                        : "-" +
                          String(list.price).replace(
                            /(\d)(?=(?:\d{3})+(?!\d))/g,
                            "$1,"
                          ) +
                          "원"}
                    </PriceNum>
                    <WhereTo>사용처</WhereTo>
                    <BottomWrap>
                      <WhereToUseType>
                        {list.type === 0 && "농산물 판매"}
                        {list.type === 1 && "정부보조금"}
                        {list.type === 2 && "기타수입"}
                        {list.type === 3 && "비료"}
                        {list.type === 4 && "종자/종묘"}
                        {list.type === 5 && "농약"}
                        {list.type === 6 && "농기계"}
                        {list.type === 7 && "기타 농자재"}
                        {list.type === 8 && "유통비 및 판매 경비"}
                        {list.type === 9 && "고용노동비"}
                        {list.type === 10 && "임차료"}
                        {list.type === 11 && "수도광열비"}
                        {list.type === 12 && "기타 지출"}
                      </WhereToUseType>
                    </BottomWrap>
                  </AccountBox>
                );
              })}
        </AccountBoxWrap>

        {isOpen && (
          <AccountModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            accountId={accountId}
            accountList={currentAccount_list}
          />
        )}

        {isOpenList && (
          <AccountListModal
            accountList={accountList}
            isOpenList={isOpenList}
            MonthListToggleModal={MonthListToggleModal}
            month={month}
            ExpenseSum={ExpenseSum}
            IncomeSum={IncomeSum}
          />
        )}
      </>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 30px;
  @media only screen and (max-width: 760px) {
    padding: 30px 0px;
  }
`;

const MonthAccountBox = styled.div`
  max-width: 300px;
  width: 90%;
  margin-bottom: 20px;
  margin-top: -28px;
  height: auto;
  padding: 10px 10px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  position: relative;
  @media only screen and (max-width: 760px) {
    max-width: 760px;
    width: 95%;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
  @media only screen and (max-width: 760px) {
    margin: 8px 0px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ShowMoreBtn = styled.div`
  font-size: 11px;
  color: #8e8f93;
  cursor: pointer;
  margin: 4px 8px;
  @media only screen and (max-width: 760px) {
    font-size: 13px;
  }
`;

const CategoryA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: #d7edf9;
  border-radius: 100px;
  font-size: 8px;
  color: #39a4e0;
  @media only screen and (max-width: 760px) {
    font-size: 12px;
  }
`;

const CategoryB = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: #facccc;
  border-radius: 100px;
  font-size: 8px;
  color: #ec4646;
  @media only screen and (max-width: 760px) {
    font-size: 12px;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FormCheckText = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 12px 6px 12px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  width: auto;
  height: 16px;
  margin-right: 12px;
  margin-bottom: 14px;
  font-size: 13px;
  cursor: pointer;
  color: black;
  &:hover {
    font-weight: 700;
    border: 1px solid #02113b;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    font-weight: 700;
    border: 1px solid #02113b;
  }
  display: none;
`;

const Label = styled.label``;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5%);
 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AccountBoxWrap = styled.div`
  width: 100%;
  padding-right: 70px;
  padding-left: 2px;
  height: 454px;
  padding-bottom: 10px;
  overflow: auto;
  animation: ${boxFade} 1s;
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 760px) {
    margin-bottom: 60px;
  }
`;

const AccountBox = styled.div`
  max-width: 300px;
  width: 90%;
  height: auto;
  padding: 10px 10px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin: 0px 0px 10px 0px;
  position: relative;
  @media only screen and (max-width: 760px) {
    max-width: 760px;
    width: 95%;
  }
`;

const Day = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const BoxTopWrap = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Category = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  margin-left: 10px;
  background: ${(props) => (props.category === "수입" ? "#d7edf9" : "#FACCCC")};
  border-radius: 100px;
  font-size: 8px;
  color: ${(props) => (props.category === "수입" ? "#39a4e0" : "#EC4646")};
`;

const PriceNum = styled.span`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
`;

const WhereTo = styled.span`
  font-size: 12px;
  color: #02113b;
  margin: 8px 0px;
`;

const WhereToUseType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  font-size: 12px;
  margin-bottom: 4px;
  color: #616161;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 6px;
`;

const BoxTopWrapB = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const DotWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px;
`;

const Dot = styled.div`
  width: 2.4px;
  height: 2.4px;
  background-color: black;
  border-radius: 100px;
  margin-bottom: 2px;
`;

export default AccountWeek;
