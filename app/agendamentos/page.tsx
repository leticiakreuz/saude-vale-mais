
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import Header from "../../componentes/Header";
import Navigation from "../../componentes/Navigation";
import Footer from "../../componentes/Footer";
import { auth, db } from "../firebase";

type Periodo = "Manhã" | "Tarde";
type Etapa = "carregando" | "perfil" | "agendar" | "consultas";

type Perfil = {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string;
  cartaoSus?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  unidadeReferencia?: string;
};

type Agendamento = {
  id: string;
  userId?: string;
  servico: string;
  periodo: Periodo;
  medico: string;
  profissao?: string;
  dia: string;
  horario: string;
  status: string;
};

const servicosPorPeriodo: Record<Periodo, string[]> = {
  Manhã: [
    "Consulta médica",
    "Pediatria",
    "Odontologia",
    "Consulta de retorno",
    "Renovação de receita",
  ],
  Tarde: ["Odontologia", "Renovação de receita"],
};

const horariosPorPeriodo: Record<Periodo, string[]> = {
  Manhã: [
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ],
  Tarde: ["13:30", "14:00", "14:30", "15:00", "16:00"],
};

function gerarDias(): string[] {
  const dias: string[] = [];
  const hoje = new Date();

  for (let i = 0; i < 14; i++) {
    const data = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate() + i
    );

    if (data.getDay() === 0 || data.getDay() === 6) continue;

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    dias.push(`${ano}-${mes}-${dia}`);
  }

  return dias;
}

