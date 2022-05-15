import React, { useCallback } from "react";
import styled from "styled-components";
import List from "../components/List";
import Buttons from "../components/Buttons";
import ListModal from "../components/ListModal";
import AddModal from "../components/AddModal";
import DetailModal from "../components/DetailModal";
import { useSelector, useDispatch } from "react-redux";
import { LIST_MODAL_OPEN } from "../modules/taskSlice";

const Main = () => {
  const defaultData = useSelector((state) => state.task.defaultData);
  const showListModal = useSelector((state) => state.task.listModalOpen);
  const showModal = useSelector((state) => state.task.modalOpen);
  const showDetailModal = useSelector((state) => state.task.detailModalOpen);

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
      </MainBox>
      <AddListBtnBox>
        <Buttons addList _onClick={addListModalHandler} />
      </AddListBtnBox>

      {showListModal ? <ListModal closeHandler={addListModalHandler} /> : null}
      {showModal ? <AddModal /> : null}
      {showDetailModal ? <DetailModal /> : null}
    </>
  );
};

const MainBox = styled.div`
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  padding: 3% 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
`;

const AddListBtnBox = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 2.5%;
  right: 3.5%;
`;

export default Main;
