import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Title from "./Title";
import Card from "./Card";
import AddModal from "./AddModal";
import DetailModal from "./DetailModal";
import Buttons from "./Buttons";
import { ADD_MODAL_OPEN } from "../modules/taskSlice";

const List = ({ el }) => {
  const showModal = useSelector((state) => state.task.modalOpen);
  const showDetailModal = useSelector((state) => state.task.detailModalOpen);
  const showTask = useSelector((state) => state.task[el]);
  const dispatch = useDispatch();

  const openModalHandler = useCallback(() => {
    dispatch(ADD_MODAL_OPEN(el));
  }, [dispatch, el]);

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
        <Title el={el} />
        <CardContent ref={TaskScroll}>
          {showTask.map((dataObj, idx) => (
            <Card dataObj={dataObj} key={idx} el={el} cardId={idx} />
          ))}
        </CardContent>
        <AddBtnBox>
          <Buttons createBtn el={el} _onClick={openModalHandler} />
        </AddBtnBox>
        {showModal ? <AddModal /> : null}
        {showDetailModal ? <DetailModal /> : null}
      </ListBox>
    </>
  );
};

const ListBox = styled.div`
  width: 13.5%;
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

const AddBtnBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;

export default List;
