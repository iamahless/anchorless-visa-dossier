<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 * @method static findOrFail(string $dossierId)
 */
class Dossier extends Model
{
    protected $fillable = ['name', 'path', 'mime_type', 'category', 'size'];
}
