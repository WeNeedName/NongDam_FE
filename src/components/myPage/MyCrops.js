import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";

const MyCrops = ({ setCrops, setCropsObj, sendCrop }) => {
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
        isOptionDisabled={() => sendCrop.length >= 6}
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
    max-width: 400px;
    /* width: auto; */
    text-align: left;
    margin-left: 60px;
    margin-top: 10px;
    border-radius: 10px;
    font-size: 14px;
    @media only screen and (max-width: 760px) {
      margin-left: 10px;
    }
    @media only screen and (max-width: 414px) {
      margin-left: 10px;
      margin-top: 3px;
    }
  }
`;

export default MyCrops;
