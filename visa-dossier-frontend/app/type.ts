export type Dossier = {
	id: number
	name: string
	type: string
	url: string
	size: number
	created_at: string
}

export type DossierCardProps = {
	title?: string
	category?: string
	dossiers?: Dossier[]
	onDelete?: (id: string) => void
}