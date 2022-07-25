import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const WorkPhoto = ({
  setImages,
  isEdit,
  workLogOne,
  setNewImages,
  newImages,
}) => {
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

  const newEncodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const newOnChangeFile = (e) => {
    //console.log(e.target.files[0])
    setNewImages(e.target.files[0]);
  };

  // console.log(workLogOne);
  console.log(newImages);
  return (
    <>
      {isEdit ? (
        <>
          <EditImageContentWrap>
            <SmallTitle>사진</SmallTitle>
            <CategoryBigWrap>
              <div className="upload" />
              <label htmlFor="imageUpload">
                <InputImageBoxEdit>
                  <div className="icon">
                    <AddAPhotoIcon sx={{ fontSize: 60 }} />
                  </div>
                </InputImageBoxEdit>
              </label>
              <InputBox
                id="imageUpload"
                type="file"
                onChange={(e) => {
                  {
                    newEncodeFileToBase64(e.target.files[0]);
                  }
                  {
                    newOnChangeFile(e);
                  }
                }}
              />
              <div className="preview">
                {newImages ? (
                  <NewImagesPreview src={imageSrc} alt="preview" />
                ) : (
                  <NewImagesPreview
                    style={{ backgroundImage: `url(${workLogOne.images})` }}
                  />
                )}

                {/* 
                {imageSrc && (
                  <NewImagePreview src={imageSrc} alt="preview-img" />
                )} */}
              </div>
            </CategoryBigWrap>
          </EditImageContentWrap>
        </>
      ) : (
        <>
          <ImageContentWrap>
            <SmallTitle>사진</SmallTitle>
            <CategoryBigWrap>
              <label htmlFor="imageUpload">
                <InputImageBox>
                  <div className="icon">
                    <AddAPhotoIcon sx={{ fontSize: 50 }} />
                  </div>
                </InputImageBox>
              </label>
              <InputBox
                type="file"
                id="imageUpload"
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
                {imageSrc && <ImagePreview profileImage={imageSrc} />}
              </div>
            </CategoryBigWrap>
          </ImageContentWrap>
        </>
      )}
    </>
  );
};
const ImageContentWrap = styled.div`
  width: 200px;
  height: auto;
  background-color: #fff;
  margin-top: 30px;
`;

const EditImageContentWrap = styled.div`
  width: 200px;
  height: auto;
  background-color: #fff;
  margin-top: 30px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const CategoryBigWrap = styled.div`
  width: 60%;
  display: flex;
  margin-top: 10px;
`;

const InputImageBoxEdit = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  margin-right: 15px;
  display: flex;
  justify-content: center;

  align-items: center;
  .icon {
    color: #aaa;
  }
`;

const InputImageBox = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid #bfbfbf;
  border-radius: 10px;
  margin-right: 15px;
  display: flex;
  justify-content: center;

  align-items: center;
  .icon {
    color: #aaa;
  }
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const InputBox = styled.input`
  display: none;
`;

const NewImagesPreview = styled.img`
  width: 200px;
  height: 200px;
  background-size: cover;
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  background-size: cover;
  border-radius: 8px;
  background-image: url(${(props) => props.profileImage});
  background-position: center 30%;
  background-size: cover;
`;

export default WorkPhoto;
