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
    console.log(_crops)
    console.log(cropsData)
    console.log(selectedCrops)
  
  const beforeCrops = previousCrops!==undefined ?
  previousCrops.map((crops) => {
    return (crops.type)
  }) : null

console.log(beforeCrops)
    console.log(_crops)
    console.log(previousCrops)
  return (
    <Container>
      <Select
        className="react-select"
        //defaultValue= "1, 2"//{previousCrops} //db에서 유저data 불러올 때 확인 필요함
        // placeholder={previousCrops.}
        isMulti
        name="crops"
        options={
          cropsData !== undefined
            ? cropsData.map((crops, list) => {
                <list key={crops.id}/>
                return { label: crops.name, value: crops.id };
              })
            : null
        }
        placeholder={beforeCrops}
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
    
    margin-left: 80px;
    border-radius: 30px;
    
    
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
