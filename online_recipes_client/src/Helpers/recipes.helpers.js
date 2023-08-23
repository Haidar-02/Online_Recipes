import axios from "axios";
import { auth } from "./auth.helpers";

const baseUrl = "http://127.0.0.1:8000/api/user/";

async function getAllRecipes() {
  try {
    const res = await axios.get(`${baseUrl}getAllRecipes`, auth());
    if (res.status === 200) {
      const recipes = res.data.recipes;
      return { recipes };
    }
  } catch (error) {
    console.log(error);
  }
}

async function addRecipe(formData) {
  try {
    const res = await axios.post(`${baseUrl}addRecipe`, formData, auth());
    if (res.status === 200) {
      const recipe = res.data.recipe;
      return { recipe };
    }
  } catch (error) {
    console.log(error);
  }
}

async function getRecipeDetails(recipe_id) {
  try {
    const res = await axios.get(`${baseUrl}recipes/${recipe_id}`, auth());
    if (res.status === 200) {
      const recipeDetails = res.data;
      return { recipeDetails };
    }
  } catch (error) {
    console.log(error);
  }
}

async function likeRecipe(recipeId) {
  try {
    const res = await axios.post(
      `${baseUrl}recipes/like/${recipeId}`,
      null,
      auth()
    );
    const isLiked = res.data.is_liked;
    return { isLiked };
  } catch (error) {
    console.log(error);
  }
}

async function addComment(recipeId, commentData) {
  try {
    const res = await axios.post(
      `${baseUrl}recipes/comment/${recipeId}`,
      commentData,
      auth()
    );
    if (res.status === 200) {
      const comment = res.data.comment;
      return { comment };
    }
  } catch (error) {
    console.log(error);
  }
}

async function searchRecipes(formData) {
  try {
    const res = await axios.post(`${baseUrl}recipes/search`, formData, auth());
    if (res.status === 200) {
      const recipes = res.data.recipes;
      return { recipes };
    }
  } catch (error) {
    console.log(error);
  }
}

async function addMealPlan(mealPlanData) {
  try {
    const res = await axios.post(`${baseUrl}meal-plans`, mealPlanData, auth());
    if (res.status === 200) {
      const mealPlan = res.data.mealPlan;
      return { mealPlan };
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMealPlans() {
  try {
    const res = await axios.get(`${baseUrl}meal-plans`, auth());
    if (res.status === 200) {
      const mealPlans = res.data.mealPlans;
      return { mealPlans };
    }
  } catch (error) {
    console.log(error);
  }
}

async function addItemToShoppingList(itemData) {
  try {
    const res = await axios.post(`${baseUrl}add-item`, itemData, auth());
    if (res.status === 200) {
      const item = res.data.item;
      return { item };
    }
  } catch (error) {
    console.log(error);
  }
}

async function getShoppingListItems() {
  try {
    const res = await axios.get(`${baseUrl}shop-items`, auth());
    if (res.status === 200) {
      const items = res.data.items;
      return { items };
    }
  } catch (error) {
    console.log(error);
  }
}

async function getImageUrl(filename) {
  try {
    const res = await axios.get(`${baseUrl}images/${filename}`, auth());
    return res;
  } catch (error) {
    console.log(error);
  }
}

export {
  getAllRecipes,
  addRecipe,
  getRecipeDetails,
  likeRecipe,
  addComment,
  searchRecipes,
  addMealPlan,
  getMealPlans,
  addItemToShoppingList,
  getShoppingListItems,
  getImageUrl,
};
