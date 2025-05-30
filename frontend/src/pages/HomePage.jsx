import useChatState  from "../store/useChatStore"
import Sidebar from "../components/Sidebar"
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer"
const Home = () => {
    const {selectedUser} = useChatState();
    return(
        <div className="h-screen w-full bg-base-200">
            <div className="flex items-center justify-center pt-12 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />
                        {/* <ChatContainer/> */}
                        {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home