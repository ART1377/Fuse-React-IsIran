import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

const BASE_URL = "http://127.0.0.1:3500/log";

const initialState = {
  logs: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchLogs = createAsyncThunk("log/fetchLogs", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addNewLog = createAsyncThunk(
  "log/addNewLog",
  async (initialLog) => {
    const newObj = { ...initialLog, id: nanoid() };
    const response = await axios.post(BASE_URL, newObj);
    return response.data;
  }
);

export const updateLog = createAsyncThunk(
  "logs/updateLog",
  async (initialLog) => {
    const { id } = initialLog;
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, initialLog);
      return response.data;
    } catch (err) {
      return initialLog;
    }
  }
);

export const deleteLog = createAsyncThunk(
  "logs/deleteLog",
  async (initialLog) => {
    const { id } = initialLog;
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response?.status === 200) return initialLog;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = "something went wrong";
      })

      .addCase(addNewLog.fulfilled, (state, action) => {
        action.payload.id = state.logs[state.logs.length - 1].id + 1;
        state.logs.push(action.payload);
      })

      .addCase(updateLog.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const logs = state.logs.filter((log) => log.id !== id);
        state.logs = [...logs, action.payload];
      })

      .addCase(deleteLog.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const logs = state.logs.filter((log) => log.id !== id);
        state.logs = logs;
      });
  },
});

export default logSlice.reducer;
