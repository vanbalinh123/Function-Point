import { configureStore } from "@reduxjs/toolkit";

import listSlice from "./redux/list.slice";
// import factorSlice from "./redux/factor.slice";
// import weightFactorSlice from "./redux/weightFactor.slice";

const store = configureStore({
    reducer: {
        list: listSlice,
        // factor: factorSlice,
        // weightFactor: weightFactorSlice
    }
})

export default store;