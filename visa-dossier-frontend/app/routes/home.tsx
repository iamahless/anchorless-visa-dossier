import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { deleteDossier, getDossiers, uploadDossier } from "~/api";
import { VisaForm } from "~/components/visa-form";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Visa Dossier" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ }: Route.LoaderArgs) {
  const { success, response } = await getDossiers();

  return response;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'upload') {
    const uploadFormData = new FormData();
    const file = formData.get('file');
    const category = formData.get('category');

    if (file instanceof File && category) {
      uploadFormData.append('file', file);
      uploadFormData.append('category', category.toString());
      const { success, response } = await uploadDossier(uploadFormData);
      if (!success) {
        throw new Error(response.message || "Failed to upload dossier");
      }
    } else {
      throw new Error("File or category is missing in form data.");
    }

  } else if (intent === 'delete') {
    const dossierId = formData.get('dossierId');
    if (typeof dossierId === 'string') {
      const { success, response } = await deleteDossier(dossierId);
    } else {
      throw new Error("Dossier ID is missing in form data.");
    }
  }
  return redirect('/');
}


export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
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