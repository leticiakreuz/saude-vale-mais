
"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import Header from "../../componentes/Header";
import Navigation from "../../componentes/Navigation";
import Footer from "../../componentes/Footer";
import { auth, db } from "../firebase";

export default function PerfilPage() {
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [numeroSUS, setNumeroSUS] = useState("");
  const [unidade, setUnidade] = useState("");

  const [arquivoCarteira, setArquivoCarteira] = useState<File | null>(null);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? "");
      setNome(user.displayName ?? "");

      try {
        const usuarioRef = doc(db, "usuarios", user.uid);
        const usuarioSnapshot = await getDoc(usuarioRef);

        if (usuarioSnapshot.exists()) {
          const dados = usuarioSnapshot.data();

          if (typeof dados.nome === "string" && dados.nome.trim()) {
            setNome(dados.nome.trim());
          }

          if (typeof dados.cpf === "string") {
            setCpf(dados.cpf);
          }

          if (typeof dados.telefone === "string") {
            setTelefone(dados.telefone);
          }

          if (typeof dados.dataNascimento === "string") {
            setDataNascimento(dados.dataNascimento);
          }

          if (typeof dados.numeroSUS === "string") {
            setNumeroSUS(dados.numeroSUS);
          }

          if (typeof dados.unidade === "string") {
            setUnidade(dados.unidade);
          }
        }
      } catch {
        setErro("Não foi possível carregar seus dados.");
      } finally {
        setCarregando(false);
      }
    });

    return () => cancelarObservador();
  }, [router]);

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`;
  };

  const formatarSUS = (valor: string) => {
    return valor.replace(/\D/g, "").slice(0, 15);
  };

  const selecionarCarteira = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0] ?? null;
    setArquivoCarteira(arquivo);
  };

  const salvarPerfil = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMensagem("");
    setErro("");

    const usuario = auth.currentUser;

    if (!usuario) {
      router.replace("/login");
      return;
    }

    setSalvando(true);

    try {
      await setDoc(
        doc(db, "usuarios", usuario.uid),
        {
          uid: usuario.uid,
          email: usuario.email ?? email,
          telefone: telefone.trim(),
          numeroSUS: numeroSUS.trim(),
          unidade: unidade.trim(),
        },
        {
          merge: true,
        }
      );

      setMensagem("Seus dados foram atualizados com sucesso.");
    } catch {
      setErro("Não foi possível salvar suas alterações. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const iniciais = nome
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="mb-8">
            <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
              Meu perfil
            </p>

            <h1 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold tracking-tight text-[#005F8F]">
              Seus dados pessoais
            </h1>

            <p className="mt-2 max-w-2xl font-[family-name:var(--font-roboto)] text-base leading-7 text-[#111827]/65">
              Consulte suas informações e mantenha seus dados de contato e
              acesso ao SUS atualizados.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-3xl border border-[#D1D5DB] bg-[#F5F7FA] p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#007DB8] font-[family-name:var(--font-inter)] text-xl font-extrabold text-white">
                  {carregando ? "..." : iniciais || "US"}
                </div>

                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-roboto)] text-xs font-medium text-[#111827]/50">
                    Usuário
                  </p>

                  <h2 className="mt-1 truncate font-[family-name:var(--font-inter)] text-lg font-extrabold text-[#005F8F]">
                    {carregando ? "Carregando..." : nome || "Usuário"}
                  </h2>

                  <p className="truncate font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                    {email || "E-mail não informado"}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-[#D1D5DB]" />

              <div className="rounded-2xl border border-[#D1D5DB] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007DB8]/10 text-xl">
                    🏥
                  </div>

                  <div>
                    <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                      Minha unidade
                    </p>

                    <h3 className="font-[family-name:var(--font-inter)] text-sm font-extrabold text-[#005F8F]">
                      {unidade || "Unidade de saúde de referência"}
                    </h3>
                  </div>
                </div>

                <p className="mt-4 font-[family-name:var(--font-roboto)] text-xs leading-5 text-[#111827]/55">
                  Unidade de atendimento vinculada ao seu cadastro.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-[#005F8F] p-5 text-white">
                <p className="font-[family-name:var(--font-inter)] text-sm font-bold">
                  Dados protegidos
                </p>

                <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs leading-5 text-white/70">
                  Seus dados ficam vinculados à sua conta de acesso.
                </p>
              </div>
            </aside>

            <div className="space-y-6">
              <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                    Cadastro
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                    Informações pessoais
                  </h2>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                    Nome, CPF e data de nascimento são informações de
                    identificação e ficam apenas para consulta.
                  </p>
                </div>

                <form onSubmit={salvarPerfil} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nome"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                    >
                      Nome completo
                    </label>

                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      readOnly
                      disabled={carregando}
                      className="w-full cursor-not-allowed rounded-xl border border-[#D1D5DB] bg-[#F5F7FA] px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/70 outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                    >
                      E-mail
                    </label>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-[#D1D5DB] bg-[#F5F7FA] px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65 outline-none"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="cpf"
                        className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                      >
                        CPF
                      </label>

                      <input
                        id="cpf"
                        type="text"
                        value={cpf}
                        readOnly
                        disabled={carregando}
                        placeholder="CPF não informado"
                        className="w-full cursor-not-allowed rounded-xl border border-[#D1D5DB] bg-[#F5F7FA] px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/70 outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dataNascimento"
                        className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                      >
                        Data de nascimento
                      </label>

                      <input
                        id="dataNascimento"
                        type="date"
                        value={dataNascimento}
                        readOnly
                        disabled={carregando}
                        className="w-full cursor-not-allowed rounded-xl border border-[#D1D5DB] bg-[#F5F7FA] px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/70 outline-none"
                      />
                    </div>
                  </div>
                </form>
              </section>

              <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                    Saúde
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                    Carteira do SUS
                  </h2>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                    Adicione o número do seu Cartão Nacional de Saúde e,
                    posteriormente, a imagem da sua carteira.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="numeroSUS"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                    >
                      Número do Cartão SUS (CNS)
                    </label>

                    <input
                      id="numeroSUS"
                      type="text"
                      inputMode="numeric"
                      value={numeroSUS}
                      onChange={(event) =>
                        setNumeroSUS(formatarSUS(event.target.value))
                      }
                      placeholder="Digite o número do seu cartão SUS"
                      disabled={carregando || salvando}
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/35 focus:border-[#007DB8] focus:ring-2 focus:ring-[#8ED3F5]/50 disabled:cursor-not-allowed disabled:bg-[#F5F7FA]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="carteiraSUS"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                    >
                      Foto ou arquivo da carteira
                    </label>

                    <label
                      htmlFor="carteiraSUS"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D1D5DB] bg-[#F5F7FA] px-6 py-8 text-center transition hover:border-[#007DB8] hover:bg-[#8ED3F5]/10"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                        📄
                      </div>

                      <p className="mt-4 font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F]">
                        {arquivoCarteira
                          ? arquivoCarteira.name
                          : "Clique para selecionar a carteira"}
                      </p>

                      <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                        JPG, PNG ou PDF
                      </p>

                      <input
                        id="carteiraSUS"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={selecionarCarteira}
                        className="hidden"
                        disabled={carregando || salvando}
                      />
                    </label>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8">
                  <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                    Contato
                  </p>

                  <h2 className="mt-2 font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#111827]">
                    Telefone
                  </h2>

                  <p className="mt-2 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                    Esse é o único dado desta página que pode ser alterado.
                  </p>
                </div>

                <form onSubmit={salvarPerfil} className="space-y-6">
                  <div>
                    <label
                      htmlFor="telefone"
                      className="mb-2 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                    >
                      Telefone
                    </label>

                    <input
                      id="telefone"
                      type="tel"
                      value={telefone}
                      onChange={(event) =>
                        setTelefone(formatarTelefone(event.target.value))
                      }
                      placeholder="(47) 99999-9999"
                      autoComplete="tel"
                      disabled={carregando || salvando}
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827] outline-none transition placeholder:text-[#111827]/35 focus:border-[#007DB8] focus:ring-2 focus:ring-[#8ED3F5]/50 disabled:cursor-not-allowed disabled:bg-[#F5F7FA]"
                    />
                  </div>

                  {erro && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-red-700"
                    >
                      {erro}
                    </div>
                  )}

                  {mensagem && (
                    <div
                      role="status"
                      className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-green-700"
                    >
                      {mensagem}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={carregando || salvando}
                      className="rounded-xl bg-[#007DB8] px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-white transition duration-200 hover:bg-[#005F8F] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {salvando ? "Salvando..." : "Salvar alterações"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

