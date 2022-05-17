import React, { useCallback } from "react";
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
  const showListModal = useSelector((state) => state.task.listModalOpen);
  const showModal = useSelector((state) => state.task.modalOpen);
  const showDetailModal = useSelector((state) => state.task.detailModalOpen);

  const dispatch = useDispatch();
  const addListModalHandler = useCallback(() => {
    dispatch(LIST_MODAL_OPEN());
  }, [dispatch]);

  const onDragEnd = (result, defaultData) => {
    if (!result.destination) return;
    console.log(result);

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const sourceArray = defaultData[result.source.droppableId];
    const destinationArray = defaultData[result.destination.droppableId];
    const [removed] = sourceArray.splice(startIndex, 1);
    if (result.source.droppableId === result.destination.droppableId) {
      sourceArray.splice(endIndex, 0, removed);
      this.el[result.destination.droppableId] = sourceArray;
    } else {
      destinationArray.splice(endIndex, 0, removed);
      this.el[result.source.droppableId] = sourceArray;
      this.el[result.destination.droppableId] = destinationArray;
    }
  };

  return (
    <>
      <MainBox>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, defaultData)}>
          {Object.entries(defaultData).map(([elId, el], index) => {
            return <List key={elId} el={el} index={index} elId={elId} />;
          })}
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
