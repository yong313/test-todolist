import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_MODAL_OPEN } from "../modules/taskSlice";

const DetailModal = ({ el }) => {
  const dispatch = useDispatch();
  const stateCardId = useSelector((state) => state.task.logId.cardId);
  const showTask = useSelector((state) => {
    if (el === "backlog") {
      return state.task.backlog.filter((_el, idx) => idx === stateCardId);
    } else if (el === "inprogress") {
      return state.task.inprogress.filter((_el, idx) => idx === stateCardId);
    } else if (el === "done") {
      return state.task.done.filter((_el, idx) => idx === stateCardId);
    }
  });
  console.log(showTask[0]);

  // 모달 닫기
  const closeModalHandler = useCallback(() => {
    dispatch(DETAIL_MODAL_OPEN());
  }, [dispatch]);

  return (
    <>
      <DetailModalBox>
        <Content>
          <h1>{}</h1>
          <button onClick={closeModalHandler}>닫아</button>
        </Content>
      </DetailModalBox>
    </>
  );
};

const DetailModalBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(42, 50, 151, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: modalBgAnime 0.65s ease;
  @keyframes modalBgAnime {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  width: 30%;
  height: 50%;
  border-radius: 20px;
  background-color: #eeeffc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0;

  animation: modalContentAnime 0.65s ease;
  @keyframes modalContentAnime {
    from {
      opacity: 0;
      margin-bottom: 150px;
    }
    to {
      opacity: 1;
      margin-bottom: 0;
    }
  }
`;

export default DetailModal;
