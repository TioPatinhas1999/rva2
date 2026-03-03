import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from './components/ui/background-paper-shaders';
import { 
  ChevronRight, 
  X, 
  Layout, 
  Home, 
  Truck, 
  Flag, 
  Square,
  Sparkles,
  ArrowRight,
  Phone,
  Layers,
  Zap,
  CheckCircle2,
  Menu,
  Instagram,
  Facebook
} from 'lucide-react';
import { cn } from './lib/utils';

const SERVICES = [
  { 
    id: 'fachadas', 
    title: 'Fachadas Impactantes', 
    icon: Layout, 
    description: 'Fachadas em ACM, PVC e Lona com iluminação LED de alta performance que dominam a rua.', 
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&h=800&auto=format&fit=crop',
    color: 'from-blue-600 to-cyan-500'
  },
  { 
    id: 'residencial', 
    title: 'Adesivagem Premium', 
    icon: Home, 
    description: 'Decoração de interiores, vidros e paredes com acabamentos que transformam lares.', 
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&h=800&auto=format&fit=crop',
    color: 'from-purple-600 to-pink-500'
  },
  { 
    id: 'veiculos', 
    title: 'Frotas de Elite', 
    icon: Truck, 
    description: 'Adesivagem de veículos com materiais de alta durabilidade que vendem enquanto você dirige.', 
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1200&h=800&auto=format&fit=crop',
    color: 'from-emerald-600 to-teal-500'
  },
  { 
    id: 'banners', 
    title: 'Comunicação Ágil', 
    icon: Flag, 
    description: 'Banners e faixas em alta resolução para eventos que exigem perfeição imediata.', 
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&h=800&auto=format&fit=crop',
    color: 'from-orange-600 to-amber-500'
  },
  { 
    id: 'placas', 
    title: 'Sinalização Robusta', 
    icon: Square, 
    description: 'Placas em PVC e ACM com resistência industrial para ambientes desafiadores.', 
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200&h=800&auto=format&fit=crop',
    color: 'from-slate-700 to-slate-900'
  },
];

const PROCESS = [
  { step: '01', title: 'Consultoria Estratégica', desc: 'Analisamos seu espaço e objetivos para criar a melhor estratégia visual.' },
  { step: '02', title: 'Design de Vanguarda', desc: 'Nossa equipe cria artes exclusivas que captam a essência da sua marca.' },
  { step: '03', title: 'Produção Hi-Tech', desc: 'Utilizamos tecnologia de ponta para imprimir e fabricar com perfeição.' },
  { step: '04', title: 'Instalação de Precisão', desc: 'Nossa equipe técnica garante um acabamento impecável no local.' },
];

