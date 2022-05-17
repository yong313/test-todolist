import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { DETAIL_MODAL_OPEN } from "../modules/taskSlice";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ dataObj, el, cardId, elId, index }) => {
  const { title, content } = dataObj;

  const dispatch = useDispatch();
  const openDetailModalHandler = useCallback(() => {
    dispatch(DETAIL_MODAL_OPEN({ el, cardId }));
  }, [dispatch, el, cardId]);

  return (
    <>
      <Draggable key={elId} draggableId={elId} index={index}>
        {(provided, snapshot) => {
          return (
            <CardBox
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: "none",
                backgroundColor: snapshot.isDragging ? "#323fe3" : "#fff",
                color: snapshot.isDragging ? "#fff" : "#323fe3",
                ...provided.draggableProps.style,
              }}
              onClick={openDetailModalHandler}
            >
              <CardTitle>{title}</CardTitle>
              <CardContent>{content}</CardContent>
            </CardBox>
          );
        }}
      </Draggable>
    </>
  );
};

const CardBox = styled.div`
  width: 100%;
  height: 110px;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0px 3px 10px rgba(65, 78, 245, 0.1);

  :last-child {
    margin-bottom: 0;
  }

  :hover {
    color: #fff !important;
    background-color: #323fe3 !important;
    /* background: linear-gradient(140deg, #7e87f9, #323fe3); */
  }

  :not(:hover) {
    background-color: #fff;
    color: #404df7;
  }

  animation: cardAnime 0.95s ease;
  @keyframes cardAnime {
    from {
      opacity: 0;
      margin-top: 50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const CardTitle = styled.div`
  width: 100%;
  height: 20%;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const CardContent = styled(CardTitle)`
  width: 100%;
  line-height: 1.2em;
  height: 3.6em;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

export default Card;
