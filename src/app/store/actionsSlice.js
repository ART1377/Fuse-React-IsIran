import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from 'nanoid'


const BASE_URL = "http://127.0.0.1:3500/action";

const initialState = {
  actions: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchActions = createAsyncThunk(
  "action/fetchActions",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const addNewAction = createAsyncThunk(
  "action/addNewAction",
  async (initialAction) => {
    const newObj = { ...initialAction, id: nanoid() };
    const response = await axios.post(BASE_URL, newObj);
    return response.data;
  }
);

export const updateAction = createAsyncThunk(
  "actions/updateAction",
  async (initialAction) => {
    const { id } = initialAction;
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, initialAction);
      return response.data;
    } catch (err) {
      return initialAction;
    }
  }
);

export const deleteAction = createAsyncThunk(
  "actions/deleteAction",
  async (initialAction) => {
    const { id } = initialAction;
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response?.status === 200) return initialAction;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const actionsSlice = createSlice({
  name: "action",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchActions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.actions = action.payload;
      })
      .addCase(fetchActions.rejected, (state, action) => {
        state.status = "failed";
        state.error = "something went wrong";
      })

      .addCase(addNewAction.fulfilled, (state, action) => {
        action.payload.id = state.actions[state.actions.length - 1].id + 1;
        state.actions.push(action.payload);
      })

      .addCase(updateAction.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const actions = state.actions.filter(
          (actionData) => actionData.id !== id
        );
        state.actions = [...actions, action.payload];
      })

      .addCase(deleteAction.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const actions = state.actions.filter(
          (actionData) => actionData.id !== id
        );
        state.actions = actions;
      });
  },
});

export default actionsSlice.reducer;
