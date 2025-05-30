import React from 'react'
import { X } from "lucide-react"
import useAuthState from "../store/useAuthStore"
import useChatStore from "../store/useChatStore"
function ChatHeader() {
  const { selectedUser , setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthState();
  return (
    <div className='p-2.5 border-b border-base-300'>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avtar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/react.svg"} alt="" className='rounded-full text-center '/>
            </div>
          </div>

          {/* User info */}
          <h3 className="font-medium">{selectedUser.name}</h3>
          <p className="text-sm text-base-content/70 ">
          {onlineUsers.includes(selectedUser._id)? "Online" : "Offline"}
          </p>
        </div>
      <button className='pr-2' onClick={() => setSelectedUser(null)}> <X /></button>
      </div>
    </div>
  )
}

export default ChatHeader
