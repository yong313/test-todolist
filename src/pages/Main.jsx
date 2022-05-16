import React, { useState, useCallback } from "react";
import styled from "styled-components";
import List from "../components/List";
import Buttons from "../components/Buttons";
import ListModal from "../components/ListModal";
import AddModal from "../components/AddModal";
import DetailModal from "../components/DetailModal";
import { useSelector, useDispatch } from "react-redux";
import { LIST_MODAL_OPEN } from "../modules/taskSlice";
import { DragDropContext } from "react-beautiful-dnd";

const Main = () => {
  const defaultData = useSelector((state) => state.task.defaultData);
  const [el, setEl] = useState(defaultData);
  const showListModal = useSelector((state) => state.task.listModalOpen);
  const showModal = useSelector((state) => state.task.modalOpen);
  const showDetailModal = useSelector((state) => state.task.detailModalOpen);

  const dispatch = useDispatch();
  const addListModalHandler = useCallback(() => {
    dispatch(LIST_MODAL_OPEN());
  }, [dispatch]);

  const onDragEnd = (result, el, setEl) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = el[source.droppableId];
      const destColumn = el[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setEl({
        ...el,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = el[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setEl({
        ...el,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
      <MainBox>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, el, setEl)}>
          {Object.entries(el).map(([elId, el], index) => {
            return <List key={elId} el={el} index={index} elId={elId} />;
          })}
          {/* 기존
          {defaultData.map((el, idx) => {
            return <List key={idx} el={el} />;
          })} */}
        </DragDropContext>
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
