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

export function PasswordReset({ email, setAuth }) {
    const [loading, setLoading] = useState(false);

    const [newpassword, setNewpassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("/api/new-password", { newPassword :newpassword, email }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            toast.success("Info", {
                description: response?.data?.message,
                action: {
                    label: "Undo",
                },
            });
            setAuth("login");
        } catch (err) {
            toast.error("Error", {
                description: err.response?.data?.message,
                action: {
                    label: "Undo",
                },
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <DialogHeader>
                <DialogTitle>New Password</DialogTitle>
                <DialogDescription>
                    Enter your new password
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 mt-5">
                    <Label htmlFor="newpassword">Email</Label>
                    <Input
                        type="password"
                        name="newpassword"
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        Submit New Password
                    </Button>
                </div>
            </form>
        </div>
    );
}