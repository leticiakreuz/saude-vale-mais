import Header from "@/componentes/Header";
import Navigation from "@/componentes/Navigation";
import Footer from "@/componentes/Footer";

export default function AgendamentosPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#111827]">
      <Header />
      <Navigation />

      {/* CABEÇALHO */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#22C55E]">
            Saúde Vale+
          </p>

          <h1 className="mt-3 font-[family-name:var(--font-inter)] text-4xl font-extrabold text-[#111827]">
            Agendamentos
          </h1>

          <p className="mt-4 max-w-2xl font-[family-name:var(--font-roboto)] text-base leading-7 text-[#111827]/65">
            Consulte seus atendimentos ou encontre um novo horário para sua
            consulta.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

          {/* NOVO AGENDAMENTO */}
          <div className="rounded-3xl border border-[#D1D5DB] bg-white p-8 shadow-sm lg:col-span-2">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                Nova consulta
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold text-[#111827]">
                Encontre um horário
              </h2>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                Selecione as informações para realizar seu agendamento.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">

              {/* ESPECIALIDADE */}
              <div>
                <label
                  htmlFor="especialidade"
                  className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                >
                  Especialidade
                </label>

                <select
                  id="especialidade"
                  className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                >
                  <option>Selecione</option>
                  <option>Clínico geral</option>
                  <option>Pediatria</option>
                  <option>Ginecologia</option>
                  <option>Odontologia</option>
                </select>
              </div>

              {/* PROFISSIONAL */}
              <div>
                <label
                  htmlFor="profissional"
                  className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                >
                  Profissional
                </label>

                <select
                  id="profissional"
                  className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                >
                  <option>Selecione</option>
                  <option>Dra. Ana Oliveira</option>
                  <option>Dr. Carlos Mendes</option>
                  <option>Dra. Juliana Souza</option>
                  <option>Dr. Rafael Martins</option>
                </select>
              </div>

              {/* DATA */}
              <div>
                <label
                  htmlFor="data"
                  className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                >
                  Data
                </label>

                <input
                  id="data"
                  type="date"
                  className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                />
              </div>

              {/* UNIDADE */}
              <div>
                <label
                  htmlFor="unidade"
                  className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                >
                  Unidade
                </label>

                <select
                  id="unidade"
                  className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                >
                  <option>Unidade de Saúde Central</option>
                  <option>Unidade de Saúde Norte</option>
                  <option>Unidade de Saúde Sul</option>
                </select>
              </div>
            </div>

            {/* HORÁRIOS */}
            <div className="mt-8">
              <label className="mb-3 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]">
                Horários disponíveis
              </label>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                <button
                  type="button"
                  className="rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/20"
                >
                  08:00
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/20"
                >
                  08:30
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-[#007DB8] bg-[#007DB8] px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white"
                >
                  09:00
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/20"
                >
                  09:30
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/20"
                >
                  10:00
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-[#D1D5DB] bg-white px-3 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/20"
                >
                  10:30
                </button>
              </div>
            </div>

            {/* BOTÃO */}
            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-[#007DB8] px-6 py-4 font-[family-name:var(--font-inter)] font-bold text-white transition hover:bg-[#005F8F]"
            >
              Continuar agendamento
            </button>
          </div>

          {/* MEUS AGENDAMENTOS */}
          <aside className="space-y-6">

            <div className="rounded-3xl bg-[#005F8F] p-7 text-white">
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-widest text-[#8ED3F5]">
                Minha agenda
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold">
                Próxima consulta
              </h2>

              <div className="mt-6 rounded-2xl bg-white/10 p-5">

                <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#8ED3F5]">
                  15 OUT 2026
                </p>

                <h3 className="mt-3 font-[family-name:var(--font-inter)] text-lg font-bold">
                  Clínico geral
                </h3>

                <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-white/70">
                  Dra. Ana Oliveira
                </p>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="font-[family-name:var(--font-roboto)] text-sm text-white/70">
                    09:00 • Unidade de Saúde Central
                  </p>
                </div>

              </div>
            </div>

            {/* INFORMAÇÃO */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8ED3F5]/30 font-[family-name:var(--font-inter)] font-bold text-[#007DB8]">
                  i
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                    Sobre o agendamento
                  </h3>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                    O Saúde Vale+ ajuda você a organizar e acompanhar seus
                    atendimentos de saúde.
                  </p>
                </div>

              </div>

            </div>

          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}