"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

import Header from "../../componentes/Header";
import Navigation from "../../componentes/Navigation";
import Footer from "../../componentes/Footer";
import { auth, db } from "../firebase";

type Escala = "escala1" | "escala2";
type Periodo = "Manhã" | "Tarde";

type Medico = {
  id: number;
  nome: string;
  profissao: string;
  escala: Escala;
  servicos: string[];
};

type Agendamento = {
  id: string;
  userId: string;
  servico: string;
  periodo: Periodo;
  medico: string;
  dia: string;
  horario: string;
  status: string;
};

const medicos: Medico[] = [
  {
    id: 1,
    nome: "Dra. Ana Oliveira",
    profissao: "Clínico geral",
    escala: "escala1",
    servicos: ["Consulta médica", "Consulta de retorno"],
  },
  {
    id: 2,
    nome: "Dr. Carlos Mendes",
    profissao: "Clínico geral",
    escala: "escala2",
    servicos: ["Consulta médica", "Consulta de retorno"],
  },
  {
    id: 3,
    nome: "Dra. Mariana Costa",
    profissao: "Pediatria",
    escala: "escala1",
    servicos: ["Consulta médica", "Consulta de retorno"],
  },
  {
    id: 4,
    nome: "Enf. Beatriz Lima",
    profissao: "Enfermagem",
    escala: "escala1",
    servicos: ["Enfermagem"],
  },
  {
    id: 5,
    nome: "Enf. Lucas Martins",
    profissao: "Enfermagem",
    escala: "escala2",
    servicos: ["Enfermagem"],
  },
  {
    id: 6,
    nome: "Dr. Rafael Souza",
    profissao: "Odontologia",
    escala: "escala1",
    servicos: ["Odontologia"],
  },
  {
    id: 7,
    nome: "Dra. Juliana Martins",
    profissao: "Odontologia",
    escala: "escala2",
    servicos: ["Odontologia"],
  },
  {
    id: 8,
    nome: "Dra. Fernanda Alves",
    profissao: "Clínico geral",
    escala: "escala2",
    servicos: [
      "Renovação de receita",
      "Consulta de retorno",
    ],
  },
];

const horariosEscala1: Record<Periodo, string[]> = {
  Manhã: ["07:30", "08:30", "10:30", "11:30"],
  Tarde: ["13:30", "14:30", "16:00"],
};

const horariosEscala2: Record<Periodo, string[]> = {
  Manhã: ["08:00", "09:00", "10:00", "11:00"],
  Tarde: ["14:00", "15:00", "16:00"],
};

const servicosPorPeriodo: Record<Periodo, string[]> = {
  Manhã: [
    "Consulta médica",
    "Enfermagem",
    "Odontologia",
    "Renovação de receita",
    "Consulta de retorno",
  ],
  Tarde: [
    "Odontologia",
    "Renovação de receita",
    "Consulta de retorno",
  ],
};

function gerarDias() {
  const hoje = new Date();
  const dias: string[] = [];

  // Considera os próximos 14 dias corridos.
  // Sábados e domingos não são exibidos.
  for (let i = 0; i < 14; i++) {
    const data = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate() + i
    );

    const diaDaSemana = data.getDay();

    // 0 = domingo; 6 = sábado.
    if (diaDaSemana === 0 || diaDaSemana === 6) {
      continue;
    }

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    dias.push(`${ano}-${mes}-${dia}`);
  }

  return dias;
}

function formatarDia(dataString: string) {
  const [ano, mes, dia] = dataString.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);

  return {
    semana: data
      .toLocaleDateString("pt-BR", {
        weekday: "short",
      })
      .replace(".", ""),
    dia: String(data.getDate()).padStart(2, "0"),
  };
}

