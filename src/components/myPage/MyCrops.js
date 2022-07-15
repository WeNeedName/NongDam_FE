import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";
import { isDayjs } from "dayjs";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";

const MyCrops = ({ setCrops, previousCrops }) => {
  const dispatch = useDispatch();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropsData = useSelector((state) => state.users.crops);

  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  const _crops = [];
  selectedCrops.filter((v) => _crops.push(v.value));
  
  const styles = {backgroundColor:"red", margin:"10px"}
  
  useEffect(()=>{
    setCrops(_crops)}
    ,[selectedCrops])
    console.log(_crops)
    console.log(cropsData)
    console.log(selectedCrops)
  
  // const beforeCrops = previousCrops!==undefined ?
  // previousCrops.map((crops) => {
  //   return (crops.name)
  // }) : null

    //console.log(beforeCrops)
    //console.log(_crops)
    //console.log(previousCrops)

  return (
    <Container>
      <Select
        className="react-select"
        isMulti
        name="crops"
        options={
          cropsData !== undefined
            ? cropsData.map((crops, list) => {
                <list key={crops.id}/>
                return { label: "[" + crops.type + "]" + " " + crops.name,
                          value: crops.id,};
              })
            : null
        }
        placeholder="작물을 검색해주세요"
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
    width: 200px;
    
    text-align : left;
    margin-left: 80px;
    margin-top : 10px;
    border-radius: 10px;
    
    
  }
`;

const Selec = styled.select`
  
  width: 170px;
  background-color: white;
  height: 30px;
  
  border: 1px solid black;
  padding-left: 10px;
`;
export default MyCrops;
