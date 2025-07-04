
const BASE_URL = 'http://visa-dossier-backend.test/api';

export async function getDossiers() {
	const response = await fetch(`${BASE_URL}/dossiers`);
	if (response.status !== 200) {
		return { success: false, error: response.json() };
	}
	return { success: true, response: response.json() };
}

export async function uploadDossier(formData: any) {
	const response = await fetch(`${BASE_URL}/dossiers`, {
		method: 'POST',
		body: formData,
	});

	if (response.status === 201) {
		return { success: true, response: await response.json() };
	}

	return response.json();
}

export async function deleteDossier(dossierId: string) {
	const response = await fetch(`${BASE_URL}/dossiers/${dossierId}`, {
		method: 'DELETE',
	});
	if (response.status === 204) {
		return { success: true, response: null };
	}
	return { success: false, response: await response.json() };
}