import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleImage from "../../Assets/HomePage/right.jpg";
import "./Recipes.css";
import { useNavigate } from "react-router-dom";
import RecipeModal from "./RecipeModal/RecipeModal";
import { getAllRecipes, getRecipeDetails } from "../../Helpers/recipes.helpers";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipeDetails() {
      const response = await getAllRecipes();
      if (response && response.recipes) {
        setRecipes(response.recipes);
      }
    }

    fetchRecipeDetails();
  }, []);
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' recipes
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-default pb-2 card"
          >
            {recipe && recipe.image_url && (
              <img
                src={`https://127.0.0.1:8000/api/user/images/${recipe.image_url}`}
                alt="recipe preview"
                className="aspect-square w-[700px] object-cover rounded-sm"
              />
            )}
            <div className="w-full px-5">
              <h2 className="text-xl tracking-wider">{recipe.title}</h2>
              <p>
                By <strong>{recipe.user.name}</strong>
              </p>
            </div>
            <div w-full>
              <button
                className="text-white bg-gray-700 px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
