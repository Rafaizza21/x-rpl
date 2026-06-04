<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Public routes for viewing data on the frontend
Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::apiResource('skills', SkillController::class)->only(['index', 'show']);
Route::apiResource('experiences', ExperienceController::class)->only(['index', 'show']);
Route::post('/messages', [MessageController::class, 'store']); // Public can send messages

// Protected routes (Admin only)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/user', function (Request $request) { 
        return $request->user(); 
    });

    // Admin endpoints for CRUD operations
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('skills', SkillController::class)->except(['index', 'show']);
    Route::apiResource('experiences', ExperienceController::class)->except(['index', 'show']);
    
    // Admin endpoints for managing messages
    Route::get('/messages', [MessageController::class, 'index']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
});
