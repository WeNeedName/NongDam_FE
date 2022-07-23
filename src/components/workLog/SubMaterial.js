import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const SubMaterial = ({
  setType0,
  setProduct0,
  setUse0,
  setUnit0,
  product0,
  use0,
  unit0,
  setType1,
  setProduct1,
  setUse1,
  setUnit1,
  product1,
  use1,
  unit1,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <SubMaterialWrap>
        <SmallTitle>부자재 사용량</SmallTitle>
        <TabsWrap>
          <Tabs>
            <TabList>
              <Tab
                onClick={() => {
                  setType0(0);
                }}
              >
                비료
              </Tab>
              <Tab
                onClick={() => {
                  setType1(1);
                }}
              >
                농약
              </Tab>
            </TabList>

            <TabPanel>
              <InputBoxes>
                <Product
                  type="text"
                  className="inputChemical"
                  name="product"
                  placeholder="비료 제품명"
                  defaultValue={product0}
                  onChange={(e) => {
                    setProduct0(e.target.value);
                  }}
                />
                <QuantityMeasure>
                  <Quantity
                    className="quantity"
                    type="text"
                    name="use"
                    placeholder="사용량"
                    defaultValue={use0}
                    onChange={(e) => {
                      setUse0(e.target.value);
                    }}
                  />

                  <Measure
                    className="measure"
                    defaultValue={unit0}
                    onChange={(e) => {
                      setUnit0(e.target.value);
                    }}
                  >
                    <option value="">단위</option>
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
                  placeholder="농약 제품명"
                  defaultValue={product1}
                  onChange={(e) => {
                    setProduct1(e.target.value);
                  }}
                />
                <QuantityMeasure>
                  <Quantity
                    className="quantity"
                    type="text"
                    name="use"
                    placeholder="사용량"
                    defaultValue={use1}
                    onChange={(e) => {
                      setUse1(e.target.value);
                    }}
                  />

                  <Measure
                    className="measure"
                    defaultValue={unit1}
                    onChange={(e) => {
                      setUnit1(e.target.value);
                    }}
                  >
                    <option value="">단위</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="kg">kg</option>
                  </Measure>
                </QuantityMeasure>
              </InputBoxes>
            </TabPanel>
          </Tabs>
        </TabsWrap>
      </SubMaterialWrap>
    </>
  );
};

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const SubMaterialWrap = styled.div`
  width: 400px;
  height: 130px;
  background-color: #fff;
  margin-top: 10px;
`;

const TabsWrap = styled.div`
  margin-top: 10px;
`;

const InputBoxes = styled.div``;
const Product = styled.input`
  font-size: 14px;
  width: 150px;
  border: 1px solid #bfbfbf;
  margin-bottom: 5px;
  border-top: none;
  border-left: none;
  border-right: none;
`;

const QuantityMeasure = styled.div``;
const Quantity = styled.input`
  font-size: 14px;
  width: 150px;
  border: 1px solid #bfbfbf;
  border-top: none;
  border-left: none;
  border-right: none;
`;

const Measure = styled.select`
  margin-left: 20px;
  width: 100px;
  color: #616161;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #bfbfbf;
  padding-left: 10px;
  text-align: left;
`;
export default SubMaterial;
