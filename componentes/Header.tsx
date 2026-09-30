import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#D1D5DB] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Saúde Vale+ - Página inicial"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#007DB8] font-[family-name:var(--font-inter)] text-2xl font-extrabold text-white shadow-sm">
            +
          </div>

          <div>
            <h1 className="font-[family-name:var(--font-inter)] text-xl font-extrabold tracking-tight text-[#005F8F]">
              Saúde Vale<span className="text-[#22C55E]">+</span>
            </h1>

            <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/60">
              Saúde mais perto de você
            </p>
          </div>
        </Link>

        {/* ÁREA DO USUÁRIO */}
        <div className="flex items-center gap-3">

          {/* ENTRAR */}
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F] transition hover:bg-[#F5F7FA] hover:text-[#007DB8] sm:block"
          >
            Entrar
          </Link>

          {/* CADASTRO */}
          <Link
            href="/cadastro"
            className="rounded-xl bg-[#007DB8] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-bold text-white transition duration-200 hover:bg-[#005F8F]"
          >
            Criar conta
          </Link>

        </div>

      </div>
    </header>
  );
}