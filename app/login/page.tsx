import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">

      {/* HEADER */}
      <header className="border-b border-[#D1D5DB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Saúde Vale+ - Página inicial"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#007DB8] font-[family-name:var(--font-inter)] text-2xl font-extrabold text-white">
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

          <Link
            href="/cadastro"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:text-[#007DB8]"
          >
            Criar conta
          </Link>

        </div>
      </header>

      {/* LOGIN */}
      <section className="flex min-h-[calc(100vh-89px)] items-center px-6 py-12">

        <div className="mx-auto w-full max-w-md">

          {/* TÍTULO */}
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8ED3F5]/30 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#007DB8]">
              +
            </div>

            <span className="mt-6 block font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-widest text-[#22C55E]">
              Saúde Vale+
            </span>

            <h2 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827]">
              Bem-vindo de volta
            </h2>

            <p className="mt-3 font-[family-name:var(--font-roboto)] leading-6 text-[#111827]/60">
              Entre na sua conta para acessar seus serviços.
            </p>

          </div>

          {/* CARD */}
          <div className="mt-8 rounded-[2rem] border border-[#D1D5DB] bg-white p-7 shadow-lg sm:p-9">

            <form className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seuemail@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                />
              </div>

              {/* SENHA */}
              <div>

                <div className="mb-2 flex items-center justify-between gap-3">

                  <label
                    htmlFor="senha"
                    className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                  >
                    Senha
                  </label>

                  <Link
                    href="/recuperar-senha"
                    className="font-[family-name:var(--font-roboto)] text-xs font-medium text-[#007DB8] hover:text-[#005F8F]"
                  >
                    Esqueci minha senha
                  </Link>

                </div>

                <input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                />

              </div>

              {/* LEMBRAR */}
              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#007DB8]"
                />

                <span className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                  Lembrar de mim
                </span>

              </label>

              {/* BOTÃO */}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#007DB8] px-6 py-3.5 font-[family-name:var(--font-inter)] font-bold text-white shadow-sm transition hover:bg-[#005F8F]"
              >
                Entrar
              </button>

            </form>

            {/* CADASTRO */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#D1D5DB]" />

              <span className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/45">
                ou
              </span>

              <div className="h-px flex-1 bg-[#D1D5DB]" />

            </div>

            <div className="text-center">

              <p className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                Ainda não possui uma conta?
              </p>

              <Link
                href="/cadastro"
                className="mt-2 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8] transition hover:text-[#005F8F]"
              >
                Criar minha conta
              </Link>

            </div>

          </div>

          {/* AVISO */}
          <div className="mt-6 flex gap-3 rounded-2xl bg-white p-4 shadow-sm">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8ED3F5]/30 text-sm text-[#005F8F]">
              i
            </div>

            <p className="font-[family-name:var(--font-roboto)] text-xs leading-5 text-[#111827]/55">
              Seus dados devem ser utilizados de forma responsável e
              protegidos de acordo com as regras de segurança da plataforma.
            </p>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D1D5DB] bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center font-[family-name:var(--font-roboto)] text-sm text-[#111827]/50 sm:flex-row sm:justify-between">
          <p>© 2026 Saúde Vale+</p>
          <p>Projeto acadêmico de tecnologia</p>
        </div>
      </footer>

    </main>
  );
}