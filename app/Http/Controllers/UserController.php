<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Http\Resources\ResponseResource;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getMyQuestions(){
        return QuestionResource::collection(
            Question::where('author_id', Auth::user()->id)->get()
        );
    }

    public function getMyResponses(){
        return ResponseResource::collection(
            Response::where('author_id', Auth::user()->id)->get()
        );
    }
}
