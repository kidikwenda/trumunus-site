"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const MENU_ITEMS = [
  { id: "features", label: "Funcionalidades" },
  { id: "screenshots", label: "Screenshots" },
  { id: "testimonials", label: "Testemunhos" },
  { id: "contact", label: "Contacto" },
];

const SCREENSHOTS = [
  "/images/app_screen1.jpeg",
  "/images/app_screen2.jpeg",
  "/images/app_screen3.jpeg",
  "/images/app_screen4.jpeg",
  "/images/app_screen5.jpeg",
  "/images/app_screen6.jpeg",
  "/images/app_screen7.jpeg",
];

const CARROSSEL = [
  "/images/slide11.png",
  "/images/slide12.png",
];


const TESTIMONIALS = [
  { name: "Carlos M.", text: "O Trumunus mudou a forma como acompanho os jogos da minha equipa. Rápido, simples e prático!", image: "/testimonials/carlos.jpg" },
  { name: "Ana S.", text: "Adoro como consigo ver estatísticas em tempo real. Nunca estive tão por dentro das ligas locais!", image: "/testimonials/ana.jpg" },
  { name: "João P.", text: "Finalmente um app focado no futebol africano. Simplesmente indispensável!", image: "/testimonials/joao.jpg" },
];

export default function Home() {
  const [platform, setPlatform] = useState<string>("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) setPlatform("android");
    else if (/iPad|iPhone|iPod/.test(userAgent)) setPlatform("ios");
    else setPlatform("desktop");
  }, []);

  const handleDownload = () => {
    if (platform === "android") window.location.href = "https://play.google.com/store/apps/details?id=com.kidikwenda.trumunus";
    else if (platform === "ios") alert("O download só está disponível em dispositivos móveis (Android por enquanto).");
    else alert("O download só está disponível em dispositivos móveis (Android ou iOS).");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const year = typeof window === "undefined" ? new Date().getUTCFullYear() : new Date().getFullYear();

  return (
    <div className="min-h-screen font-sans bg-[#001F3F] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-[#001F3F]/95 backdrop-blur-md shadow-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">Trumunus</h1>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {MENU_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-[#00BFFF] transition-colors">
                {item.label}
              </a>
            ))}
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full font-semibold shadow hover:scale-105 transition-transform"
            >
              Login
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden px-2 py-1 border rounded text-white border-white"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-[#001F3F] shadow-lg flex flex-col z-50">
            {MENU_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block px-6 py-3 border-b border-[#0A0E21] hover:bg-[#0A0E21]/20 transition"
                onClick={() => setMobileMenu(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { setShowAuthModal(true); setMobileMenu(false); }}
              className="w-full text-left px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-b font-semibold shadow hover:scale-105 transition-transform"
            >
              Login
            </button>
          </div>
        )}
      </header>


      {/* Hero */}
      <section className="pt-32 pb-16 text-center bg-gradient-to-r from-[#001F3F] via-[#0A0E21] to-[#001F3F] animate-gradient-x">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Conecte-se ao <span className="text-[#00BFFF]">futebol comunitário</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Resultados em tempo real, estatísticas e acompanhamento de jogos locais.
        </p>
        {platform === "android" && <button
          onClick={handleDownload}
          className="px-8 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full font-semibold shadow hover:scale-105 transition-transform"
        >
          Baixar agora
        </button>}
      </section>

      {/* Slider */}
      <section id="screenshots" className="py-16 bg-[#0A0E21]/70">
        <div className="max-w-7xl mx-auto">
          <Slider {...sliderSettings}>
            {CARROSSEL.map((src, i) => (
              <div key={i}>
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                  <Image
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>


      {/* Features */}
      <section id="features" className="py-16 max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Por que usar o Trumunus?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              title: "⚽ Estatísticas ao vivo",
              desc: "Acompanhe resultados detalhados de cada partida, veja quem marcou, assistências, cartões e desempenho de cada jogador em tempo real."
            },
            {
              title: "📅 Calendário inteligente",
              desc: "Gerencie jogos da sua equipa sem conflitos, visualize próximos confrontos e receba lembretes automáticos."
            },
            {
              title: "👥 Gestão de equipa",
              desc: "Crie e administre a sua equipa, acompanhe o plantel, atualize posições e mantenha todos os jogadores informados."
            },
            {
              title: "📊 Histórico completo",
              desc: "Consulte o histórico de resultados da equipa, desempenho individual de jogadores e estatísticas de cada partida."
            },
            {
              title: "🔔 Notificações instantâneas",
              desc: "Receba alertas sobre gols, início de partidas, alterações de escalação ou atualizações importantes da liga."
            },
            {
              title: "🏆 Rankings e desempenho",
              desc: "Compare a sua equipa com outras, acompanhe classificações e descubra oportunidades de melhoria com dados de desempenho."
            },
          ].map((f, i) => (
            <div key={i} className="p-6 bg-[#0A0E21]/80 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform">
              <h4 className="font-semibold text-xl md:text-2xl mb-3 text-[#00BFFF]">{f.title}</h4>
              <p className="text-gray-300 text-sm md:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

{/* Slider */}
<section id="screenshots" className="py-16 bg-[#0A0E21]/70">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Veja o Trumunus em ação
      </h3>
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="rounded-2xl shadow-lg"
        >
          {SCREENSHOTS.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden border border-[#00BFFF]/50">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="object-contain bg-black"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>




      {/* Testimonials */}
      <section id="testimonials" className="py-16 max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-12">O que dizem os nossos usuários</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-[#0A0E21]/80 p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition transform text-center">
              <Image
                src={t.image}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4 border border-[#00BFFF]/50"
              />
              <p className="text-gray-300 italic mb-4">“{t.text}”</p>
              <h4 className="font-bold text-[#00BFFF]">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 text-center bg-[#001F3F]">
        <h3 className="text-2xl font-bold mb-4">Entre em contacto</h3>
        <p className="mb-6">Tem dúvidas ou sugestões? Fale connosco!</p>
        <a
          href="mailto:suporte@trumunus.com"
          className="px-6 py-3 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] rounded-full font-semibold shadow hover:scale-105 transition-transform"
        >
          Enviar Email
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-[#0A0E21] text-gray-400 text-center">
        © {year} Trumunus. Todos os direitos reservados.
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#0A0E21]/95 rounded-lg p-8 max-w-md w-full shadow-lg">
            <button className="absolute top-3 right-3 text-white text-xl" onClick={() => setShowAuthModal(false)}>✕</button>
            <h3 className="text-2xl font-bold mb-4 text-center">{authMode === "login" ? "Login" : "Inscrever-se"}</h3>
            <form className="flex flex-col gap-4">
              {authMode === "signup" && <input type="text" placeholder="Nome" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00BFFF]" />}
              <input type="email" placeholder="Email" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00BFFF]" />
              <input type="password" placeholder="Senha" className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00BFFF]" />
              <button className="px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#1E90FF] text-white rounded font-semibold shadow hover:scale-105 transition-transform">
                {authMode === "login" ? "Entrar" : "Criar Conta"}
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-300 text-center">
              {authMode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
              <button className="text-[#00BFFF] underline" onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                {authMode === "login" ? "Inscreva-se" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Gradiente animado */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
}