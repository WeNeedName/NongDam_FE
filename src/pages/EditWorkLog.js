import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { addWorkLogDB } from "../redux/modules/workLog";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import WorkPhoto from "../components/workLog/write/WorkPhoto";
import { getInfoDB } from "../redux/modules/users";
// 컴포넌트
import Header from "../components/Header";

// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditWorkLog = ({ workLogOne, isEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const myCropsList = useSelector((state) => state.users.user?.crops);

  const previousTitle = workLogOne.title;
  const previousCrop = workLogOne.crop.id;
  const previousDate = workLogOne.date;
  const previousWorkTime = workLogOne.workTime;
  const previousMemo = workLogOne.memo;
  const previousHarvest = workLogOne.harvest;

  //기존 부자재(비료, 농약) 사용량
  const prevFertilizerUse = workLogOne?.subMaterial[0]?.use;
  const prevChemicalUse = workLogOne?.subMaterial[1]?.use;
  //기존 부자재(비료, 농약) 사용량 숫자 추출
  const numberFertilizerUse = prevFertilizerUse?.replace(/[^0-9]/g, "");
  const numberChemicalUse = prevChemicalUse?.replace(/[^0-9]/g, "");
  //기존 부자재(비료, 농약) 사용량 단위 추출
  const stringFertilizerUnit = prevFertilizerUse?.replace(/[1-9]/g, "");
  const stringChemicalUnit = prevChemicalUse?.replace(/[1-9]/g, "");

  //수정된 부자재 데이터 관리
  const [newTitle, setNewTitle] = useState(previousTitle);
  const [newCrop, setNewCrop] = useState(previousCrop);
  const [newCheckedCrop, setNewCheckedCrop] = useState(previousDate);

  const [myNewDate, setMyNewDate] = useState(new Date(workLogOne.date));

  const [newWorkTime, setNewWorkTime] = useState(previousWorkTime);
  const [newMemo, setNewMemo] = useState(previousMemo);
  const [newHarvest, setNewHarvest] = useState();
  const [newImages, setNewImages] = useState("");

  const [newType0, setNewType0] = useState(0);
  const [newProduct0, setNewProduct0] = useState("");
  const [newUse0, setNewUse0] = useState("");
  const [newUnit0, setNewUnit0] = useState(stringFertilizerUnit);

  const newUsage0 = newUse0 + newUnit0;

  const [newType1, setNewType1] = useState(1);
  const [newProduct1, setNewProduct1] = useState("");
  const [newUse1, setNewUse1] = useState("");
  const [newUnit1, setNewUnit1] = useState(stringChemicalUnit);

  const newUsage1 = newUse1 + newUnit1;

  const product0Change = (e) => {
    setNewProduct0(e.target.value);
  };

  const product1Change = (e) => {
    setNewProduct1(e.target.value);
  };

  const newSubMaterial0 = {
    type: 0,
    product:
      newProduct0 !== "" ? newProduct0 : workLogOne?.subMaterial[0]?.product,
    use:
      newUnit0 === "" && newUse0 === ""
        ? workLogOne?.subMaterial[0]?.use
        : newUse0 === "" && newUnit0 !== ""
        ? numberFertilizerUse + newUnit0
        : newUse0 + newUnit0,
  };

  const newSubMaterial1 = {
    type: 1,
    product:
      newProduct1 !== "" ? newProduct1 : workLogOne?.subMaterial[1]?.product,
    use:
      newUnit1 === "" && newUse1 === ""
        ? workLogOne?.subMaterial[1]?.use
        : newUse1 === "" && newUnit1 !== ""
        ? numberChemicalUse + newUnit1
        : newUse1 + newUnit1,
  };

  const newSubMaterial = [newSubMaterial0, newSubMaterial1];

  const dateFormat = moment(myNewDate).format("YYYY-MM-DD");
  const numberTime = Number(newWorkTime);
  const numberCrop = Number(newCrop);
  const numberHarvest = Number(newHarvest);
  const toDoRef = useRef("");

  const editWorkLogDB = async (event) => {
    if (!newTitle) {
      window.alert("제목을 입력해주세요.");
    } else if (!newCrop) {
      window.alert("작물을 선택해주세요.");
    } else if (!myNewDate) {
      window.alert("날짜를 선택해주세요.");
    } else if (!newWorkTime) {
      window.alert("작업시간을 입력해주세요.");
    } else if (toDoRef.current.value === "") {
      window.alert("작업 내용을 입력해주세요.");
    } else {
      const data = {
        title: newTitle.length < 1 ? previousTitle : newTitle,
        crop: numberCrop === 0 ? previousCrop : numberCrop,
        date: myNewDate.length < 1 ? previousDate : dateFormat,
        memo: toDoRef.current.value,
        workTime: newWorkTime.length < 1 ? previousWorkTime : newWorkTime,
        subMaterial: newSubMaterial,
        harvest: newHarvest === undefined ? previousHarvest : newHarvest,
      };
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      if (newImages === "") {
        frm.append("images", null);
      } else {
        frm.append("images", newImages);
      }
      await axios({
        method: "put",
        url: `https://idontcare.shop/worklog/${workLogOne.id}/update`,
        data: frm,
        headers: {
          "Content-Type": "multipart/form-data",
          RefreshToken: `Bearer ${refreshToken}`,
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Swal.fire({
          title: "수정이 완료되었습니다.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
          color: "#black",
          padding: "20px",
          width: "400px",
          height: "200px",
        });
        navigate("/workLog");
      });
    }
  };

  const changeNewRadioCrops = (e) => {
    if (e.target.checked) {
      setNewCrop(e.target.id);
    }
  };

  // 숫자만 입력
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
  }

  return (
    <Container>
      <Header />
      <TotalWrap>
        <TopWrap>
          <TitleInput
            defaultValue={workLogOne.title}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <BtnWrap>
            <EditBtn
              onClick={() => {
                editWorkLogDB();
              }}
            >
              수정완료
            </EditBtn>
            <CancelBtn
              onClick={() => {
                navigate("/workLog");
              }}
            >
              취소
            </CancelBtn>
          </BtnWrap>
        </TopWrap>

        <MTopWrap>
          <BtnWrap>
            <EditBtn
              onClick={() => {
                editWorkLogDB();
              }}
            >
              수정완료
            </EditBtn>
            <CancelBtn
              onClick={() => {
                navigate("/workLog");
              }}
            >
              취소
            </CancelBtn>
          </BtnWrap>
          <TitleInput
            defaultValue={workLogOne.title}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </MTopWrap>

        <DatePickers>
          <DatePicker
            className="startDatePicker"
            selected={new Date(myNewDate)}
            // selected={props.workLogOne.date}
            onChange={(date) => {
              setMyNewDate(date);
            }}
            dateFormat="yyyy.MM.dd" // 시간 포맷 변경
            locale={ko} // 한글로 변경
            //inline//달력 보이게
          />
        </DatePickers>

        <CropWrap>
          <SmallTitle>작물</SmallTitle>
          <CategoryWrap>
            {myCropsList !== undefined &&
              myCropsList.map((list) => {
                return (
                  <Label key={list.id}>
                    <FormCheckLeft
                      type="radio"
                      id={list.id}
                      name="radioButton"
                      onChange={changeNewRadioCrops}
                      value={newCheckedCrop}
                      defaultChecked={list.id === previousCrop ? true : false}
                    />
                    <FormCheckText>{list.name}</FormCheckText>
                  </Label>
                );
              })}
          </CategoryWrap>
        </CropWrap>

        <QuantityWrap>
          <WorkingHour>
            <SmallTitle>작업시간</SmallTitle>
            <ContentWrap>
              <HourQuantity
                type="text"
                maxLength="4"
                defaultValue={workLogOne.workTime}
                onChange={(e) => {
                  inputNumberFormat(e);
                  setNewWorkTime(e.target.value);
                }}
              />
              <Kg>시간</Kg>
            </ContentWrap>
          </WorkingHour>

          <SubMaterialWrap>
            <Fertilizer>
              <SmallTitle> 비료</SmallTitle>
              <ContentWrap>
                <Product
                  type="text"
                  name="product"
                  placeholder="비료명을 입력해주세요"
                  defaultValue={workLogOne.subMaterial[0].product}
                  onChange={product0Change}
                />
              </ContentWrap>
              <div>
                <Quantity
                  type="text"
                  maxLength="6"
                  placeholder="사용량"
                  defaultValue={numberFertilizerUse}
                  onChange={(e) => {
                    inputNumberFormat(e);
                    e.target.value === ""
                      ? (setNewUse0(0), setNewUnit0(""))
                      : setNewUse0(e.target.value);
                  }}
                />
                <Measure
                  defaultValue={stringFertilizerUnit}
                  onChange={(e) => setNewUnit0(e.target.value)}
                >
                  <option value="">단위</option>

                  <option value="L">L</option>
                  <option value="mL">mL</option>
                  <option value="kg">kg</option>
                </Measure>
              </div>
            </Fertilizer>
            <Chemical>
              <SmallTitle> 농약</SmallTitle>
              <ContentWrap>
                <Product
                  name="product"
                  placeholder="농약명을 입력해주세요"
                  defaultValue={workLogOne?.subMaterial[1]?.product}
                  onChange={product1Change}
                />
              </ContentWrap>
              <div>
                <Quantity
                  maxLength="6"
                  placeholder="사용량"
                  defaultValue={numberChemicalUse}
                  onChange={(e) => {
                    {
                      inputNumberFormat(e);
                      e.target.value === ""
                        ? (setNewUse1(0), setNewUnit1(0))
                        : setNewUse1(e.target.value);
                    }
                  }}
                />
                <Measure
                  onChange={(e) => setNewUnit1(e.target.value)}
                  defaultValue={stringChemicalUnit}
                >
                  <option value="">단위</option>

                  <option value="L">L</option>
                  <option value="mL">mL</option>
                  <option value="kg">kg</option>
                </Measure>
              </div>
            </Chemical>
          </SubMaterialWrap>
          <HarvestWrap>
            <SmallTitle>수확량</SmallTitle>
            <ContentWrap>
              <HarvestQuantity
                type="text"
                maxLength="8"
                placeholder="수확량"
                defaultValue={workLogOne.harvest}
                onChange={(e) => {
                  inputNumberFormat(e);
                  setNewHarvest(e.target.value);
                }}
              />
              <Kg>kg</Kg>
            </ContentWrap>
          </HarvestWrap>
        </QuantityWrap>
        {/*  모바일용 */}
        <MobileQuantityWrap>
          <MWorkingHour>
            <SmallTitle>작업시간</SmallTitle>
            <ContentWrap>
              <HourQuantity
                type="text"
                maxLength="4"
                defaultValue={workLogOne.workTime}
                onChange={(e) => {
                  inputNumberFormat(e);
                  setNewWorkTime(e.target.value);
                }}
              />
              <Kg>시간</Kg>
            </ContentWrap>
          </MWorkingHour>

          <MSubMaterialWrap>
            <ProductWrap>
              <Fertilizer>
                <SmallTitle> 비료</SmallTitle>
                <ContentWrap>
                  <Product
                    type="text"
                    name="product"
                    placeholder="비료명을 입력해주세요"
                    defaultValue={workLogOne.subMaterial[0].product}
                    onChange={product0Change}
                  />
                </ContentWrap>
                <div>
                  <Quantity
                    type="text"
                    maxLength="6"
                    placeholder="사용량"
                    defaultValue={numberFertilizerUse}
                    onChange={(e) => {
                      inputNumberFormat(e);
                      e.target.value === ""
                        ? (setNewUse0(0), setNewUnit0(""))
                        : setNewUse0(e.target.value);
                    }}
                  />
                  <Measure
                    defaultValue={stringFertilizerUnit}
                    onChange={(e) => setNewUnit0(e.target.value)}
                  >
                    <option value="">단위</option>

                    <option value="L">L</option>
                    <option value="mL">mL</option>
                    <option value="kg">kg</option>
                  </Measure>
                </div>
              </Fertilizer>
              <Chemical>
                <SmallTitle> 농약</SmallTitle>
                <ContentWrap>
                  <Product
                    name="product"
                    placeholder="농약명을 입력해주세요"
                    defaultValue={workLogOne?.subMaterial[1]?.product}
                    onChange={product1Change}
                  />
                </ContentWrap>
                <div>
                  <Quantity
                    maxLength="6"
                    placeholder="사용량"
                    defaultValue={numberChemicalUse}
                    onChange={(e) => {
                      {
                        inputNumberFormat(e);
                        e.target.value === ""
                          ? (setNewUse1(0), setNewUnit1(0))
                          : setNewUse1(e.target.value);
                      }
                    }}
                  />
                  <Measure
                    onChange={(e) => setNewUnit1(e.target.value)}
                    defaultValue={stringChemicalUnit}
                  >
                    <option value="">단위</option>

                    <option value="L">L</option>
                    <option value="mL">mL</option>
                    <option value="kg">kg</option>
                  </Measure>
                </div>
              </Chemical>
            </ProductWrap>
          </MSubMaterialWrap>
          <MHarvestWrap>
            <SmallTitle>수확량</SmallTitle>
            <ContentWrap>
              <HarvestQuantity
                type="text"
                maxLength="8"
                placeholder="수확량"
                defaultValue={workLogOne.harvest}
                onChange={(e) => {
                  inputNumberFormat(e);
                  setNewHarvest(e.target.value);
                }}
              />
              <Kg>kg</Kg>
            </ContentWrap>
          </MHarvestWrap>
        </MobileQuantityWrap>

        <WorkPhoto
          workLogOne={workLogOne}
          isEdit={isEdit}
          newImages={newImages}
          setNewImages={setNewImages}
        />

        <WorkWrap>
          <SmallTitle className="todo">작업내용</SmallTitle>
          <WorkInput
            type="text"
            // onChange={(e) => {
            //   setNewMemo(e.target.value);
            // }}
            ref={toDoRef}
            defaultValue={workLogOne.memo}
          />
        </WorkWrap>
      </TotalWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TotalWrap = styled.div`
  width: 700px;
  height: auto;
  min-height: 850px;
  border-radius: 20px;
  margin-top: 120px;
  position: relative;
  display: flex;
  padding: 30px;
  margin-bottom: 30px;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media only screen and (max-width: 760px) {
    width: 90%;
    border-radius: 0px;
    margin-bottom: 100px;
  }
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const MTopWrap = styled.div`
  display: none;
  @media only screen and (max-width: 760px) {
    display: block;
  }
`;

const TitleInput = styled.input`
  height: 30px;
  width: 420px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #bfbfbf;
  font-size: 30px;
  padding: 10px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
  &::placeholder {
    color: #ccc;
  }
  @media only screen and (max-width: 760px) {
    width: 95%;
    font-size: 30px;
    margin-top: 30px;
    margin-bottom: 4px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  @media only screen and (max-width: 760px) {
    position: absolute;
    right: 20px;
  }
`;

const EditBtn = styled.button`
  display: inline-flex;
  align-items: center;
  width: 70px;
  height: 30px;
  padding: 4px 10px;

  background-color: #55a349;
  color: white;
  border: 1px solid #55a349;
  border-radius: 8px;
  &:hover {
    background: #22631c;
    border: 1px solid #22631c;
  }
`;

const CancelBtn = styled.button`
  display: inline-flex;
  align-items: center;
  width: 50px;
  height: 30px;
  font-size: 14px;
  padding: 4px 10px;
  margin-left: 10px;
  background-color: transparent;
  color: #616161;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const CropWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-top: 30px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  @media only screen and (max-width: 760px) {
    font-size: 14px;
  }
`;

const Label = styled.label``;

const ProductWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: auto;
  height: auto;
  font-size: 14px;
  padding: 5px 11px;
  margin-top: 5px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid #ccc;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: #ccc;
  &:hover {
    color: black;
    border: 1px solid black;
  }
  @media only screen and (max-width: 760px) {
    font-size: 12px;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  @media only screen and (max-width: 760px) {
    font-size: 12px;
    flex-wrap: wrap;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    color: black;
    border: 1px solid black;
  }
  display: none;
`;

const QuantityWrap = styled.div`
  display: flex;
  margin-top: 30px;
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const MobileQuantityWrap = styled.div`
  display: none;
  @media only screen and (max-width: 760px) {
    display: block;
  }
`;

const Product = styled.input`
  font-size: 14px;
  width: 130px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 6px 10px;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
  @media only screen and (max-width: 760px) {
    width: 130px;
  }
`;

const ContentWrap = styled.div`
  margin-top: 10px;
`;

const SubMaterialWrap = styled.div`
  display: flex;
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const MSubMaterialWrap = styled.div`
  display: none;
  @media only screen and (max-width: 760px) {
    display: block;
  }
`;

const Fertilizer = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 760px) {
    margin-right: 20px;
  }
