import React from "react"; 
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SignUp from './components/SignUp';
import RegisterBusiness from './components/RegisterBusiness';
import Login from './components/Login';
import BusinessOwner from './components/BusinessOwner';
import UserHome from './components/UserHome';
import Hobbie from './components/Hobbie';
import AccountUser from './components/AccountUser';
import AccountBusiness from './components/AccountBusiness';
import TestForm from './components/TestForm';
import CreateOffer from './components/CreateOffer';
import MyHobbies from './components/MyHobbies';
import ProtectedRoutes from './components/ProtectedRoutes';
import ProtectedRoutesBusiness from './components/ProtectedRoutesBusiness';



function App() {

  return (
       <Router>
<div className="App">
   <Header/>
   <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/register-business' element={<RegisterBusiness/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/hobbie'  element={<Hobbie/>}/>

      <Route element={<ProtectedRoutes/>}>
      <Route path='/user-home'  element={<UserHome/>}/>
      <Route path='/account-user' element={<AccountUser/>}/>
      <Route path='/test'  element={<TestForm/>}/>
      <Route path='/my-hobbies'  element={<MyHobbies/>}/>
      </Route>

   <Route element={<ProtectedRoutesBusiness/>}>
      <Route path='/business-owner' element={<BusinessOwner/>}/>
      <Route path='/account-business'  element={<AccountBusiness/>}/>
      <Route path='/create-offer'  element={<CreateOffer/>}/>
      </Route>
   </Routes>

</div>
       </Router>
  );

}




export default App;
