import { React, useState, useEffect } from "react";
import Header from "../Header";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { addWorkLogDB } from "../../redux/modules/workLog";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import WorkPhoto from "../workLog/WorkPhoto";
import { getInfoDB } from "../../redux/modules/users";

const EditWorkLog = ({ workLogOne, isEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const myCropsList = useSelector((state) => state.users.user?.crops);
  console.log(workLogOne);

  const previousTitle = workLogOne.title;
  const previousCrop = workLogOne.crop.id;
  const previousDate = workLogOne.date;
  const previousWorkTime = workLogOne.workTime;
  const previousWork = workLogOne.memo;
  const previousHarvest = workLogOne.harvest;

  //기존 부자재 데이터 배열
  const previousSubMaterialFertilizer = {
    type: workLogOne?.subMaterial[0]?.type,
    product: workLogOne?.subMaterial[0]?.product,
    use: workLogOne?.subMaterial[0]?.use,
  };

  const previousSubMaterialChemical = {
    type: workLogOne?.subMaterial[1]?.type,
    product: workLogOne?.subMaterial[1]?.product,
    use: workLogOne?.subMaterial[1]?.use,
  };
  const previousSubMaterial = [
    previousSubMaterialFertilizer,
    previousSubMaterialChemical,
  ];

  const [newTitle, setNewTitle] = useState("");
  const [newCrop, setNewCrop] = useState("");
  const [newCheckedCrop, setNewCheckedCrop] = useState("");
  const [myNewDate, setMyNewDate] = useState("");
  const [newWorkTime, setNewWorkTime] = useState("");
  const [newMemo, setNewMemo] = useState("");

  const [newType0, setNewType0] = useState(0);
  const [newProduct0, setNewProduct0] = useState("");
  const [newUse0, setNewUse0] = useState("");
  const [newUnit0, setNewUnit0] = useState("");
  const newUsage0 = newUse0 + newUnit0;

  const [newType1, setNewType1] = useState(1);
  const [newProduct1, setNewProduct1] = useState("");
  const [newUse1, setNewUse1] = useState("");
  const [newUnit1, setNewUnit1] = useState("");
  const newUsage1 = newUse1 + newUnit1;

  const newSubMaterial0 = {
    type: newType0,
    product: newProduct0,
    use: newUsage0,
  };

  const newSubMaterial1 = {
    type: newType1,
    product: newProduct1,
    use: newUsage1,
  };

  const newSubMaterial = [newSubMaterial0, newSubMaterial1];

  const [newHarvest, setNewHarvest] = useState("");
  const [newImages, setNewImages] = useState("");
  const dateFormat = moment(myNewDate).format("YYYY-MM-DD");
  const numberTime = Number(newWorkTime);
  const numberCrop = Number(newCrop);
  const numberHarvest = Number(newHarvest);

  const prevFertilizerUse = workLogOne?.subMaterial[0]?.use;
  const prevChemicalUse = workLogOne?.subMaterial[1]?.use;
  const numberFertilizerUse = prevFertilizerUse?.replace(/[^0-9]/g, "");
  const numberChemicalUse = prevChemicalUse?.replace(/[^0-9]/g, "");

  const stringFertilizerUnit = prevFertilizerUse?.replace(/[1-9]/g, "");
  const stringChemicalUnit = prevChemicalUse?.replace(/[1-9]/g, "");

  console.log(newSubMaterial, previousSubMaterial);
  const editWorkLogDB = async (event) => {
    const data = {
      title: newTitle === "" ? previousTitle : newTitle,
      crop: numberCrop === 0 ? previousCrop : numberCrop,
      date: myNewDate === "" ? previousDate : dateFormat,
      memo: newMemo === "" ? previousWork : newMemo,
      workTime: newWorkTime === "" ? previousWorkTime : newWorkTime,
      subMaterial:
        newSubMaterial[0].product || newSubMaterial[1].product
          ? newSubMaterial
          : previousSubMaterial,
      harvest: newHarvest === "" ? previousHarvest : numberHarvest,
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
    }).then(navigate("/workLog"));
  };

  console.log(
    newTitle,
    numberCrop,
    dateFormat,
    newMemo,
    newSubMaterial,
    newHarvest,
    newWorkTime
  );

  const changeNewRadioCrops = (e) => {
    if (e.target.checked) {
      setNewCrop(e.target.id);
    }
  };

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

        <DateWrap>
          <DatePicker
            className="startDatePicker"
            selected={new Date(workLogOne.date)}
            // selected={props.workLogOne.date}
            onChange={(date) => {
              setMyNewDate(date);
            }}
            dateFormat="yyyy.MM.dd" // 시간 포맷 변경
            locale={ko} // 한글로 변경
            //inline//달력 보이게
          />
        </DateWrap>

        <CropWrap>
          <SmallTitle>작물</SmallTitle>
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
                  />
                  <FormCheckText>
                    {"[" + list.type + "]" + list.name}{" "}
                  </FormCheckText>
                </Label>
              );
            })}
        </CropWrap>

        <QuantityWrap>
          <SubMaterialWrap>
            <Fertilizer>
              <SmallTitle> 비료</SmallTitle>
              <div>
                <TypeTitle>제품명 : </TypeTitle>
                <ProductQuantity
                  defaultValue={workLogOne.subMaterial[0].product}
                  onChange={(e) => {
                    setNewProduct0(e.target.value);
                  }}
                />
              </div>
              <div>
                <TypeTitle> 사용량 : </TypeTitle>
                <UseQuantity
                  defaultValue={numberFertilizerUse}
                  onChange={(e) => {
                    setNewUse0(e.target.value);
                  }}
                />
                <UnitSelect
                  onChange={(e) => setNewUnit0(e.target.value)}
                  defaultValue={stringFertilizerUnit}
                >
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                  <option value="kg">kg</option>
                </UnitSelect>
              </div>
            </Fertilizer>
            <Chemical>
              <SmallTitle> 농약</SmallTitle>
              <div>
                <TypeTitle>제품명 : </TypeTitle>
                <ProductQuantity
                  defaultValue={workLogOne?.subMaterial[1]?.product}
                  onChange={(e) => {
                    setNewProduct1(e.target.value);
                  }}
                />
              </div>
              <div>
                <TypeTitle> 사용량 : </TypeTitle>
                <UseQuantity
                  defaultValue={numberChemicalUse}
                  onChange={(e) => {
                    setNewUse1(e.target.value);
                  }}
                />
                <UnitCSelect
                  onChange={(e) => setNewUnit1(e.target.value)}
                  defaultValue={stringChemicalUnit}
                >
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                  <option value="kg">kg</option>
                </UnitCSelect>
              </div>
            </Chemical>
          </SubMaterialWrap>
          <HarvestWrap>
            <SmallTitle>수확량</SmallTitle>
            <div>
              <HarvestQuantity
                defaultValue={workLogOne.harvest}
                onChange={(e) => {
                  setNewHarvest(e.target.value);
                }}
              />
              <Measure>kg</Measure>
            </div>
          </HarvestWrap>
          <WorkingHour>
            <SmallTitle>작업시간</SmallTitle>
            <div>
              <HourQuantity
                defaultValue={workLogOne.workTime}
                onChange={(e) => {
                  setNewWorkTime(e.target.value);
                }}
              />
              <Measure>시간</Measure>
            </div>
          </WorkingHour>
        </QuantityWrap>

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
            onChange={(e) => {
              setNewMemo(e.target.value);
            }}
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
  min-width: 70px;
  width: auto;
  height: auto;
  min-height: 850px;
  border-radius: 20px;
  margin-top: 100px;
  position: relative;
  display: flex;
  padding: 0px 0px 20px 40px;

  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleInput = styled.input`
  height: 30px;
  width: 400px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #bfbfbf;
  font-size: 36px;
  padding: 10px;
`;

