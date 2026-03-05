import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth-actions";

export default function Header({ email }: { email?: string }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-semibold">
                k
              </span>
              <span className="text-base font-semibold tracking-tight group-hover:opacity-80 transition-opacity">
                Khel Maidan
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 flex items-center justify-center text-xs font-semibold">
              {email || "Admin"}
            </div>

            
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full border flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-foreground/5 transition-colors text-left"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}