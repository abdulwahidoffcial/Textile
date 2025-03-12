import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner";

export function SignupForm({ setAuth, setEmail, setOtpForgot }) {
    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    // State for loading and error handling
    const [loading, setLoading] = useState(false)

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() // Prevent page refresh
        setOtpForgot(false)
        setLoading(true)

        try {
            const response = await axios.post("/api/register", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // Include if using cookies for authentication
            })


            setEmail(formData.email)
            toast.info("Info", {
                description: response?.data?.message,
                action: {
                    label: "Undo",
                },
            });
            setAuth("otp")

        } catch (err) {
            if (err.response?.data?.verified) {
                // alert()
                toast.info("Info", {
                    description: err.response?.data?.message,
                    action: {
                        label: "Undo",
                    },
                });
                setAuth("login")
            } else {
                toast.info("Info", {
                    description: err.response?.data?.message || 'Something went wrong',
                    action: {
                        label: "Undo",
                    },
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <DialogHeader>
                <DialogTitle className="text-2xl">Sign up</DialogTitle>
                <DialogDescription>Create your new account</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Create password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="*****"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    {/* <Button variant="outline" className="w-full">
                        Sign Up with Google
                    </Button> */}
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Button
                    variant="link"
                    className="underline underline-offset-4 p-0"
                    onClick={() => setAuth("login")}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}
