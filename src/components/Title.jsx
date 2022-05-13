import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Title = ({ el }) => {
  let titleText = () => {
    if (el === "backlog") {
      return <h1>백로그</h1>;
    } else if (el === "inprogress") {
      return <h1>진행중</h1>;
    } else if (el === "done") {
      return <h1>완료</h1>;
    }
  };

  const titleColor = useSelector((state) => {
    if (el === "backlog") {
      return state.task.backlog.length;
    } else if (el === "inprogress") {
      return state.task.inprogress.length;
    } else if (el === "done") {
      return state.task.done.length;
    }
  });

  return <TitleBox titleColor={titleColor > 0}>{titleText()}</TitleBox>;
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
    font-size: 1.45rem;
    font-weight: bold;
  }
`;

export default Title;
