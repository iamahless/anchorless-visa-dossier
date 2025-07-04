<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadDossierRequest;
use App\Http\Resources\DossierCollection;
use App\Services\DossierService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class DossierController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(protected DossierService $dossierService) {}

    public function store(UploadDossierRequest $request): JsonResponse
    {
        $payload = $this->dossierService->store($request);

        if ($payload['status'] === Response::HTTP_CREATED) {
            return response()->json([
                'data' => new DossierCollection($payload['dossier']),
            ], Response::HTTP_CREATED);
        }

        return response()->json([
            'message' => $payload['message'],
        ], $payload['status'] ?? Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
