const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function getDossiers() {
	const response = await fetch(`${BASE_URL}/dossiers`);

	if (response.status === 200) {
		return response.json();
	}

	const errorText = await response.json();
	throw new Error(errorText?.message || 'Failed to fetch dossiers');
}

export async function uploadDossier(formData: any) {
	const response = await fetch(`${BASE_URL}/dossiers`, {
		method: 'POST',
		body: formData,
	});

	if (response.status === 201) {
		return response.json();
	}

	const errorText = await response.json();
	throw new Error(errorText?.message || 'Failed to upload dossier');
}

export async function deleteDossier(dossierId: string) {
	const response = await fetch(`${BASE_URL}/dossiers/${dossierId}`, {
		method: 'DELETE',
	});

	if (response.status === 204) {
		return null;
	}

	const errorText = await response.json();
	throw new Error(errorText?.message || 'Failed to delete dossier');
}