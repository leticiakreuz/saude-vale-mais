import Header from "@/componentes/Header";
import Navigation from "@/componentes/Navigation";
import Footer from "@/componentes/Footer";

const medicamentosPaciente = [
  {
    id: 1,
    nome: "Paracetamol",
    dosagem: "500 mg",
    apresentacao: "Comprimido",
    quantidade: "30 comprimidos",
    retirada: "18/10/2026",
    unidade: "Unidade de Saúde Central",
    status: "Pronto para retirada",
  },
  {
    id: 2,
    nome: "Losartana",
    dosagem: "50 mg",
    apresentacao: "Comprimido",
    quantidade: "60 comprimidos",
    retirada: "18/10/2026",
    unidade: "Unidade de Saúde Central",
    status: "Indisponível",
  },
];

export default function MedicamentosPage() {
  const medicamentosDisponiveis = medicamentosPaciente.filter(
    (medicamento) => medicamento.status === "Pronto para retirada"
  );

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#111827]">
      <Header />
      <Navigation />

      {/* CABEÇALHO */}
      <section className="border-b border-[#D1D5DB] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#22C55E]">
            Saúde Vale+
          </span>

          <h1 className="mt-3 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827] sm:text-4xl">
            Meus medicamentos
          </h1>

          <p className="mt-4 max-w-2xl font-[family-name:var(--font-roboto)] leading-7 text-[#111827]/65">
            Consulte somente os medicamentos vinculados às suas receitas e
            acompanhe a situação de cada retirada.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* RESUMO */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* TOTAL */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#007DB8]">
                    Meus medicamentos
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827]">
                    {medicamentosPaciente.length}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-[#007DB8]">
                  <svg
                    className="h-6 w-6"
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
              </div>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                Medicamentos associados às suas receitas.
              </p>
            </div>

            {/* DISPONÍVEIS */}
            <div className="rounded-3xl bg-[#005F8F] p-6 text-white shadow-sm">
              <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#8ED3F5]">
                Prontos para retirada
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold">
                {medicamentosDisponiveis.length}
              </h2>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm text-white/75">
                Medicamentos disponíveis no momento.
              </p>
            </div>

            {/* SITUAÇÃO */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                    Situação
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                    {medicamentosDisponiveis.length > 0
                      ? "Há medicamentos disponíveis"
                      : "Nenhum disponível"}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    medicamentosDisponiveis.length > 0
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "bg-[#D1D5DB]/40 text-[#111827]/50"
                  }`}
                >
                  {medicamentosDisponiveis.length > 0 ? "✓" : "–"}
                </div>
              </div>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                Situação baseada nos medicamentos vinculados às suas receitas.
              </p>
            </div>
          </div>

          {/* ÁREA PRINCIPAL */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            {/* LISTA DOS MEDICAMENTOS */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-7 shadow-sm">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wider text-[#007DB8]">
                  Receita
                </span>

                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold text-[#111827]">
                  Medicamentos prescritos
                </h2>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Nesta área aparecem somente os medicamentos vinculados às
                  suas receitas.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {medicamentosPaciente.map((medicamento) => {
                  const disponivel =
                    medicamento.status === "Pronto para retirada";

                  return (
                    <div
                      key={medicamento.id}
                      className="rounded-2xl border border-[#D1D5DB] p-5"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                        {/* MEDICAMENTO */}
                        <div className="flex items-start gap-4">

                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                              disponivel
                                ? "bg-[#22C55E]/10 text-[#22C55E]"
                                : "bg-[#D1D5DB]/40 text-[#111827]/50"
                            }`}
                          >
                            <svg
                              className="h-6 w-6"
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

                          <div>
                            <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                              {medicamento.nome} {medicamento.dosagem}
                            </h3>

                            <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                              {medicamento.apresentacao}
                            </p>

                            <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                              Quantidade: {medicamento.quantidade}
                            </p>
                          </div>
                        </div>

                        {/* STATUS */}
                        <span
                          className={`self-start rounded-full px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold ${
                            disponivel
                              ? "bg-[#22C55E]/10 text-[#16753E]"
                              : "bg-[#D1D5DB]/50 text-[#111827]/60"
                          }`}
                        >
                          {medicamento.status}
                        </span>
                      </div>

                      {/* INFORMAÇÕES DA RETIRADA */}
                      <div className="mt-5 border-t border-[#D1D5DB] pt-4">

                        <div className="grid gap-3 sm:grid-cols-2">

                          <div>
                            <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                              Retirada
                            </p>

                            <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                              {medicamento.retirada}
                            </p>
                          </div>

                          <div>
                            <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                              Unidade
                            </p>

                            <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                              {medicamento.unidade}
                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CASO NÃO TENHA MEDICAMENTOS */}
              {medicamentosPaciente.length === 0 && (
                <div className="mt-8 rounded-2xl border border-[#D1D5DB] bg-[#F5F7FA] p-8 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ED3F5]/30 text-[#007DB8]">
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        d="M8.5 4.5a4.5 4.5 0 016.36 0l4.64 4.64a4.5 4.5 0 010 6.36l-.5.5a4.5 4.5 0 01-6.36 0L8 11.36a4.5 4.5 0 010-6.36l-.5-.5z"
                      />

                      <path
                        strokeLinecap="round"
                        d="M7 7l10 10"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-inter)] font-bold text-[#111827]">
                    Nenhum medicamento encontrado
                  </h3>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                    Não há medicamentos vinculados às suas receitas no
                    momento.
                  </p>
                </div>
              )}
            </div>

            {/* LADO DIREITO */}
            <aside className="space-y-6">

              {/* PRÓXIMA RETIRADA */}
              <div className="rounded-3xl bg-[#005F8F] p-7 text-white shadow-sm">

                <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-widest text-[#8ED3F5]">
                  Próxima retirada
                </span>

                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold">
                  18 de outubro
                </h2>

                <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm leading-6 text-white/75">
                  Você possui medicamento pronto para retirada.
                </p>

                <div className="mt-6 rounded-2xl bg-white/10 p-5">

                  <p className="font-[family-name:var(--font-inter)] text-sm font-bold">
                    Unidade de Saúde Central
                  </p>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm text-white/70">
                    Rua da Saúde, 100
                  </p>

                  <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-white/70">
                    08:00 às 17:00
                  </p>

                </div>
              </div>

              {/* COMO FUNCIONA */}
              <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6">

                <h3 className="font-[family-name:var(--font-inter)] font-bold text-[#111827]">
                  Como funciona?
                </h3>

                <div className="mt-5 space-y-4">

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#007DB8] font-[family-name:var(--font-inter)] text-xs font-bold text-white">
                      1
                    </span>

                    <p className="font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                      O medicamento é vinculado à receita do paciente.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#007DB8] font-[family-name:var(--font-inter)] text-xs font-bold text-white">
                      2
                    </span>

                    <p className="font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                      A unidade atualiza a disponibilidade.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22C55E] font-[family-name:var(--font-inter)] text-xs font-bold text-white">
                      3
                    </span>

                    <p className="font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                      O paciente acompanha quando o medicamento estiver
                      pronto para retirada.
                    </p>
                  </div>

                </div>
              </div>

              {/* AVISO */}
              <div className="rounded-3xl border border-[#8ED3F5] bg-[#8ED3F5]/15 p-6">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007DB8] font-[family-name:var(--font-inter)] font-bold text-white">
                    i
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                      Importante
                    </h3>

                    <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#005F8F]/75">
                      Esta área mostra somente medicamentos associados às
                      receitas do paciente.
                    </p>
                  </div>

                </div>

              </div>

            </aside>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}