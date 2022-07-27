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

  // 숫자만 입력
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
  }

  return (
    <>
      <SubMaterialWrap>
        <SmallTitle>부자재</SmallTitle>
        <TabsWrap>
          <STabs
            selectedTabClassName="is-selected"
            selectedTabPanelClassName="is-selected"
          >
            <STabList>
              <STab
                onClick={() => {
                  setType0(0);
                }}
              >
                비료
              </STab>
              <STab
                onClick={() => {
                  setType1(1);
                }}
              >
                농약
              </STab>
            </STabList>

            <STabPanel>
              <InputBoxes>
                <Product
                  type="text"
                  name="product"
                  placeholder="사용하신 비료를 입력해주세요"
                  defaultValue={product0}
                  onChange={(e) => {
                    setProduct0(e.target.value);
                  }}
                />
                <QuantityMeasure>
                  <Quantity
                    type="text"
                    name="use"
                    placeholder="사용량"
                    maxLength="6"
                    defaultValue={use0}
                    onChange={(e) => {
                      inputNumberFormat(e);
                      setUse0(e.target.value);
                    }}
                  />

                  <Measure
                    defaultValue={unit0}
                    onChange={(e) => {
                      setUnit0(e.target.value);
                    }}
                  >
                    <option value="">단위</option>
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="kg">kg</option>
                  </Measure>
                </QuantityMeasure>
              </InputBoxes>
            </STabPanel>

            <STabPanel>
              <InputBoxes>
                <Product
                  type="text"
                  name="product"
                  placeholder="농약 제품명을 입력해주세요"
                  defaultValue={product1}
                  onChange={(e) => {
                    setProduct1(e.target.value);
                  }}
                />
                <QuantityMeasure>
                  <Quantity
                    type="text"
                    maxLength="6"
                    name="use"
                    placeholder="사용량"
                    defaultValue={use1}
                    onChange={(e) => {
                      inputNumberFormat(e);
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
                    <option value="mL">mL</option>
                    <option value="L">L</option>
                    <option value="kg">kg</option>
                  </Measure>
                </QuantityMeasure>
              </InputBoxes>
            </STabPanel>
          </STabs>
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
  height: auto;
  background-color: #fff;
  margin-top: 30px;
`;

const TabsWrap = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const InputBoxes = styled.div``;

const Product = styled.input`
  font-size: 14px;
  width: 380px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 6px 10px;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
`;

const QuantityMeasure = styled.div``;

const Quantity = styled.input`
  font-size: 14px;
  width: 140px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  padding: 6px 10px;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
`;

const Measure = styled.select`
  margin-left: 10px;
  width: 80px;
  color: #616161;
  height: 30px;
  border-radius: 6px;
  border: 1px solid #bfbfbf;
  padding-left: 10px;
  text-align: left;
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid #02113b;
  }
`;

const STabs = styled(Tabs)`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  width: 400px;
  /* width: 50%; */
`;

const STabList = styled(TabList)`
  list-style-type: none;
  padding: 4px;
  display: flex;
  margin: 0;
`;
STabList.tabsRole = "TabList";

const STab = styled(Tab)`
  margin-right: 8px;
  margin-left: -4px;
  border: 1px solid black;
  padding: 8px 26px;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  color: #b6b6b6;
  border: 1px solid #ececec;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 1px solid #bfbfbf !important;
  &.is-selected {
    border-bottom: 1px solid white !important;
    border: 1px solid #bfbfbf;
    color: #02113b;
  }
`;
STab.tabsRole = "Tab";

const STabPanel = styled(TabPanel)`
  display: none;
  border: 1px solid #bfbfbf;
  border-radius: 0px 8px 8px 8px;
  width: 400px;
  padding: 30px 20px;
  margin-top: -5px;

  &.is-selected {
    display: block;
  }
`;
STabPanel.tabsRole = "TabPanel";

export default SubMaterial;
