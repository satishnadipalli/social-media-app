import {createSlice} from "@reduxjs/toolkit"
// This slice will make sure the message that send by both client and client 2 are effectively handled with conflict with other s ndinhs
const initialState = {
    userCredentials : JSON.parse(localStorage.getItem("userCredentials")) || null,
    currentChat : null,
    UserMessages:null 
}
const messageSlice = createSlice({
    name : "messages",
    initialState,
    reducers:{
        addLoginDetails:(state,action)=>{
            state.userCredentials = action.payload;
            localStorage.setItem("userCredentials", JSON.stringify(action.payload));
        },
        setCurrentChat:(state,action)=>{
            state.currentChat = action.payload;
        },
        setMessages:(state,action)=>{
            state.UserMessages = action.payload;
        },
        appendMessage:(state,action)=>{
            state.UserMessages.push(action.payload);
        }
    }
});

export const { addLoginDetails,setCurrentChat,setMessages,appendMessage } = messageSlice.actions;
export default messageSlice.reducer
