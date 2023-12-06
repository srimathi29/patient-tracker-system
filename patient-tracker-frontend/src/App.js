import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupPage from './pages/NewMeetup';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import MainNavigation from './components/layout/MainNavigation';
import AuthContext, { AuthContextProvider } from './store/auth-context';
import SignUpPage from './pages/SignUpPage';
import DoctorPage from './pages/DoctorPage';
import DoctorRoutes from './components/Routes/DoctorRoutes';
import HomePage from './pages/HomePage';

//dummy user data for testing
const user = {
  isLoggedIn: true,
  role: 'doctor'
};

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
    {authCtx.isAuthenticated ? (
      authCtx.userRole === 'doctor' && <DoctorRoutes />
      // after pressing login button the routes and pages are not changing
      // the login page is still there
      ) : (
        <Layout title="PTMS" role="none">
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/new-meetup' element={<NewMeetupPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        
        </Routes>
        </Layout>
      )}
  </div>  
  
  );
}

export default App;