const BtnWrap = styled.div`
  margin-right: 30px;
  display: flex;
`;

const EditBtn = styled.button`
  display: inline-flex;
  align-items: center;
  width: 70px;
  height: 30px;
  padding: 4px 10px;

  background-color: transparent;
  color: #616161;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
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

const DateWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  .startDatePicker {
    font-size: 24px;
    background-color: transparent;
    color: black;
    border: none;
  }
`;

const CropWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`;

const Label = styled.label``;

const FormCheckText = styled.span`
  width: auto;
  height: auto;
  padding: 5px 11px;
  margin-top: 10px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid #bfbfbf;
  display: inline-flex;

  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: #616161;
  &:hover {
    opacity: 0.7;
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
    opacity: 0.7;
  }
  display: none;
`;

const QuantityWrap = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SubMaterialWrap = styled.div`
  display: flex;
`;

const Fertilizer = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
`;

const Chemical = styled.div`
  margin-right: 25px;
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

const UnitSelect = styled.select`
  font-size: 15px;
`;

const UnitCSelect = styled.select`
  font-size: 15px;
`;

const HarvestWrap = styled.div`
  margin-right: 40px;
  display: flex;
  flex-direction: column;
`;

const HarvestQuantity = styled.input`
  font-size: 15px;
  width: 35px;
  margin-top: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid black;
`;

const WorkWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-bottom: 10px;
  margin-top: 200px;
`;

const WorkInput = styled.textarea`
  height: 100px;
  width: 500px;
  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: 14px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 10px;
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
`;

const HourQuantity = styled.input`
  font-size: 14px;
  width: 30px;
  text-align: center;
  margin-top: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid black;
`;
const Measure = styled.span`
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
