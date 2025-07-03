<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dossier extends Model
{
    protected $fillable = ['name', 'path', 'mime_type', 'category'];
}
