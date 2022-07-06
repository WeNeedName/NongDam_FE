import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";
import { isDayjs } from "dayjs";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";

const MyCrops = ({setCrops, previousCrops}) => {
  const dispatch = useDispatch();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropsData = useSelector((state) => state.users.crops);
  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  const _crops = [];
  selectedCrops.filter((v) => _crops.push(v.value));
  
  useEffect(()=>{
    setCrops(_crops)}
    ,[selectedCrops])
    console.log(cropsData)
    // console.log(selectedCrops)
    console.log(_crops)
  return (
    <Container>
      <Select
        className="react-select"
        defaultValue= {previousCrops} //db에서 유저data 불러올 때 확인 필요함
        isMulti
        name="crops"
        options={
          cropsData !== undefined
            ? cropsData.map((crops) => {
                return { label: crops.name, value: crops.id };
              })
            : null
        }
        onChange={(value) => {
          setSelectedCrops(value);
        }}
        classNamePrefix="select"
      />
    </Container>
  );
};

const Container = styled.div`
  .react-select {
    width: 60%;
  }
`;
const Selec = styled.select`
  margin-left: 20px;
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding-left: 10px;
`;
export default MyCrops;
