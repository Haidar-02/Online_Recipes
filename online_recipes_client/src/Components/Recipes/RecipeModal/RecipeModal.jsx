import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import {
  addComment,
  getRecipeDetails,
  likeRecipe,
} from "../../../Helpers/recipes.helpers";
import { useNavigate, useParams } from "react-router-dom";

const RecipeModal = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [is_liked, setLiked] = useState(false);
  const [likes_count, setLikeCount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const recipeDetails = await getRecipeDetails(id);
        setRecipe(recipeDetails.recipeDetails.recipe);
        setLiked(recipeDetails.recipeDetails.is_liked);
        setLikeCount(recipeDetails.recipeDetails.recipe.likes_count);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    }
    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    try {
      const res = await likeRecipe(recipe.id);
      console.log(res);
      setLiked(res.isLiked);
      if (res.isLiked === false) {
        setLikeCount(likes_count - 1);
      } else {
        setLikeCount(likes_count + 1);
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await addComment(recipe.id, {
        content: commentText,
      });
      setCommentText("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-16 bg-gray-100">
      <p
        className="cursor-pointer hover:underline mb-3"
        onClick={() => navigate("/dashboard")}
      >
        ~ recipes
      </p>
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg text-white p-2 bg-yellow-600">
            Recipe Details
          </h2>
        </div>
        <div className="flex">
          <div>
            {recipe && recipe.image_url && (
              <img
                src={`http://127.0.0.1:8000/api/user/images/${recipe.image_url}`}
                alt="recipe preview"
                className="aspect-square w-[700px] object-cover rounded-sm"
              />
            )}
          </div>

          <div className="w-full px-5 ml-10 cursor-default">
            <h2 className="text-2xl tracking-wider">{recipe.title}</h2>
            <p>
              By <strong>{recipe.user.name}</strong>
            </p>
            <div className="mt-2">
              <p className="text-lg text-yellow-600">Ingredients</p>
              <p>{recipe.ingredients}</p>
            </div>
            <div className="mt-2">
              <p className="text-lg text-yellow-600">Cuisine</p>
              <p>{recipe.cuisine}</p>
            </div>
            <div className="flex items-end justify-start gap-2">
              <FavoriteIcon
                className={`mt-5 text-${
                  is_liked ? "red-500" : "gray-500"
                } cursor-pointer hover:text-red-500 transition-all`}
                onClick={handleLike}
              />
              <div>
                Liked By{" "}
                <strong className="text-red-500">{likes_count} people</strong>
              </div>
            </div>
            <div className="border-2 border-gray-800 mt-3 p-2 rounded-md h-36 overflow-auto">
              <p className="border-b-2 border-b-yellow-600">Comments</p>
              {recipe.comments.map((comment) => (
                <p key={comment.id} className="mt-2 font-bold">
                  {comment.user.name} :
                  <span className="font-normal"> {comment.content}</span>
                </p>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Add comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="text-sm p-2 ps-10 pr-10 rounded-md w-full mt-2 border-2 outline-none border-gray-500 focus:border-yellow-600 transition-all"
              />
              <CommentIcon className="text-gray-500 absolute top-4 left-2" />
              <SendIcon
                className="text-gray-500 absolute top-4 right-2 hover:text-yellow-500 transition-all cursor-pointer"
                onClick={handleAddComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
