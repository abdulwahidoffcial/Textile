import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package } from 'lucide-react'
import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

export default function Profile({ userInfo, setUserInfo }) {

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [address, setAddress] = useState([]);
    const [edit, setEdit] = useState(true)

    useEffect(async () => {
        setLoading(true)
        try {
            const response = await axios.get("/api/get-address");
            if (response.data.success) {
                response.data?.address?.items && setAddress(() => response.data.address?.items)
            }
        } catch (error) {
            console.error(error)
            toast.error("error", { description: error.response.data.message, })
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        async function profileApi() {
            try {
                const response = await axios.get('/api/profile')
                if (response.data.success) {
                    setProfile(response.data.user)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        profileApi()
    }, []);

    function editChange() {
        setEdit(false);
    }


    return (
        <div className="max-w-5xl w-full m-auto">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="col-span-1">
                        <CardContent className="flex flex-col items-center mt-10">
                            <Avatar className="w-24 h-24 mb-4">
                                {loading ? <Skeleton className="w-24 h-24" /> :
                                    <AvatarFallback className="text-5xl">{userInfo?.name?.slice(0, 1).toUpperCase()}</AvatarFallback>
                                }
                            </Avatar>
                            {loading ? <Skeleton className="w-3/4 h-5 mb-3" /> : <h2 className="text-lg font-semibold">{userInfo?.name?.slice(0, 1).toUpperCase() + userInfo?.name?.slice(1)}</h2>}

                            {loading ? <Skeleton className="w-3/4 h-5" /> : <p className="text-sm text-muted-foreground">{userInfo?.email}</p>}

                        </CardContent>
                    </Card>
                    <Card className="col-span-1 md:col-span-2">
                        <CardContent>
                            <form className="space-y-4 mt-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            className="hover:cursor-pointer"
                                            id="firstName"
                                            placeholder="John"
                                            defaultValue={userInfo?.name}
                                            disabled={edit}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="cursor-pointer px-4 py-[6px] rounded-md bg-green-600 text-white hover:bg-green-500 " onClick={editChange}>Edit</div>
                                        <Button type="submit" disabled={edit}>Update</Button>
                                    </div>
                                </div>
                            </form>
                            <div className="space-y-2 mt-4 ">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        className="cursor-pointer"
                                        id="email"
                                        type="email"
                                        placeholder="john.doe@example.com"
                                        defaultValue={userInfo?.email}
                                        disabled={true}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

