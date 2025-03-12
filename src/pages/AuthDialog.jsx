import { Toaster } from "@/components/ui/sonner"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { SignupForm } from "./Signup";
import { LoginForm } from "./Login";
import { InputOTPPattern } from "./Otp";
import { useState } from "react";
import { PasswordReset } from "./PasswordReset";

export function AuthDialog({dialogOpen,setDialogOpen,auth,setAuth,setUserInfo, setIsLogged}) {
    const [email,setEmail] = useState('')
    const [otpforgot,setOtpForgot] = useState(false)
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                {auth == "login" && <LoginForm setAuth={setAuth} setEmail={setEmail} setOtpForgot={setOtpForgot} setDialogOpen={setDialogOpen} setUserInfo={setUserInfo} setIsLogged={setIsLogged}/>}
                {auth == "signup" && <SignupForm setAuth={setAuth} setEmail={setEmail} setOtpForgot={setOtpForgot} />}
                {auth == "otp" && <InputOTPPattern setAuth={setAuth} email={email} otpforgot={otpforgot} />}
                {auth == "reset" && <PasswordReset email={email} setAuth={setAuth}/>}
                <Toaster richColors />
            </DialogContent>
        </Dialog>
    );
}
