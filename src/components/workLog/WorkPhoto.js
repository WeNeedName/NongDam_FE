import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";

const WorkPhoto =({setImages}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageSrc, setImageSrc] = useState("");

    const  encodeFileToBase64 = (fileBlob) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload= () => {
          setImageSrc(reader.result);
          resolve();
        };
      });
    };

    useEffect(()=> {
      setImages(imageSrc);  
    },[imageSrc]);
      

    return(
        <TodoContent>
        <SmallTitle>사진(선택사항)</SmallTitle>
        <CategoryBigWrap>
            
              <InputBox type="file" onChange ={(e) => 
              {encodeFileToBase64(e.target.files[0])
              }}
              />
            <div className="previe">
            {imageSrc && <ImagePreview src={imageSrc} alt="preview-img" />}  
            </div>
            </CategoryBigWrap>
    </TodoContent>  
    )
}
const TodoContent = styled.div`

width: 93%;
height: 10vh;
background-color: #fff;
margin-bottom : 500px;
`

const SmallTitle = styled.label`
font-size: 1.8em;
font-weight: bold;
`

const CategoryBigWrap = styled.div`
  width: 60%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  
`;

const InputBox = styled.input``

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
`




export default WorkPhoto;