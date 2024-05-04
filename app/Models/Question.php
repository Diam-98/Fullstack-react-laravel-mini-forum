<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'author_id'
    ];

    public function author(){
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function responses(){
        return $this->hasMany(Response::class, 'question_id', 'id');
    }
}
