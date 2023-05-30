import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

const slice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        productDeleted(state, action) {
            const { payload } = action;
            state.list = state.list.filter(item => item.id !== payload);
        },
    },
    extraReducers: builder => {
        builder
        .addCase(fetchProduct.fulfilled, (state, action) => {
            const { payload } = action;
            state.list = payload;
        })
        .addCase(saveNewProduct.fulfilled, (state, action) => {
            const { payload } = action;
            state.list.push(payload);
        })
        .addCase(deletedProduct.fulfilled, (state, action) => {
            const { payload } = action;
            state.list = state.list.filter(item => item.id !== payload);
        })
        .addCase(updateProductList.fulfilled, (state, action) => {
            const { payload } = action;
            const itemUpdate = state.list.find(item => item.id === payload.id);
            const itemIndex = state.list.findIndex(item => item.id === payload.id);
            state.list[itemIndex] = itemUpdate;
        })
    }
})

export const fetchProduct = createAsyncThunk(
    'list/fetchProduct',
    async (product) => {
        console.log(product.name)
        // const response = await fetch(`http://localhost:3000/lists?name=${product.name}`);
        const response = await fetch(`http://localhost:3000/lists`);
        const data = await response.json();
        console.log(data)
        return data;
    }
)

export const saveNewProduct = createAsyncThunk(
    'list/saveNewProduct',
    async (product) => {
        const response = await fetch('http://localhost:3000/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = response.json();
        return data;
    }
)

export const deletedProduct = createAsyncThunk(
    'list/deletedProduct',
    async (id) => {
        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = response.json();
        return data;
    }
)

export const updateProductList = createAsyncThunk(
    'list/updateProductList',
    async(item) => {
        const reponse = await fetch(`http://localhost:3000/lists/${item.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        })
        const data = await reponse.json();
        console.log(data)
        return(data)
    }
)

export const {
    productDeleted,
    filterProduct
} = slice.actions;

export default slice.reducer;
