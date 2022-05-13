import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Buttons from "./Buttons";
import { ADD_LIST } from "../modules/taskSlice";

const ListModal = ({ closeHandler }) => {
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  const dispatch = useDispatch();

  // 입력한 텍스트 저장
  const userOnText = () => {
    setTitle(titleRef.current.value);
  };

  // 리스트 추가
  const addListHandler = useCallback(() => {
    if (title.length >= 1) {
      dispatch(ADD_LIST({ title }));
    }
  }, [dispatch, title]);

  return (
    <>
      <ListModalBox>
        <Content>
          <InputBox>
            <div>
              <Label>리스트 이름</Label>
              <TitleInput
                ref={titleRef}
                title={title}
                onChange={userOnText}
                placeholder="이름을 입력해 주세요 ✨"
              />
            </div>
          </InputBox>
          <ButtonBox>
            <Buttons
              addBtn
              active={title.length >= 1}
              _onClick={addListHandler}
            />
            <Buttons cancelBtn _onClick={closeHandler} />
          </ButtonBox>
        </Content>
      </ListModalBox>
    </>
  );
};

const ListModalBox = styled.div`
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

  @media (min-width: 1920px) {
    width: 24.5%;
  }
`;

const InputBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Label = styled.h1`
  width: 100%;
  height: auto;
  color: #404df7;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  padding: 0 20px;
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

export default ListModal;
