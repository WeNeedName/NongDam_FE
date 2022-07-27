import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";

const MyCrops = ({
  setCrops,
  previousCrops,
  setCropsObj,
  sendCrops,
  setSendCrops,
  cropsObj,
  cropsArray,
}) => {
  const dispatch = useDispatch();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropsData = useSelector((state) => state.users.crops);

  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  const _crops = [];
  selectedCrops.filter((v) => _crops.push(v.value));

  const styles = { backgroundColor: "red", margin: "10px" };

  useEffect(() => {
    setCrops(_crops);
    setCropsObj(selectedCrops);
  }, [selectedCrops]);

  return (
    <Container>
      <Select
        className="react-select"
        isMulti
        name="crops"
        options={
          cropsData !== undefined
            ? cropsData.map((crops, list) => {
                <list key={crops.id} />;
                return {
                  label: "[" + crops.type + "]" + " " + crops.name,
                  value: crops.id,
                };
              })
            : null
        }
        placeholder="작물을 검색해주세요"
        onChange={(value) => {
          // if (!sendCrops)
          setCropsObj(value);

          // else {
          //   const arr = sendCrops.push(value);
          //   setSendCrops(arr);
          // }
        }}
        classNamePrefix="select"
      />
    </Container>
  );
};

const Container = styled.div`
  .react-select {
    width: auto;
    text-align: left;
    margin-left: 80px;
    margin-top: 10px;
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
