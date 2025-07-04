<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $size
 * @property mixed $mime_type
 * @property mixed $created_at
 * @property mixed $path
 */
class DossierCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'size' => $this->size,
            'type' => $this->mime_type,
            'url' => Storage::url($this->path),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
