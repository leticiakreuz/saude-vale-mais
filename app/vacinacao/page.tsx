"use client";

import { useState } from "react";
import Header from "@/componentes/Header";
import Navigation from "@/componentes/Navigation";
import Footer from "@/componentes/Footer";

export default function VacinacaoPage() {
  const [fotoCarteira, setFotoCarteira] = useState<string | null>(null);

  function adicionarFoto(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const imagem = URL.createObjectURL(arquivo);

    setFotoCarteira(imagem);
  }

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
            Carteira de vacinação
          </h1>

          <p className="mt-4 max-w-2xl font-[family-name:var(--font-roboto)] leading-7 text-[#111827]/65">
            Consulte seu histórico de vacinação e mantenha sua carteira
            organizada em um único lugar.
          </p>

        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* RESUMO */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* DOSES REGISTRADAS */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#007DB8]">
                    Doses registradas
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827]">
                    08
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

              </div>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                Doses registradas na sua carteira.
              </p>

            </div>

            {/* SITUAÇÃO */}
            <div className="rounded-3xl bg-[#005F8F] p-6 text-white shadow-sm">

              <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#8ED3F5]">
                Situação
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold">
                Carteira atualizada
              </h2>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm leading-6 text-white/75">
                Não há pendências registradas neste momento.
              </p>

            </div>

            {/* PRÓXIMO REGISTRO */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">

              <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#22C55E]">
                Próximo registro
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                Nenhuma dose próxima
              </h2>

              <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/55">
                Quando houver uma nova informação, ela aparecerá aqui.
              </p>

            </div>

          </div>

          {/* ÁREA PRINCIPAL */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            {/* HISTÓRICO */}
            <div className="rounded-3xl border border-[#D1D5DB] bg-white p-7 shadow-sm">

              <div>

                <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wider text-[#007DB8]">
                  Meu histórico
                </span>

                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold text-[#111827]">
                  Vacinas registradas
                </h2>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Confira as vacinas que estão registradas na sua carteira.
                </p>

              </div>

              <div className="mt-8 space-y-4">

                {/* INFLUENZA */}
                <div className="rounded-2xl border border-[#D1D5DB] p-5">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-[#007DB8]">

                      <svg
                        className="h-6 w-6"
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

                    <div className="flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                            Influenza
                          </h3>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                            Dose única
                          </p>

                        </div>

                        <span className="self-start rounded-full bg-[#22C55E]/10 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold text-[#16753E]">
                          Registrada
                        </span>

                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Data
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            12/04/2026
                          </p>
                        </div>

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Unidade
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            Unidade de Saúde Central
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                {/* HEPATITE B */}
                <div className="rounded-2xl border border-[#D1D5DB] p-5">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-[#007DB8]">

                      <svg
                        className="h-6 w-6"
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

                    <div className="flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                            Hepatite B
                          </h3>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                            3ª dose
                          </p>

                        </div>

                        <span className="self-start rounded-full bg-[#22C55E]/10 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold text-[#16753E]">
                          Registrada
                        </span>

                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Data
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            08/02/2026
                          </p>
                        </div>

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Unidade
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            Unidade de Saúde Central
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                {/* COVID-19 */}
                <div className="rounded-2xl border border-[#D1D5DB] p-5">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-[#007DB8]">

                      <svg
                        className="h-6 w-6"
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

                    <div className="flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                            COVID-19
                          </h3>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                            Dose de reforço
                          </p>

                        </div>

                        <span className="self-start rounded-full bg-[#22C55E]/10 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold text-[#16753E]">
                          Registrada
                        </span>

                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Data
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            20/01/2026
                          </p>
                        </div>

                        <div>
                          <p className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wide text-[#111827]/40">
                            Unidade
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                            Unidade de Saúde Central
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* LADO DIREITO */}
            <aside className="space-y-6">

              {/* FOTO DA CARTEIRA */}
              <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">

                <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#007DB8]">
                  Documento
                </span>

                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                  Minha carteira
                </h2>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Adicione uma foto da sua carteira de vacinação para
                  mantê-la disponível na plataforma.
                </p>

                {/* ÁREA DA FOTO */}
                <div className="mt-5 overflow-hidden rounded-2xl border-2 border-dashed border-[#8ED3F5] bg-[#F5F7FA]">

                  {fotoCarteira ? (
                    <div className="relative">

                      <img
                        src={fotoCarteira}
                        alt="Foto da carteira de vacinação"
                        className="h-[280px] w-full object-cover"
                      />

                      <label
                        htmlFor="fotoCarteira"
                        className="absolute bottom-4 right-4 cursor-pointer rounded-xl bg-[#007DB8] px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm font-bold text-white shadow-lg transition hover:bg-[#005F8F]"
                      >
                        Alterar foto
                      </label>

                    </div>
                  ) : (
                    <div className="flex min-h-[280px] items-center justify-center p-6">

                      <div className="text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#8ED3F5]/30 text-[#007DB8]">

                          <svg
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="16"
                              rx="2"
                            />

                            <circle
                              cx="8.5"
                              cy="9"
                              r="1.5"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 15l-4.5-4.5L9 18l-2.5-2.5L3 19"
                            />
                          </svg>

                        </div>

                        <h3 className="mt-4 font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F]">
                          Nenhuma foto adicionada
                        </h3>

                        <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs leading-5 text-[#111827]/50">
                          Adicione uma imagem da sua carteira de vacinação.
                        </p>

                        <label
                          htmlFor="fotoCarteira"
                          className="mt-5 inline-flex cursor-pointer rounded-xl bg-[#007DB8] px-5 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-white transition hover:bg-[#005F8F]"
                        >
                          Adicionar foto
                        </label>

                      </div>

                    </div>
                  )}

                </div>

                <input
                  id="fotoCarteira"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={adicionarFoto}
                  className="hidden"
                />

                <p className="mt-3 font-[family-name:var(--font-roboto)] text-xs leading-5 text-[#111827]/45">
                  Formatos aceitos: JPG, JPEG e PNG.
                </p>

              </div>

              {/* RESUMO DA CARTEIRA */}
              <div className="rounded-3xl bg-[#005F8F] p-7 text-white shadow-sm">

                <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-widest text-[#8ED3F5]">
                  Minha carteira
                </span>

                <h2 className="mt-2 font-[family-name:var(--font-inter)] text-2xl font-extrabold">
                  Vacinação em dia
                </h2>

                <p className="mt-4 font-[family-name:var(--font-roboto)] text-sm leading-6 text-white/75">
                  Suas informações de vacinação estão reunidas em um único
                  lugar.
                </p>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[90%] rounded-full bg-[#22C55E]" />
                </div>

                <div className="mt-3 flex items-center justify-between font-[family-name:var(--font-roboto)] text-xs text-white/60">
                  <span>Carteira atual</span>
                  <span>90%</span>
                </div>

              </div>

              {/* ÚLTIMA ATUALIZAÇÃO */}
              <div className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">

                <span className="font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#007DB8]">
                  Última atualização
                </span>

                <h3 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                  12/04/2026
                </h3>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                  Data do último registro realizado na carteira.
                </p>

              </div>

              {/* INFORMAÇÃO */}
              <div className="rounded-3xl border border-[#8ED3F5] bg-[#8ED3F5]/15 p-6">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007DB8] font-[family-name:var(--font-inter)] font-bold text-white">
                    i
                  </div>

                  <div>

                    <h3 className="font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                      Sobre sua carteira
                    </h3>

                    <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#005F8F]/75">
                      As informações apresentadas nesta área correspondem
                      aos registros vinculados ao usuário.
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