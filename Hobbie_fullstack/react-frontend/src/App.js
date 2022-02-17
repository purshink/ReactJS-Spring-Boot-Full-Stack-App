import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/root/fragments/header/Header';
import Home from './components/root/home/Home';
import SignUp from './components/root/users/signUp/SignUp';
import RegisterBusiness from './components/root/users/signUp/RegisterBusiness';
import Login from './components/root/users/login/Login';
import BusinessOwner from './components/root/users/homeBusiness/BusinessOwner';
import UserHome from './components/root/users/homeUser/UserHome';
import Hobbie from './components/root/users/homeBusiness/Offer/Hobbie';
import AccountUser from './components/root/users/homeUser/accountUser/AccountUser';
import AccountBusiness from './components/root/users/homeBusiness/AccountBusiness/AccountBusiness';
import TestForm from './components/root/users/homeUser/test/TestForm';
import CreateOffer from './components/root/users/homeBusiness/Offer/CreateOffer';
import MyHobbies from './components/root/users/homeUser/MyHobbies';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import ProtectedRoutesBusiness from './components/protectedRoutes/ProtectedRoutesBusiness';
import EditUserProfile from "./components/root/users/homeUser/accountUser/EditUserProfile";
import EditBusinessProfile from "./components/root/users/homeBusiness/AccountBusiness/EditBusinessProfile";
import UpdateOffer from "./components/root/users/homeBusiness/Offer/UpdateOffer";
import PasswordChange from "./components/root/users/login/forgottenPassword/PasswordChange";
import SetUpNewPassword from "./components/root/users/login/forgottenPassword/SetUpNewPassword";



function App() {

   return (
      <Router>
         <div className="App">
            <Header />
            <Routes>
               
               <Route path='/' element={<Home />} />
               <Route path='/signup' element={<SignUp />} />
               <Route path='/register-business' element={<RegisterBusiness />} />
               <Route path='/login' element={<Login />} />
               <Route path='/change-password' element={<PasswordChange />} />
               <Route path='/change-password-new/:id' element={<SetUpNewPassword />} />


               <Route element={<ProtectedRoutes />}>
                  <Route path='/edit-profile' element={<EditUserProfile />} />
                  <Route path='/user-home' element={<UserHome />} />
                  <Route path='/account-user' element={<AccountUser />} />
                  <Route path='/test' element={<TestForm />} />
                  <Route path='/my-hobbies' element={<MyHobbies />} />
                  <Route path='/hobbie/:id' element={<Hobbie />} />
               </Route>

               <Route element={<ProtectedRoutesBusiness />}>
                  <Route path='/edit-business-profile' element={<EditBusinessProfile />} />
                  <Route path='/edit-offer' element={<UpdateOffer />} />
                  <Route path='/business-owner' element={<BusinessOwner />} />
                  <Route path='/account-business' element={<AccountBusiness />} />
                  <Route path='/create-offer' element={<CreateOffer />} />
                  <Route path='/account-business' element={<AccountBusiness />} />
                  <Route path='/offer/:id' element={<Hobbie />} />
               </Route>
            </Routes>

         </div>
      </Router>
   );

}




export default App;
