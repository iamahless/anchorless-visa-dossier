import { PaperClipIcon } from '@heroicons/react/20/solid';
import React, { type FormEvent } from 'react';
import { useFetcher } from "react-router";
import type { DossierCardProps } from '~/type';
import ErrorNotification from './error-notification';
import SuccessNotification from './success-notification';

export function VisaForm({ title, category, dossiers = [] }: DossierCardProps) {
	const fetcher = useFetcher();
	let error: React.ReactNode;
	let success: React.ReactNode;
	let isUploading = fetcher.state !== "idle";

	if (fetcher.data?.error) {
		error = <ErrorNotification
			showErrorPopup={!!fetcher?.data.error}
			errorMessage={fetcher?.data.error || "An error occurred while processing your request."}
		/>
	}
	if (fetcher.data?.success) {
		success = <SuccessNotification
			showSuccessPopup={!!fetcher?.data.success}
			successMessage={fetcher?.data.success || "The operation was successful"}
		/>
	}

	return (
		<>
			{success}
			<div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
				<div className="px-4 py-5 sm:px-4">
					<h3 className="text-base font-semibold text-gray-900">{title}</h3>
				</div>
				<div className="px-4 py-5 sm:p-4 min-h-32">
					{dossiers.length === 0 ? (
						<h2 className="text-gray-500 text-center">No dossiers found.</h2>
					) : (
						<ul role="list">
							{dossiers.map((dossier) => (
								<li className="flex items-center justify-between py-2 text-sm/6" key={dossier.id}>
									<div className="flex w-0 flex-1 items-center">
										<PaperClipIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
										<div className="ml-4 flex min-w-0 flex-1 gap-2">
											<span className="truncate font-medium">{dossier.name}</span>
										</div>
									</div>
									<div className="ml-4 flex shrink-0">
										<fetcher.Form method="post" onSubmit={(event: FormEvent) => {
											if (
												!confirm(
													"Please confirm you want to delete this record."
												)
											) {
												event.preventDefault();
											}
										}}>
											<input type="hidden" name="intent" value="delete" />
											<input type="hidden" name="name" value={dossier.name} />
											<input type="hidden" name="dossierId" value={dossier.id} />
											<button
												type="submit"
												className="rounded-md bg-white font-medium text-red-600 hover:text-red-500"
											>
												Delete
											</button>
										</fetcher.Form>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="px-4 py-4 sm:px-4">
					<p id="file-description" className="mt-0 text-sm text-gray-500">
						PDF, JPG, PNG (max: 4MB)
					</p>
					<fetcher.Form method="post" encType="multipart/form-data" className="mt-1 sm:flex sm:items-center">
						<div className="w-full sm:max-w-xs">
							<input type="hidden" name="intent" value="upload" />
							<input type="hidden" name="category" value={category} />
							<input
								name="file"
								type="file"
								required
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
							/>
						</div>
						<button
							type="submit"
							className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
						>
							{isUploading ? 'Uploading...' : 'Upload'}
						</button>
					</fetcher.Form>
				</div>
			</div>
			{error}
		</>
	);
}