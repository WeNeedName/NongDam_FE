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
import axios from "axios";
import { SubmitBtn, CancelBtn } from "../../elements/Buttons";
import Select from "react-select";

const EditMemberInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const fileInput = useRef();
  const userInfo = useSelector((state) => state.users.user);
  console.log(userInfo);

  const previousNickname = userInfo?.nickname;
  const previousAddress = userInfo?.address;
  const previousCountryCode = userInfo?.countryCode;
  const array = [];
  const previousCrops = userInfo?.crops.map((list) => {
    return array.push(list.id);
  });

  const previousProfileImg = userInfo?.profileImage;
  console.log(previousProfileImg);
  const [nickname, setNickname] = useState("");
  const [crops, setCrops] = useState();
  const [countryCode, setCountryCode] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [address, setAddress] = useState("");
  const [disable, setDisable] = useState(true);
  const [ImgSrc, setImgSrc] = useState("");

  const modalCloseRef = useRef();

  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // console.log(nickname, crops, countryCode, profileImg, address);

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  console.log(address);

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
    //console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setImgSrc(e.target.id[0]);
      setProfileImg(e.target.files[0]);
    }
  };

  const editInfo = async (event) => {
    const data = {
      nickname: nickname === "" ? previousNickname : nickname,
      address: address === "" ? previousAddress : address,
      countryCode: countryCode === 0 ? previousCountryCode : countryCode,
      crops: crops.length === 0 ? array : crops,
    };
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
      url: "https://idontcare.shop/member",
      data: frm,
      headers: {
        "Content-Type": "multipart/form-data",
        RefreshToken: `Bearer ${refreshToken}`,
        Authorization: `Bearer ${token}`,
      },
    }).then(navigate("/mypage"));
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
              <Label htmlFor="inputImage">이미지 업로드</Label>
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
              <PreviousMyCrops>
                {userInfo?.crops.map((list) => {
                  return (
                    <PreviousCropsList>
                      {"[" + list.type + "]" + " " + list.name}
                    </PreviousCropsList>
                  );
                })}
              </PreviousMyCrops>
              <MyCrops setCrops={setCrops} previousCrops={previousCrops} />
            </CropsContent>
          </TitleAndCrops>
        </CropsWrap>
        <AreaWrap>
          <TitleAndArea>
            <SmallTitleArea>시세지역</SmallTitleArea>

            <Selec onChange={(e) => setCountryCode(e.target.value)}>
              {userInfo?.countryCode ? (
                <option value="">
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
                </option>
              ) : (
                <option value="">"선택해주세요"</option>
              )}

              <option value="1101">서울(도매)</option>
              <option value="2101">부산(도매)</option>
              <option value="2201">대구(도매)</option>
              <option value="2300">인천(소매)</option>
              <option value="2401">광주(도매)</option>
              <option value="2501">대전(도매)</option>
              <option value="2601">울산(소매)</option>
              <option value="3111">수원(소매)</option>
              <option value="3211">춘천(소매)</option>
              <option value="3311">청주(소매)</option>
              <option value="3511">전주(소매)</option>
              <option value="3711">포항(소매)</option>
              <option value="3911">제주(소매)</option>
              <option value="3113">의정부(소매)</option>
              <option value="3613">순천(소매)</option>
              <option value="3714">안동(소매)</option>
              <option value="3814">창원(소매)</option>
              <option value="3145">용인(소매)</option>
            </Selec>
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
          <CancelBtn> 취소 </CancelBtn>
        </BtnWrap>
      </ContentWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: #ffffff;
  padding: 40px 40px 40px 40px;
  grid-column: 3 / 5;
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
  margin-left: 80px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  color: #02113b;
  overflow-wrap: break-word;
  text-align: left;
`;
const AddressBtn = styled.button`
  font-size: 11px;
  width: 65px;
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
const PreviousMyCrops = styled.div`
  margin-left: 80px;
  width: 300px;
  text-align: start;
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

const BtnWrap = styled.div``;

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
