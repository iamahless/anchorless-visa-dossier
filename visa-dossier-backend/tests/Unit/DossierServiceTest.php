<?php

namespace Tests\Unit;

use App\Http\Requests\UploadDossierRequest;
use App\Models\Dossier;
use App\Services\DossierService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class DossierServiceTest extends TestCase
{
    use RefreshDatabase;

    protected DossierService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new DossierService;
    }

    public function test_all_returns_grouped_dossiers()
    {
        Dossier::factory()->create(['category' => 'passport']);
        Dossier::factory()->create(['category' => 'passport']);
        Dossier::factory()->create(['category' => 'visa']);

        $payload = $this->service->all();

        $this->assertEquals(200, $payload['status']);
        $this->assertArrayHasKey('passport', $payload['dossiers']->toArray());
        $this->assertArrayHasKey('visa', $payload['dossiers']->toArray());
    }

    public function test_store_uploads_file_and_creates_dossier()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('test.pdf', 100, 'application/pdf');

        $mockRequest = Mockery::mock(UploadDossierRequest::class);
        $mockRequest->shouldReceive('file')->with('file')->andReturn($file);
        $mockRequest->shouldReceive('input')->with('category')->andReturn('passport');

        $payload = $this->service->store($mockRequest);

        $this->assertEquals(201, $payload['status']);
        $this->assertDatabaseHas('dossiers', [
            'name' => 'test.pdf',
            'category' => 'passport',
            'mime_type' => 'application/pdf',
        ]);

        Storage::disk('public')->assertExists($payload['dossier']->path);
    }

    public function test_store_handles_exception()
    {
        $mockRequest = Mockery::mock(UploadDossierRequest::class);
        $mockRequest->shouldReceive('file')->andThrow(new \Exception('Upload failed'));

        $payload = $this->service->store($mockRequest);

        $this->assertEquals(500, $payload['status']);
        $this->assertStringContainsString('Failed to upload dossier', $payload['message']);
    }

    public function test_delete_removes_file_and_dossier()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('delete.pdf');
        $path = $file->store('dossiers', 'public');

        $dossier = Dossier::factory()->create(['path' => $path]);

        $this->assertTrue(Storage::disk('public')->exists($path));

        $payload = $this->service->delete($dossier->id);

        $this->assertEquals(204, $payload['status']);
        $this->assertDatabaseMissing('dossiers', ['id' => $dossier->id]);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_delete_handles_model_not_found()
    {
        $payload = $this->service->delete('non-existent-id');

        $this->assertEquals(404, $payload['status']);
        $this->assertEquals('Dossier not found.', $payload['message']);
    }

    public function test_delete_handles_other_exceptions()
    {
        $mock = Mockery::mock(Dossier::class);
        $mock->shouldReceive('findOrFail')->andThrow(new \Exception('Something went wrong'));

        $this->partialMock(DossierService::class, function ($mock) {
            $mock->shouldAllowMockingProtectedMethods()
                ->shouldReceive('delete')
                ->andThrow(new \Exception('Something went wrong'));
        });

        $payload = $this->service->delete('123');

        $this->assertEquals(404, $payload['status']);
        $this->assertEquals('Dossier not found.', $payload['message']);
    }
}
