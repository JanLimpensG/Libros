<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    protected $primaryKey = 'idLibro';
    
    protected $fillable = [

        'titulo',
        'autor',
        'editorial',
        'edicion',
        'condicion',
        'precio_original',

    ];
}
