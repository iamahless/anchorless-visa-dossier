<?php

use App\Http\Controllers\Api\DossierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('dossiers')->group(function () {
    Route::post('/', [DossierController::class, 'store'])->name('upload-dossier');
});
