<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    protected $table = 'meal_plans';
    
    protected $fillable = [
        'user_id', 'meal_date','meal_title'
    ];
}
