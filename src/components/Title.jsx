import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Title = ({ el }) => {
  const titleColor = useSelector((state) => state.task[el].length);
  return (
    <TitleBox titleColor={titleColor > 0}>
      <h1>{el}</h1>
    </TitleBox>
  );
};

const TitleBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  color: ${(props) => (props.titleColor ? "#404df7" : "#ccc")};
  transition: all 0.85s ease;

  h1 {
    font-size: 1.35rem;
    font-weight: bold;
  }
`;

export default Title;
