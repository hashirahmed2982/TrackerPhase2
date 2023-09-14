
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from './pages/home';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme';
import Login from "./pages/login/Login"
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from "./components/hooks/useAuthContext";
import HomeAdmin from "./pages/admin/admin_home";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { userurl } from "./components/url";
import Settings from './pages/admin/settings';
import Account from './pages/account/account';



const App = () => {
  const theme = createTheme();
  const {user} = useAuthContext();
  const [userdata, setuserdata] = useState([]);

  useEffect(() => {
    getUser();
	
    
  }, [user,userdata]);
  const getUser = async () => {
	if(user){
		await axios.get(userurl,{headers: {'Authorization': 'Bearer ' + user['token']},}).then(({ data }) => {
			setuserdata(data[0]);
			console.log("changed ",userdata)
		  })
		  .catch((error) => {
			console.log(error);
		  });
	}
	
	
};
  
  return (
		<>
		<Toaster position='bottom-right' toastOptions={{duration: 5000}} />
		<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route>
						<Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
	
							<Route
								path="/"
								element={user ? <Navigate to="/home"/> :<Navigate to="/login"/>}
							/>
							<Route
								path="/home"
								element={user && userdata['role'] === 'admin'? <HomeAdmin /> :user ? <Home />: <Navigate to="/login"/>}
							/>
							<Route
								path="/settings"
								element={ user && userdata['role'] === 'admin'?<Settings user={user} />:<Navigate to="/login"/> }
							/>
							<Route
								path="/account"
								element={ user && userdata ?<Account userdata={userdata} user={user}/>:<Navigate to="/login"/> }
							/>
							

						</Route>
					</Routes>
				</Router>
			</ThemeProvider>
		</>
	  )
  
  
}
export default App;