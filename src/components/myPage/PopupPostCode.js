import { React, useEffect, useRef } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = ({
  isPopupOpen,
  setIsPopupOpen,
  modalCloseRef,
  setAddress,
}) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용

  const handleModalClose = (e) => {
    if (isPopupOpen === true && modalCloseRef.current !== e.target) {
      setIsPopupOpen(false);
    }
  };

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setIsPopupOpen(false);
    setAddress(fullAddress);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    marginTop: "33vh",
    marginLeft: "42%",
    width: "400px",
    height: "45%",
    zIndex: 1,
    border: "0.5px #ddd solid",
    boxShadow: "20px 20px 20px rgba(0, 0, 0, 0.25)",
  };

  return (
    <Wrap onClick={handleModalClose}>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @media only screen and (max-width: 760px) {
    top: 620px;
    padding-right: 70%;
    left: -65%;
    z-index: 10;
  }
`;

const ModalBackground = styled.div``;

export default PopupPostCode;
