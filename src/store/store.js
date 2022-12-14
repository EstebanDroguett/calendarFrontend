//------------------------------------------------------------------------7------------------------------------------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({
    reducer: {
        //------------------------------------------------------------------------9------------------------------------------------------------------------
        calendar: calendarSlice.reducer,
        //------------------------------------------------------------------------9------------------------------------------------------------------------
        ui: uiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})
//------------------------------------------------------------------------7------------------------------------------------------------------------