import React, { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { auth } from "./firebase";
import './FavoritesPage.css'; // Importa los estilos CSS

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [userUid, setUserUid] = useState(null); // Estado para almacenar el UID del usuario
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() =>{
        // Obtener el usuario autenticado y su UID
        const user = auth.currentUser;
        if (user) {
            setUserUid(user.uid); // Guarda el UID en el estado
        }
    }, []);

    useEffect(() => {
        if (userUid) {
            // Cargar favoritos específicos del usuario desde localStorage
            const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userUid}`)) || [];
            setFavorites(savedFavorites);
        }
    }, [userUid]);// Ejecutar este efecto solo cuando el UID del usuario esté disponible

    const clearFavorites = () => {
        if (userUid)
            {localStorage.removeItem(`favorites_${userUid}`);  // Borra solo las recetas favoritas
        setFavorites([]); // Actualiza el estado para reflejar que ya no hay favoritos
        navigate('/search', {state: location.state});  // Redirige a la página de búsqueda
        }
    };

    const returnToSeach = () => {
        navigate('/search', {state: {recipes: location.state?.recipes || []}});
    }


    return (
        <div className="favorites-container">
            <h1 className="favorites-header">Tus Recetas Favoritas</h1>
            {favorites.length > 0 ? (
                <div className="favorites-list">
                    {favorites.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title} />
                            <h3>Ingredientes:</h3>
                            <ul>
                                {recipe.extendedIngredients.map(ingredient => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                            <h3>Instrucciones:</h3>
                            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-favorites">No tienes recetas guardadas como favoritas.</p>
            )}
            <div className="button-container">
                <button onClick={clearFavorites}>Borrar todas las recetas favoritas</button>
                <button onClick={returnToSeach}>Volver a la lista</button>
            </div>
        </div>
    );
}

export default FavoritesPage;
