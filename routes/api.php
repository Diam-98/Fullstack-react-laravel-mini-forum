<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', [AuthController::class, 'me'])->middleware('auth:api');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('/question', QuestionController::class)->middleware('auth:api');
Route::get('/get-my-questions', [UserController::class, 'getMyQuestions'])->middleware('auth:api');
Route::apiResource('/question.response', ResponseController::class);
Route::get('/get-my-responses', [UserController::class, 'getMyResponses'])->middleware('auth:api');