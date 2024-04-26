import { setMessages } from "../SliceFolder/MessageSlice";

export async function fetchMessages(chatId,dispatch,userCredentials){
    try {
      const response = await fetch(`http://localhost:9000/getMessages/${chatId}`,{
        method:"GET",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${userCredentials.token}`
        }
      });

      if(response.ok){
        const messagesData = await response.json();
        dispatch(setMessages(messagesData));
      }
    } catch (error) {
      console.log(error);
    }
  }