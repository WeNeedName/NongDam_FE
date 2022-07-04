import React from 'react';
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
 
const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        // console.log(data)
        // console.log(fullAddress)
        // console.log(data.zonecode)
        props.onClose()
        props.setAddress(fullAddress)
    }

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "40%",
        width: "60%",
        height: "60%",
        margin: "10%",
        zIndex: 1,
        border: "0.5px #ddd solid"
      };
 
    return(
        <div>
            <Container>
                <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
                {/* 닫기 버튼 생성 */}
                {/* <CloseBtn onClick={() => {props.onClose()}} className='postCode_btn'>닫기</CloseBtn> */}
            </Container>
        </div>
    )
}
const Container = styled.div`
`
const CloseBtn = styled.button``
export default PopupPostCode;