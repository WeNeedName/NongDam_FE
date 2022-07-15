import React from "react";
import styled from "styled-components";

const eventStyleGetter = (event, start, end, isSelected) => {
  //   console.log(event);

  const style = {
    borderRadius: "0px",
    opacity: 0.8,
    border: "0px",
    display: "block",
    marginTop: "4px",
    textAlign: "center",
    backgroundColor: "#C3EDBF",
    fontColor: "#22631C"

  };

  return {
    style: style,
  };
};

export default eventStyleGetter;
