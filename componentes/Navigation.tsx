"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <nav
      aria-label="Navegação principal"
      className="border-y border-[#D1D5DB] bg-[#F5F7FA]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* DESKTOP */}
        <div className="hidden h-14 items-center justify-center gap-10 md:flex">

          <Link
            href="/"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827] transition hover:text-[#007DB8]"
          >
            Início
          </Link>

          <Link
            href="#servicos"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827] transition hover:text-[#007DB8]"
          >
            Serviços
          </Link>

          <Link
            href="#sobre"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827] transition hover:text-[#007DB8]"
          >
            Sobre o projeto
          </Link>

          <Link
            href="#como-funciona"
            className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#111827] transition hover:text-[#007DB8]"
          >
            Como funciona
          </Link>

        </div>

        {/* MOBILE */}
        <div className="flex h-14 items-center justify-between md:hidden">

          <span className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#005F8F]">
            Menu
          </span>

          <button
            type="button"
            onClick={() => setMenuAberto((estado) => !estado)}
            className="rounded-xl border border-[#D1D5DB] bg-white px-4 py-2 font-[family-name:var(--font-inter)] font-bold text-[#005F8F] transition hover:border-[#007DB8] hover:text-[#007DB8]"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? "✕" : "☰"}
          </button>

        </div>

        {/* MOBILE ABERTO */}
        {menuAberto && (
          <div className="border-t border-[#D1D5DB] py-3 md:hidden">

            <div className="flex flex-col gap-1">

              <Link
                href="/"
                onClick={fecharMenu}
                className="rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] font-semibold text-[#111827] transition hover:bg-white hover:text-[#007DB8]"
              >
                Início
              </Link>

              <Link
                href="#servicos"
                onClick={fecharMenu}
                className="rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] font-semibold text-[#111827] transition hover:bg-white hover:text-[#007DB8]"
              >
                Serviços
              </Link>

              <Link
                href="#sobre"
                onClick={fecharMenu}
                className="rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] font-semibold text-[#111827] transition hover:bg-white hover:text-[#007DB8]"
              >
                Sobre o projeto
              </Link>

              <Link
                href="#como-funciona"
                onClick={fecharMenu}
                className="rounded-xl px-4 py-3 font-[family-name:var(--font-inter)] font-semibold text-[#111827] transition hover:bg-white hover:text-[#007DB8]"
              >
                Como funciona
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}