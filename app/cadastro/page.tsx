import Link from "next/link";

export default function CadastroPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      {/* HEADER DA AUTENTICAÇÃO */}
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
            href="/login"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#005F8F] transition hover:text-[#007DB8]"
          >
            Já tenho uma conta
          </Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">

            {/* LADO ESQUERDO */}
            <div className="hidden bg-[#005F8F] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">

              <div>
                <span className="inline-flex rounded-full bg-[#8ED3F5]/20 px-4 py-2 font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-wider text-[#8ED3F5]">
                  Saúde Vale+
                </span>

                <h2 className="mt-8 font-[family-name:var(--font-inter)] text-4xl font-extrabold leading-tight">
                  Crie sua conta e tenha a saúde mais perto de você.
                </h2>

                <p className="mt-6 font-[family-name:var(--font-roboto)] leading-7 text-white/75">
                  Reúna informações e serviços de saúde pública em um único
                  lugar, de forma simples e organizada.
                </p>
              </div>

              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
                    ✓
                  </span>

                  <span className="font-[family-name:var(--font-roboto)] text-sm text-white/85">
                    Acesso simplificado
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
                    ✓
                  </span>

                  <span className="font-[family-name:var(--font-roboto)] text-sm text-white/85">
                    Informações organizadas
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-sm font-bold text-white">
                    ✓
                  </span>

                  <span className="font-[family-name:var(--font-roboto)] text-sm text-white/85">
                    Plataforma intuitiva
                  </span>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="p-7 sm:p-10 lg:p-12">

              <div className="mx-auto max-w-xl">

                <div>
                  <span className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-widest text-[#22C55E]">
                    Cadastro
                  </span>

                  <h2 className="mt-3 font-[family-name:var(--font-inter)] text-3xl font-extrabold text-[#111827]">
                    Crie sua conta
                  </h2>

                  <p className="mt-3 font-[family-name:var(--font-roboto)] leading-6 text-[#111827]/65">
                    Preencha seus dados para começar a utilizar o Saúde Vale+.
                  </p>
                </div>

                <form className="mt-8 space-y-5">

                  {/* NOME */}
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                    >
                      Nome completo
                    </label>

                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Digite seu nome completo"
                      required
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />
                  </div>

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
                      required
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />
                  </div>

                  {/* TELEFONE */}
                  <div>
                    <label
                      htmlFor="telefone"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                    >
                      Telefone
                    </label>

                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />
                  </div>

                  {/* DATA DE NASCIMENTO */}
                  <div>
                    <label
                      htmlFor="dataNascimento"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                    >
                      Data de nascimento
                    </label>

                    <input
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                      required
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />
                  </div>

                  {/* SENHA */}
                  <div>
                    <label
                      htmlFor="senha"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                    >
                      Senha
                    </label>

                    <input
                      id="senha"
                      name="senha"
                      type="password"
                      placeholder="Digite sua senha"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />

                    <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                      A senha deve possuir pelo menos 6 caracteres.
                    </p>
                  </div>

                  {/* CONFIRMAR SENHA */}
                  <div>
                    <label
                      htmlFor="confirmarSenha"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827]"
                    >
                      Confirmar senha
                    </label>

                    <input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      placeholder="Digite a senha novamente"
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3.5 font-[family-name:var(--font-roboto)] text-[#111827] outline-none transition placeholder:text-[#111827]/40 focus:border-[#007DB8] focus:ring-4 focus:ring-[#8ED3F5]/30"
                    />
                  </div>

                  {/* TERMOS */}
                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 accent-[#007DB8]"
                    />

                    <span className="font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/65">
                      Concordo com os termos de uso e com a política de
                      privacidade.
                    </span>
                  </label>

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#007DB8] px-6 py-3.5 font-[family-name:var(--font-inter)] font-bold text-white transition hover:bg-[#005F8F]"
                  >
                    Criar minha conta
                  </button>

                </form>

                <p className="mt-7 text-center font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                  Já possui uma conta?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#007DB8] hover:text-[#005F8F]"
                  >
                    Entrar
                  </Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLIFICADO */}
      <footer className="border-t border-[#D1D5DB] bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center font-[family-name:var(--font-roboto)] text-sm text-[#111827]/50 sm:flex-row sm:justify-between">
          <p>© 2026 Saúde Vale+</p>
          <p>Projeto acadêmico de tecnologia</p>
        </div>
      </footer>
    </main>
  );
}