<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dossier>
 */
class DossierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word.'.pdf',
            'category' => $this->faker->word,
            'mime_type' => 'application/pdf',
            'path' => 'dossiers/'.$this->faker->uuid.'.pdf',
            'size' => $this->faker->numberBetween(1000, 1000000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
