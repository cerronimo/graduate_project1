import Link from "next/link";

export default function EvaluatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-800 lg:flex">
      <aside className="border-b border-[#dce6f2] bg-white lg:min-h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 px-6 py-6 lg:border-b lg:border-[#e7edf5]">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#07509c] text-lg font-bold text-white">DÜ</div>
          <div>
            <p className="text-sm font-bold leading-tight text-[#073d7b]">DOĞU AKDENİZ</p>
            <p className="text-xs font-medium tracking-wide text-[#356392]">ÜNİVERSİTESİ</p>
          </div>
        </div>
        <div className="px-4 pb-4 lg:pt-7">
          <p className="mb-3 hidden px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:block">Değerlendirici Paneli</p>
          <nav aria-label="Değerlendirici menüsü">
            <Link
              href="/evaluator/assigned"
              aria-current="page"
              className="flex items-center gap-3 rounded-lg bg-[#eaf3fd] px-4 py-3 text-sm font-semibold text-[#07509c]"
            >
              <span className="h-2 w-2 rounded-full bg-[#07509c]" aria-hidden="true" />
              Atanan Başvurular
            </Link>
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-4 border-b border-[#dce6f2] bg-white px-5 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-sm font-bold text-[#07509c]">STAMS</p>
            <p className="text-xs text-slate-500">Yaz Stajı Yönetim Sistemi</p>
          </div>
          <span className="rounded-full border border-[#dce6f2] bg-[#f7faff] px-4 py-2 text-sm font-medium text-[#174a80]">
            Değerlendirici
          </span>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
