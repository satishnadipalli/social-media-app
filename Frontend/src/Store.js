import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "./SliceFolder/MessageSlice";

export const store = configureStore({
    reducer:{
        messages : messageReducer
    }
})