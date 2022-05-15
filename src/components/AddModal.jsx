import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MODAL_OPEN, ADD_CARD, EDIT_CARD } from "../modules/taskSlice";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const showEditBtn = useSelector((state) => state.task.editBtn);
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // 입력한 텍스트 저장
  const userOnText = () => {
    setTitle(titleRef.current.value);
    setContent(contentRef.current.value);
  };

  // 만들기 모달 닫기
  const closeModalHandler = useCallback(() => {
    dispatch(ADD_MODAL_OPEN());
  }, [dispatch]);

  // 카드 추가
  const addCardHandler = useCallback(() => {
    if (title.length && content.length >= 1) {
      dispatch(ADD_CARD({ title, content }));
    }
  }, [content, dispatch, title]);

  // 카드 수정
  const editCardHandler = useCallback(() => {
    if (title.length && content.length >= 1) {
      dispatch(EDIT_CARD({ title, content }));
    }
  }, [content, dispatch, title]);

  return (
    <ModalBox>
      <Content>
        <InputBox>
          <div>
            <Label>제목</Label>
            <TitleInput
              ref={titleRef}
              title={title}
              onChange={userOnText}
              placeholder="제목을 입력해 주세요 ✨"
            />
          </div>
          <div>
            <Label>내용</Label>
            <ContentInput
              ref={contentRef}
              content={content}
              onChange={userOnText}
              placeholder="내용을 입력해 주세요 🪄"
            />
          </div>
        </InputBox>
        <ButtonBox>
          {showEditBtn ? (
            <Buttons
              editBtnTwo
              active={title.length && content.length >= 1}
              _onClick={editCardHandler}
            />
          ) : (
            <Buttons
              addBtn
              active={title.length && content.length >= 1}
              _onClick={addCardHandler}
            />
          )}
          <Buttons cancelBtn _onClick={closeModalHandler} />
        </ButtonBox>
      </Content>
    </ModalBox>
  );
};

const ModalBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(42, 50, 151, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;

  animation: modalBgAnime 0.35s ease;
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
  height: auto;
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

  @media (min-width: 1920px) {
    width: 24.5%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
    height: 50%;
    margin-bottom: 30px;

    :last-child {
      margin-bottom: 40px;
    }
  }
`;

const Label = styled.h1`
  width: 100%;
  height: auto;
  color: #404df7;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  padding: 0 20px;
  font-size: 1rem;
  box-shadow: 0px 3px 10px rgba(65, 78, 245, 0.1);
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 120px;
  border-radius: 15px;
  padding: 20px;
  font-size: 1rem;
  box-shadow: 0px 3px 10px rgba(65, 78, 245, 0.1);
`;

const ButtonBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Modal;
