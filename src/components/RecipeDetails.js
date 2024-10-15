import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from './firebase';
import './RecipeDetails.css'; // Importa los estilos CSS

function RecipeDetails() {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL
  const [recipe, setRecipe] = useState(null); // Estado para almacenar los detalles de la receta
  const [userUid, setUserUid] = useState(null) // Estado para almacenar el UID del usuario autenticado
  const navigate = useNavigate(); // Hook de navegación para redireccionar a otras páginas
  const location = useLocation(); // Hook para obtener el estado pasado por navigate
  const apiKey = '***********************************'; // Clave de la API de Spoonacular

  // useEffect para obtener el usuario actual y su UID de Firebase Authentication
  useEffect(() =>{
    const user = auth.currentUser;
    if (user){
      setUserUid(user.uid); // Almacena el UID en el estado
    }
  }, []); // Se ejecuta una vez cuando se monta el component


  // Función para guardar la receta actual como favorita en localStorage
  const saveFavoriteRecipe = (recipe) => {
    // Recupera las recetas guardadas como favoritas para el usuario actual desde localStorage
    let favorites = JSON.parse(localStorage.getItem(`favorites_${userUid}`)) || [];
    const isFavorite = favorites.some(fav => fav.id === recipe.id); // Verifica si la receta ya está guardada como favorita
  
    if (isFavorite) {
      alert('La receta ya está guardada como favorita.'); // Si ya es favorita, muestra una alerta
    } else {
      favorites.push(recipe); // Si no es favorita, la añade a la lista de favoritos
      localStorage.setItem(`favorites_${userUid}`, JSON.stringify(favorites));
      alert(`${recipe.title} guardada como favorita!`);
    }
  };


  // useEffect para obtener los detalles de la receta usando el ID desde la API
  useEffect(() => {
    const fetchRecipeDetails = () => {
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
      axios.get(url)
        .then(response => {
          setRecipe(response.data); // Almacena los datos de la receta en el estado
        })
        .catch(error => {
          console.error('Error fetching recipe details:', error); // Manejo de errores
        });
    };
    fetchRecipeDetails(); // Llama a la función para obtener los detalles de la receta
  }, [id]); // Se ejecuta cuando cambia el ID de la receta

  if (!recipe) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los detalles de la receta

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <img className="recipe-image" src={recipe.image} alt={recipe.title} />
      <h3>Ingredientes:</h3>
      <ul className="ingredient-list">
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instrucciones:</h3>
      <div className='instructions' dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      <div className="button-container">
        <button className="favorite-button" onClick={() => saveFavoriteRecipe(recipe)}>Guardar como favorito</button>
        <button className="back-button" onClick={() => navigate('/search', {state: location.state})}>Volver a la lista</button>
      </div>
    </div>
  );
}

export default RecipeDetails;
