import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, Bot, Workflow, Database, Mail, Github, Linkedin, 
  Terminal, ChevronDown, Menu, X, TrendingUp, Sparkles, 
  Smartphone, CheckCircle2, Zap, ArrowLeft, Star, Cpu,
  Layers, ShieldCheck, Activity, Globe, MessageCircle
} from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { InteractivePortfolioModel } from './components/InteractivePortfolioModel';
import { ContactForm } from './components/ContactForm';
import { FloatingMobileContact } from './components/FloatingMobileContact';
import { ProfileImageProvider, useProfileImage } from './context/ProfileImageContext';
import { ProfileImageSection } from './components/ProfileImageSection';
import { Moon, Sun } from 'lucide-react';

// Lazy-loaded heavy components not in the initial viewport
const ProjectsShowcase = lazy(() => 
  import('./components/ProjectsShowcase').then(m => ({ default: m.ProjectsShowcase }))
);
const AutomationRoiCalculator = lazy(() => 
  import('./components/AutomationRoiCalculator').then(m => ({ default: m.AutomationRoiCalculator }))
);
const LiveAutomationSimulator = lazy(() => 
  import('./components/LiveAutomationSimulator').then(m => ({ default: m.LiveAutomationSimulator }))
);

function SectionFallback({ title }: { title?: string }) {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      <div className="w-10 h-10 border-3 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mb-4"></div>
      {title && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">جارٍ تحميل {title}...</p>}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="تبديل المظهر"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { profileImage } = useProfileImage();

  return (
    <nav className="fixed top-0 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <a href="#about" className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3 group">
          <div className="relative">
            <img 
              src={profileImage} 
              alt="عبداللاه محمد" 
              className="w-11 h-11 rounded-xl object-cover shadow-md shadow-teal-500/25 border-2 border-teal-500/40 group-hover:border-teal-400 group-hover:scale-105 transition-all"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse-glow shadow-sm shadow-emerald-500/50"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold group-hover:text-teal-400 transition-colors">عبداللاه محمد</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-normal">مطور برمجيات وأتمتة</span>
          </div>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-7 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <a href="#about" className="hover:text-teal-400 transition-colors">الرئيسية</a>
          <a href="#skills" className="hover:text-teal-400 transition-colors">الخدمات والمهارات</a>
          <a href="#simulator" className="hover:text-teal-400 transition-colors">محاكاة الأتمتة</a>
          <a href="#roi-calculator" className="hover:text-teal-400 transition-colors">حاسبة الأرباح</a>
          <a href="#about-me" className="hover:text-teal-400 transition-colors">نبذة عني</a>
          <a href="#projects" className="hover:text-teal-400 transition-colors">أبرز الأعمال</a>
          <a href="#contact" className="hover:text-teal-400 transition-colors">تواصل معي</a>
        </div>

        {/* CTA and Theme Toggle in Navbar */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a 
            href="#contact" 
            className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30"
          >
            ابدأ مشروعك الآن
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button className="text-slate-700 dark:text-slate-300 p-2" onClick={() => setIsOpen(!isOpen)} aria-label="القائمة">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex flex-col gap-4 text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">الرئيسية</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">الخدمات والمهارات</a>
          <a href="#simulator" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">محاكاة الأتمتة الحية</a>
          <a href="#roi-calculator" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">حاسبة وفر الأرباح</a>
          <a href="#about-me" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">نبذة عني</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">أبرز الأعمال</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors py-1">تواصل معي</a>
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="text-center mt-2 px-5 py-2.5 bg-teal-500 text-slate-950 font-bold rounded-xl"
          >
            ابدأ مشروعك الآن
          </a>
        </motion.div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Right column: Content (RTL primary) */}
        <motion.div 
          className="lg:col-span-7 text-center lg:text-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">مطور برمجيات وأتمتة النظم • لمسة فنية وذكاء برمجي</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            أهلاً، أنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-blue-400">عبداللاه محمد</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-700 dark:text-slate-300 font-bold mt-2 block">
              مطور برمجيات ومهندس أتمتة
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
            أساعد الشركات ورواد الأعمال على ابتكار مواقع وتطبيقات جذابة تأسر العملاء من النظرة الأولى، مع بناء نظم <strong className="text-teal-400 font-semibold">أتمتة ذكية</strong> تختصر آلاف الساعات الروتينية وتضاعف معدلات <strong className="text-emerald-400 font-semibold">الربح والإنتاجية</strong>.
          </p>

          {/* Quick value props list */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10 text-slate-700 dark:text-slate-300 text-sm max-w-xl mx-auto lg:mx-0">
            <div className="flex items-center gap-2 bg-slate-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
              <span>واجهات ساحرة ترفع معدل التحويل والمبيعات</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100/40 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>أتمتة المهام اليومية وخفض تكاليف التشغيل</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3.5 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <span>اطلب استشارة لمشروعك</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a 
              href="#projects" 
              className="px-8 py-3.5 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-300 dark:border-slate-700 transition-all w-full sm:w-auto text-center"
            >
              مشاهدة الأعمال
            </a>
          </div>
        </motion.div>

        {/* Left column: Portfolio Model Showcase (RTL Left side) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <InteractivePortfolioModel />
        </div>

      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <a href="#skills" aria-label="انتقل للأسفل">
          <ChevronDown className="w-7 h-7 hover:text-teal-400 transition-colors" />
        </a>
      </div>
    </section>
  );
}

function AboutMe() {
  return (
    <section id="about-me" className="py-20 px-6 bg-white/70 dark:bg-slate-900/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Profile Photo Showcase with Direct Upload & Customization */}
          <ProfileImageSection />

          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
              <Star className="w-3.5 h-3.5 fill-blue-400" />
              <span>نبذة عن مطور أعمالك</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              تحويل الأفكار إلى منتجات رقمية تجلب العملاء والأرباح
            </h2>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              أنا <strong className="text-slate-900 dark:text-white font-bold">عبداللاه محمد</strong>، أجمع بين شغفي العميق بتطوير البرمجيات وفلسفة الأتمتة المتقدمة. أؤمن بأن الموقع الإلكتروني أو التطبيق ليس مجرد كود تقني، بل هو واجهة استثمارية قوية ومحرك لجذب العملاء وتنمية الأعمال.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-8">
              أركز على تصميم تجارب استخدام ممتعة، سلسة، ومحفزة للشراء، بالتوازي مع تصميم سكربتات وبوتات أتمتة تتولى العمل الروتيني وراء الكواليس (من تجميع البيانات إلى إدارة الطلبات وخدمة العملاء على مدار الساعة).
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-bold text-teal-400 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> اللمسة الفنية البصرية
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">تصاميم حديثة ومريحة للعين تبني الثقة وتجعل العميل يتخذ قرار الشراء فوراً.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-700/60">
                <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> العائد المادي والربحية
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">أتمتة تقلل التكاليف المهدورة، وتطبيقات مصممة لتوليد المبيعات والأرباح المستمرة.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    {
      icon: <Smartphone className="w-8 h-8 text-teal-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />,
      title: "تطبيقات جذابة ومربحة",
      badge: "UI/UX & تطوير رقمي",
      desc: "تصميم وتطوير واجهات مستخدم بلمسة فنية تأسر انتباه العميل، مع التركيز على تحسين تجربة المستخدم (UX) لزيادة المبيعات والتحويلات.",
      highlights: ["سرعة فائقة", "تصميم عصري متجاوب", "تجربة تحويل عالية"],
      gradient: "from-teal-500/15 via-teal-500/5 to-transparent",
      glowBg: "bg-teal-500/20",
      borderHover: "group-hover:border-teal-400/60",
      badgeClass: "bg-teal-500/10 text-teal-300 border-teal-500/25",
      accentText: "text-teal-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />,
      title: "حلول رقمية لنمو الأعمال",
      badge: "توسع ونمو المبيعات",
      desc: "بناء أنظمة ومواقع إلكترونية مخصصة تخدم أهدافك التجارية وتفتح لك قنوات ربح جديدة ومستدامة في السوق الرقمي.",
      highlights: ["لوحات تحكم تفاعلية", "تحليلات الأداء", "بنية قابلة للتوسع"],
      gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
      glowBg: "bg-blue-500/20",
      borderHover: "group-hover:border-blue-400/60",
      badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/25",
      accentText: "text-blue-400"
    },
    {
      icon: <Bot className="w-8 h-8 text-purple-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />,
      title: "أتمتة ذكية توفر مالك",
      badge: "روبوتات تعمل 24/7",
      desc: "برمجة روبوتات وسكربتات تقوم بالمهام الروتينية نيابة عنك، مما يقلل من تكاليف العمالة ويزيد من الإنتاجية على مدار الساعة دون أخطاء.",
      highlights: ["تقليل تكاليف التشغيل", "سرعة استجابة فورية", "صفر أخطاء بشرية"],
      gradient: "from-purple-500/15 via-purple-500/5 to-transparent",
      glowBg: "bg-purple-500/20",
      borderHover: "group-hover:border-purple-400/60",
      badgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/25",
      accentText: "text-purple-400"
    },
    {
      icon: <Workflow className="w-8 h-8 text-emerald-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />,
      title: "تكامل الأنظمة (APIs)",
      badge: "ربط متكامل وسلس",
      desc: "ربط متجرك أو موقعك بمنصات الدفع، والتسويق، وبوابات الرسائل والـ CRM لتكوين نظام آلي متكامل يضاعف كفاءة أعمالك.",
      highlights: ["بوابات الدفع الإلكتروني", "إشعارات فورية", "تزامن البيانات الحي"],
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      glowBg: "bg-emerald-500/20",
      borderHover: "group-hover:border-emerald-400/60",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
      accentText: "text-emerald-400"
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-white/50 dark:bg-slate-900/50 border-t border-b border-slate-800/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>حلول برمجية وهندسية متكاملة</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">الخدمات والمهارات</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`group relative bg-slate-100/80 dark:bg-slate-850/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/60 ${skill.borderHover} transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden cursor-pointer`}
            >
              {/* Dynamic Interactive Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              {/* Top ambient aura glow */}
              <div className={`absolute -top-16 -right-16 w-36 h-36 ${skill.glowBg} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

              {/* Shimmer line on top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" style={{ color: skill.accentText.replace('text-', '') }}></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon container with hover animation & pulse shadow */}
                    <div className="w-16 h-16 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner group-hover:border-slate-400 dark:border-slate-600 transition-colors duration-300">
                      {skill.icon}
                    </div>

                    {/* Skill Category Badge */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${skill.badgeClass} group-hover:scale-105 transition-transform duration-300`}>
                      {skill.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-teal-300 transition-colors duration-300 flex items-center justify-between">
                    <span>{skill.title}</span>
                  </h3>

                  <p className="text-slate-300/90 leading-relaxed text-sm md:text-base mb-6">
                    {skill.desc}
                  </p>
                </div>

                {/* Micro tags and interactive CTA hint */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {skill.highlights.map((tag, idx) => (
                      <span key={idx} className="text-[11px] font-medium bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href="#contact" 
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${skill.accentText} group-hover:translate-x-[-4px] transition-transform duration-300 self-end sm:self-auto`}
                  >
                    <span>طلب الخدمة</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <Suspense fallback={<SectionFallback title="المشاريع والنماذج" />}>
      <ProjectsShowcase />
    </Suspense>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white/60 dark:bg-slate-900/60 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>تواصل مباشر وبدء العمل</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            جاهز لمضاعفة أرباحك وتطوير نظامك؟
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            سواء كنت تريد إطلاق تطبيق فريد يجذب العملاء، أو بناء نظام أتمتة يقلل من تكاليفك التشغيلية، شاركني فكرتك وسأقدم لك استشارة فنية وخارطة طريق واضحة.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  const { profileImage } = useProfileImage();

  return (
    <footer className="py-10 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 pb-28 md:pb-10 bg-white/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={profileImage} 
            alt="عبداللاه محمد" 
            className="w-8 h-8 rounded-lg object-cover border border-teal-500/40"
          />
          <span className="font-bold text-slate-900 dark:text-white text-sm">عبداللاه محمد • مطور برمجيات وأتمتة</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <a href="mailto:am1586872@gmail.com" className="hover:text-teal-400 font-mono transition-colors">
            am1586872@gmail.com
          </a>
          <span>•</span>
          <a href="#about" className="hover:text-teal-400 transition-colors">العودة للأعلى ↑</a>
        </div>

        <p dir="ltr" className="text-xs">© {new Date().getFullYear()} Abdallah Mohamed. All rights reserved.</p>
      </div>
    </footer>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-teal-500/30 text-slate-900 dark:text-white">
      <Navbar />
      <Hero />
      <div id="simulator">
        <Suspense fallback={<SectionFallback title="محاكي الأتمتة المباشر" />}>
          <LiveAutomationSimulator />
        </Suspense>
      </div>
      <Skills />
      <div id="roi-calculator">
        <Suspense fallback={<SectionFallback title="حاسبة العائد الاستثماري" />}>
          <AutomationRoiCalculator />
        </Suspense>
      </div>
      <AboutMe />
      <Projects />
      <Contact />
      
      {/* Smart Non-Obstructive Floating Mobile Quick-Action */}
      <FloatingMobileContact />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileImageProvider>
        <MainLayout />
      </ProfileImageProvider>
    </ThemeProvider>
  );
}

