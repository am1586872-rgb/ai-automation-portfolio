import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, ExternalLink, Play, CheckCircle2, 
  Sparkles, TrendingUp, Bot, ArrowLeft, X, 
  Cpu, Layers, Zap, Eye, Clock, ShieldCheck, 
  BarChart3, MessageSquare, Send, CreditCard, RefreshCw
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'automation' | 'web' | 'ai' | 'integration';
  categoryLabel: string;
  desc: string;
  stats: { label: string; value: string };
  tags: string[];
  metrics: string[];
  techStack: string[];
  features: string[];
  demoType: 'report' | 'dashboard' | 'bot' | 'payment';
}

const PROJECTS: Project[] = [
  {
    id: 'report-automation',
    title: 'نظام أتمتة التقارير الذكي',
    subtitle: 'معالجة وتوزيع البيانات السحابية آلياً',
    category: 'automation',
    categoryLabel: 'أتمتة العمليات (Automation)',
    desc: 'محرك أتمتة مخصص يسحب البيانات تلقائياً من قواعد البيانات ومصادر متعددة، يحللها، وينشئ تقارير أداء دورية للمديرين التنفيذيين مع إرسالها بريدياً دون تدخل بشري.',
    stats: { label: 'وفر زمني أسبوعي', value: '18 ساعة' },
    tags: ['Python', 'Pandas', 'PostgreSQL', 'SMTP', 'Cron Jobs'],
    metrics: [
      'توفير 18 ساعة عمل أسبوعياً على فريق العمل',
      'دقة بنسبة 100% بدون أي أخطاء حسابية بشرية',
      'توزيع آلي لأكثر من 50 جهة إدارية في ثوانٍ'
    ],
    techStack: ['Python Engine', 'Pandas Analytics', 'Automated Cron Daemon', 'Docker Container'],
    features: [
      'مزامنة سحابية مجدولة على مدار الساعة',
      'تنسيق ملفات PDF و Excel بتصميم احترافي',
      'نظام تنبيهات فوري عند رصد أي تباين مالي'
    ],
    demoType: 'report'
  },
  {
    id: 'sales-dashboard',
    title: 'منصة تحليلات المبيعات الرقمية',
    subtitle: 'لوحة قيادة تفاعلية بالوقت الفعلي',
    category: 'web',
    categoryLabel: 'تطبيقات الويب السحابية',
    desc: 'تطبيق ويب سريع جداً يوفر مراقبة حية للمبيعات، وتحليل معدل التحويل وسلوك العملاء، مع أدوات متقدمة لتوقع المخزون وتصدير التحليلات بنقرة واحدة.',
    stats: { label: 'معدل تسريع اتخاذ القرار', value: '3.5x أسرع' },
    tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Recharts', 'REST APIs'],
    metrics: [
      'سرعة تحميل فائقة بأقل من 0.8 ثانية',
      'زيادة بنسبة 28% في كفاءة إدارة المخزون',
      'تجربة استخدام متجاوبة بالكامل مع الهواتف والتابلت'
    ],
    techStack: ['React Framework', 'TypeScript Core', 'Tailwind Responsive Engine', 'Interactive Recharts'],
    features: [
      'تحديثات حية للبيانات بدون إعادة تحميل الصفحة',
      'فلاتر زمنية وجغرافية دقيقة للمبيعات',
      'نظام صلاحيات متعدد المستويات للمدراء والموظفين'
    ],
    demoType: 'dashboard'
  },
  {
    id: 'ai-sales-bot',
    title: 'مساعد خدمة العملاء والمبيعات الذكي',
    subtitle: 'روبوت محادثة تفاعلي يعمل 24/7',
    category: 'ai',
    categoryLabel: 'الذكاء الاصطناعي والمحادثة',
    desc: 'نظام محادثة مؤتمت ومدعوم بنماذج ذكاء اصطناعي حديثة، يجيب على استفسارات العملاء فوراً، يؤهل الصفقات، ويقوم بحجز المواعيد وتوجيه المهام إلى الـ CRM تلقائياً.',
    stats: { label: 'معدل الاستجابة للعملاء', value: 'فوري (0 ث)' },
    tags: ['Gemini / OpenAI API', 'Webhooks', 'Node.js', 'NLP Engine'],
    metrics: [
      'الرد على 85% من الاستفسارات المتكررة آلياً',
      'تقليص معدل انسحاب العملاء بنسبة 40%',
      'عمل متواصل طوال 24 ساعة دون أي توقف'
    ],
    techStack: ['AI Language Model', 'Node.js Event Loop', 'Webhook Dispatcher', 'Knowledge Base Vector'],
    features: [
      'فهم اللهجات والسياق التجاري باحترافية',
      'ربط مباشر مع الواتساب وبوابات المحادثة',
      'تحويل ذكي للعميل البشري عند الحاجة'
    ],
    demoType: 'bot'
  },
  {
    id: 'payment-integration',
    title: 'بوابة تكامل المدفوعات والـ Webhooks',
    subtitle: 'تزامن مالي مشفر وآمن بالكامل',
    category: 'integration',
    categoryLabel: 'تكامل الأنظمة وبوابات الدفع',
    desc: 'بنية برمجية وسيطة لربط المتاجر الإلكترونية مع بوابات الدفع والفوترة الإلكترونية، مع التحقق من صحة المعاملات عبر Webhooks وتفعيل الاشتراكات تلقائياً.',
    stats: { label: 'نسبة موثوقية العمليات', value: '99.98%' },
    tags: ['Payment Gateways', 'Webhooks', 'Express.js', 'Encryption', 'Security'],
    metrics: [
      'معالجة المعاملات المالية خلال أجزاء من الثانية',
      'إصدار وتوجيه الفواتير الضريبية تلقائياً',
      'صفر فقدان للمعاملات بفضل أنظمة إعادة المحاولة'
    ],
    techStack: ['Stripe / Local Gateways', 'Encrypted Webhook Handlers', 'Automated Invoicing Engine'],
    features: [
      'دعم الدفع ببطاقات الائتمان ومدى والمحافظ الرقمية',
      'تحديث حالة الطلب وتفعيل الصلاحيات لحظياً',
      'سجل تدقيق أمني مفصل ومحمي'
    ],
    demoType: 'payment'
  }
];

