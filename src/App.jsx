import DashboardsPage from './pages/Chart'
import HomePage from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './pages/Nav'
import InsightsUpload from './pages/Insights'
import { useEffect, useState } from 'react'
// import Profile from './pages/Profile'
import axios from 'axios'

function App() {
  const [userInfo, setUserInfo] = useState(null);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
      console.log(token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			const storedUser = JSON.parse(localStorage.getItem('user')) || {};
			setUserInfo(storedUser);
			setIsLogged(true);
		}
	}, []);


  return (
    <>
      <div>
        <BrowserRouter>
          <NavBar userInfo={userInfo} setUserInfo={setUserInfo} isLogged={isLogged} setIsLogged={setIsLogged}/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Chart" element={<ChartsPage/>}/>
            <Route path="/insights" element={<InsightsUpload/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
