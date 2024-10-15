import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeList.css'; // Importa los estilos CSS

// Componente RecipeList que recibe una lista de recetas como props
function RecipeList({ recipes, ingredients }) {
    const navigate = useNavigate(); // Hook para redirigir a otras rutas

    // Función para manejar el evento de ver una receta específica
    const handleViewRecipe = (id) => {
      navigate(`/recipe/${id}`, {state: {recipes, ingredients}}); // Navega a la ruta de detalles de la receta y guarda el estado de la búsqueda
    };

  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            <button onClick={() => handleViewRecipe(recipe.id)}>Ver Receta</button>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default RecipeList;
