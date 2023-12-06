import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupPage from './pages/NewMeetup';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import MainNavigation from './components/layout/MainNavigation';
import AuthContext from './store/auth-context';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
  <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>  
  <Layout>
    <Routes>
        <Route path='/' element={<AllMeetupsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />

        <Route path='/new-meetup' element={<NewMeetupPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
    </Routes>
  </Layout>
  </AuthContext.Provider>
  );
}

export default App;

