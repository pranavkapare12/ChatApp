import { MessageSquare } from "lucide-react"
const NoChatSelected = () =>{
    return(
        <div className="w-full flex flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <MessageSquare className="w-16 h-16 text-primary animate-bounce " />
                    </div>
                </div>
            </div>
            {/* Welcome text */}
            <h2 className="text-2xl font-bold"> Welcome to SocketChat </h2>
            <p className="text-base-content/30"> Select a Conversation from the sidebar </p>
        </div>
    )
}

export default NoChatSelected;