import React from "react";
import styled from "styled-components";

const eventStyleGetter = (event, start, end, isSelected) => {
  //   console.log(event);

  const style = {
    backgroundColor: event.title.slice(0, 1) === "+" ? "#D7EDF9" : " #FBCCCC",
    borderRadius: "0px",
    opacity: 0.8,
    color: event.title.slice(0, 1) === "+" ? "#2399DC" : "#EB3333",
    border: "0px",
    display: "block",
    marginTop: "4px",
    textAlign: "right",
    fontSize: "13px",
  };

  return {
    style: style,
  };
};

export default eventStyleGetter;
