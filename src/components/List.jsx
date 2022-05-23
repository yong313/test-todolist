import React, { useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ADD_MODAL_OPEN } from "../modules/taskSlice";
import Title from "./Title";
import Card from "./Card";
import Buttons from "./Buttons";
import { Droppable } from "react-beautiful-dnd";

const List = ({ el, elId, index }) => {
  const showCards = useSelector((state) => state.task[el]);
  const dispatch = useDispatch();

  const openModalHandler = useCallback(() => {
    dispatch(ADD_MODAL_OPEN(el));
  }, [dispatch, el]);

  return (
    <>
      <ListBox>
        <Title el={el} />
        <Droppable droppableId={elId} key={elId}>
          {(provided, snapshot) => {
            return (
              <CardContent
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "#7e87f9" : "#eeeffc",
                  width: "100%",
                  minHeight: "auto",
                }}
              >
                {showCards.map((dataObj, cardId) => (
                  <Card
                    dataObj={dataObj}
                    key={cardId}
                    el={el}
                    cardId={cardId}
                    elId={elId}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </CardContent>
            );
          }}
        </Droppable>
        <AddBtnBox>
          <Buttons createBtn el={el} _onClick={openModalHandler} />
        </AddBtnBox>
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  flex: 0 0 14%;
  min-width: 14%;
  max-width: 14%;
  height: 97.5%;
  background-color: #eeeffc;
  border-radius: 20px;
  margin-right: 30px;
  scroll-snap-align: start;

  :last-child {
    margin-right: 0;
  }

  animation: listAnime 0.55s ease;
  @keyframes listAnime {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (min-width: 1920px) {
    flex: 0 0 10.5%;
    min-width: 10.5%;
    max-width: 10.5%;
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  padding: 0 20px;
`;

const AddBtnBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;

export default List;
