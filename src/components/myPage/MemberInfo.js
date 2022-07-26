import { React, useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfoDB } from "../../redux/modules/users";
import { editInfoDB } from "../../redux/modules/users";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import MyCrops from "./MyCrops";
import axios from "axios";
import { SubmitBtn, CancelBtn } from "../../elements/Buttons";

const EditMemberInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInput = useRef();
  const userInfo = useSelector((state) => state.users.user);

  const previousNickname = userInfo?.nickname;
  const previousAddress = userInfo?.address;
  const previousCountryCode = userInfo?.countryCode;
  const array = [];
  const previousCrops = userInfo?.crops.map((list) => {
    return array.push(list.id);
  });

  const previousProfileImg = userInfo?.profileImage;
  const [nickname, setNickname] = useState("");
  const [crops, setCrops] = useState();
  const [countryCode, setCountryCode] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [address, setAddress] = useState("");
  const [disable, setDisable] = useState(true);
  const [ImgSrc, setImgSrc] = useState("");
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  return (
    <Wrap>
      <Title>기본 정보</Title>
      <ContentWrap>
        <TopWrap>
          <ImgAndNames>
            <UploadImg>
              <ProfileImg
                style={{ backgroundImage: `url(${previousProfileImg})` }}
              />
            </UploadImg>
            <Names>
              <EditNicknameWrap>{previousNickname}</EditNicknameWrap>
              <span className="userEmail">{userInfo?.email}</span>
            </Names>
          </ImgAndNames>
        </TopWrap>
        <Line />

        <AddressWrap>
          <TitleAndAddress>
            <SmallTitle>주소</SmallTitle>
            <PrevAddress>{userInfo?.address}</PrevAddress>
          </TitleAndAddress>
        </AddressWrap>

        <CropsWrap>
          <TitleAndCrops>
            <SmallTitleCrops> 내 작물</SmallTitleCrops>
            <CropsContent>
              <PreviousMyCrops>
                {userInfo?.crops.length !== 0 ? (
                  <>
                    {userInfo?.crops.map((list) => {
                      return (
                        <PreviousCropsList>
                          {"[" + list.type + "]" + " " + list.name}
                        </PreviousCropsList>
                      );
                    })}
                  </>
                ) : (
                  <span className="noCropTitle">
                    내 작물을 아직 선택하지 않았어요
                  </span>
                )}
              </PreviousMyCrops>
            </CropsContent>
          </TitleAndCrops>
        </CropsWrap>
        <AreaWrap>
          <TitleAndArea>
            <SmallTitleArea>시세지역</SmallTitleArea>

            <Area>
              {userInfo?.countryCode ? (
                <>
                  {userInfo?.countryCode === 1101 && "서울(도매)"}
                  {userInfo?.countryCode === 2101 && "부산(도매)"}
                  {userInfo?.countryCode === 2201 && "대구(도매)"}
                  {userInfo?.countryCode === 2300 && "인천(소매)"}
                  {userInfo?.countryCode === 2401 && "광주(도매)"}
                  {userInfo?.countryCode === 2501 && "대전(도매)"}
                  {userInfo?.countryCode === 2601 && "울산(소매)"}
                  {userInfo?.countryCode === 3111 && "수원(소매)"}
                  {userInfo?.countryCode === 3211 && "춘천(소매)"}
                  {userInfo?.countryCode === 3311 && "청주(소매)"}
                  {userInfo?.countryCode === 3511 && "전주(소매)"}
                  {userInfo?.countryCode === 3711 && "포항(소매)"}
                  {userInfo?.countryCode === 3911 && "제주(소매)"}
                  {userInfo?.countryCode === 3113 && "의정부(소매)"}
                  {userInfo?.countryCode === 3613 && "순천(소매)"}
                  {userInfo?.countryCode === 3714 && "안동(소매)"}
                  {userInfo?.countryCode === 3814 && "창원(소매)"}
                  {userInfo?.countryCode === 3145 && "용인(소매)"}
                </>
              ) : (
                <option value="">지역을 아직 선택하지 않았어요</option>
              )}
            </Area>
          </TitleAndArea>
        </AreaWrap>
      </ContentWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  width: 100%;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: #ffffff;
  padding: 40px 40px 40px 40px;
  grid-column: 3 / 5;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    margin-bottom: 30px;
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ContentWrap = styled.div``;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ProfileImg = styled.img`
  width: 110px;
  height: 110px;
  display: flex;
  flex-direction: column;
  background-size: cover;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 70%;
  margin-left: 20px;
`;

const ImgAndNames = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UploadImg = styled.div`
  display: flex;
  flex-direction: column;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;

  .userEmail {
    margin-left: 20px;
    font-size: 11px;
  }
`;

const EditNicknameWrap = styled.span`
  width: 70px;
  margin-left: 17px;
  font-size: 18px;
  font-weight: 700;
  border: none;
`;

const EditBtn = styled.button`
  font-size: 11px;
  margin: 10px;
  padding: 5px 15px;
  border: 1px solid #a4a4a4;
  border-radius: 3px;
  margin-right: 30px;
  background-color: transparent;
  cursor: pointer;
  color: #a4a4a4;
  &:hover {
    border: 1.5px solid #a4a4a4;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
    color: #a4a4a4;
  }
`;

const ImageBtn = styled.input`
  display: none;
`;

const Label = styled.label`
  margin-top: 20px;
  margin-left: 30px;
  width: 70px;
  font-size: 11px;
  color: #616161;
  background-color: transparent;
  border: 1px solid #bfbfbf;
  padding: 4px 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Line = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 95%;
  border: solid 0.5px #d8d8d8;
`;

const SmallTitle = styled.span`
  font-size: 14px;
  color: #02113b;
  font-weight: 700;
`;

const BottomWrap = styled.div``;

const AddressWrap = styled.div`
  margin-left: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleAndAddress = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

const PrevAddress = styled.button`
  margin-left: 100px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #02113b;
`;

const EditAddressBtn = styled.button`
  font-size: 11px;
  padding: 4px 10px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  color: #616161;
  &:hover {
    opacity: 0.7;
  }
`;

const CropsWrap = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const TitleAndCrops = styled.div`
  display: flex;
  align-items: center;
`;

const SmallTitleCrops = styled.span`
  font-size: 14px;
  color: #02113b;
  font-weight: 700;
  line-height: 40px;
`;

const PreviousMyCrops = styled.div`
  text-align: start;
  margin-left: 88px;
  width: auto;

  .noCropTitle {
    font-size: 14px;
  }
`;

const PreviousCropsList = styled.div`
  width: auto;
  height: auto;
  display: inline-block;
  flex-wrap: wrap;
  border: 1px solid #bfbfbf;
  padding: 4px 8px;
  color: #616161;
  font-size: 5px;
  border-radius: 10px;
  margin-right: 5px;
  flex-wrap: wrap;
`;

const CropsContent = styled.div``;

const EditCropsBtn = styled.button`
  font-size: 11px;
  border: 1px solid #a4a4a4;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  color: #a4a4a4;
  &:hover {
    border: 1.5px solid #a4a4a4;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
    color: #a4a4a4;
  }
`;

const AreaWrap = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleAndArea = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const SmallTitleArea = styled.div`
  font-size: 14px;
  color: #02113b;
  font-weight: 700;
  line-height: 40px;
`;

const Area = styled.div`
  font-size: 14px;
  margin-left: 78px;
`;

const BtnWrap = styled.div``;

const Button = styled.button``;
const Text = styled.p``;

export default EditMemberInfo;
