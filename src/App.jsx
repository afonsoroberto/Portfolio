import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Github, Linkedin, Mail, ExternalLink, 
  Sparkles, Cpu, Code, Globe, Palette, Zap 
} from "lucide-react";
import fotoPerfil from './perfil.jpeg'; // Asegúrate de que la extensión sea .jpeg o .jpg
import { image } from "framer-motion/client";
const tools = [
  { 
    name: 'Cloud & AI Infra', 
    icon: '☁️', 
    desc: 'Azure, Fabric, AWS, Databricks. Scalable AI systems on cloud-native architectures.' 
  },
  { 
    name: 'Intelligent Systems', 
    icon: '⚙️', 
    desc: 'Python, FastAPI, Node.js, Go. APIs and automation for enterprise AI agents.' 
  },
  { 
    name: 'Frontend & Exp', 
    icon: '🎨', 
    desc: 'React, Next.js, TS, Angular, Tailwind. High-performance, type-safe applications.' 
  },
  { 
    name: 'AI Architecture', 
    icon: '🧠', 
    desc: 'OpenAI, LangChain, TensorFlow, Pinecone. LLM orchestration and embeddings.' 
  },
  { 
    name: 'Data & DBs', 
    icon: '📊', 
    desc: 'PostgreSQL, MongoDB, Redis. Reliable data layers for analytics and AI.' 
  },
  { 
    name: 'Deployment', 
    icon: '🚀', 
    desc: 'Vercel, Docker, Cloudflare, GH Actions. Automated pipelines and edge optimization.' 
  },
  { 
    name: 'Product & Execution', 
    icon: '💎', 
    desc: 'Notion, Jira, Figma, Framer, Lovable. Turning strategy into digital experiences.' 
  }
];

const projects = [
  {
    id: 1,
    title: 'ModentIA',
    tag: 'Founder',
    className: 'md:col-span-2', // Quitamos el color de fondo estático
    bgImage: '/back1.jpg', // Tu imagen de puntos/IA
    image: '/primero.jpg',
    tagClass: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]', // Azul eléctrico
    titleClass: 'text-3xl text-white font-bold',  
    fullDesc: 'End-to-end digital transformation of a traditional B2B wholesale distribution business into a technology-enabled ecosystem.',
    longContent: {
      summary: "Currently in development, Modentia is a digital transformation firm focused on modernizing traditional and legacy-driven businesses through enterprise systems, AI-powered automation and data-led operating models.",
      purpose: "The initiative aims to redesign commercial infrastructure, operational workflows and executive decision-making frameworks, rebuilding fragmented, manual environments into scalable, intelligent and performance-driven organizations.",
      technical: [
        "Integrated ERP–CRM architecture unifying inventory, sales, purchasing and customer data into a centralized ecosystem",
        "AI-driven demand forecasting models to optimize procurement, working capital and purchasing strategies",
        "Sales enablement platform enabling real-time order placement, territory visibility and performance tracking",
        "Workflow automation engines reducing manual administrative processes across operations and finance",
        "Scalable cloud-based data layer supporting executive dashboards and territory-level KPIs",
        "AI-powered internal and customer-facing assistants to streamline communication and operational queries"
      ],
      insights: [
        "Reduction of operational friction and dependency on manual processes",
        "Improved demand forecasting accuracy and purchasing efficiency",
        "Enhanced sales productivity and territory performance visibility",
        "Foundations for margin intelligence and dynamic pricing optimization",
        "Transition from intuition-based decisions to data-backed executive strategy"
      ]
    },
    tech: ['Enterprise Systems Architecture (ERP & CRM Design)','AI & Workflow Automation', 'Sales Intelligence & Revenue Systems', 'Data Strategy & Predictive Analytics', 'Full-Stack Application Development', 'Product & Operating Model Design'],
  },
  {
    id: 3,
    title: 'AI Analytics Platform',
    tag: 'Featured Project',
    className: 'md:col-span-1',
    bgImage: '/back3.jpg',
    image: '/tercera.png',
    tagClass: "text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.4)]'", // Verde esmeralda
    titleClass: 'text-4xl text-white font-bold',
    fullDesc: 'Cloud-native analytics ecosystem bridging advanced data engineering with conversational AI.',
    tech: ['Azure AI', 'PySpark', 'Databricks', 'Python'],
    // Información detallada del proyecto 3
    longContent: {
      summary: "This project explores the creation of a cloud-native analytics ecosystem that bridges advanced data engineering with conversational AI. The platform centralises sales data and structures it into meaningful business models.",
      purpose: "Convert fragmented transactional data into actionable intelligence within a scalable, future-ready architecture, introducing an AI-driven conversational interface.",
      technical: [
        "Cloud-based data orchestration and transformation workflows",
        "Distributed processing using PySpark",
        "Semantic modelling and interactive dashboards",
        "Integration of Azure Generative AI agents"
      ],
      insights: ["Revenue evolution", "Seasonal demand fluctuations", "Customer purchasing behaviour"]
    }
  },
  {
    id: 2,
    title: 'AI Agent: FUSION',
    tag: 'Globant Innovation',
    className: 'md:col-span-3',
    bgImage: '/back2.jpg',
    image: '/segundo.png', 
    tagClass: 'ttext-[10px] font-bold text-teal-400 uppercase tracking-[0.2em] mb-4', // Rosa/Morado neón
    titleClass: 'text-xl text-white font-bold',
    icon: <Sparkles size={20} className="text-teal-400" />,
    fullDesc: 'FUSION — Enterprise Generative AI Platform for Marketing Automation. Concept Originator & Core Development Contributor.',
    longContent: {
      summary: "FUSION is an enterprise-grade generative AI solution designed to transform how organisations create, scale, and optimise marketing content. The initiative evolved into a scalable AI-driven platform within Globant’s innovation ecosystem.",
      purpose: "The core ambition was to bridge the gap between creative generation and performance data, industrializing content production while maintaining brand consistency and measurable ROI.",
      technical: [
        "Specialized AI agents for stages of the marketing funnel",
        "Paid media optimisation modules",
        "Automated workflow orchestration layers",
        "Integration of LLMs with enterprise governance"
      ],
      insights: [
        "Content production bottleneck reduction",
        "Scale across regions and channels",
        "AI-driven performance feedback loops",
        "Brand alignment and governance"
      ]
    },
        tech: ['Generative AI', 'LLMs', 'Automation', 'Enterprise Architecture'],
  }
];

