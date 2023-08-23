<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemsToBuy extends Model
{
    protected $table = 'items_to_buy';
    protected $fillable =[
        'user_id', 'item_name'
    ];
}
