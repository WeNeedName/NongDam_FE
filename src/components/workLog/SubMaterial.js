import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SubMaterial = ({ setType, setProduct, setUse, setUnit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <SubMaterialWrap>
      <SmallTitle>부자재 사용량</SmallTitle>
      <Tabs>
        <TabList>
          <Tab
            onClick={() => {
              setType(0);
            }}
          >
            {" "}
            비료{" "}
          </Tab>
          <Tab
            onClick={() => {
              setType(1);
            }}
          >
            {" "}
            농약{" "}
          </Tab>
        </TabList>

        <TabPanel>
          <InputBoxes>
            <Product
              type="text"
              className="inputChemical"
              name="product"
              placeholder="사용하신 비료를 입력해주세요"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
            <QuantityMeasure>
              <Quantity
                className="quantity"
                type="text"
                name="use"
                placeholder="사용량을 입력해주세요"
                onChange={(e) => {
                  setUse(e.target.value);
                }}
              />

              <Measure
                className="measure"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <option value="">단위를 선택해주세요</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="kg">kg</option>
              </Measure>
            </QuantityMeasure>
          </InputBoxes>
        </TabPanel>

        <TabPanel>
          <InputBoxes>
            <Product
              type="text"
              className="inputChemical"
              name="product"
              placeholder="사용하신 농약를 입력해주세요"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
            <QuantityMeasure>
              <Quantity
                className="quantity"
                type="text"
                name="use"
                placeholder="사용량을 입력해주세요"
                onChange={(e) => {
                  setUse(e.target.value);
                }}
              />

              <Measure
                className="measure"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <option value="">단위를 선택해주세요</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="kg">kg</option>
              </Measure>
            </QuantityMeasure>
          </InputBoxes>
        </TabPanel>
      </Tabs>
    </SubMaterialWrap>
  );
};

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const SubMaterialWrap = styled.div`
  padding-left: 30px;
  padding-top: 20px;
  width: 400px;
  height: 130px;
  background-color: #fff;
`;

const InputBoxes = styled.div``;
const Product = styled.input`
  width: 200px;
`;

const QuantityMeasure = styled.div``;
const Quantity = styled.input``;

const Measure = styled.select`
  margin-left: 20px;
  width: 170px;
  color: #616161;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #bfbfbf;
  padding-left: 10px;
  text-align: left;
`;
export default SubMaterial;
