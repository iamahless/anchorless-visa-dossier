<?php

namespace App\Http\Requests;

use App\Enums\DossierCategory;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UploadDossierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:4096'],
            'category' => ['required', 'string', Rule::in(DossierCategory::values())],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'Please upload a file.',
            'file.file' => 'The uploaded item must be a valid file.',
            'file.mimes' => 'Only PDF, JPG, JPEG, and PNG files are allowed.',
            'file.max' => 'The file size cannot exceed 4MB.',
            'category.required' => 'Please select a category for the dossier.',
            'category.string' => 'The category must be a valid string.',
            'category.in' => 'The selected category is invalid.',
        ];
    }
}
