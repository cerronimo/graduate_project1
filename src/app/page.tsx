import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .limit(1);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">STAMS</h1>

        <p className="mt-4">
          {error
            ? `Bağlantı hatası: ${error.message}`
            : "Supabase bağlantısı başarılı!"}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Bulunan kayıt: {data?.length ?? 0}
        </p>
      </div>
    </main>
  );
}