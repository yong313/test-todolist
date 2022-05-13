import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  DETAIL_MODAL_OPEN,
  EDIT_MODAL_OPEN,
  DELETE_CARD,
} from "../modules/taskSlice";
import Buttons from "./Buttons";

const DetailModal = () => {
  const dispatch = useDispatch();
  const getCardInfo = useSelector((state) => state.task.detailInfo);
  const showCardContent = useSelector((state) => {
    if (getCardInfo.el === "backlog") {
      return state.task.backlog[getCardInfo.cardId];
    } else if (getCardInfo.el === "inprogress") {
      return state.task.inprogress[getCardInfo.cardId];
    } else if (getCardInfo.el === "done") {
      return state.task.done[getCardInfo.cardId];
    }
  });

  // 디테일 모달 닫기
  const closeModalHandler = useCallback(() => {
    dispatch(DETAIL_MODAL_OPEN());
  }, [dispatch]);

  // 수정 모달 열기
  const editModalHandelr = useCallback(() => {
    if (getCardInfo.el === "backlog") {
      dispatch(EDIT_MODAL_OPEN({ getCardInfo }));
    } else if (getCardInfo.el === "inprogress") {
      dispatch(EDIT_MODAL_OPEN({ getCardInfo }));
    } else if (getCardInfo.el === "done") {
      dispatch(EDIT_MODAL_OPEN({ getCardInfo }));
    }
  }, [dispatch, getCardInfo]);

  // 카드 삭제 하기
  const deleteCardHandler = useCallback(() => {
    if (getCardInfo.el === "backlog") {
      dispatch(DELETE_CARD({ getCardInfo }));
    } else if (getCardInfo.el === "inprogress") {
      dispatch(DELETE_CARD({ getCardInfo }));
    } else if (getCardInfo.el === "done") {
      dispatch(DELETE_CARD({ getCardInfo }));
    }
  }, [dispatch, getCardInfo]);

  return (
    <>
      <DetailModalBox>
        <Contain>
          <div className="closeBtnBox">
            <Buttons closeBtn _onClick={closeModalHandler} />
          </div>
          <ContentBox>
            <Label>제목</Label>
            <Title>
              <h1>{showCardContent.title}</h1>
            </Title>
            <Label>내용</Label>
            <TextBox>
              <h1>{showCardContent.content}</h1>
            </TextBox>
          </ContentBox>
          <ButtonBox>
            <Buttons editBtn _onClick={editModalHandelr} />
            <Buttons deleteBtn _onClick={deleteCardHandler} />
          </ButtonBox>
        </Contain>
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

const Contain = styled.div`
  width: 30%;
  height: 70%;
  border-radius: 20px;
  background-color: #eeeffc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0;
  position: relative;

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

  .closeBtnBox {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const ContentBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.h1`
  width: 100%;
  height: auto;
  color: #ccc;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Title = styled.div`
  width: 100%;
  height: auto;
  font-size: 1.35rem;
  font-weight: bold;
  color: #404df7;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 15px;
`;

const TextBox = styled(Title)`
  height: 60%;
  overflow-y: scroll;
  margin: 0;
`;

const ButtonBox = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DetailModal;