function formatarData(dataString: string): string {
  if (!dataString) return "";

  const [ano, mes, dia] = dataString.split("-").map(Number);

  return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function AgendamentosPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [perfil, setPerfil] = useState<Perfil>({});
  const [etapa, setEtapa] = useState<Etapa>("carregando");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [servico, setServico] = useState("Consulta médica");
  const [periodo, setPeriodo] = useState<Periodo>("Manhã");
  const [medico, setMedico] = useState("");
  const [profissao, setProfissao] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const dias = useMemo(() => gerarDias(), []);
  const servicosDisponiveis = servicosPorPeriodo[periodo];
  const horariosDisponiveis = horariosPorPeriodo[periodo];

  useEffect(() => {
    let ativo = true;
    let cancelarAgendamentos: (() => void) | undefined;

    const cancelarAuth = onAuthStateChanged(auth, async (user) => {
      cancelarAgendamentos?.();
      cancelarAgendamentos = undefined;

      if (!user) {
        if (!ativo) return;

        setUsuario(null);
        setAgendamentos([]);
        setCarregando(false);
        router.replace("/entrar");
        return;
      }

      if (!ativo) return;

      setCarregando(true);
      setErro("");

      try {
        const referenciaPerfil = doc(db, "usuarios", user.uid);
        const resultadoPerfil = await getDoc(referenciaPerfil);

        if (!ativo) return;

        const dadosPerfil: Perfil = resultadoPerfil.exists()
          ? (resultadoPerfil.data() as Perfil)
          : {};

        setUsuario(user);
        setPerfil({
          ...dadosPerfil,
          email: user.email ?? dadosPerfil.email ?? "",
          nome: dadosPerfil.nome ?? user.displayName ?? "",
        });

        const referenciaAgendamentos = collection(
          db,
          "usuarios",
          user.uid,
          "agendamentos"
        );

        cancelarAgendamentos = onSnapshot(
          referenciaAgendamentos,
          (resultado) => {
            if (!ativo) return;

            const dados: Agendamento[] = resultado.docs.map((item) => ({
              id: item.id,
              ...(item.data() as Omit<Agendamento, "id">),
            }));

            setAgendamentos(dados);
            setCarregando(false);
          },
          (erroFirebase) => {
            console.error("Erro ao carregar agendamentos:", erroFirebase);

            if (!ativo) return;

            setErro(
              "Não foi possível carregar seus agendamentos. Verifique as permissões do Firestore."
            );
            setCarregando(false);
          }
        );

        setEtapa("perfil");
      } catch (erroFirebase) {
        console.error("Erro ao carregar perfil:", erroFirebase);

        if (!ativo) return;

        setErro("Não foi possível carregar seus dados.");
        setCarregando(false);
      }
    });

    return () => {
      ativo = false;
      cancelarAuth();
      cancelarAgendamentos?.();
    };
  }, [router]);

  const atualizarPerfil = (campo: keyof Perfil, valor: string) => {
    setPerfil((anterior) => ({ ...anterior, [campo]: valor }));
  };

  const salvarPerfil = async () => {
    setErro("");
    setMensagem("");

    if (!usuario) {
      router.replace("/entrar");
      return;
    }

    const obrigatorios: (keyof Perfil)[] = [
      "nome",
      "cpf",
      "telefone",
      "dataNascimento",
      "cartaoSus",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
    ];

    const faltando = obrigatorios.some(
      (campo) => !String(perfil[campo] ?? "").trim()
    );

    if (faltando) {
      setErro("Preencha todos os campos obrigatórios do perfil.");
      return;
    }

    if (perfil.cep?.replace(/\D/g, "").length !== 8) {
      setErro("Informe um CEP válido com oito números.");
      return;
    }

    try {
      setSalvando(true);

      await setDoc(
        doc(db, "usuarios", usuario.uid),
        {
          ...perfil,
          uid: usuario.uid,
          email: usuario.email ?? "",
          perfilAtualizadoEm: serverTimestamp(),
        },
        { merge: true }
      );

      setMensagem("Seus dados foram salvos.");
      setEtapa("agendar");
    } catch (erroFirebase) {
      console.error("Erro ao salvar perfil:", erroFirebase);
      setErro(
        "Não foi possível salvar seus dados. Verifique as regras do Firestore."
      );
    } finally {
      setSalvando(false);
    }
  };

  const selecionarPeriodo = (novoPeriodo: Periodo) => {
    setPeriodo(novoPeriodo);
    setServico(servicosPorPeriodo[novoPeriodo][0]);
    setHorarioSelecionado("");
    setMensagem("");
    setErro("");
  };

  const horarioOcupado = (horario: string) =>
    agendamentos.some(
      (item) =>
        item.dia === diaSelecionado &&
        item.periodo === periodo &&
        item.horario === horario &&
        item.medico === medico.trim() &&
        item.status !== "cancelado"
    );

  const agendar = async () => {
    setErro("");
    setMensagem("");

    if (!usuario) {
      router.replace("/entrar");
      return;
    }

    if (!servico || !medico.trim() || !diaSelecionado || !horarioSelecionado) {
      setErro("Selecione o atendimento, profissional, dia e horário.");
      return;
    }

    if (horarioOcupado(horarioSelecionado)) {
      setErro("Esse horário já está ocupado. Escolha outro.");
      return;
    }

    const [ano, mes, dia] = diaSelecionado.split("-").map(Number);
    const data = new Date(ano, mes - 1, dia);

    if (data.getDay() === 0 || data.getDay() === 6) {
      setErro("Os agendamentos devem ser feitos em dias úteis.");
      return;
    }

    try {
      setSalvando(true);

      await addDoc(
        collection(db, "usuarios", usuario.uid, "agendamentos"),
        {
          userId: usuario.uid,
          servico,
          periodo,
          medico: medico.trim(),
          profissao: profissao.trim(),
          dia: diaSelecionado,
          horario: horarioSelecionado,
          unidadeReferencia: perfil.unidadeReferencia ?? "",
          status: "agendado",
          criadoEm: serverTimestamp(),
        }
      );

      setMensagem("Solicitação de agendamento registrada.");
      setHorarioSelecionado("");
    } catch (erroFirebase) {
      console.error("Erro ao salvar agendamento:", erroFirebase);
      setErro(
        "Não foi possível registrar o agendamento. Confira sua conexão e as regras do Firestore."
      );
    } finally {
      setSalvando(false);
    }
  };

  const cancelarAgendamento = async (id: string) => {
    if (!usuario) return;

    setErro("");
    setMensagem("");

    try {
      await deleteDoc(
        doc(db, "usuarios", usuario.uid, "agendamentos", id)
      );

      setMensagem("Agendamento removido.");
    } catch (erroFirebase) {
      console.error("Erro ao cancelar agendamento:", erroFirebase);
      setErro("Não foi possível cancelar o agendamento.");
    }
  };

  const campoClasse =
    "mt-1 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#007DB8] focus:ring-2 focus:ring-[#8ED3F5]/50";

  const labelClasse = "block text-sm font-bold text-[#111827]";

  const agendamentosAtivos = agendamentos.filter(
    (item) => item.status !== "cancelado"
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-[#007DB8]">
            Saúde Vale+
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#005F8F] sm:text-4xl">
            Agendamentos
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-[#111827]/70">
            Consulte e organize suas solicitações de atendimento.
          </p>
        </div>

        {(mensagem || erro) && (
          <div
            role={erro ? "alert" : "status"}
            className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
              erro
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {erro || mensagem}
          </div>
        )}

        {carregando || etapa === "carregando" ? (
          <section className="rounded-3xl border border-[#D1D5DB] bg-[#F5F7FA] p-8">
            Verificando seu acesso e carregando seus dados...
          </section>
        ) : etapa === "perfil" ? (
          <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-extrabold text-[#005F8F]">
              Confira seus dados
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#111827]/65">
              Confirme seus dados antes de continuar. Sua unidade de
              referência pode ser confirmada posteriormente pela unidade de
              saúde.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {(
                [
                  ["nome", "Nome completo"],
                  ["cpf", "CPF"],
                  ["telefone", "Telefone"],
                  ["dataNascimento", "Data de nascimento"],
                  ["cartaoSus", "Cartão SUS"],
                  ["cep", "CEP"],
                  ["rua", "Rua ou avenida"],
                  ["numero", "Número"],
                  ["bairro", "Bairro"],
                  ["cidade", "Cidade"],
                ] as [keyof Perfil, string][]
              ).map(([campo, titulo]) => (
                <div key={campo}>
                  <label className={labelClasse}>{titulo} *</label>
                  <input
                    type={campo === "dataNascimento" ? "date" : "text"}
                    className={campoClasse}
                    value={String(perfil[campo] ?? "")}
                    onChange={(e) =>
                      atualizarPerfil(campo, e.target.value)
                    }
                    inputMode={
                      ["cpf", "telefone", "cartaoSus", "cep"].includes(campo)
                        ? "numeric"
                        : undefined
                    }
                  />
                </div>
              ))}

              <div>
                <label className={labelClasse}>E-mail</label>
                <input
                  className={`${campoClasse} bg-[#F5F7FA]`}
                  value={usuario?.email ?? ""}
                  readOnly
                />
              </div>

              <div>
                <label className={labelClasse}>Unidade de referência</label>
                <input
                  className={`${campoClasse} bg-[#F5F7FA]`}
                  value={perfil.unidadeReferencia ?? ""}
                  readOnly
                  placeholder="A confirmar"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={salvarPerfil}
                disabled={salvando}
                className="rounded-xl bg-[#007DB8] px-6 py-3 text-sm font-bold text-white hover:bg-[#005F8F] disabled:opacity-50"
              >
                {salvando ? "Salvando..." : "Salvar e continuar"}
              </button>

              <button
                type="button"
                onClick={() => setEtapa("agendar")}
                className="rounded-xl border border-[#D1D5DB] px-6 py-3 text-sm font-bold text-[#005F8F] hover:border-[#007DB8]"
              >
                Continuar sem alterar
              </button>

              <Link
                href="/perfil"
                className="rounded-xl border border-[#D1D5DB] px-6 py-3 text-sm font-bold text-[#005F8F] hover:border-[#007DB8]"
              >
                Abrir meu perfil
              </Link>
            </div>
          </section>
        ) : etapa === "agendar" ? (
          <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setEtapa("perfil")}
                className="text-sm font-bold text-[#007DB8] hover:underline"
              >
                ← Voltar aos dados
              </button>

              <button
                type="button"
                onClick={() => setEtapa("consultas")}
                className="text-sm font-bold text-[#007DB8] hover:underline"
              >
                Minhas consultas →
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-[#005F8F]">
              Solicitar atendimento
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClasse}>Período</label>
                <select
                  className={campoClasse}
                  value={periodo}
                  onChange={(e) =>
                    selecionarPeriodo(e.target.value as Periodo)
                  }
                >
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                </select>
              </div>

              <div>
                <label className={labelClasse}>Tipo de atendimento</label>
                <select
                  className={campoClasse}
                  value={servico}
                  onChange={(e) => {
                    setServico(e.target.value);
                    setHorarioSelecionado("");
                  }}
                >
                  {servicosDisponiveis.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClasse}>Profissional</label>
                <input
                  className={campoClasse}
                  value={medico}
                  onChange={(e) => setMedico(e.target.value)}
                  placeholder="Nome do profissional"
                />
                <p className="mt-2 text-xs text-[#111827]/60">
                  Os profissionais e horários desta versão são informados
                  manualmente, não vêm de uma agenda oficial.
                </p>
              </div>

              <div>
                <label className={labelClasse}>Profissão</label>
                <input
                  className={campoClasse}
                  value={profissao}
                  onChange={(e) => setProfissao(e.target.value)}
                  placeholder="Ex.: médico ou dentista"
                />
              </div>

              <div>
                <label className={labelClasse}>Dia</label>
                <select
                  className={campoClasse}
                  value={diaSelecionado}
                  onChange={(e) => {
                    setDiaSelecionado(e.target.value);
                    setHorarioSelecionado("");
                  }}
                >
                  <option value="">Selecione um dia</option>
                  {dias.map((dia) => (
                    <option key={dia} value={dia}>
                      {formatarData(dia)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-bold text-[#111827]">
                Horários disponíveis
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {horariosDisponiveis.map((horario) => {
                  const ocupado =
                    Boolean(medico.trim() && diaSelecionado) &&
                    horarioOcupado(horario);

                  return (
                    <button
                      key={horario}
                      type="button"
                      disabled={ocupado}
                      onClick={() => setHorarioSelecionado(horario)}
                      className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                        ocupado
                          ? "cursor-not-allowed border-red-200 bg-red-50 text-red-500"
                          : horarioSelecionado === horario
                            ? "border-[#007DB8] bg-[#007DB8] text-white"
                            : "border-green-200 bg-green-50 text-green-800 hover:border-green-400"
                      }`}
                    >
                      {horario}
                      {ocupado ? " · Ocupado" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            {periodo === "Tarde" && (
              <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
                Gestantes que estiverem passando mal devem procurar a
                unidade pela manhã para orientação. Em uma emergência,
                procure atendimento de urgência.
              </p>
            )}

            <button
              type="button"
              onClick={agendar}
              disabled={salvando}
              className="mt-7 w-full rounded-xl bg-[#007DB8] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#005F8F] disabled:opacity-50"
            >
              {salvando ? "Registrando..." : "Confirmar solicitação"}
            </button>
          </section>
        ) : (
          <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
            <button
              type="button"
              onClick={() => setEtapa("agendar")}
              className="mb-5 text-sm font-bold text-[#007DB8] hover:underline"
            >
              ← Voltar ao agendamento
            </button>

            <h2 className="text-2xl font-extrabold text-[#005F8F]">
              Minhas consultas
            </h2>

            <div className="mt-6 space-y-4">
              {agendamentosAtivos.length === 0 ? (
                <div className="rounded-xl bg-[#F5F7FA] p-5 text-sm text-[#111827]/65">
                  Você ainda não possui agendamentos registrados.
                </div>
              ) : (
                agendamentosAtivos.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#D1D5DB] p-5"
                  >
                    <h3 className="font-extrabold text-[#005F8F]">
                      {item.servico}
                    </h3>

                    <p className="mt-1 text-sm text-[#111827]/65">
                      {item.medico}
                      {item.profissao ? ` · ${item.profissao}` : ""}
                    </p>

                    <p className="mt-2 text-sm text-[#111827]/65">
                      {formatarData(item.dia)} às {item.horario}
                    </p>

                    <p className="mt-2 text-xs text-[#111827]/60">
                      Período: {item.periodo} · Situação: {item.status}
                    </p>

                    <button
                      type="button"
                      onClick={() => cancelarAgendamento(item.id)}
                      className="mt-4 text-sm font-bold text-red-600 hover:text-red-800"
                    >
                      Cancelar agendamento
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
