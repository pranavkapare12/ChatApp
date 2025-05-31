import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = "/";

const useAuthState = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const resp = await axiosInstance.get("/auth/check");
      set({ authUser: resp.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log("Error in Check Auth " + error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const resp = await axiosInstance.post("/auth/signup", data);
      //console.log(res)
      set({ authUser: resp.data });
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logout Successfully");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const resp = await axiosInstance.post("/auth/login", data);
      set({ authUser: resp.data });
      toast.success("Login Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const resp = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: resp.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error in updateProfile: ", error);
      toast.error("Something went wrong while updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{userId : authUser._id},
      withCredentials:true
    });
    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers",(userIds)=>{
      set({ onlineUsers : userIds })
    })
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null }); // reset state
    }
  },
}));

export default useAuthState;
