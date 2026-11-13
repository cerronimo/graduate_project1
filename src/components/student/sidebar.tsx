"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/student/dashboard", label: "Dashboard" },
  { href: "/student/application", label: "Staj Başvurusu" },
  { href: "/student/documents", label: "Belgeler" },
  { href: "/student/status", label: "Başvuru Durumu" },
  { href: "/student/reports", label: "Report" },
  { href: "/student/logbook", label: "Logbook" },
  { href: "/student/grades", label: "Değerlendirme / Not" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}