function App() {
  const [flippedTool, setFlippedTool] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Se actualiza cada segundo

    return () => clearInterval(timer); // Limpieza al desmontar
  }, []);

  // Formateador para hora española (CET)
  const timeString = time.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Madrid' 
  });


  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12 font-sans text-[#1a1a1a]">
        <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12 font-sans text-white transition-colors duration-500">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
            {/* PERFIL - AHORA NEGRO */}
            <motion.div className="col-span-1 md:col-span-3 md:row-span-2 bg-[#111111] rounded-[3rem] p-8 md:p-12 flex flex-col justify-between border border-white/5 shadow-2xl relative overflow-hidden group">
              {/* Gradiente de fondo sutil */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
              
              {/* CONTENEDOR DE IMAGEN: Arreglado para Mobile */}
              <div className="relative mb-8 md:mb-0 md:absolute md:top-12 md:right-12 w-32 h-32 md:w-40 md:h-40 z-20">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/perfil.jpeg" 
                    alt="Roberto Afonso Malavé" 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" 
                  />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8 text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span> 
                  Available for projects
                </div>
                
                <div className="mb-10">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[0.9] text-white">
                    Roberto Afonso Malavé.
                  </h1>
                  <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight text-white/20 mt-2">
                    AI & Revenue Transformation
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                    Full Stack Engineer building <span className="text-white font-bold">high-performance React</span> systems and intelligent AI agents.
                  </p>
                  <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                    Currently <span className="text-white font-bold">building a digital transformation venture</span> focused on modernizing traditional industries.
                  </p>
                </div>
              </div>
            </motion.div>

                    {/* LOCATION & TIME - AHORA NEGRO */}
                    <div className="md:col-span-1 bg-[#111111] rounded-[3rem] p-10 flex flex-col justify-between border border-white/5">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                          <MapPin size={24} className="text-white/40" />
                        </div>
                        <div className="text-right text-[10px] font-bold text-white/30 uppercase tracking-widest leading-loose">
                          <p className="text-white">Madrid, ES</p>
                          <p>Caracas, VE</p>
                          <p>New York, US</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-baseline gap-2">
                          <h2 className="text-5xl font-bold text-white tracking-tighter tabular-nums">{timeString}</h2>
                          <span className="text-xs font-black text-blue-500 uppercase">CET</span>
                        </div>
                        <p className="text-[11px] text-white/30 font-bold uppercase tracking-[0.1em] mt-2">
                          Building from the heart of the city.
                        </p>
                      </div>
                    </div>
                    {/* 3. REDES UNIFICADAS */}
                    <div className="md:col-span-1 grid grid-cols-2 gap-4">
                      <motion.a 
                        whileHover={{ scale: 1.05, backgroundColor: "#0077B5" }} 
                        href="https://www.linkedin.com/in/afonsoroberto/" 
                        className="bg-[#111111] rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-xl transition-all group"
                      >
                        <Linkedin size={30} className="text-white/40 group-hover:text-white transition-colors" />
                      </motion.a>
                      
                      <motion.a 
                        whileHover={{ scale: 1.05, backgroundColor: "#333" }} 
                        href="https://github.com/afonsoroberto" 
                        className="bg-[#111111] rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-xl transition-all group"
                      >
                        <Github size={30} className="text-white/40 group-hover:text-white transition-colors" />
                      </motion.a>
                    </div>

                  {/* 4. TECH STACK ACTUALIZADO */}
                  <div 
                    className="md:col-span-1 bg-[#111111] rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden h-full min-h-[220px] cursor-pointer group"
                    style={{ perspective: '1200px' }}
                  >
                    <motion.div
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{ rotateY: flippedTool ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    >
                      {/* FRONT: CARRUSEL DE CATEGORÍAS */}
                      <div 
                        className={`absolute inset-0 p-8 flex flex-col bg-[#111111] ${flippedTool ? 'pointer-events-none' : ''}`}
                        style={{ backfaceVisibility: 'hidden', display: flippedTool ? 'none' : 'flex' }}
                      >
                        <div className="mb-4">
                          <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">Tech Stack</p>
                          <p className="text-[10px] text-white/40 font-medium">Click to explore my ecosystem.</p>
                        </div>
                        
                        <div className="flex-1 flex items-center overflow-hidden relative">
                          <motion.div 
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="flex gap-3 py-2"
                          >
                            {[...tools, ...tools].map((tool, i) => (
                              <button 
                                key={i} 
                                onClick={() => setFlippedTool(tool)}
                                className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 whitespace-nowrap hover:bg-white/10 transition-colors shadow-sm"
                              >
                                <span className="scale-90 opacity-80">{tool.icon}</span>
                                <span className="text-[11px] font-bold text-white/90">{tool.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        </div>
                        <p className="text-[9px] text-white/20 text-center mt-4 uppercase tracking-[0.3em] font-black">
                          Infinite learning
                        </p>
                      </div>

                      {/* BACK: DETALLE TÉCNICO */}
                      <div 
                        className="absolute inset-0 p-8 flex flex-col justify-center bg-[#0D0D0D] text-center text-white border border-white/10 rounded-[3rem]"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', display: flippedTool ? 'flex' : 'none' }}
                        onClick={() => setFlippedTool(null)}
                      >
                        {flippedTool && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 mb-4 border border-teal-500/20">
                              <span className="text-2xl">{flippedTool.icon}</span>
                            </div>
                            <h4 className="text-teal-400 font-black text-[11px] mb-3 uppercase tracking-[0.2em]">
                              {flippedTool.name}
                            </h4>
                            <p className="text-[11px] text-white/60 leading-relaxed max-w-[200px] font-medium">
                              {flippedTool.desc}
                            </p>
                            <div className="mt-6">
                              <span className="text-[8px] text-white/20 border border-white/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                                Back to stack
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                            {/* Sección de Proyectos en el Grid */}
                            {projects.map((project) => (
                              <motion.div 
                                key={project.id} 
                                layoutId={`card-${project.id}`} 
                                onClick={() => setSelectedProject(project)}
                                className={`${project.className} rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/10 shadow-xl group cursor-pointer relative overflow-hidden h-full min-h-[300px]`}
                                style={{
                                  backgroundColor: '#0a0a0a', // Fondo de seguridad negro
                                }}
                              >
                                {/* Imagen de fondo con gradiente para legibilidad */}
                                <div className="absolute inset-0 z-0">
                                  <img 
                                    src={project.bgImage} 
                                    alt="" 
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                                  />
                                  {/* Capa oscura (Overlay) que se vuelve más clara al pasar el mouse */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/70 transition-colors duration-500" />
                                </div>

                                {/* CONTENIDO (Z-10 para estar por encima de la imagen) */}
                                <div className="relative z-10 flex justify-between items-start">
                                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${project.tagClass}`}>
                                    {project.tag}
                                  </div>
                                  <div className="text-white/50 group-hover:text-white transition-colors">
                                    {project.icon ? project.icon : <ExternalLink size={18} />}
                                  </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                  <h3 className={`${project.titleClass} tracking-tighter leading-tight`}>
                                    {project.title}
                                  </h3>
                                  
                                  {/* Pequeña animación de línea al pasar el mouse */}
                                  <div className="w-0 group-hover:w-12 h-[2px] bg-white mt-4 transition-all duration-500" />
                                </div>
                              </motion.div>
                            ))}

                            {/* MODAL */}
                            <AnimatePresence>
                              {selectedProject && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                                  {/* Fondo oscuro con cierre al hacer click fuera */}
                                  <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
                                  />

                                  {/* CUERPO DEL MODAL (ESTRUCTURA VERTICAL) */}
                                  <motion.div 
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl no-scrollbar text-gray-900"
                                  >
                                    {/* Header Fijo */}
                                    <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 p-8 flex justify-between items-center border-b border-gray-100">
                                      <button 
                                        onClick={() => setSelectedProject(null)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors font-black text-[10px] uppercase tracking-[0.2em]"
                                      >
                                        <span className="text-lg">←</span> Back to Portfolio
                                      </button>
                                    </div>

                                    <div className="p-8 md:p-16">
                                      {/* BLOQUE DE TEXTO SUPERIOR */}
                                      <div className="max-w-3xl mb-16">
                                        <span className={`inline-block mb-6 text-[10px] font-black uppercase tracking-[0.3em] ${selectedProject.tagClass || 'text-blue-500'}`}>
                                          {selectedProject.tag}
                                        </span>
                                        
                                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9]">
                                          {selectedProject.title}
                                        </h2>

                                        <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium">
                                          {selectedProject.longContent?.summary || selectedProject.fullDesc}
                                        </p>

                                        {/* Grid de detalles: Technical, Stack e INSIGHTS */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                                          {/* Columna Izquierda: Technical */}
                                          <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6 italic">Technical Design</h4>
                                            <ul className="space-y-4">
                                              {selectedProject.longContent?.technical?.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-500 flex gap-3 italic">
                                                  <span className="text-blue-500 font-bold">•</span> {item}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                          
                                          {/* Columna Derecha: Stack + Insights */}
                                          <div className="space-y-12">
                                            {/* Tech Stack */}
                                            <div>
                                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6 italic">Tech Stack</h4>
                                              <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech?.map((t, i) => (
                                                  <span key={i} className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-[10px] font-black border border-gray-100 uppercase tracking-tighter italic">
                                                    {t}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>

                                            {/* --- SECCIÓN DE INSIGHTS (AQUÍ ESTÁ LO QUE FALTABA) --- */}
                                            <div>
                                              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-6 italic">Key Insights & Impact</h4>
                                              <ul className="space-y-3">
                                                {selectedProject.longContent?.insights?.map((insight, i) => (
                                                  <li key={i} className="text-sm text-gray-500 flex items-center gap-3 italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                    {insight}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* BLOQUE DE IMAGEN INFERIOR (ESTÁTICA) */}
                                      <div className="w-full">
                                        <div className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-gray-50">
                                          <img 
                                            src={selectedProject.image} 
                                            alt={selectedProject.title}
                                            className="w-full h-auto object-cover block"
                                          />
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                            </AnimatePresence>

                    {/* LET'S BUILD UNIFICADO */}
                    <div className="md:col-span-1 bg-[#111111] rounded-[3rem] p-10 flex flex-col items-center justify-center text-center border border-white/5 shadow-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <h2 className="text-3xl font-bold italic tracking-tighter mb-6 relative z-10 text-white">Let's build.</h2>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-medium mb-6">Open for new adventures.</p>
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        href="mailto:afonso.robertot@gmail.com" 
                        className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest relative z-10"
                      >
                        Say Hello <Mail size={14} className="inline ml-2" />
                      </motion.a>
                    </div>
          </div>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">

      </div>
    </div>
  );
}

export default App;