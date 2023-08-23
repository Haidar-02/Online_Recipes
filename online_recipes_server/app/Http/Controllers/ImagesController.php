<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    public function show($filename)
    {
        $filePath = public_path('images/' . $filename);
    
        if (file_exists($filePath)) {
            return response()->file($filePath);
        } else {
            return response()->json(['message' => 'Image not found'], 404);
        }
    }
    
}
