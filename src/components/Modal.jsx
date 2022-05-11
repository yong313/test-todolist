import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ADD_MODAL_OPEN, ADD_TASK } from "../modules/taskSlice";

const Modal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const modalTitle = useSelector((state) => state.task.el);
  const showBtn = useSelector((state) => state.task.editBtn);
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // 입력한 텍스트 저장
  const userOnText = () => {
    setTitle(titleRef.current.value);
    setContent(contentRef.current.value);
  };

  // 모달 닫기
  const closeModalHandler = useCallback(() => {
    dispatch(ADD_MODAL_OPEN());
  }, [dispatch]);

  // 테스크 추가
  const addTaskHandler = useCallback(() => {
    if (title.length && content.length >= 1) {
      dispatch(ADD_TASK({ title, content, modalTitle }));
      closeModalHandler();
    }
  }, [closeModalHandler, content, dispatch, title, modalTitle]);

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
          {showBtn ? (
            <EditTaskBtn>수정하기</EditTaskBtn>
          ) : (
            <AddTaskBtn
              onClick={addTaskHandler}
              active={title.length && content.length >= 1}
            >
              만들기
            </AddTaskBtn>
          )}
          <CloseModalBtn onClick={closeModalHandler}>취소</CloseModalBtn>
        </ButtonBox>
      </Content>
    </ModalBox>
  );
};

const ModalBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(42, 50, 151, 0.1);
  position: fixed;
  top: 0;
  left: 0;
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
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddTaskBtn = styled.button`
  width: 38%;
  height: 50px;
  border-radius: 15px;
  font-size: 1.05rem;
  font-weight: bold;
  margin-right: 3.5%;
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  color: ${(props) => (props.active ? "#fff" : "#7f7f7f")};
  background-color: ${(props) => (props.active ? "#404df7" : "#fff")};
  transition: all 0.35s ease;
`;

const EditTaskBtn = styled(AddTaskBtn)``;

const CloseModalBtn = styled(AddTaskBtn)`
  margin: 0;
  cursor: pointer;

  :hover {
    color: #fff;
    background-color: #ff7a7a;
  }
`;

export default Modal;
