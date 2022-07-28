import { React, useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Header from "../Header";

import MyPageMenu from "./MyPageMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfoDB } from "../../redux/modules/users";
import { editInfoDB } from "../../redux/modules/users";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import MyCrops from "./MyCrops";
import MyCountryCode from "./MyCountryCode";
import axios from "axios";
import { SubmitBtn, CancelBtn } from "../../elements/Buttons";
import Select from "react-select";
import { LineStyle, LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";
// 이미지
import CancelIcon from "../../images/cancelIcon.png";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

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
  //작물 선택 없을 시, 기존 작물 데이터 전송
  const previousCrops = userInfo?.crops.map((list, idx) => {
    return array.push(list.id);
  });

  const myCropsList = useSelector((state) => state.users.user?.crops); //[{id, name, category, type}]
  const [crops, setCrops] = useState(); //새로 선택한 작물 id값(서버 통신용) [1]
  const [cropsObj, setCropsObj] = useState([]); //새로 선택한 작물 value, label값(작물 버튼 용)[{label: [type]name, value: id }]
  const [allCropList, setAllCropList] = useState([]); // 기존 작물 + 새로 선택한 작물

  // 기존 작물 전체 리스트
  const cropsArray = [];
  const cropTemp = myCropsList?.map((list, idx) => {
    return cropsArray.push({
      label: "[" + list.type + "]" + " " + list.name,
      value: list.id,
    });
  });

  useEffect(() => {
    cropsArray.push(...cropsObj);
    setAllCropList(cropsArray);
  }, [cropsObj]);

  const allCropListFilter =
    allCropList.length !== 0 &&
    allCropList.map((list) => {
      return (list = list.value);
    });

  const deleteSelectedCrops = (id) => {
    if (!allCropList) {
      const newCropSet = cropsArray?.filter((list) => {
        Number(list.value) !== Number(id);
      });
      setAllCropList(newCropSet);
    } else {
      const newCropSet = allCropList?.filter(
        (list) => Number(list.value) !== Number(id)
      );
      setAllCropList(newCropSet);
    }
  };

  const previousProfileImg = userInfo?.profileImage;
  const [nickname, setNickname] = useState("");
  const [countryCode, setCountryCode] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [address, setAddress] = useState("");
  const [ImgSrc, setImgSrc] = useState("");

  const modalCloseRef = useRef();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const onChangeFile = (e) => {
    if (e.target && e.target.files[0]) {
      setImgSrc(e.target.id[0]);
      setProfileImg(e.target.files[0]);
    }
  };
  const previousCountryCodeNumber = Number(previousCountryCode);
  // 작물 다 지우면 [0] 으로 전송
  const sendCrop = allCropListFilter.length > 0 ? allCropListFilter : [0];

  //서버 통신 부분
  const editInfo = async (event) => {
    if (allCropList.length > 7) {
      window.alert("내 작물은 최대 7개까지 선택하실 수 있습니다.");
    } else {
      const data = {
        nickname: nickname === "" ? previousNickname : nickname,
        address: address === "" ? previousAddress : address,
        countryCode:
          countryCode === undefined ? previousCountryCodeNumber : countryCode,
        crops: sendCrop,
      };
      console.log(data);
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      if (profileImg === "") {
        frm.append("profileImage", null);
      } else {
        frm.append("profileImage", profileImg);
      }
      console.log(data);
      await axios({
        method: "put",
        url: `https://idontcare.shop/member`,
        data: frm,
        headers: {
          "Content-Type": "multipart/form-data",
          RefreshToken: `Bearer ${refreshToken}`,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res), dispatch(getInfoDB(res)), navigate("/mypage");
        })
        .catch((err) => {
          window.alert(err.response.data.msg);
        });
    }
  };
  return (
    <Wrap ref={modalCloseRef}>
      {/* <Header />
      <MyPageMenu /> */}
      <Title>기본 정보</Title>
      <ContentWrap>
        <TopWrap>
          <ImgAndNames>
            <UploadImg>
              <div className="preview">
                {profileImg ? (
                  <ProfileImg src={ImgSrc} alt="preview" />
                ) : (
                  <ProfileImg
                    style={{ backgroundImage: `url(${previousProfileImg})` }}
                  />
                )}
              </div>
              <ImageBtn
                type="file"
                id="inputImage"
                onChange={(e) => {
                  {
                    encodeFileToBase64(e.target.files[0]);
                  }
                  {
                    onChangeFile(e);
                  }
                }}
              />
            </UploadImg>
            <Names>
              <EditNicknameWrap
                label="닉네임"
                onChange={(e) => setNickname(e.target.value)}
                defaultValue={previousNickname}
                className="EditNickname"
                placeholder="닉네임을 기입해주세요"
              />
              <span className="userEmail">{userInfo?.email}</span>
            </Names>
          </ImgAndNames>
          <Label htmlFor="inputImage">프로필 변경</Label>
        </TopWrap>
        <Line />

        <AddressWrap>
          <TitleAndAddress>
            <SmallTitle>주소</SmallTitle>
            {address ? (
              <AddressContent>{address}</AddressContent>
            ) : (
              <AddressContent>{userInfo?.address}</AddressContent>
            )}

            {/* {address} */}
          </TitleAndAddress>
          {/* 버튼 클릭 시 팝업 생성 */}
          <AddressBtn
            type="button"
            onClick={() => {
              openPostCode();
            }}
            value={address}
          >
            주소검색
          </AddressBtn>
        </AddressWrap>
        <div id="popupDom">
          {/* 팝업 생성 기준 div */}
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                modalCloseRef={modalCloseRef}
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
                setAddress={setAddress}
              />
            </PopupDom>
          )}
        </div>
        <CropsWrap>
          <TitleAndCrops>
            <SmallTitleCrops> 내 작물</SmallTitleCrops>
            <CropsContent>
              <PrevAndNewCrops>
                {allCropList
                  ? allCropList.map((list, idx) => {
                      const label = list?.label?.split(" ")[1];

                      return (
                        <CropsList key={idx}>
                          {label}
                          <DeleteBtn
                            onClick={(e) => {
                              deleteSelectedCrops(list.value);
                            }}
                          >
                            <Cancel src={CancelIcon} alt="작물 삭제" />
                          </DeleteBtn>
                        </CropsList>
                      );
                    })
                  : cropsArray?.map((list, idx) => {
                      return (
                        <CropsList key={idx}>
                          {list?.label?.split(" ")[1]}
                          <DeleteBtn
                            onClick={(e) => {
                              deleteSelectedCrops(list.value);
                            }}
                          >
                            <Cancel src={CancelIcon} alt="작물 삭제" />
                          </DeleteBtn>
                        </CropsList>
                      );
                    })}
              </PrevAndNewCrops>

              <MyCrops setCrops={setCrops} setCropsObj={setCropsObj} />
            </CropsContent>
          </TitleAndCrops>
        </CropsWrap>
        <AreaWrap>
          <TitleAndArea>
            <SmallTitleArea>시세지역</SmallTitleArea>
            <div>
              {countryCode ? (
                <>
                  <CountryCodeContent>
                    {countryCode === 1101 && "서울(도매)"}
                    {countryCode === 2100 && "부산(도매)"}
                    {countryCode === 2200 && "대구(도매)"}
                    {countryCode === 2300 && "인천(소매)"}
                    {countryCode === 2401 && "광주(도매)"}
                    {countryCode === 2501 && "대전(도매)"}
                    {countryCode === 2601 && "울산(소매)"}
                    {countryCode === 3111 && "수원(소매)"}
                    {countryCode === 3211 && "춘천(소매)"}
                    {countryCode === 3311 && "청주(소매)"}
                    {countryCode === 3511 && "전주(소매)"}
                    {countryCode === 3711 && "포항(소매)"}
                    {countryCode === 3911 && "제주(소매)"}
                    {countryCode === 3113 && "의정부(소매)"}
                    {countryCode === 3613 && "순천(소매)"}
                    {countryCode === 3714 && "안동(소매)"}
                    {countryCode === 3814 && "창원(소매)"}
                  </CountryCodeContent>
                </>
              ) : (
                <CountryCodeContent>
                  {userInfo?.countryCode === 1101 && "서울(도매)"}
                  {userInfo?.countryCode === 2100 && "부산(도매)"}
                  {userInfo?.countryCode === 2200 && "대구(도매)"}
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
                </CountryCodeContent>
              )}
              <MyCountryCode
                setCountryCode={setCountryCode}
                previousCountryCode={previousCountryCode}
              />
            </div>
          </TitleAndArea>
        </AreaWrap>

        <BtnWrap>
          <SubmitBtn
            type="submit"
            onClick={() => {
              editInfo();
            }}
          >
            수정완료
          </SubmitBtn>
          <CancelBtn
            onClick={() => {
              navigate("/mypage");
            }}
          >
            취소
          </CancelBtn>
        </BtnWrap>
      </ContentWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  width: 92%;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: #ffffff;
  padding: 40px 40px 40px 40px;
  grid-column: 3 / 6;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    margin-bottom: 30px;
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
`;

const ContentWrap = styled.div``;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ProfileImg = styled.img`
  width: 111px;
  height: 111px;
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
  width: auto;
  display: flex;
  flex-direction: column;
  text-align: start;
  justify-content: center;

  .userEmail {
    margin-left: 20px;
    font-size: 11px;
  }
`;

const EditNicknameWrap = styled.input`
  max-width: 200px;
  width: 50%;
  margin-left: 17px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 6px;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
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

const Cancel = styled.img`
  width: 10px;
  height: 10px;
  margin-top: 2px;
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
  min-width: 30px;
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
const AddressContent = styled.button`
  max-width: 420px;
  margin-left: 85px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #02113b;
  overflow-wrap: break-word;
  text-align: left;
`;
const AddressBtn = styled.button`
  font-size: 11px;
  padding: 4px 10px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  background-color: transparent;

  margin-right: 170px;
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
const PrevAndNewCrops = styled.div`
  margin-left: 80px;
  width: 300px;
  text-align: start;
`;

const CropsList = styled.div`
  width: auto;
  height: auto;
  display: inline-block;
  flex-wrap: wrap;
  border: 1px solid #bfbfbf;
  padding: 5px 9px;
  background-color: white;
  color: #616161;
  font-size: 5px;

  border-radius: 10px;
  margin-right: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
  cursor: default;
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;

  color: #ccc;
  & hover {
    opacity: 0.7;
  }
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
const Selec = styled.select`
  color: #616161;
  width: 200px;
  background-color: white;
  height: 37px;
  border-radius: 5px;
  border: 1px solid #d8d8d8;
  padding-left: 10px;
  margin-left: 72px;
  text-align: left;
  font-size: 11px;
`;

const AreaWrap = styled.div`
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 27px;
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const CountryCodeContent = styled.div`
  max-width: 420px;
  margin-left: 70px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #02113b;
  overflow-wrap: break-word;
  text-align: left;
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
const AreaBtn = styled.button`
  align-items: center;
  font-size: 11px;
  padding: 5px 15px;
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

const BtnWrap = styled.div`
  margin-top: 20px;
`;

// const SubmitBtn = styled.button`
//   margin-top: 20px;
//   font-size: 11px;
//   color: white;
//   background-color: #22631c;
//   border: none;
//   padding: 4px 10px;
//   border-radius: 8px;
//   margin-left: 18px;
//   cursor: pointer;
//   &:hover {
//     opacity: 0.8;
//   }
// `;

const Button = styled.button``;
const Text = styled.p``;

export default EditMemberInfo;
