import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfoDB } from "../redux/modules/users";
import { editInfoDB } from "../redux/modules/users";
import PopupDom from "../components/myPage/PopupDom";
import PopupPostCode from "../components/myPage/PopupPostCode";

const EditMemberInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [crops, setCrops] = useState("");

  // const [address, setAddress]=useState("")
  const [countryCode, setCountryCode] = useState();
  const [profileImgUrl, setProfileImgUrl] = useState("");
  // const [preview, setPreview] = React.useState(user?.profileImgUrl);
  const [disable, setDisable] = useState(true);

  const user = useSelector((state) => state.users?.user);
  //console.log(user)
  const previousNickname = user?.nickname;
  const previousName = user?.profileMsg;
  const previousCountryCode = user?.countryCode;
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };
  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };
  //데이터 가져오기 도전
  const [address, setAddress] = useState("");

  console.log(nickname, address, countryCode);
  const editInfo = () => {
    const newUserInfo = {
      nickname: nickname,
      address: address,
      countryCode: countryCode,
      crops: [],
      profileImage: profileImgUrl,
    };
    dispatch(editInfoDB(newUserInfo));
  };

  return (
    <div>
      <Header />
      <div>
        <h1>회원정보수정</h1>
        {/* <EditNameWrap>
                <p>이름수정</p>
                <input
                label="성함"
                onChange = {(e) => setName(e.target.value)}
                defaultValue={previousName}
                placeholder="성함을 기입해주세요"
                ></input>    
            </EditNameWrap> */}
        <EditNicknameWrap>
          <p>닉네임수정</p>
          <input
            label="닉네임"
            onChange={(e) => setNickname(e.target.value)}
            defaultValue={previousNickname}
            placeholder="닉네임을 기입해주세요"
          ></input>
        </EditNicknameWrap>

        <RegisterAddress>
          <p>농장 주소 등록</p>
          {/* 버튼 클릭 시 팝업 생성 */}
          <button
            type="button"
            onClick={() => {
              openPostCode();
            }}
            value={address}
          >
            우편번호 검색
          </button>
          {address}
          {/* 팝업 생성 기준 div */}
          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode
                  onClose={closePostCode}
                  setAddress={setAddress}
                />
              </PopupDom>
            )}
          </div>
        </RegisterAddress>
        <CountryCode>
          <p>시세정보를 위한 지역</p>
          <Selec
            defaultValue={previousCountryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="">지역을 선택해주세요</option>
            <option value="1101">서울(도매)</option>
            <option value="2100">부산(도매)</option>
            <option value="2200">대구(도매)</option>
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
        </CountryCode>
        <EditMyCrops>
          <p> 내 작물 수정</p>
        </EditMyCrops>
        <AddProfile>
          <p>프로필 사진 등록</p>
          <input type="file"></input>
        </AddProfile>
        <Submit
          type="submit"
          onClick={() => {
            editInfo(nickname, address, countryCode, crops, profileImgUrl);
          }}
        >
          수정하기
        </Submit>
      </div>
    </div>
  );
};

const EditNameWrap = styled.div``;
const EditNicknameWrap = styled.div``;
const EditPwWrap = styled.div``;
const NewPwErr = styled.div``;
const NewPwChekErr = styled.div``;
const RegisterAddress = styled.div``;
const CountryCode = styled.div``;
const EditMyCrops = styled.div``;
const Selec = styled.select`
  margin-left: 20px;
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding-left: 10px;
`;
const Post = styled.div``;

const AddProfile = styled.div``;
const Submit = styled.button`
  margin-top: 20px;
`;

export default EditMemberInfo;
