import useChatStore from "../store/useChatStore";
import {useEffect , useRef} from "react"
import ChatHeader from "../components/ChatHeader"
import MessageInput from "../components/MessageInput"
import MessageSkeleton from "../components/skeleton/MessageSkeleton";
import useAuthState from "../store/useAuthStore";
import formatMessage from "../lib/utiles"
const ChatContainer = () =>{
    const {messages,getMessages,isMessageLoading,selectedUser ,subscribeToMessages,unSubscribeToMessages} = useChatStore();
    const {authUser} = useAuthState();

    const messageEndRef = useRef(null);

    useEffect(()=>{
        if(messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({ behavior :"smooth" })
        }
    },[messages])

    useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToMessages()
        return () => unSubscribeToMessages();
    },[selectedUser._id,getMessages,subscribeToMessages,unSubscribeToMessages])
    if(isMessageLoading) return (
        <div className="flex flex-1 flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

    return(
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {
                    messages.map((message) => (

                        <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start" } `} ref={messageEndRef}>
                            <div className="chat-image avatar object-cover h-8">
                                <div className="size-10 rounded-full object-cover">
                                    <img src={message.senderId === authUser._id ? authUser.profilePic || "/react.svg" : selectedUser.profilePic || "/react.svg" } alt="Profile Pic"  />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">
                                    {formatMessage(message.createdAt)}
                                </time>
                            </div>
                            <div className="chat_bubble flex flex-col">
                                {
                                message.image && (
                                 <img src={message.image} alt="" className="sm:max-w-2xs"/>   
                                )}
                                <br/>
                                {message.text && <p>{message.text}</p>}
                            </div>
                            <div className="chat-footer">
                                <label htmlFor="" className="label opacity-50">{`${(message.senderId === authUser._id) ? "Deliver" : " " } `}</label>                                
                            </div>
                        </div>
                    ))
                }
            </div>
            <MessageInput />
        </div>
    )
}
// 3:27

export default ChatContainer;