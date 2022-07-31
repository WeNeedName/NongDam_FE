import React from "react";
import styled, { keyframes } from "styled-components";

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: event.title.slice(0, 1) === "+" ? "#D7EDF9" : " #FBCCCC",
    borderRadius: "0px",
    opacity: 0.8,
    color: event.title.slice(0, 1) === "+" ? "#2399DC" : "#EB3333",
    border: "0px",
    display: "block",
    marginTop: "6px",
    textAlign: "right",
    fontSize: "15px",
    fontWeight: isSelected ? "500" : "400",
  };

  return {
    style: style,
  };
};

export default eventStyleGetter;
