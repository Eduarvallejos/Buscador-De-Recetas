import React, { useState } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeSearch.css'; // Importa los estilos CSS

function RecipeSearch() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener el estado pasado por navigate
  const [recipes, setRecipes] = useState(location.state?.recipes || []); // Estado para almacenar las recetas obtenidas de la API o recuperar recetas anteriores si las hay
  const [ingredients, setIngredients] = useState(location.state?.ingredients || ''); // Estado para almacenar los ingredientes ingresados por el usuario o recuperar ingredientes anteriores si los hay

  const apiKey = '********************************'; // Clave de la API de Spoonacular

  // Función para buscar recetas basadas en los ingredientes proporcionados
  const searchRecipes = () => {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;
    axios.get(url) // Realiza una solicitud GET a la API de Spoonacular
      .then(response => {
        setRecipes(response.data); // Almacena los resultados de la búsqueda en el estado
      })
      .catch(error => {
        console.error('Error fetching recipes:', error); // Manejo de errores si falla la solicitud a la API
      });
  };

  const goToFavorites = () => {
    // Navegar a la página de favoritos, pero manteniendo el estado actual de las recetas
    navigate('/favorites', {state: {recipes}});
  }

  return (
    <div className="container">
      <h1>Buscar Recetas</h1>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingresa los ingredientes"
      />
      <button onClick={searchRecipes}>Buscar</button>
      <button className="link-button" onClick={goToFavorites}>Ver Mis Recetas favoritas</button>
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default RecipeSearch;