`;

const Chemical = styled.div`
  margin-right: 25px;
  @media only screen and (max-width: 760px) {
    margin-right: 0px;
  }
`;

const TypeTitle = styled.span`
  font-size: 13px;
`;

const ProductQuantity = styled.input`
  width: auto;
  max-width: 78px;
  font-size: 15px;
  margin-top: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid black;
`;
const UseQuantity = styled.input`
  width: 35px;
  font-size: 15px;
  margin-top: 5px;
  margin-right: 2px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid black;
`;

const Quantity = styled.input`
  font-size: 14px;
  width: 60px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  padding: 6px 10px;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
  @media only screen and (max-width: 760px) {
    width: 60px;
  }
`;

const Measure = styled.select`
  margin-left: 10px;
  width: 60px;
  color: #616161;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #bfbfbf;
  padding-left: 6px;
  text-align: left;
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
`;

const UnitCSelect = styled.select`
  font-size: 15px;
`;

const HarvestWrap = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const MHarvestWrap = styled.div`
  display: none;
  @media only screen and (max-width: 760px) {
    display: block;
    margin-top: 30px;
  }
`;

const HarvestQuantity = styled.input`
  width: 60px;
  height: 20px;
  padding: 4px 10px;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  margin-right: 6px;
  &:focus {
    outline: none;
  }
