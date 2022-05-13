import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    defaultData: ["backlog", "inprogress", "done"],
    modalOpen: false,
    logId: null,
    el: null,
    editBtn: false,
    backlog: [],
    inprogress: [],
    done: [],
  },

  reducers: {
    ADD_MODAL_OPEN: (state, action) => {
      state.modalOpen = !state.modalOpen;
      state.logId = null;
      state.el = action.payload;
      state.editBtn = false;
    },
    ADD_TASK: (state, action) => {
      if (state.el.el === "backlog") {
        state.backlog = [...state.backlog, action.payload];
      } else if (state.el.el === "inprogress") {
        state.inprogress = [...state.inprogress, action.payload];
      } else if (state.el.el === "done") {
        state.done = [...state.done, action.payload];
      }
    },
  },
});

export const { ADD_MODAL_OPEN, ADD_TASK } = taskSlice.actions;

export default taskSlice.reducer;
