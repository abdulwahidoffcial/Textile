import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { AuthDialog } from './AuthDialog';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";



export default function NavBar({ userInfo, setUserInfo, isLogged, setIsLogged }) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [auth, setAuth] = useState("login")

  function getback() {
    navigate("/");
  }
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserInfo(null);
    setIsLogged(false);

};

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={getback}>
              Textile DataViz
            </h1>
            <div className="hidden md:flex space-x-6">
              <NavLink className="hover:text-green-500 hover:underline" to="/dashboard">
                Dashboards
              </NavLink>
              <NavLink className="hover:text-green-500 hover:underline" to="/insights">
                Insights
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
          {isLogged ? (
                    <ul className="flex items-center gap-8">
                        <li title='Profile'>
                            <NavLink to="/profile" className="">
                                <Avatar className="size-8 bg-primary cursor-pointer select-none">
                                    <AvatarFallback className="hover:bg-green-600 font-semibold text-xl leading-8">
                                        {userInfo?.name?.slice(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </NavLink>
                        </li>
                        <li>
                            <div className="hover:text-green-500 cursor-pointer" title='Logout' onClick={logout}>
                                <LogOut />
                            </div>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center gap-8">
                        <li>
                            <Button
                                onClick={() => {
                                    setDialogOpen(true);
                                    setAuth("login");
                                }}
                                variant='secondary'
                                className="h-8 w-20 text-base hover:bg-green-600"
                            >
                                Login
                            </Button>
                        </li>
                        <li>
                            <Button
                                onClick={() => {
                                    setDialogOpen(true);
                                    setAuth("signup");
                                }}
                                className="h-8 w-20 text-base hover:bg-green-600"
                            >
                                Sign up
                            </Button>
                        </li>
                    </ul>
                )}
          </div>
          </div>
            <AuthDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} auth={auth} setAuth={setAuth} setUserInfo={setUserInfo} setIsLogged={setIsLogged} />
             </div>
    </nav>
  );
}
