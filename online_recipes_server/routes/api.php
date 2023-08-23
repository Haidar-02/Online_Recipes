<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\RecipesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(["middleware" => "auth:api","prefix" => "user"], function(){
        Route::post("/logout", [AuthController::class, "logout"]);
        Route::post("/refresh", [AuthController::class, "refresh"]);

        Route::get("/getAllRecipes", [RecipesController::class, "getAllRecipes"]);
        Route::post("/addRecipe", [RecipesController::class, "addRecipe"]);
        Route::get('/recipes/{recipeId}', [RecipesController::class, 'getRecipeDetails']);
        Route::post('/recipes/like/{recipeId}', [RecipesController::class, 'likeRecipe']);
        Route::post('/recipes/comment/{recipeId}', [RecipesController::class, 'addComment']);
        Route::post('/recipes/search', [RecipesController::class, 'searchRecipes']);
        Route::post('/meal-plans', [RecipesController::class, 'addMealPlan']);
        Route::get('/meal-plans', [RecipesController::class, 'getMealPlans']);
        Route::post('/add-item', [RecipesController::class, 'addItem']);
        Route::get('/shop-items', [RecipesController::class, 'getItems']);

        Route::get('/images/{filename}', [ImagesController::class, 'show']);
});
Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);