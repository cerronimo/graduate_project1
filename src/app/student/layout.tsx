import Sidebar from "@/components/student/sidebar";
import { mockStudent } from "@/lib/mock/student";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <p className="text-lg font-bold">STAMS</p>
          <p className="text-xs text-gray-500">Öğrenci Paneli</p>
        </div>
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
          <p className="text-sm text-gray-500">Summer Training Automated Management System</p>
          <div className="text-right">
            <p className="text-sm font-medium">{mockStudent.name}</p>
            <p className="text-xs text-gray-500">{mockStudent.studentNo}</p>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}