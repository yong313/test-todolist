import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Title from "./Title";
import AddBtn from "./AddBtn";
import Card from "./Card";
import Modal from "./Modal";

const List = ({ el, id }) => {
  const showModal = useSelector((state) => state.task.modalOpen);
  const showTask = useSelector((state) => {
    if (el === "backlog") {
      return state.task.backlog;
    } else if (el === "inprogress") {
      return state.task.inprogress;
    } else if (el === "done") {
      return state.task.done;
    }
  });

  // 카드 추가 시 하단 스크롤 하단으로 고정
  const TaskScroll = useRef();
  const scrollToBottom = () => {
    if (TaskScroll.current) {
      TaskScroll.current.scrollTop = TaskScroll.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [showTask.length]);

  return (
    <>
      <ListBox>
        <Title id={id} el={el} />
        <CardContent ref={TaskScroll}>
          {showTask.map((dataObj, idx) => (
            <Card dataObj={dataObj} key={idx} el={el} cardId={idx} />
          ))}
        </CardContent>
        <AddBtn el={el} id={id} />
      </ListBox>
      {showModal ? <Modal /> : null}
    </>
  );
};

const ListBox = styled.div`
  width: 16.5%;
  height: 100%;
  background-color: #eeeffc;
  border-radius: 20px;
  margin-right: 30px;

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
`;

const CardContent = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  padding: 0 20px;
`;

export default List;
