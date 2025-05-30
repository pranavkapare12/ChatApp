import { useState } from "react";
import useAuthState from "../store/useAuthStore"
import AuthImagePattern from "../components/AuthImagePattern";
import { Link , useNavigate } from "react-router-dom"
import { Mail, MessageSquare, User, Lock, EyeOff, Eye, Loader2 } from "lucide-react"
import toast from "react-hot-toast";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass: ""
    })
    const { signup, isSigningUp } = useAuthState();
    const navigate = useNavigate();

    const validateForm = () => {
        if (!formData.name.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is Require");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.pass.trim()) return toast.error("Password is require");
        if (formData.pass.length < 6) return toast.error("Password must have at least 6 Character");

        return true;
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const success = validateForm();
        if (success === true) {
            signup(formData)
        }
    }


    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side of form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2"> Create Account </h1>
                            <p className="text text-base-content/60">Get Started with your free account</p>
                        </div>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label htmlFor="" className="label-text font-medium">Full Name</label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="z-10 size-5 text-base-content/40" />
                            </div>
                            <input type="text" className="input input-border w-full pl-11" placeholder="Jone Denoe" value={formData.name} onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value })
                            }} />
                        </div>


                        <div className="form-control">
                            <label htmlFor="" className="label-text font-medium">Email</label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="z-10 size-5 text-base-content/40" />
                            </div>
                            <input type="text" className="input input-border w-full pl-11" placeholder="Email" value={formData.email} onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }} />
                        </div>


                        <div className="form-control">
                            <label htmlFor="" className="label-text font-medium">Password</label>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="z-10 size-5 text-base-content/40" />
                            </div>
                            <input type={showPassword ? "text" : "password"} className="input input-border w-full pl-11" placeholder="Password" value={formData.password} onChange={(e) => {
                                setFormData({ ...formData, pass: e.target.value })
                            }} />
                            <button type="button" className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye className="size-5 text-base-content/40" /> : <EyeOff className="size-5 text-base-content/40" />}
                            </button>
                        </div>

                        <button className="btn btn-primary w-full" disabled={isSigningUp}>
                            {
                                isSigningUp ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin" />
                                    </>
                                ) :
                                    (
                                        "Create Account"
                                    )
                            }
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/50">Already have an account</p>
                        <Link to="/login" className="link link-primary size-2"> Login </Link>
                    </div>
                </div>
            </div>


            {/* Right Side */}

            <AuthImagePattern title="Hello" />
        </div>
    )
}

export default SignUp;