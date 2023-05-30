import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

const slice = createSlice({
    name: 'weightFactor',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchWeightFactor.fulfilled, (state, action) => {
            const { payload } = action;
            state.list = payload;
        })
    }

})

export const fetchWeightFactor = createAsyncThunk(
    'weightFactor/fetchWeightFactor',
    async () => {
        const response = await fetch("http://localhost:3000/weightFactor");
        const data = await response.json();
        return data;
    }
)

export default slice.reducer;