function formatarDataCompleta(dataString: string) {
  const [ano, mes, dia] = dataString.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);

  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export default function AgendamentosPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [periodo, setPeriodo] = useState<Periodo>("Manhã");
  const [servico, setServico] = useState("Consulta médica");

  const [medicoSelecionado, setMedicoSelecionado] =
    useState<Medico | null>(null);

  const [diaSelecionado, setDiaSelecionado] = useState(
    () => gerarDias()[0] ?? ""
  );

  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const dias = useMemo(() => gerarDias(), []);

  // AUTENTICAÇÃO E ATUALIZAÇÃO DOS AGENDAMENTOS EM TEMPO REAL
  useEffect(() => {
    let cancelarAgendamentos: (() => void) | undefined;

    const cancelarObservador = onAuthStateChanged(
      auth,
      (user) => {
        cancelarAgendamentos?.();
        cancelarAgendamentos = undefined;

        if (!user) {
          setUsuario(null);
          setAgendamentos([]);
          setCarregando(false);
          router.replace("/login");
          return;
        }

        setUsuario(user);
        setCarregando(true);
        setErro("");

        const referencia = collection(
          db,
          "usuarios",
          user.uid,
          "agendamentos"
        );

        cancelarAgendamentos = onSnapshot(
          referencia,
          (resultado) => {
            const dados = resultado.docs.map((item) => ({
              id: item.id,
              ...(item.data() as Omit<Agendamento, "id">),
            }));

            setAgendamentos(dados);
            setErro("");
            setCarregando(false);
          },
          (error) => {
            console.error(
              "Erro ao carregar agendamentos do Firebase:",
              error
            );

            setErro(
              "Não foi possível carregar seus agendamentos. Verifique as permissões do Firebase."
            );

            setCarregando(false);
          }
        );
      }
    );

    return () => {
      cancelarObservador();
      cancelarAgendamentos?.();
    };
  }, [router]);

  const servicosDisponiveis = servicosPorPeriodo[periodo];

  const medicosDisponiveis = useMemo(() => {
    return medicos.filter((medico) =>
      medico.servicos.includes(servico)
    );
  }, [servico]);

  useEffect(() => {
    if (
      medicoSelecionado &&
      !medicosDisponiveis.some(
        (medico) => medico.id === medicoSelecionado.id
      )
    ) {
      setMedicoSelecionado(null);
      setHorarioSelecionado("");
    }
  }, [medicosDisponiveis, medicoSelecionado]);

  const horariosDoMedico = useMemo(() => {
    if (!medicoSelecionado) {
      return [];
    }

    return medicoSelecionado.escala === "escala1"
      ? horariosEscala1[periodo]
      : horariosEscala2[periodo];
  }, [medicoSelecionado, periodo]);

  const agendamentosDoDia = agendamentos.filter(
    (agendamento) =>
      agendamento.dia === diaSelecionado &&
      agendamento.periodo === periodo
  );

  const horarioOcupado = (horario: string) => {
    return agendamentosDoDia.some(
      (agendamento) =>
        agendamento.horario === horario &&
        agendamento.medico === medicoSelecionado?.nome &&
        agendamento.status !== "cancelado"
    );
  };

  const diaTemHorarioLivre = (dia: string) => {
    if (!medicoSelecionado) {
      return true;
    }

    const horarios =
      medicoSelecionado.escala === "escala1"
        ? horariosEscala1[periodo]
        : horariosEscala2[periodo];

    return horarios.some(
      (horario) =>
        !agendamentos.some(
          (agendamento) =>
            agendamento.dia === dia &&
            agendamento.periodo === periodo &&
            agendamento.medico === medicoSelecionado.nome &&
            agendamento.horario === horario &&
            agendamento.status !== "cancelado"
        )
    );
  };

  const selecionarServico = (valor: string) => {
    setServico(valor);
    setMedicoSelecionado(null);
    setHorarioSelecionado("");
    setMensagem("");
    setErro("");
  };

  const selecionarPeriodo = (valor: Periodo) => {
    setPeriodo(valor);
    setMedicoSelecionado(null);
    setHorarioSelecionado("");
    setMensagem("");
    setErro("");

    const primeiroServico = servicosPorPeriodo[valor][0];

    setServico(primeiroServico);
  };

  const selecionarMedico = (medico: Medico) => {
    setMedicoSelecionado(medico);
    setHorarioSelecionado("");
    setMensagem("");
    setErro("");
  };

  // CONFIRMAR AGENDAMENTO
  const agendar = async () => {
    setMensagem("");
    setErro("");

    if (!usuario) {
      router.replace("/login");
      return;
    }

    if (!medicoSelecionado) {
      setErro("Selecione um profissional.");
      return;
    }

    if (!diaSelecionado) {
      setErro("Selecione um dia.");
      return;
    }

    // Validação adicional para impedir agendamentos aos fins de semana.
    const [ano, mes, dia] = diaSelecionado.split("-").map(Number);
    const dataSelecionada = new Date(ano, mes - 1, dia);
    const diaDaSemana = dataSelecionada.getDay();

    if (diaDaSemana === 0 || diaDaSemana === 6) {
      setErro(
        "Não é possível agendar aos sábados ou domingos. Selecione um dia útil."
      );
      return;
    }

    if (!horarioSelecionado) {
      setErro("Selecione um horário.");
      return;
    }

    if (horarioOcupado(horarioSelecionado)) {
      setErro("Esse horário já está ocupado.");
      return;
    }

    setSalvando(true);

    try {
      await addDoc(
        collection(
          db,
          "usuarios",
          usuario.uid,
          "agendamentos"
        ),
        {
          userId: usuario.uid,
          servico,
          periodo,
          medico: medicoSelecionado.nome,
          profissao: medicoSelecionado.profissao,
          escalaInterna: medicoSelecionado.escala,
          dia: diaSelecionado,
          horario: horarioSelecionado,
          status: "agendado",
          criadoEm: serverTimestamp(),
        }
      );

      // A lista será atualizada automaticamente pelo onSnapshot.
      setMensagem("Agendamento realizado com sucesso.");
      setHorarioSelecionado("");
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);

      setErro(
        "Não foi possível realizar o agendamento. Verifique as permissões do Firebase e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  };

  // CANCELAR AGENDAMENTO
  const cancelarAgendamento = async (id: string) => {
    if (!usuario) {
      return;
    }

    setMensagem("");
    setErro("");

    try {
      await deleteDoc(
        doc(
          db,
          "usuarios",
          usuario.uid,
          "agendamentos",
          id
        )
      );

      // O onSnapshot atualizará a lista após a exclusão.
      setMensagem("Agendamento cancelado.");
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);

      setErro("Não foi possível cancelar o agendamento.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <div className="mb-8">
            <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
              Agendamentos
            </p>

            <h1 className="mt-2 font-[family-name:var(--font-inter)] text-3xl font-extrabold tracking-tight text-[#005F8F] sm:text-4xl">
              Agende seu atendimento
            </h1>

            <p className="mt-2 max-w-3xl font-[family-name:var(--font-roboto)] text-base leading-7 text-[#111827]/65">
              Escolha o período, atendimento, profissional, dia e horário disponível.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm sm:p-8">
              <div>
                <label className="mb-3 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                  Período
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {(["Manhã", "Tarde"] as Periodo[]).map((opcao) => (
                    <button
                      key={opcao}
                      type="button"
                      onClick={() => selecionarPeriodo(opcao)}
                      className={`rounded-xl border px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-bold transition ${periodo === opcao
                          ? "border-[#007DB8] bg-[#007DB8] text-white"
                          : "border-[#D1D5DB] bg-white text-[#005F8F] hover:border-[#007DB8]"
                        }`}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <label
                  htmlFor="servico"
                  className="mb-3 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]"
                >
                  Tipo de atendimento
                </label>

                <select
                  id="servico"
                  value={servico}
                  onChange={(event) =>
                    selecionarServico(event.target.value)
                  }
                  className="w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-[#111827] outline-none focus:border-[#007DB8] focus:ring-2 focus:ring-[#8ED3F5]/50"
                >
                  {servicosDisponiveis.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {periodo === "Tarde" && (
                  <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 font-[family-name:var(--font-roboto)] text-xs leading-5 text-amber-800">
                    No período da tarde também são realizados atendimentos para gestantes, conforme disponibilidade da unidade.
                  </p>
                )}
              </div>

              <div className="mt-7">
                <label className="mb-3 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                  Profissional
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {medicosDisponiveis.map((medico) => (
                    <button
                      key={medico.id}
                      type="button"
                      onClick={() => selecionarMedico(medico)}
                      className={`rounded-2xl border p-4 text-left transition ${medicoSelecionado?.id === medico.id
                          ? "border-[#007DB8] bg-[#8ED3F5]/10 ring-2 ring-[#8ED3F5]/40"
                          : "border-[#D1D5DB] bg-white hover:border-[#007DB8]"
                        }`}
                    >
                      <p className="font-[family-name:var(--font-inter)] text-sm font-extrabold text-[#005F8F]">
                        {medico.nome}
                      </p>

                      <p className="mt-1 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/60">
                        {medico.profissao}
                      </p>
                    </button>
                  ))}
                </div>

                {!medicosDisponiveis.length && (
                  <div className="rounded-2xl border border-[#D1D5DB] bg-[#F5F7FA] p-5">
                    <p className="font-[family-name:var(--font-roboto)] text-sm text-[#111827]/65">
                      Nenhum profissional disponível para este atendimento.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-[#D1D5DB] pt-8">
                <label className="mb-3 block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                  Escolha o dia
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                  {dias.map((dia) => {
                    const formatado = formatarDia(dia);
                    const livre = diaTemHorarioLivre(dia);

                    return (
                      <button
                        key={dia}
                        type="button"
                        onClick={() => {
                          setDiaSelecionado(dia);
                          setHorarioSelecionado("");
                          setMensagem("");
                          setErro("");
                        }}
                        className={`rounded-2xl border p-3 text-center transition ${diaSelecionado === dia
                            ? "border-[#007DB8] bg-[#007DB8] text-white"
                            : livre
                              ? "border-green-200 bg-green-50 text-green-800 hover:border-green-400"
                              : "border-red-200 bg-red-50 text-red-800"
                          }`}
                      >
                        <span className="block font-[family-name:var(--font-roboto)] text-xs uppercase">
                          {formatado.semana}
                        </span>

                        <span className="mt-1 block font-[family-name:var(--font-inter)] text-xl font-extrabold">
                          {formatado.dia}
                        </span>

                        <span className="mt-1 block font-[family-name:var(--font-roboto)] text-[11px]">
                          {livre ? "Livre" : "Sem vagas"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 border-t border-[#D1D5DB] pt-8">
                <div>
                  <label className="block font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                    Horários disponíveis
                  </label>

                  <p className="mt-1 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/55">
                    {medicoSelecionado
                      ? formatarDataCompleta(diaSelecionado)
                      : "Selecione um profissional para ver os horários."}
                  </p>
                </div>

                {medicoSelecionado && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {horariosDoMedico.map((horario) => {
                      const ocupado = horarioOcupado(horario);

                      return (
                        <button
                          key={horario}
                          type="button"
                          disabled={ocupado}
                          onClick={() =>
                            setHorarioSelecionado(horario)
                          }
                          className={`rounded-xl border px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-bold transition ${ocupado
                              ? "cursor-not-allowed border-red-200 bg-red-50 text-red-500"
                              : horarioSelecionado === horario
                                ? "border-[#007DB8] bg-[#007DB8] text-white"
                                : "border-green-200 bg-green-50 text-green-800 hover:border-green-400"
                            }`}
                        >
                          {horario}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-4 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/60">
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    Disponível
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    Ocupado
                  </span>
                </div>
              </div>

              {mensagem && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-green-700"
                >
                  {mensagem}
                </div>
              )}

              {erro && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-[family-name:var(--font-roboto)] text-sm text-red-700"
                >
                  {erro}
                </div>
              )}

              <button
                type="button"
                onClick={agendar}
                disabled={
                  carregando ||
                  salvando ||
                  !medicoSelecionado ||
                  !horarioSelecionado
                }
                className="mt-7 w-full rounded-xl bg-[#007DB8] px-5 py-3.5 font-[family-name:var(--font-inter)] text-sm font-bold text-white transition hover:bg-[#005F8F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {salvando
                  ? "Agendando..."
                  : carregando
                    ? "Carregando seus dados..."
                    : "Confirmar agendamento"}
              </button>
            </section>

            <aside className="h-fit space-y-6">
              <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
                <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                  Meu atendimento
                </p>

                {medicoSelecionado ? (
                  <div className="mt-5">
                    <h2 className="font-[family-name:var(--font-inter)] text-xl font-extrabold text-[#005F8F]">
                      {medicoSelecionado.nome}
                    </h2>

                    <p className="mt-1 font-[family-name:var(--font-roboto)] text-sm text-[#111827]/60">
                      {medicoSelecionado.profissao}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-xl bg-[#F5F7FA] p-4">
                        <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                          Atendimento
                        </p>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                          {servico}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F5F7FA] p-4">
                        <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                          Data
                        </p>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                          {diaSelecionado
                            ? formatarDataCompleta(diaSelecionado)
                            : "Selecione um dia"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F5F7FA] p-4">
                        <p className="font-[family-name:var(--font-roboto)] text-xs text-[#111827]/50">
                          Horário
                        </p>

                        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm font-bold text-[#111827]">
                          {horarioSelecionado ||
                            "Ainda não selecionado"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                    Selecione um profissional para visualizar o resumo do atendimento.
                  </p>
                )}
              </section>

              <section className="rounded-3xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-sm font-bold uppercase tracking-wide text-[#007DB8]">
                      Meus agendamentos
                    </p>

                    <h2 className="mt-2 font-[family-name:var(--font-inter)] text-lg font-extrabold text-[#111827]">
                      Consultas marcadas
                    </h2>
                  </div>

                  <span className="rounded-full bg-[#8ED3F5]/30 px-3 py-1 font-[family-name:var(--font-inter)] text-xs font-bold text-[#005F8F]">
                    {
                      agendamentos.filter(
                        (item) => item.status !== "cancelado"
                      ).length
                    }
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {carregando ? (
                    <p className="rounded-xl bg-[#F5F7FA] p-4 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                      Carregando seus agendamentos...
                    </p>
                  ) : agendamentos.filter(
                    (item) => item.status !== "cancelado"
                  ).length === 0 ? (
                    <p className="rounded-xl bg-[#F5F7FA] p-4 font-[family-name:var(--font-roboto)] text-sm leading-6 text-[#111827]/60">
                      Você ainda não possui agendamentos.
                    </p>
                  ) : (
                    agendamentos
                      .filter(
                        (item) => item.status !== "cancelado"
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-[#D1D5DB] bg-white p-4"
                        >
                          <p className="font-[family-name:var(--font-inter)] text-sm font-extrabold text-[#005F8F]">
                            {item.servico}
                          </p>

                          <p className="mt-1 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/60">
                            {item.medico}
                          </p>

                          <p className="mt-2 font-[family-name:var(--font-roboto)] text-xs text-[#111827]/60">
                            {formatarDataCompleta(item.dia)} às{" "}
                            {item.horario}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              cancelarAgendamento(item.id)
                            }
                            className="mt-4 font-[family-name:var(--font-inter)] text-xs font-bold text-red-600 transition hover:text-red-800"
                          >
                            Cancelar agendamento
                          </button>
                        </div>
                      ))
                  )}
                </div>
              </section>

              <Link
                href="/dashboard"
                className="block rounded-2xl border border-[#D1D5DB] bg-[#F5F7FA] p-5 text-center font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F] transition hover:border-[#007DB8] hover:bg-white"
              >
                ← Voltar para minha área
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}