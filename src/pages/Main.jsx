import React from "react";
import styled from "styled-components";
import List from "../components/List";
import { useSelector } from "react-redux";

const Main = () => {
  const defaultData = useSelector((state) => state.task.defaultData);

  return (
    <>
      <MainBox>
        {defaultData.map((el, idx) => {
          return <List key={idx} el={el} id={idx} />;
        })}
      </MainBox>
    </>
  );
};

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 3%;
`;

export default Main;
