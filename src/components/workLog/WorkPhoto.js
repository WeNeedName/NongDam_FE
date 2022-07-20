import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const WorkPhoto = ({ setImages }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onChangeFile = (e) => {
    //console.log(e.target.files[0])
    setImages(e.target.files[0]);
  };
  console.log(imageSrc);

  return (
    <ImageContentWrap>
      <SmallTitle>사진(선택사항)</SmallTitle>
      <CategoryBigWrap>
        {/* <p className="upload">이미지 미리보기</p> */}
        <InputBox
          type="file"
          onChange={(e) => {
            {
              encodeFileToBase64(e.target.files[0]);
            }
            {
              onChangeFile(e);
            }
          }}
        />
        <div className="preview">
          {imageSrc && <ImagePreview src={imageSrc} alt="preview-img" />}
        </div>
      </CategoryBigWrap>
    </ImageContentWrap>
  );
};
const ImageContentWrap = styled.div`
  width: 200px;
  height: 80px;
  background-color: #fff;
  padding-left: 30px;
  padding-top: 30px;
`;
const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const CategoryBigWrap = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const InputBox = styled.input``;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
`;

export default WorkPhoto;
