import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

const slice = createSlice({
    name: 'factor',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchFactor.fulfilled, (state, action) => {
            const { payload } = action;
            state.list = payload;
        })
    }
})

export const fetchFactor = createAsyncThunk(
    'factor/fetchFactor',
    async () => {
        const response = await fetch("http://localhost:3000/factor");
        const data = await response.json();
        return data;
    }
)

export default slice.reducer;