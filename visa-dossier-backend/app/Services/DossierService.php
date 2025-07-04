<?php

namespace App\Services;

use App\Http\Requests\UploadDossierRequest;
use App\Models\Dossier;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DossierService
{
    public function all(): array
    {
        try {
            return [
                'dossiers' => Dossier::all()->groupBy('category'),
                'status' => 200,
            ];
        } catch (\Throwable $e) {
            Log::error('Dossier Retrieval Failed: '.$e->getMessage(), ['exception' => $e]);

            return [
                'message' => 'Failed to retrieve dossiers. Please try again later.',
                'status' => 500,
            ];
        }
    }

    public function store(UploadDossierRequest $request): array
    {
        try {
            return DB::transaction(function () use ($request) {
                $file = $request->file('file');

                $dossier = Dossier::create([
                    'name' => $file->getClientOriginalName(),
                    'category' => $request->input('category'),
                    'mime_type' => $file->getClientMimeType(),
                    'path' => $file->store('dossiers', 'public'),
                    'size' => $file->getSize(),
                ]);

                return [
                    'dossier' => $dossier,
                    'status' => 201,
                ];
            });
        } catch (\Throwable $e) {
            Log::error('Dossier Upload Failed: '.$e->getMessage(), ['exception' => $e]);

            return [
                'message' => 'Failed to upload dossier. Please try again later.',
                'status' => 500,
            ];
        }
    }
}
