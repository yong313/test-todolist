import React, { useCallback } from "react";
import styled from "styled-components";
import List from "../components/List";
import Buttons from "../components/Buttons";
import ListModal from "../components/ListModal";
import { useSelector, useDispatch } from "react-redux";
import { LIST_MODAL_OPEN } from "../modules/taskSlice";

const Main = () => {
  const defaultData = useSelector((state) => state.task.defaultData);
  const showListModal = useSelector((state) => state.task.listModalOpen);
  const dispatch = useDispatch();
  const addListModalHandler = useCallback(() => {
    dispatch(LIST_MODAL_OPEN());
  }, [dispatch]);

  return (
    <>
      <MainBox>
        {defaultData.map((el, idx) => {
          return <List key={idx} el={el} />;
        })}
        <AddListBtnBox>
          <Buttons addList _onClick={addListModalHandler} />
        </AddListBtnBox>
      </MainBox>
      {showListModal ? <ListModal closeHandler={addListModalHandler} /> : null}
    </>
  );
};

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  padding: 3%;
`;

const AddListBtnBox = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  right: 3%;
`;

export default Main;
