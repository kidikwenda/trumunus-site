"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 sm:px-12 py-12 sm:py-16">
      {/* Cabeçalho */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        TRUMUNUS – Política de Privacidade
      </h1>

      {/* Container de conteúdo */}
      <div className="space-y-8">
        <Section title="1. Introdução">
          A sua privacidade é importante para nós. Esta Política de Privacidade
          descreve como o aplicativo TRUMUNUS recolhe, utiliza e protege as
          informações pessoais dos seus utilizadores.
        </Section>

        <Section title="2. Informações que Coletamos">
          Podemos coletar as seguintes informações:
          <br />• Nome ou nome de utilizador
          <br />• Número de telefone
          <br />• Senha de acesso à conta
          <br />• Informações de uso do aplicativo
        </Section>

        <Section title="3. Uso das Informações">
          As informações coletadas são utilizadas para:
          <br />• Criar e gerir contas de utilizador
          <br />• Garantir acesso seguro ao aplicativo
          <br />• Melhorar funcionalidades e desempenho
          <br />• Comunicar atualizações ou informações importantes
        </Section>

        <Section title="4. Segurança dos Dados">
          As palavras-passe são armazenadas de forma criptografada. Adotamos
          medidas técnicas e organizacionais adequadas para proteger os dados
          pessoais contra acesso não autorizado, perda ou uso indevido.
        </Section>

        <Section title="5. Compartilhamento de Dados">
          Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros,
          exceto quando exigido por lei ou para cumprimento de obrigações legais.
        </Section>

        <Section title="6. Direitos do Utilizador">
          O utilizador tem o direito de:
          <br />• Aceder aos seus dados pessoais
          <br />• Solicitar correção ou atualização de informações
          <br />• Solicitar a exclusão da conta e dos dados associados
        </Section>

        <Section title="7. Alterações desta Política">
          Esta Política de Privacidade pode ser atualizada periodicamente.
          Recomendamos que os utilizadores revisem esta página para se manterem
          informados sobre eventuais alterações.
        </Section>

        <Section title="8. Contato">
          Em caso de dúvidas ou solicitações relacionadas à privacidade, entre em
          contacto connosco através dos canais disponibilizados no aplicativo.
        </Section>

        {/* Rodapé */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Última atualização: 21 de dezembro de 2025
        </p>
      </div>
    </div>
  );
}

// Componente de seção com estilo
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-yellow-300">
        {title}
      </h2>
      <p className="text-sm sm:text-base leading-relaxed text-gray-200">
        {children}
      </p>
    </div>
  );
}
