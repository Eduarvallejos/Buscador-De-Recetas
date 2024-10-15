import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RecipeSearch from './components/RecipeSearch';
import RecipeDetails from './components/RecipeDetails';
import FavoritesPage from './components/FavoritesPage';
import ProtectedLayout from './components/LogoutButton';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<ProtectedLayout> <RecipeSearch /> </ProtectedLayout>} />
        <Route path="/recipe/:id" element={<ProtectedLayout> <RecipeDetails /></ProtectedLayout>} />
        <Route path="/favorites" element={<ProtectedLayout><FavoritesPage/> </ProtectedLayout>}/>
      </Routes>
    </Router>
  );
}


export default App;
