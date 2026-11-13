import DocumentsList from "@/components/student/documents-list";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Belgeler</h1>
        <p className="text-sm text-gray-500">
          Staj için gerekli belgeleri buradan yükle.
        </p>
      </div>
      <DocumentsList />
    </div>
  );
}