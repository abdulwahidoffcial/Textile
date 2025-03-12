import { useState, useEffect } from "react";
import axios from "axios";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function InputOTPPattern({ email, setAuth, otpforgot }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(120);
    const [resendDisabled, setResendDisabled] = useState(true);

    // Timer effect
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const handleVerifyOTP = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/verify-otp", { email, otp, otpforgot });
            if (otpforgot) {
                setAuth("reset");  
            }else{
                setAuth("login");
            }
            toast.success("Success", {
                description: response.data.message || "OTP Verified Successfully!",
                action: {
                    label: "Undo",
                },
            });
        } catch (error) {
            toast.error("Failed", {
                description: error.response?.data?.message || "Error verifying OTP",
                action: {
                    label: "Undo",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setResendDisabled(true);
        setTimer(120);

        try {
            const response = await axios.post("/api/resend-otp", { email, otpforgot });
            toast.info("Info", {
                description: response.data.message || "New OTP Sent!",
                action: {
                    label: "Undo",
                },
            });
        } catch (error) {
            toast.error("Error", {
                description: error.response?.data?.message || "Error resending OTP",
                action: {
                    label: "Undo",
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <DialogHeader>
                <DialogTitle className="text-2xl">Please Verify OTP</DialogTitle>
                <DialogDescription>
                    Enter the OTP sent to your email: <strong>{email}</strong>
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center mt-4">
                <InputOTP maxLength={6} onChange={setOtp} value={otp}>
                    <InputOTPGroup className="my-4 ">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} className="size-12" />
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                <div className="mt-4 flex justify-between w-full px-4">
                    <Button onClick={handleVerifyOTP} disabled={loading || otp.length < 6}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleResendOTP}
                        disabled={resendDisabled}
                    >
                        {resendDisabled ? `Resend in ${timer}s` : "Resend OTP"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
