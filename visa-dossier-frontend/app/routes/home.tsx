import { redirect } from "react-router";
import { deleteDossier, getDossiers, uploadDossier } from "~/api";
import { VisaForm } from "~/components/visa-form";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Visa Dossier" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  try {
    return await getDossiers();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to load dossiers.",
    }
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get('intent'));
  const name = String(formData.get('name'));

  if (intent === 'upload') {
    const uploadFormData = new FormData();
    const file = formData.get('file');
    const category = String(formData.get('category'));

    if (file instanceof File && category) {
      uploadFormData.append('file', file);
      uploadFormData.append('category', category);
      try {
        return await uploadDossier(uploadFormData);
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to upload dossier."
        }
      }
    } else {
      return {
        error: "File or category is missing."
      }
    }

  } else if (intent === 'delete') {
    const dossierId = String(formData.get('dossierId'));
    try {
      return await deleteDossier(dossierId);
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Failed to delete dossier."
      }
    }

  }

  return redirect('/');
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { data } = loaderData;

  return (
    <div className="min-h-full">
      <div className="py-10">
        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <VisaForm
                title="National visa request form"
                dossiers={data?.visa_form}
                category="visa_form"
              />
              <VisaForm
                title="2 Photos"
                dossiers={data?.photo}
                category="photo"
              />
              <VisaForm
                title="Passport"
                dossiers={data?.passport}
                category="passport"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}