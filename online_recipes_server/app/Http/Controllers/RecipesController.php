<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\ItemsToBuy;
use App\Models\Like;
use App\Models\MealPlan;
use App\Models\Recipe;
use Carbon\Carbon;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipesController extends Controller
{
    public function getAllRecipes()
    {
        $recipes = Recipe::with('user')->get();
        return response()->json(['recipes' => $recipes]);
    }

    public function addRecipe(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'ingredients' => 'required|string',
                'cuisine' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imagePath);
            } else {
                $imagePath = null;
            }
    
            $recipe = Recipe::create([
                'title' => $validatedData['title'],
                'ingredients' => $validatedData['ingredients'],
                'cuisine' => $validatedData['cuisine'],
                'image_url' => $imagePath,
                'user_id' => Auth::id(),
            ]);
    
            return response()->json(['message' => 'Recipe created successfully', 'recipe' => $recipe]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while creating the recipe', 'error' => $e->getMessage()], 500);
        }
    }

    public function getRecipeDetails($recipeId)
    {
        $recipe = Recipe::withCount('likes')->with(['user', 'comments.user'])->find($recipeId);
    
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }
    
        $isLiked = false;
        if (auth()->check()) {
            $userId = auth()->user()->id;
            $isLiked = $recipe->likes->contains('user_id', $userId);
        }
    
        return response()->json(['recipe' => $recipe, 'is_liked' => $isLiked]);
    }

    public function likeRecipe($recipeId)
    {
        $recipe = Recipe::find($recipeId);

        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        $user = Auth::user();
        $existingLike = Like::where(['user_id' => $user->id, 'recipe_id' => $recipe->id])->first();

        if ($existingLike) {
            $existingLike->delete();
            $isLiked = false;
        } else {
            $like = new Like(['user_id' => $user->id]);
            $recipe->likes()->save($like);
            $isLiked = true;
        }

        return response()->json(['message' => 'Like operation completed', 'is_liked' => $isLiked]);
    }

    public function addComment(Request $request, $recipeId)
    {
        try {
            $validatedData = $request->validate([
                'content' => 'required|string',
            ]);
    
            $recipe = Recipe::find($recipeId);
    
            if (!$recipe) {
                return response()->json(['message' => 'Recipe not found'], 404);
            }
    
            $user = Auth::user();
            $comment = new Comment([
                'user_id' => $user->id,
                'content' => $validatedData['content'],
            ]);
            $recipe->comments()->save($comment);
    
            return response()->json(['message' => 'Comment added successfully', 'content' => $comment]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the content', 'error' => $e->getMessage()], 500);
        }
    }

    public function searchRecipes(Request $request)
    {
        $criteria = $request->input('criteria'); 
        $text = $request->input('text');    

        $query = Recipe::with(['user']);

        switch ($criteria) {
            case 1:
                $query->where('title', 'like', "%$text%");
                break;
            case 2:
                $query->where('cuisine', 'like', "%$text%");
                break;
            case 3:
                $query->where('ingredients', 'like', "%$text%");
                break;
            default:
                return response()->json(['message' => 'Invalid criteria'], 400);
        }   

        $recipes = $query->get();   

        return response()->json(['recipes' => $recipes]);
    }

    public function addMealPlan(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'meal_title' => 'required|string',
                'meal_date' => 'required|date_format:d/m/Y',
            ]);
            $formattedDate = Carbon::createFromFormat('d/m/Y', $validatedData['meal_date'])->format('Y-m-d');

            $mealPlan = MealPlan::create([
                'meal_title' => $validatedData['meal_title'],
                'meal_date' => $formattedDate,
                'user_id' => Auth::id(),
            ]);
    
            return response()->json(['message' => 'Meal plan added successfully', 'mealPlan' => $mealPlan]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the meal plan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getMealPlans()
    {
        try {
            $user = Auth::user();
            $mealPlans = $user->mealPlans;  

            return response()->json(['mealPlans' => $mealPlans]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching meal plans', 'error' => $e->getMessage()], 500);
        }
    }

    public function addItem(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'item_name' => 'required|string',
            ]);
    
            $shoppingListItem = ItemsToBuy::create([
                'item_name' => $validatedData['item_name'],
                'user_id' => Auth::id(),
            ]);
    
            return response()->json(['message' => 'Item added to shopping list successfully', 'item' => $shoppingListItem]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while adding the item to shopping list', 'error' => $e->getMessage()], 500);
        }
    }

    public function getItems()
    {
        try {
            $user = Auth::user();
            $items = $user->shoppingListItems;
    
            return response()->json(['items' => $items]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching shopping list items', 'error' => $e->getMessage()], 500);
        }
    }
    
    
}