import Header from "@/componentes/Header";
import Navigation from "@/componentes/Navigation";
import Footer from "@/componentes/Footer";

import type { Servico } from "@/types";

const servicos: Servico[] = [
  {
    titulo: "Consultas",
    descricao:
      "Tenha mais facilidade para consultar informações e realizar processos relacionados aos atendimentos.",
    icone: "🩺",
  },
  {
    titulo: "Medicamentos",
    descricao:
      "Acesse informações sobre medicamentos e o processo de retirada disponibilizado pelo SUS.",
    icone: "💊",
  },
  {
    titulo: "Carteira de vacinação",
    descricao:
      "Visualize suas informações de vacinação de forma simples, clara e organizada.",
    icone: "💉",
  },
  {
    titulo: "Sobre o SUS",
    descricao:
      "Encontre informações para compreender melhor o SUS e seus serviços.",
    icone: "🏥",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#111827]">

      {/* HEADER */}
      <Header />

      {/* MENU DE NAVEGAÇÃO */}
      <Navigation />

      {/* HERO */}
      <section
        id="inicio"
        className="bg-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* TEXTO */}
          <div>

            <span className="inline-flex rounded-full bg-[#8ED3F5]/35 px-4 py-2 font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F]">
              ✦ Cuidado e tecnologia para você
            </span>

            <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-4xl font-extrabold leading-[1.08] tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
              Sua saúde,
              <span className="text-[#007DB8]"> mais simples</span>
              <br />
              e mais perto.
            </h1>

            <p className="mt-6 max-w-xl font-[family-name:var(--font-roboto)] text-lg leading-8 text-[#111827]/70">
              O Saúde Vale+ reúne informações e serviços de saúde pública em
              um único lugar, ajudando você a acessar o SUS de forma simples,
              organizada e acessível.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="#servicos"
                className="rounded-xl bg-[#007DB8] px-6 py-3.5 text-center font-[family-name:var(--font-inter)] font-bold text-white shadow-sm transition hover:bg-[#005F8F]"
              >
                Conhecer serviços
              </a>

              <a
                href="/cadastro"
                className="rounded-xl border-2 border-[#22C55E] bg-white px-6 py-3.5 text-center font-[family-name:var(--font-inter)] font-bold text-[#005F8F] transition hover:bg-[#22C55E]/10"
              >
                Criar minha conta
              </a>

            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">

              <span className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                ✓ Fácil de usar
              </span>

              <span className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                ✓ Informações organizadas
              </span>

              <span className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                ✓ Acesso simplificado
              </span>

            </div>

          </div>

          {/* MOCKUP */}
          <div className="relative">

            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#8ED3F5]/40 blur-3xl" />

            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#22C55E]/20 blur-3xl" />

            <div className="relative rounded-[2rem] bg-[#007DB8] p-5 shadow-2xl sm:p-7">

              <div className="rounded-[1.5rem] bg-white p-6 sm:p-7">

                {/* TOPO */}
                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/55">
                      Olá!
                    </p>

                    <h2 className="mt-1 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#005F8F]">
                      Bem-vindo ao Saúde Vale+
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8ED3F5]/30 text-xl">
                    ♥
                  </div>

                </div>

                {/* SERVIÇOS */}
                <div className="mt-7 grid grid-cols-2 gap-4">

                  {servicos.map((servico) => (
                    <div
                      key={servico.titulo}
                      className="rounded-2xl border border-[#D1D5DB] bg-[#F5F7FA] p-4"
                    >
                      <div className="text-2xl">
                        {servico.icone}
                      </div>

                      <h3 className="mt-2 font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                        {servico.titulo}
                      </h3>

                      <p className="mt-1 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/55">
                        Acessar serviço
                      </p>
                    </div>
                  ))}

                </div>

                {/* STATUS */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#22C55E]/10 p-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
                    ✓
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                      Tudo organizado
                    </p>

                    <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/55">
                      Seus serviços em um só lugar.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SERVIÇOS */}
      <section
        id="servicos"
        className="bg-[#F5F7FA] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#22C55E]">
              Serviços
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Tudo em um só lugar
            </h2>

            <p className="mt-4 font-[family-name:var(--font-roboto)] leading-7 text-[#111827]/65">
              Encontre os principais serviços do Saúde Vale+ de maneira
              rápida, clara e organizada.
            </p>

          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {servicos.map((servico) => (
              <a
                key={servico.titulo}
                className="group rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#007DB8]/40 hover:shadow-lg"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ED3F5]/30 text-2xl transition group-hover:scale-105">
                  {servico.icone}
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                  {servico.titulo}
                </h3>

                <p className="mt-3 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/65">
                  {servico.descricao}
                </p>

                <span className="mt-5 inline-block font-[family-name:var(--font-inter)] text-sm font-bold text-[#007DB8]">
                  Acessar serviço →
                </span>

              </a>
            ))}

          </div>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section
        id="como-funciona"
        className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#007DB8]">
              Como funciona
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Acesso simples aos serviços de saúde
            </h2>

            <p className="mt-5 font-[family-name:var(--font-roboto)] leading-8 text-[#111827]/65">
              A proposta do Saúde Vale+ é concentrar informações e serviços
              importantes em uma plataforma simples e acessível.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-[#D1D5DB] bg-[#F5F7FA] p-7">
              <span className="font-[family-name:var(--font-inter)] text-4xl font-extrabold text-[#007DB8]">
                01
              </span>

              <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                Crie sua conta
              </h3>

              <p className="mt-3 font-[family-name:var(--font-roboto)] leading-6 text-[#111827]/65">
                Cadastre seus dados para utilizar a plataforma.
              </p>
            </div>

            <div className="rounded-3xl border border-[#D1D5DB] bg-[#F5F7FA] p-7">
              <span className="font-[family-name:var(--font-inter)] text-4xl font-extrabold text-[#007DB8]">
                02
              </span>

              <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                Escolha um serviço
              </h3>

              <p className="mt-3 font-[family-name:var(--font-roboto)] leading-6 text-[#111827]/65">
                Acesse a função que você precisa.
              </p>
            </div>

            <div className="rounded-3xl border border-[#D1D5DB] bg-[#F5F7FA] p-7">
              <span className="font-[family-name:var(--font-inter)] text-4xl font-extrabold text-[#22C55E]">
                03
              </span>

              <h3 className="mt-5 font-[family-name:var(--font-inter)] text-lg font-bold text-[#005F8F]">
                Acompanhe suas informações
              </h3>

              <p className="mt-3 font-[family-name:var(--font-roboto)] leading-6 text-[#111827]/65">
                Tenha acesso às informações relacionadas aos seus serviços.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="bg-[#F5F7FA] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-[0.18em] text-[#007DB8]">
              Sobre o projeto
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827] sm:text-4xl">
              Tecnologia para aproximar você da saúde pública
            </h2>

            <p className="mt-5 font-[family-name:var(--font-roboto)] leading-8 text-[#111827]/65">
              O Saúde Vale+ foi pensado para facilitar o acesso da população
              aos serviços de saúde do SUS, reunindo informações importantes
              em uma plataforma simples e intuitiva.
            </p>

            <p className="mt-4 font-[family-name:var(--font-roboto)] leading-8 text-[#111827]/65">
              A plataforma funciona como uma ferramenta de apoio ao acesso
              aos serviços de saúde, sem substituir o atendimento dos
              profissionais ou a necessidade de atendimento presencial.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-xl">
                🎯
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                Estratégica
              </h3>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                Serviços organizados de maneira prática.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8ED3F5]/30 text-xl">
                🔒
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                Confiável
              </h3>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                Atenção à segurança das informações.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/10 text-xl">
                💡
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                Inovadora
              </h3>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                Tecnologia aplicada ao acesso aos serviços.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/10 text-xl">
                🤝
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-inter)] font-bold text-[#005F8F]">
                Próxima
              </h3>

              <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                Comunicação simples e humanizada.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#005F8F] px-8 py-12 sm:px-12 lg:px-14">

          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <h2 className="font-[family-name:var(--font-inter)] text-3xl font-extrabold text-white">
                Saúde mais acessível para você.
              </h2>

              <p className="mt-3 font-[family-name:var(--font-roboto)] leading-7 text-white/75">
                Crie sua conta e conheça o Saúde Vale+.
              </p>

            </div>

            <a
              href="/cadastro"
              className="rounded-xl bg-[#22C55E] px-6 py-3.5 font-[family-name:var(--font-inter)] font-bold text-[#111827] transition hover:bg-white"
            >
              Criar minha conta
            </a>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}