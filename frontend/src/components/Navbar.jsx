import useAuthStore from '../store/useAuthStore'
import { MessageSquare, UserSearch, Settings, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (
        <div className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop:backdrop-blur-lg bg-base-100/80 relative">
            <div className="container mx-auto px-4 h-14">
                <div className="flex items-center justify-between h-full">
                    <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MessageSquare className='w-5 h-5 text-primary' />
                        </div>
                        <h1 className="text-lg font-bold"> SocketChat </h1>
                    </Link>
                    {/* Right Section */}
                    <div className="flex items-center gap-2 ">
                        <Link to={"/setting"} className={`btn btn-sm right-5gap-2 transition-color`} >
                            <Settings className='w-4 h-4' />
                            <span className="hidden sm:inline">Setting</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link to={"/profile"} className={`btn btn-sm right-5gap-2 transition-color`} >
                                    <User className='w-4 h-4' />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                <button className="flex btn btn-sm gap-2 items-center" onClick={logout}>
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;