export function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'automation' | 'web' | 'ai' | 'integration'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نماذج واقعية وقابلة للاختبار الحي</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            أبرز الأعمال والمشاريع البرمجية
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            استعرض عينات من الأنظمة والتطبيقات التي تم تطويرها، مع إمكانية تجربة المحاكاة التفاعلية لكل نظام والاطلاع على النتائج المحققة.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'جميع الأعمال' },
            { id: 'automation', label: 'أنظمة الأتمتة' },
            { id: 'web', label: 'تطبيقات الويب' },
            { id: 'ai', label: 'الذكاء الاصطناعي' },
            { id: 'integration', label: 'تكامل الـ APIs' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105'
                    : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-slate-200 dark:bg-slate-750 border border-slate-700/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group relative bg-slate-100/90 dark:bg-slate-850/90 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/70 hover:border-teal-500/60 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Ambient glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div>
                  {/* Interactive Visual Header Mockup */}
                  <div className="p-5 pb-0">
                    <div className="w-full h-48 sm:h-52 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden relative group/preview cursor-pointer"
                         onClick={() => setSelectedProject(project)}>
                      
                      {/* Interactive preview UI depending on demoType */}
                      {project.demoType === 'report' && (
                        <div className="p-4 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2 h-full flex flex-col justify-between bg-gradient-to-b from-slate-50 dark:from-slate-950 to-white dark:to-slate-900">
                          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                              <span className="text-[11px] text-slate-600 dark:text-slate-400 mr-2">daily_report_daemon.py</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">RUNNING</span>
                          </div>
                          <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                            <p className="text-teal-300 font-semibold">[06:00:01] ⚡ Syncing DB records from 3 nodes...</p>
                            <p className="text-slate-700 dark:text-slate-300">[06:00:03] ✔ 12,450 rows parsed & sanitized.</p>
                            <p className="text-blue-400">[06:00:04] 📊 PDF Executive Summary generated.</p>
                            <p className="text-emerald-300 font-bold">[06:00:06] 🚀 Email sent to 52 stakeholders successfully!</p>
                          </div>
                          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80 text-slate-600 dark:text-slate-400">
                            <span>Status: Completed (100%)</span>
                            <span className="text-teal-400">Time: 5.2s</span>
                          </div>
                        </div>
                      )}

                      {project.demoType === 'dashboard' && (
                        <div className="p-4 h-full flex flex-col justify-between bg-gradient-to-br from-slate-50 dark:from-slate-950 via-white dark:via-slate-900 to-slate-50 dark:to-slate-950">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-teal-400" />
                              <span>Live Sales Velocity Analytics</span>
                            </span>
                            <span className="text-[11px] text-teal-400 font-mono font-bold">+28.4% YoY</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 py-2">
                            <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">إجمالي الإيراد</span>
                              <span className="text-sm font-bold text-emerald-400 font-mono">$54,230</span>
                            </div>
                            <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">الطلبات اليوم</span>
                              <span className="text-sm font-bold text-blue-400 font-mono">1,280</span>
                            </div>
                            <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                              <span className="text-[10px] text-slate-600 dark:text-slate-400 block">معدل التحويل</span>
                              <span className="text-sm font-bold text-purple-400 font-mono">4.85%</span>
                            </div>
                          </div>
                          {/* Visual progress bar graph */}
                          <div className="flex items-end gap-1.5 h-12 pt-2 border-t border-slate-800/60">
                            {[40, 65, 55, 80, 70, 95, 85, 100].map((h, i) => (
                              <div key={i} className="flex-1 bg-teal-500/20 rounded-t group-hover/preview:bg-teal-400/50 transition-colors" style={{ height: `${h}%` }}></div>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.demoType === 'bot' && (
                        <div className="p-4 h-full flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                                <Bot className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">بوت المبيعات والدعم الفني</span>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                              <span>متصل الآن</span>
                            </span>
                          </div>
                          <div className="space-y-2 py-1">
                            <div className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 text-xs p-2.5 rounded-2xl rounded-tr-none max-w-[85%] mr-auto">
                              مرحباً! أود معرفة ما إذا كان يمكن ربط النظام مع متجري على سلة؟
                            </div>
                            <div className="bg-purple-500/20 border border-purple-500/30 text-purple-200 text-xs p-2.5 rounded-2xl rounded-tl-none max-w-[85%] ml-auto">
                              أهلاً بك! نعم بالتأكيد، يتم الربط التلقائي بالكامل عبر الـ Webhooks وإرسال التنبيهات لحظياً. 🚀
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                            <span>زمن الرد: 0.3 ثانية</span>
                            <span className="text-purple-400 font-semibold">Gemini LLM Powered</span>
                          </div>
                        </div>
                      )}

                      {project.demoType === 'payment' && (
                        <div className="p-4 h-full flex flex-col justify-between bg-gradient-to-br from-slate-50 dark:from-slate-950 via-white dark:via-slate-900 to-slate-50 dark:to-slate-950">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-bold text-slate-900 dark:text-white">سجل الدفع والتحقق الفوري</span>
                            </div>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                              200 OK - Verified
                            </span>
                          </div>
                          <div className="space-y-2 py-2 text-xs font-mono">
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                              <span className="text-slate-700 dark:text-slate-300">TXN #8942-PAY</span>
                              <span className="text-emerald-400 font-bold">$349.00 USD</span>
                              <span className="text-[10px] text-emerald-400">ناجحة ✔</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                              <span className="text-slate-700 dark:text-slate-300">TXN #8943-MADA</span>
                              <span className="text-emerald-400 font-bold">1,250 SAR</span>
                              <span className="text-[10px] text-emerald-400">ناجحة ✔</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                            <span>Webhook Hash: SHA-256 HMAC</span>
                            <span className="text-teal-400">آمن ومشفر</span>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay to click for full interactive preview */}
                      <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                        <Play className="w-5 h-5 text-teal-400 fill-teal-400" />
                        <span>فتح المعاينة التفاعلية والتفاصيل</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
                        {project.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {project.stats.label}: <strong className="text-slate-900 dark:text-white font-bold">{project.stats.value}</strong>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-teal-400/80 mb-3 font-medium">
                      {project.subtitle}
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">
                      {project.desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-auto flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 hover:border-teal-500/50 text-teal-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-teal-400" />
                    <span>معاينة حية واختبار النظام</span>
                  </button>

                  <a
                    href="#contact"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors border border-slate-300 dark:border-slate-700"
                  >
                    <span>طلب مشروع مماثل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Interactive Project Details & Live Simulation Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-50/85 dark:bg-slate-950/85 backdrop-blur-md"
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <span className="text-xs text-teal-400 font-medium">{selectedProject.categoryLabel}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-right">
                
                {/* Highlights Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1">الميزة الإنتاجية</span>
                    <span className="text-base font-extrabold text-emerald-400">
                      {selectedProject.stats.label}: {selectedProject.stats.value}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-600 dark:text-slate-400 block mb-1">حالة الجاهزية والتشغيل</span>
                    <span className="text-base font-extrabold text-teal-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>جاهز للتكامل والتركيب المباشر</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">وصف المعمارية والنظام:</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Key Metrics Achieved */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">النتائج التشغيلية والمالية المحققة:</h4>
                  <div className="space-y-2">
                    {selectedProject.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/40 dark:bg-slate-800/40 border border-slate-700/40 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & Architecture */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">أبرز الخصائص البرمجية:</h4>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {selectedProject.features.map((feat, i) => (
                      <div key={i} className="p-3 bg-slate-50/50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Stack */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">الحزمة التقنية (Tech Stack):</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-teal-300 text-xs font-mono rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-right">
                  ترغب بتطبيق هذا الحل لعملك أو لنشاطك التجاري؟
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    إغلاق
                  </button>

                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
                  >
                    <span>طلب تنفيذ مشروع مماثل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
