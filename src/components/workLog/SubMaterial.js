import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { propTypes } from 'react-bootstrap/esm/Image';

const SubMaterial =({setSubMaterialC, setSubMaterialF}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggleState, setToggleState] = useState(1);
    //const [chemical, setChemical] = useState({});
    const [typeC, setTypeC] = useState({type : 0});
    const [productC, setProductC] = useState({productC : ""});
    const [quantityC, setQuantityC] = useState();
    const [unitC, setUnitC] = useState();
    const quantityAndUnitC= quantityC+unitC
    //console.log(quantityAndUnitC)
    const [useC, setUseC] = useState({useC : ""}) 
    //console.log(useC)
    const  chemical = Object.assign(typeC, productC, useC);
    //console.log(chemical)

    //const [fertilizer, setFertilizer] = useState({});
    const [typeF, setTypeF] = useState({type : ''});
    const [productF, setProductF] = useState({productF : ""});
    const [quantityF, setQuantityF] = useState();
    const [unitF, setUnitF] = useState();
    const quantityAndUnitF= quantityF+unitF
    const [useF, setUseF] = useState({useF : ""}) 
    const  fertilizer = Object.assign(typeF, productF, useF);
    const toggleTab = (index) => {
      setToggleState(index);
    };
  

    useEffect(() => {
      setUseC({useC : quantityAndUnitC})
    },[quantityAndUnitC])
      
    useEffect(() => {
      setUseF({useF : quantityAndUnitF})
    },[quantityAndUnitF])

    useEffect(()=> {
      setSubMaterialC(chemical);   
    },[chemical]);
    useEffect(()=> {
      setSubMaterialF(fertilizer)
    },[fertilizer]);


    return(     
        <TodoContent>
            <SmallTitle>부자재 사용량</SmallTitle>
            <div className="container">
              <div className="bloc-tabs">
                <button
                  name="type"
                  defaultValue={chemical.type}
                  className={toggleState === 1 ? "t1234abs active-tabs" : "tabs"}
                  onClick={() => {
                    toggleTab(1)
                    setTypeC({typeC : 0})
                  }}
                >
                  농약
                </button>
                <button
                  name="type"
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => {
                    toggleTab(2)
                    setTypeF({typeF : 1})
                  }}
                >
                  비료
                </button>
              </div>
            <div className="content-tabs">
              <div
                className={toggleState === 1 ? "content  active-content" : "content"}
              >
                <div className="innerContent">
                  <input
                  type="text" 
                  className="inputChemical"
                  name="product"
                  placeholder="사용하신 농약을 입력해주세요" 
                  onChange={(e)=> setProductC({productC : e.target.value})}
                  />
                  
                  <div className="innerSet">
                    <input className="quantity"
                    type="text"
                    name="use"
                    placeholder="사용량을 입력해주세요" 
                    onChange={(e)=> {setQuantityC(e.target.value)}}/>
                    
                    <select className="measure"
                    name="unit"
                    onChange={(e)=> {setUnitC(e.target.value)}}>
                    <option value="">단위를 선택해주세요</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
              </div>

              <div
                className={toggleState === 2 ? "content  active-content" : "content"}
              >
               <div className="innerContent">
                  <input
                  type="text" 
                  name="product"
                  className="inputChemical"
                  onChange={(e)=> setProductF({productF : e.target.value})}
                  placeholder="사용하신 비료를 입력해주세요" />
                  <div className="innerSet">
                    <input className="quantity"
                    type="text" name="use"
                    placeholder="사용량을 입력해주세요" 
                    onChange={(e)=> {setQuantityF(e.target.value)}}/>

                    <select className="measure" 
                    name="unit"
                    onChange={(e)=> {setUnitF(e.target.value)}}>
                    <option value="">단위를 선택해주세요</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </TodoContent>
      )
}


const SmallTitle = styled.label`
font-size: 1.8em;
font-weight: bold;
`

const TodoContent = styled.div`
padding: 10px; 
width: 93%;
height: 30vh;
background-color: #fff;

.container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 70%;
  height: 200px;
  background: #f1f1f1;
  margin: 30px 55px;
  word-break: break-all;
  border: 1px solid rgba(0, 0, 0, 0.274);
}
.bloc-tabs {
  display: flex;
}
.tabs {
  padding: 15px;
  text-align: center;
  width: 50%;
  background: rgba(128, 128, 128, 0.075);
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.274);
  box-sizing: content-box;
  position: relative;
  outline: none;
}
.tabs:not(:last-child){
  border-right: 1px solid rgba(0, 0, 0, 0.274);
}

.active-tabs  {
  background: white;
  border-bottom: 1px solid transparent;
}

.active-tabs::before {
  content: "";
  display: block;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% + 2px);
  height: 5px;
  background: rgb(88, 147, 241);
}
.content-tabs {
  flex-grow : 1;
}
.content {
  background: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: none;
}
.content h2 {
  padding: 0px 0 5px 0px;
}
.content hr {
  width: 100px;
  height: 2px;
  background: #222;
  margin-bottom: 5px;
}
.content p {
  width: 100%;
  height: 100%;
}
.active-content {
  display: block;
}

.innerContent {
display: flex;
flex-direction: column;
width: 70%
}

.inputChemical {
  
}

.innerSet {
display: flex;
}

.quantity {
}

.measure{
    margin-left: 20px;
    width: 170px;
    background-color: white;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    padding-left: 10px;
}

`



export default SubMaterial;