`;

const WorkWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const WorkInput = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 95%;
  height: 200px;
  resize: none;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  margin-top: 5px;
  border-radius: 10px;
  padding: 8px;
  margin-top: 12px;
  white-space: pre-wrap;
  resize: none;
  &::placeholder {
    color: #ddd;
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const DatePickers = styled.div`
  margin-top: 6px;
  .startDatePicker {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 24px;
    width: 120px;
    border: none;
    background-color: transparent;
    color: black;
    cursor: pointer;
    border-bottom: 1px solid #bfbfbf;
    &:focus {
      outline: none;
      border-bottom: 1px solid black;
    }
    @media only screen and (max-width: 760px) {
      font-size: 20px;
      width: 100px;
    }
  }
`;

const WorkContent = styled.div`
  width: 400px;
  height: 100px;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  text-align: left;
  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: 14px;
  margin-top: 5px;
`;

const WorkingHour = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const MWorkingHour = styled.div`
  display: none;
  @media only screen and (max-width: 760px) {
    display: block;
    margin: 30px 0px;
  }
`;

const HourQuantity = styled.input`
  width: 40px;
  padding: 4px 10px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #bfbfbf;
  margin-right: 6px;
  text-align: center;
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
  @media only screen and (max-width: 760px) {
    width: 16px;
  }
`;

const Kg = styled.span`
  color: #616161;
  font-size: 15px;
`;

const Images = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  background-size: cover;
`;
export default EditWorkLog;