export default function App() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ShaderPlane position={[0, 0, 0]} color1="#0a0a0a" color2="#2563eb" />
          </Suspense>
        </Canvas>
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Layers className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">RogérioVisual</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {['Serviços', 'Processo', 'Dúvidas'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/5519992219448"
            className="px-8 py-3 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors"
          >
            Orçamento
          </motion.a>
        </div>

        <button 
          className="md:hidden w-12 h-12 glass rounded-full flex items-center justify-center text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
          >
            {['Serviços', 'Processo', 'Dúvidas'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-black text-white"
              >
                {item}
              </button>
            ))}
            <a href="https://wa.me/5519992219448" className="px-10 py-5 bg-blue-600 text-white rounded-full font-black text-xl">
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-10 font-display italic">
              Visão <br />
              <span className="text-blue-600 not-italic">Inovadora.</span> <br />
              Impacto.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed">
              Elevamos o padrão da sua marca com fachadas monumentais e adesivagem de precisão. Onde outros veem superfícies, nós vemos oportunidades.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0a0a] bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Client" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="block text-white font-black">+500 Marcas</span>
                  <span className="text-slate-500 font-bold">Transformadas</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1200&h=1500&auto=format&fit=crop" 
                alt="Main Project" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="glass p-8 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Zap className="text-white" size={24} />
                    </div>
                    <div>
                      <span className="block text-white font-black">Case de Sucesso</span>
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Fachada ACM SJBV</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm font-medium italic font-display">"A RogérioVisual não apenas instalou uma placa, eles criaram uma nova identidade para o meu negócio."</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Sensational Numbers */}
      <section className="py-20 border-y border-white/5 bg-white/5">
        <div className="container mx-auto px-6 grid grid-cols-2 gap-12">
          {[
            { label: 'Cidades Atendidas', value: '15+' },
            { label: 'Anos de Experiência', value: '10+' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <span className="block text-4xl md:text-6xl font-black text-white mb-2 font-display">{stat.value}</span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services - Horizontal Scroll Experience */}
      <section id="servicos" className="py-40">
        <div className="container mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div>
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Portfólio de Elite</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-display italic">
                Soluções que <br /> <span className="text-blue-600 not-italic">Dominam.</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-md font-medium text-lg leading-relaxed">
              Cada projeto é uma obra de arte técnica. Utilizamos os melhores materiais do mercado para garantir que sua marca brilhe por anos.
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-20 px-6 gap-8 scrollbar-hide">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[350px] md:min-w-[500px] group cursor-pointer"
              onClick={() => setActiveGallery(service.id)}
            >
              <div className="relative aspect-[16/10] md:aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 border border-white/5">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-60", service.color)} />
                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <service.icon className="text-white mb-6" size={48} />
                  <h3 className="text-4xl font-black text-white mb-4 font-display">{service.title}</h3>
                  <p className="text-white/80 font-medium text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section - Minimalist & Bold */}
      <section id="processo" className="py-40 bg-white text-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 font-display italic">
                Excelência <br /> em Cada <br /> <span className="text-blue-600 not-italic">Detalhe.</span>
              </h2>
              <p className="text-slate-600 text-xl font-medium max-w-md">
                Nosso método é cirúrgico. Cada etapa é planejada para eliminar erros e maximizar o impacto visual do seu investimento.
              </p>
            </div>
            <div className="space-y-16">
              {PROCESS.map((p) => (
                <motion.div 
                  key={p.step} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex gap-10 group"
                >
                  <span className="text-6xl font-black text-slate-200 group-hover:text-blue-600 transition-colors font-display">{p.step}</span>
                  <div>
                    <h4 className="text-3xl font-black mb-4">{p.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & FAQ - Bento Grid */}
      <section id="duvidas" className="py-40 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform">
                <Zap size={300} />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter font-display">Investimento <br /> Inteligente.</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { item: 'Lona Premium', price: '100' },
                    { item: 'Adesivo High-Gloss', price: '100' },
                    { item: 'PVC Adesivado', price: '100' },
                    { item: 'ACM Estrutural', price: '100' },
                  ].map(p => (
                    <div key={p.item} className="flex items-center justify-between p-8 bg-white/10 rounded-3xl border border-white/20 hover:bg-white/20 transition-colors">
                      <span className="text-white font-black text-xl">{p.item}</span>
                      <span className="text-white font-black text-3xl">R$ {p.price}<span className="text-sm opacity-60">/m²</span></span>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-blue-100 font-medium text-lg">* Valores base para materiais de primeira linha. Orçamentos personalizados via WhatsApp.</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-[3rem] p-12 flex flex-col justify-between border border-white/5 group">
              <div>
                <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                  <Truck className="text-blue-600 group-hover:text-white transition-colors" size={40} />
                </div>
                <h4 className="text-3xl font-black text-white mb-6 font-display">Logística SJBV</h4>
                <p className="text-slate-400 font-medium leading-relaxed text-lg">
                  Foco total em **São João da Boa Vista - SP**. Agilidade inigualável na entrega e instalação técnica.
                </p>
              </div>
              <motion.button 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-blue-600 font-black mt-10 text-xl"
              >
                Consultar Área <ArrowRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - High Contrast */}
      <footer className="bg-white py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-9xl font-black text-black tracking-tighter leading-none mb-10 font-display italic">
                Transforme <br /> sua <br /> <span className="text-blue-600 not-italic">Marca.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-8">
                <span className="block text-slate-400 font-black uppercase tracking-widest text-xs">Menu</span>
                <div className="flex flex-col gap-6">
                  {['Serviços', 'Processo', 'Dúvidas'].map(item => (
                    <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-black font-black text-2xl hover:text-blue-600 transition-colors text-left font-display">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <span className="block text-slate-400 font-black uppercase tracking-widest text-xs">Conecte-se</span>
                <div className="flex flex-col gap-6">
                  <a href="https://wa.me/5519992219448" className="flex items-center gap-4 text-black font-black text-2xl hover:text-blue-600 transition-all font-display group">
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Phone size={24} />
                    </div>
                    WhatsApp
                  </a>
                  <a href="#" className="flex items-center gap-4 text-black font-black text-2xl hover:text-blue-600 transition-all font-display group">
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Instagram size={24} />
                    </div>
                    Instagram
                  </a>
                  <a href="#" className="flex items-center gap-4 text-black font-black text-2xl hover:text-blue-600 transition-all font-display group">
                    <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Facebook size={24} />
                    </div>
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Layers className="text-white" size={20} />
              </div>
              <span className="text-black font-black text-2xl tracking-tighter">RogérioVisual</span>
            </div>
            <p className="text-slate-400 font-bold text-sm">© 2026 RogérioVisual. Excelência Visual Absoluta.</p>
            <div className="text-slate-400 font-black text-xs uppercase tracking-widest">São João da Boa Vista - SP</div>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGallery(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-7xl bg-[#1a1a1a] rounded-[4rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setActiveGallery(null)}
                className="absolute top-10 right-10 z-10 p-5 glass text-white rounded-full hover:bg-white/20 transition-all"
              >
                <X size={32} />
              </button>
              
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={SERVICES.find(s => s.id === activeGallery)?.image} 
                  alt="Service" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center">
                <h2 className="text-6xl font-black text-white mb-10 tracking-tighter font-display italic">
                  {SERVICES.find(s => s.id === activeGallery)?.title}
                </h2>
                <p className="text-slate-400 text-2xl font-medium leading-relaxed mb-16">
                  {SERVICES.find(s => s.id === activeGallery)?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="text-blue-600" size={28} />
                    </div>
                    <span className="text-white font-black text-lg">Material Premium</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="text-blue-600" size={28} />
                    </div>
                    <span className="text-white font-black text-lg">Instalação SJBV</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="text-blue-600" size={28} />
                    </div>
                    <span className="text-white font-black text-lg">Garantia Total</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                      <CheckCircle2 className="text-blue-600" size={28} />
                    </div>
                    <span className="text-white font-black text-lg">Suporte 24h</span>
                  </div>
                </div>
                <motion.a 
                  href="https://wa.me/5519992219448"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-16 px-12 py-6 bg-blue-600 text-white rounded-3xl font-black text-center text-2xl shadow-2xl shadow-blue-600/20"
                >
                  Solicitar Orçamento Grátis
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
