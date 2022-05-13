import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    defaultData: ["백로그", "진행중", "완료"],
    modalOpen: false,
    detailModalOpen: false,
    listModalOpen: false,
    detailInfo: [],
    listTitle: null,
    cardId: null,
    editBtn: false,
    백로그: [],
    진행중: [],
    완료: [],
  },

  reducers: {
    // 리스트 모달
    LIST_MODAL_OPEN: (state) => {
      state.listModalOpen = !state.listModalOpen;
    },
    // 리스트 추가
    ADD_LIST: (state, action) => {
      state.defaultData = [...state.defaultData, action.payload.title];
      state[action.payload.title] = [];
      state.listModalOpen = false;
    },
    // 만들기 모달
    ADD_MODAL_OPEN: (state, action) => {
      state.modalOpen = !state.modalOpen;
      state.listTitle = action.payload;
      state.editBtn = false;
    },
    // 만들기 모달 => 카드 추가
    ADD_CARD: (state, action) => {
      // if (state.listTitle.el === "backlog") {
      //   state.backlog = [...state.backlog, action.payload];
      // } else if (state.listTitle.el === "inprogress") {
      //   state.inprogress = [...state.inprogress, action.payload];
      // } else if (state.listTitle.el === "done") {
      //   state.done = [...state.done, action.payload];
      // }
      state[state.listTitle] = [...state[state.listTitle], action.payload];
      state.modalOpen = false;
    },
    // 디테일 모달
    DETAIL_MODAL_OPEN: (state, action) => {
      state.detailModalOpen = !state.detailModalOpen;
      state.detailInfo = action.payload;
    },
    // 디테일 모달 => 삭제
    DELETE_CARD: (state, action) => {
      state[action.payload.getCardInfo.el] = state[
        action.payload.getCardInfo.el
      ].filter((_, idx) => {
        return idx !== action.payload.getCardInfo.cardId;
      });
      state.detailModalOpen = false;
    },
    // 수정 모달
    EDIT_MODAL_OPEN: (state, action) => {
      state.detailModalOpen = false;
      state.modalOpen = true;
      state.editBtn = true;
      state.listTitle = action.payload.getCardInfo;
      state.cardId = action.payload.getCardInfo.cardId;
    },
    // 수정 모달 => 수정
    EDIT_CARD: (state, action) => {
      // if (state.listTitle === "backlog") {
      //   state.backlog[state.cardId] = action.payload;
      // } else if (state.listTitle === "inprogress") {
      //   state.inprogress[state.cardId] = action.payload;
      // } else if (state.listTitle === "done") {
      //   state.done[state.cardId] = action.payload;
      // }
      state[state.listTitle.el][state.cardId] = action.payload;
      state.modalOpen = false;
    },
  },
});

export const {
  LIST_MODAL_OPEN,
  ADD_LIST,
  ADD_MODAL_OPEN,
  ADD_CARD,
  DETAIL_MODAL_OPEN,
  EDIT_MODAL_OPEN,
  EDIT_CARD,
  DELETE_CARD,
} = taskSlice.actions;

export default taskSlice.reducer;
