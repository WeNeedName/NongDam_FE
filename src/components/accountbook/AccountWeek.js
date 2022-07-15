import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountDB, getAccountListDB } from "../../redux/modules/account";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerButton } from "react-shimmer-effects";

// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";
// 컴포넌트
import AccountModal from "./AccountModal";

const AccountWeek = () => {
  const dispatch = useDispatch();

  const [checkedInputs, setCheckedInputs] = useState("전체");
  const [render, setRender] = useState(false);
  const [accountId, setAccountId] = useState(null);
  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
    setAccountId(id);
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

  const currentAccount_list = useSelector(
    (state) => state.account.currentAccount
  );

  const is_loaded = useSelector((state) => state.account.is_loaded);

  // 항목(전체, 수입, 지출) 필터링
  const filteredCategory =
    currentAccount_list !== undefined &&
    currentAccount_list.filter((v) => v.category === checkedInputs);

  return (
    <Wrap>
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
      {is_loaded ? (
        <>
          {/* <Gradient scrollPosition={scrollPosition} /> */}
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
              currentAccount_list={currentAccount_list}
            />
          )}
        </>
      ) : (
        <AccountBoxWrap>
          <AccountBox>
            <BoxTopWrapB>
              <BoxTopWrap>
                <ShimmerThumbnail
                  className="thumNail-date"
                  width={10 + "%"}
                  height={16}
                  rounded
                />
              </BoxTopWrap>
            </BoxTopWrapB>

            <PriceNum>
              <ShimmerButton size="sm" />
            </PriceNum>
            <BottomWrap>
              <ShimmerThumbnail
                className="thumNail-price"
                height={20}
                rounded
              />
            </BottomWrap>
          </AccountBox>
          <AccountBox>
            <BoxTopWrapB>
              <BoxTopWrap>
                <ShimmerThumbnail
                  className="thumNail-date"
                  width={10 + "%"}
                  height={16}
                  rounded
                />
              </BoxTopWrap>
            </BoxTopWrapB>

            <PriceNum>
              <ShimmerButton size="sm" />
            </PriceNum>
            <BottomWrap>
              <ShimmerThumbnail
                className="thumNail-price"
                height={20}
                rounded
              />
            </BottomWrap>
          </AccountBox>
        </AccountBoxWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
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
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #bfbfbf;
  border-radius: 100px;
  width: auto;
  height: 16px;
  margin-right: 6px;
  margin-bottom: 10px;
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
// scrollPosition
const Gradient = styled.div`
  width: 100%;
  height: 530px;
  background: linear-gradient(to top, transparent, #f5f5f5 70%);
  z-index: 100;
  background-color: red;
`;
const AccountBoxWrap = styled.div`
  width: 100%;
  padding-right: 70px;
  height: 530px;
  /* border-top: 30px solid linear-gradient(to top, transparent, red 70%); */
  /* background-color: red; */
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AccountBox = styled.div`
  width: 90%;
  height: auto;
  padding: 10px 10px 10px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  margin: 10px 0px;
  position: relative;
  /* cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  } */
`;

const Day = styled.span`
  font-size: 14px;
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

  /* position: absolute;
  top: 17px;
  left: 86px; */
`;

const PriceNum = styled.span`
  font-size: 18px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
`;

const WhereTo = styled.span`
  font-size: 10px;
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
  border: 1px solid #616161;
  border-radius: 100px;
  font-size: 8px;
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
