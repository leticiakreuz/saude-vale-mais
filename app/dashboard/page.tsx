import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#111827]">
      {/* HEADER */}
      <header className="border-b border-[#D1D5DB] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Saúde Vale+"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#007DB8] font-[family-name:var(--font-inter)] text-2xl font-extrabold text-white">
              +
            </div>

            <div>
              <div className="flex items-baseline">
                <span className="font-[family-name:var(--font-inter)] text-xl font-extrabold tracking-tight text-[#005F8F]">
                  Saúde Vale
                </span>

                <span className="font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#22C55E]">
                  +
                </span>
              </div>

              <p className="font-[family-name:var(--font-roboto)] text-[11px] font-medium text-[#111827]/50">
                Saúde mais perto de você
              </p>
            </div>
          </Link>

          {/* USUÁRIO */}
          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">
              <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                Maria Oliveira
              </p>

              <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                Usuária
              </p>
            </div>

            <Link
              href="/perfil"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8ED3F5]/40 font-[family-name:var(--font-inter)] font-bold text-[#005F8F] transition hover:bg-[#8ED3F5]/60"
              aria-label="Abrir perfil"
            >
              MO
            </Link>

          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="px-6 py-8 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">

          {/* BOAS-VINDAS */}
          <div className="rounded-[2rem] bg-[#005F8F] px-7 py-8 text-white shadow-sm sm:px-9">

            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">

              <div>
                <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.15em] text-[#8ED3F5]">
                  Área do usuário
                </span>

                <h1 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold sm:text-4xl">
                  Olá, Maria! 👋
                </h1>

                <p className="mt-3 max-w-2xl font-[family-name:var(--font-roboto)] leading-7 text-white/75">
                  Bem-vinda ao Saúde Vale+. Aqui você pode acessar seus
                  serviços de saúde de forma simples e organizada.
                </p>
              </div>

              <Link
                href="/perfil"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F] transition hover:bg-[#F5F7FA]"
              >
                Meu perfil
              </Link>

            </div>
          </div>

          {/* SERVIÇOS */}
          <div className="mt-10">

            <div>
              <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#22C55E]">
                Serviços
              </span>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold text-[#111827] sm:text-3xl">
                O que você precisa hoje?
              </h2>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                Acesse rapidamente os principais serviços do Saúde Vale+.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              {/* AGENDAMENTOS */}
              <Link
                href="/agendamentos"
                className="group rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#007DB8]/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ED3F5]/25 text-[#007DB8]">

                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                    />
                    <path
                      strokeLinecap="round"
                      d="M16 3v4M8 3v4M3 10h18"
                    />
                  </svg>

                </div>

                <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                  Agendamentos
                </h3>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Agende, consulte e acompanhe suas consultas.
                </p>

                <span className="mt-5 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8]">
                  Acessar →
                </span>
              </Link>

              {/* MEDICAMENTOS */}
              <Link
                href="/medicamentos"
                className="group rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#007DB8]/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22C55E]/10 text-[#22C55E]">

                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      d="M8.5 4.5a4.5 4.5 0 016.36 0l4.64 4.64a4.5 4.5 0 010 6.36l-.5.5a4.5 4.5 0 01-6.36 0L8 11.36a4.5 4.5 0 010-6.36l.5-.5z"
                    />
                    <path
                      strokeLinecap="round"
                      d="M7 7l10 10"
                    />
                  </svg>

                </div>

                <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                  Medicamentos
                </h3>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Consulte informações sobre medicamentos e retirada.
                </p>

                <span className="mt-5 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8]">
                  Acessar →
                </span>
              </Link>

              {/* VACINAÇÃO */}
              <Link
                href="/vacinacao"
                className="group rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#007DB8]/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ED3F5]/25 text-[#007DB8]">

                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      d="M14 4l6 6"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6l6 6-7.5 7.5H5V14L12 6z"
                    />

                    <path
                      strokeLinecap="round"
                      d="M8 16l3 3"
                    />

                  </svg>

                </div>

                <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                  Carteira de vacinação
                </h3>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Consulte suas vacinas e acompanhe seu histórico.
                </p>

                <span className="mt-5 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8]">
                  Acessar →
                </span>
              </Link>

              {/* SUS */}
              <Link
                href="/sobre-sus"
                className="group rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#007DB8]/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22C55E]/10 text-[#22C55E]">

                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l8 4v5c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V7l8-4z"
                    />

                    <path
                      strokeLinecap="round"
                      d="M12 8v6M9 11h6"
                    />

                  </svg>

                </div>

                <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                  Sobre o SUS
                </h3>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Encontre informações úteis sobre o sistema público de saúde.
                </p>

                <span className="mt-5 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8]">
                  Acessar →
                </span>
              </Link>

            </div>
          </div>

          {/* RESUMO */}
          <div className="mt-10 grid gap-5 lg:grid-cols-3">

            {/* PRÓXIMA CONSULTA */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm lg:col-span-2">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-widest text-[#007DB8]">
                    Próximo atendimento
                  </span>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                    Sua próxima consulta
                  </h2>
                </div>

                <Link
                  href="/agendamentos"
                  className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8] hover:text-[#005F8F]"
                >
                  Ver agenda
                </Link>

              </div>

              <div className="mt-6 flex flex-col gap-5 rounded-2xl bg-[#F5F7FA] p-5 sm:flex-row sm:items-center">

                {/* FOTO */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#8ED3F5]/35">

                  {/* FUTURA FOTO DO MÉDICO */}
                  <svg
                    className="h-9 w-9 text-[#007DB8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="8" r="3.5" />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 21a7 7 0 0114 0"
                    />
                  </svg>

                </div>

                {/* MÉDICO */}
                <div className="flex-1">

                  <p className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                    Dra. Ana Oliveira
                  </p>

                  <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                    Clínico geral
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">

                    <span>
                      15/10/2026
                    </span>

                    <span>
                      09:00
                    </span>

                    <span>
                      Unidade de Saúde Central
                    </span>

                  </div>

                </div>

                {/* STATUS */}
                <div className="self-start rounded-full bg-[#22C55E]/10 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold text-[#16753E]">
                  Confirmada
                </div>

              </div>
            </div>

            {/* ACESSO RÁPIDO */}
            <div className="rounded-3xl bg-[#007DB8] p-6 text-white">

              <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-widest text-[#8ED3F5]">
                Acesso rápido
              </span>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold">
                Precisa de ajuda?
              </h2>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm leading-6 text-white/75">
                Encontre informações sobre os serviços e utilize a plataforma
                de forma simples.
              </p>

              <Link
                href="/sobre-sus"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8] transition hover:bg-[#F5F7FA]"
              >
                Saiba mais
              </Link>

            </div>

          </div>

          {/* AVISO */}
          <div className="mt-8 rounded-2xl border border-[#8ED3F5] bg-[#8ED3F5]/15 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#007DB8] font-[family-name:var(--font-inter)] text-sm font-bold text-white">
                i
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F]">
                  Sobre o Saúde Vale+
                </h3>

                <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#005F8F]/75">
                  O Saúde Vale+ é uma ferramenta de apoio para facilitar o
                  acesso aos serviços de saúde. Ele não substitui o
                  atendimento dos profissionais de saúde ou o atendimento
                  presencial quando necessário.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D1D5DB] bg-white px-6 py-6">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/50 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 Saúde Vale+
          </p>

          <p>
            Projeto acadêmico de tecnologia
          </p>

        </div>

      </footer>

    </main>
  );
}