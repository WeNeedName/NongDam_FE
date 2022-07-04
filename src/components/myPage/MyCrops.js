import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from 'react-select'
import { isDayjs } from "dayjs";

const MyCrops = () =>{
    const dispatch = useDispatch();
    const [crops, setCrops] = useState("")
    const cropsData = useSelector((state) => state.users.crops);
    useEffect(() => {
        dispatch(getCropsListDB())
    }, []);
    const initialCrops = cropsData[0]?.types[0]?.crops
    console.log(initialCrops)
    const cropsLabel = cropsData[0]?.types[0]?.crops[0].name
    const cropsValue = cropsData[0]?.types[0]?.crops[0]?.id
    // console.log(cropsLabel, cropsValue)  

    const options = [
      initialCrops!==undefined ? initialCrops.map((v,idx)=>{
        return (
    {label: "라벨", value: "밸류"}
      )
      }) : null
    ]
// { label: "작년", value: 2021 },
// { label: "재작년", value: 2020 },
// { label: "재재작년", value: 2019 }]

    console.log(options)

    return(
      <Container>
        <Select
        className="react-select"
        //defaultValue={[options]}
        isMulti 
        name="crops"
        options={options}

        classNamePrefix="select"
   
        
        //onChange={(e) => setCrops(e.target.value)}
        />
      </Container>
    )
}
const Container = styled.div`
.react-select{
  width: 60%;
}`
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