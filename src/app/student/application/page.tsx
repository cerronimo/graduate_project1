import ApplicationForm from "@/components/student/application-form";

export default function ApplicationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Staj Başvurusu</h1>
        <p className="text-sm text-gray-500">
          Formu adım adım doldur. * işaretli alanlar zorunlu.
        </p>
      </div>
      <ApplicationForm />
    </div>
  );
}