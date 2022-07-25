import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../../redux/modules/users";
import Select from "react-select";

const MyCountryCode = ({ setCountryCode, previousCountryCode, userInfo }) => {
  const dispatch = useDispatch();

  const styles = { backgroundColor: "red", margin: "10px" };

  useEffect(() => {
    setCountryCode();
  }, [setCountryCode]);

  const options = [
    userInfo?.countryCode
      ? ({ value: "", label: userInfo?.countryCode === 1101 && "서울(도매)" },
        { value: "", label: userInfo?.countryCode === 2101 && "부산(도매)" },
        { value: "", label: userInfo?.countryCode === 2201 && "대구(도매)" },
        { value: "", label: userInfo?.countryCode === 2300 && "인천(소매)" },
        { value: "", label: userInfo?.countryCode === 2401 && "광주(도매)" },
        { value: "", label: userInfo?.countryCode === 2501 && "대전(도매)" },
        { value: "", label: userInfo?.countryCode === 2601 && "울산(소매)" },
        { value: "", label: userInfo?.countryCode === 3111 && "수원(소매)" },
        { value: "", label: userInfo?.countryCode === 3211 && "춘천(소매)" },
        { value: "", label: userInfo?.countryCode === 3311 && "청주(소매)" },
        { value: "", label: userInfo?.countryCode === 3511 && "전주(소매)" },
        { value: "", label: userInfo?.countryCode === 3711 && "포항(소매)" },
        { value: "", label: userInfo?.countryCode === 3911 && "제주(소매)" },
        { value: "", label: userInfo?.countryCode === 3113 && "의정부(소매)" },
        { value: "", label: userInfo?.countryCode === 3613 && "순천(소매)" },
        { value: "", label: userInfo?.countryCode === 3714 && "안동(소매)" },
        { value: "", label: userInfo?.countryCode === 3814 && "창원(소매)" },
        { value: "", label: userInfo?.countryCode === 3145 && "용인(소매)" })
      : { value: "", label: "지역을 선택해주세요" },

    { value: "1101", label: "서울(도매)" },
    { value: "2101", label: "부산(도매)" },
    { value: "2201", label: "대구(도매)" },
    { value: "2300", label: "인천(소매)" },
    { value: "2401", label: "광주(도매)" },
    { value: "2501", label: "대전(도매)" },
    { value: "2601", label: "울산(소매)" },
    { value: "3111", label: "수원(소매)" },
    { value: "3211", label: "춘천(소매)" },
    { value: "3311", label: "청주(소매)" },
    { value: "3511", label: "전주(소매)" },
    { value: "3711", label: "포항(소매)" },
    { value: "3911", label: "제주(소매)" },
    { value: "3113", label: "의정부(소매)" },
    { value: "3613", label: "순천(소매)" },
    { value: "3714", label: "안동(소매)" },
    { value: "3814", label: "창원(소매)" },
    { value: "3145", label: "용인(소매)" },
  ];

  return (
    <Container>
      <Select
        className="react-select"
        name="crops"
        options={options}
        placeholder="지역을 검색해주세요"
        onChange={(value) => {
          console.log(value.value);
          setCountryCode(value.value);
        }}
        classNamePrefix="select"
      />
    </Container>
  );
};

const Container = styled.div`
  .react-select {
    width: 200px;

    text-align: left;
    margin-left: 70px;
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

export default MyCountryCode;
