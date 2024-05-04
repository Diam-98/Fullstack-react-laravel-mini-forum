<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Response;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResponseController extends Controller
{
    use ApiResponseTrait;

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'description' => 'string|required'
        ]);

        Response::create([
            'description' => $request->description,
            'author_id' => Auth::user()->id,
            'question_id' => Question::find($id)->id
        ]);

        return $this->successResponse(null, 'Reponse enregistre avec success');
    }

}
