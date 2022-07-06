
import {React, useState, useEffect, useRef} from 'react'

import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getInfoDB } from "../redux/modules/users";
import { editInfoDB } from "../redux/modules/users";
import PopupDom from "../components/myPage/PopupDom";
import PopupPostCode from "../components/myPage/PopupPostCode";
import MyCrops from "../components/myPage/MyCrops";
import axios from 'axios'

 

const EditMemberInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const fileInput = useRef();
    const userInfo = useSelector((state) => state.users.user);
    console.log(userInfo)

    const previousNickname = userInfo?.nickname;
    const previousAddress = userInfo?.address;
    const previousCountryCode = userInfo?.countryCode;
    const previousCrops = userInfo?.crops;
    const previousProfileImg = userInfo?.profileImg;
    
    const [nickname, setNickname] = useState(userInfo?.nickname);
    const [crops, setCrops] = useState(userInfo?.crops);
    const [countryCode, setCountryCode] = useState(userInfo?.countryCode);
    const [profileImg, setProfileImg] = useState(defaultImageUrl)//디폴트값으로 기본이미지 바꿔야됨
    const [address, setAddress] = useState(userInfo?.address)
    const [disable, setDisable] = useState(true);
    
    const token = sessionStorage.getItem("jwtToken");
    
    
    const defaultImageUrl = "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    // 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPostCode = () => {
      setIsPopupOpen(true);
    };
    const closePostCode = () => {
      setIsPopupOpen(false);
    };

   
    useEffect(() => {
      dispatch(getInfoDB());
      setNickname(userInfo?.nickname)
      setProfileImg(userInfo?.proifileImg)
      setAddress(userInfo?.address)
      setCrops(userInfo?.crops)
    }, []); 
      //console.log(userInfo);
   
    const onChangeFile = (e) => {
      //console.log(e.target.files[0])
      if(e.target && e.target.files[0]){
        setProfileImg(e.target.files[0])
      } 
     }
     
    const editInfo = async (event) => {
      const data = {
        nickname: nickname,
        address: address,
        countryCode: countryCode,
        crops: crops,
      }
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      frm.append("profileImage", profileImg)
      await axios({
        method: "put",
        url: `http://idontcare.shop/member/${userInfo?.id}`,
        data: frm,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
    };
    //console.log(userInfo?.crops)
    return (
      <div>
        <Header />
        <div>
          <h1>회원정보수정</h1>
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
              주소 검색
            </button>
            <span>현재농장주소 : </span><span>{userInfo?.address}</span>
            
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
             <span>현재 선택된 시세지역 : </span><span>{userInfo?.countryCode}</span>
            
            <Selec
              onChange={(e) => setCountryCode(e.target.value)}>
              <option value="">{userInfo?.countryCode}</option>
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
          
              <MyCrops setCrops={setCrops}  previousCrops={previousCrops}/>
          </EditMyCrops>
          <AddProfile>
            <p> 프로필사진 수정</p>
            <input
              type="file"
              id="upload"
              name="imageUrl"
              onChange={onChangeFile}/>
          
          </AddProfile>
          <Submit
            type="submit"
            onClick={() => {
            editInfo();
            navigate("/");
            }}>
            수정하기
          </Submit>
        </div>
      </div>
    );
  }


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
const Image= styled.img``;
const Submit = styled.button`
  margin-top: 20px;
`;
const Button = styled.button``
const Text =styled.p``
export default EditMemberInfo;
