import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { ADD_MODAL_OPEN } from "../modules/taskSlice";

const AddBtn = ({ el }) => {
  const dispatch = useDispatch();

  const openModalHandler = useCallback(() => {
    dispatch(ADD_MODAL_OPEN({ el }));
  }, [dispatch, el]);

  return (
    <AddBtnBox>
      <button onClick={openModalHandler}>새 카드 만들기</button>
    </AddBtnBox>
  );
};

const AddBtnBox = styled.div`
  width: 100%;
  height: 10%;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;

  button {
    font-size: 1.15rem;
    font-weight: bold;

    :hover {
      transition: all 0.35s ease;
      color: #404df7;
    }
    :not(:hover) {
      transition: all 0.35s ease;
      color: #ccc;
    }
  }
`;

export default AddBtn;
