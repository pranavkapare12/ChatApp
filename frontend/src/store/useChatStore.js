import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { Socket } from "socket.io-client";
import useAuthState from "./useAuthStore";


const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const resp = await axiosInstance.get("/messages/users");
      // console.log(res)
      set({ users: resp.data });
    } catch (error) {
      toast.error("Error in fetching users");
      console.log(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const resp = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: resp.data });
    } catch (error) {
      toast.error("Error in fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Optimize this
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  sendMessage: async (messageData) =>{
    const {selectedUser , messages} = get();
    try {
      const resp = await axiosInstance.post(`messages/send/${selectedUser._id}`,messageData);
      set({messages : [...messages,resp.data]})
    } catch (error) {
      toast.error("Cannot Send Message")
      console.log(error)
    }
  },

  subscribeToMessages : () =>{
    const selectedUser = get();
    if(!selectedUser) return;

    const socket = useAuthState.getState().socket;

    // Optimize it
    socket.on("newMessage",(newMessage)=>{
      set({ messages : [...get().messages,newMessage], })
    })
  },

  unSubscribeToMessages : () =>{
    // const socket = useAuthState.getState().socket;
    // socket.off("newMessage");
  }

  
}));

export default useChatStore;
