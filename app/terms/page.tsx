"use client";

export default function TermsPage() {
  return (
    <div className="w-screen min-h-screen bg-black text-white px-4 sm:px-12 py-12 sm:py-16">
      {/* Cabeçalho */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        TRUMUNUS - Termos de Uso
      </h1>

      {/* Container de conteúdo */}
      <div className="space-y-8">
        {/* Seção individual */}
        <Section title="1. Uso do Aplicativo">
          O aplicativo é destinado a qualquer pessoa interessada em esportes. É gratuito e de uso pessoal.
        </Section>

        <Section title="2. Coleta de Dados">
          O aplicativo coleta dados de contato, como nome, e-mail e telefone, para fins de controle de acesso e comunicação sobre funcionalidades e atualizações.
        </Section>

        <Section title="3. Privacidade dos Dados">
          Seus dados não serão compartilhados com terceiros. Eles são usados exclusivamente para gestão de contas e melhoria da experiência do usuário dentro do aplicativo.
        </Section>

        <Section title="4. Responsabilidade">
          O aplicativo não se responsabiliza por informações externas ou erros ocasionais de funcionamento. O uso do aplicativo é de responsabilidade do usuário.
        </Section>

        <Section title="5. Alterações dos Termos">
          Podemos atualizar estes Termos de Uso periodicamente. Recomendamos que você os consulte regularmente para estar ciente de quaisquer alterações.
        </Section>

        <Section title="6. Contato">
          Caso tenha dúvidas sobre estes termos ou sobre o uso do aplicativo, entre em contato conosco através do e-mail ou telefone fornecido no aplicativo.
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
function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
