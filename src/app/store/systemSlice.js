import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from 'nanoid'

const BASE_URL = "http://127.0.0.1:3500/system";


const initialState = {
  systems: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchSystems = createAsyncThunk("system/fetchSystems", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addNewSystem = createAsyncThunk(
  "system/addNewSystem",
  async (initialSystem) => {
    const newObj={...initialSystem,id:nanoid()};
    const response = await axios.post(BASE_URL, newObj);
    return response.data;
  }
);

export const updateSystem = createAsyncThunk(
  "systems/updateSystem",
  async (initialSystem) => {
    const { id } = initialSystem;
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, initialSystem);
      return response.data;
    } catch (err) {
      return initialSystem;
    }
  }
);

export const deleteSystem = createAsyncThunk(
  "systems/deleteSystem",
  async (initialSystem) => {
    const { id } = initialSystem;
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response?.status === 200) return initialSystem;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSystems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSystems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.systems = action.payload;
      })
      .addCase(fetchSystems.rejected, (state, action) => {
        state.status = "failed";
        state.error = "something went wrong";
      })

      .addCase(addNewSystem.fulfilled, (state, action) => {
        action.payload.id = state.systems[state.systems.length - 1].id + 1;
        state.systems.push(action.payload);
      })

      .addCase(updateSystem.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const systems = state.systems.filter((system) => system.id !== id);
        state.systems = [...systems, action.payload];
      })

      .addCase(deleteSystem.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const systems = state.systems.filter((system) => system.id !== id);
        state.systems = systems;
      });
  },
});

export default systemSlice.reducer;
