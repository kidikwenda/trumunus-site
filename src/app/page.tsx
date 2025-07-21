import Head from 'next/head';
export default function Home() {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="Vpq24ZmZVqBwwIfRkWkagnB3EujB6XNIypNfgFxB-Yc" />
      </Head>
      <main className="min-h-screen bg-white text-gray-800">
        {/* Hero */}
        <section className="py-24 px-6 text-center bg-gradient-to-br from-blue-600 to-green-500 text-white">
          <h1 className="text-5xl font-bold mb-4">Trumunus</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Acompanhe campeonatos e estatísticas em tempo real com o poder do Trumunus.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
            Saber mais
          </button>
        </section>

        {/* Sobre */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4">Por que usar o Trumunus?</h2>
            <p className="text-gray-600">Trumunus é uma plataforma de gestão e acompanhamento de competições desportivas, ideal para ligas regionais, clubes e organizadores de eventos.</p>
          </div>
        </section>

        {/* Galeria de Telas */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10">Telas do Produto</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {['images/app_screen1.jpeg', 'images/app_screen2.jpeg', 'images/app_screen3.jpeg'].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Tela ${i + 1}`}
                  className="rounded-xl shadow-lg hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-blue-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Pronto para testar o Trumunus?</h2>
          <p className="mb-6">Comece agora mesmo e leve sua competição para o próximo nível.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition">
            Entrar em contacto
          </button>
        </section>

        {/* Rodapé */}
        <footer className="py-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Trumunus. Todos os direitos reservados.
        </footer>
      </main>
    </>
  )
}
