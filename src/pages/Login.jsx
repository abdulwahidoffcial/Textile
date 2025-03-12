import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { toast } from "sonner";

export function LoginForm({ setAuth, setDialogOpen, setUserInfo, setIsLogged, setEmail, setOtpForgot }) {
    // const [email, setEmail] = useState(""); // Manage email state
    // const [password, setPassword] = useState(""); // Manage password state
    const [loading, setLoading] = useState(false); // Manage loading state
    const [showforgotpassword, setShowforgotpassword] = useState(false); // Manage loading state

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Login request
            const response = await axios.post("/api/login", { email: formData.email, password: formData.password });

            // Store token and user info in localStorage
            const token = response.data.token;
            const user = response.data.user;

            // Store token and user info in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));


            toast.success("Success", {
                description: response.data.message,
                action: {
                    label: "Undo",
                    onClick: () => console.log(),
                },
            });

            //
            alert(response.data.message);

            // Set token in Axios headers
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Update user info and login state in parent component
            setUserInfo(user);
            setIsLogged(true);
            setDialogOpen(false)

        } catch (err) {
            if (err.response?.data?.verified == false) {
                setAuth("otp");
                setEmail(email);
                toast.info("Info", {
                    description: err.response?.data?.message,
                    action: {
                        label: "Undo",
                    },
                });

            } else {
                toast.error("Failed", {
                    description: err.response?.data?.message || "Login failed",
                    action: {
                        label: "Undo",
                    },
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send a request to trigger otp for password reset email
            const response = await axios.post("/api/forgot-password", { email: formData.email });

            toast.info("Info", {
                description: response?.data?.message || "Send otp to your email",
                action: {
                    label: "Undo",
                },
            });

            setAuth("otp");
            setEmail(formData.email);

        } catch (err) {
            toast.error("Failed", {
                description: err.response?.data?.message || "Failed to send otp",
                action: {
                    label: "Undo",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div >
            {showforgotpassword ? (
                <DialogHeader>
                    <DialogTitle className="text-2xl">Forgot Password</DialogTitle>
                    <DialogDescription>
                        Enter your email below to receive OTP for creating password
                    </DialogDescription>
                </DialogHeader>
            ) : (
                <DialogHeader>
                    <DialogTitle className="text-2xl">Login</DialogTitle>
                    <DialogDescription>
                        Enter your email below to login to your account
                    </DialogDescription>
                </DialogHeader>
            )}


            {showforgotpassword ? (
                <form onSubmit={handleForgotPassword}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send otp"}
                        </Button>
                    </div>
                </form>
            ): (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    onClick={() => {
                                        setShowforgotpassword(true)
                                        setOtpForgot(true)
                                    }}
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="*****"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            )}

            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button
                    variant="link"
                    className="underline underline-offset-4 p-0"
                    onClick={() => {
                        setAuth("signup");
                    }}
                >
                    Sign up
                </Button>
            </div>
        </div>
    );
}

