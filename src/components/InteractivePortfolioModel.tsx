import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { 
  Terminal, Sparkles, TrendingUp, Cpu, Flame, 
  ShieldCheck, ArrowUpRight, Zap, ShoppingBag, 
  BarChart3, Workflow, CheckCircle2, Play, RefreshCw,
  Layers, ExternalLink, Activity
} from 'lucide-react';

export function InteractivePortfolioModel() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);

  const [activeModel, setActiveModel] = useState<'ecommerce' | 'saas' | 'automation'>('ecommerce');
  const [isSimulating, setIsSimulating] = useState(false);
  const [salesCount, setSalesCount] = useState(184);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleTriggerSale = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTimeout(() => {
      setSalesCount(prev => prev + 1);
      setIsSimulating(false);
    }, 900);
  };

  return (
    <div 
      className="relative flex justify-center items-center select-none py-6 w-full"
      style={{ perspective: 1200 }}
    >
      {/* Ambient background glows */}
      <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/25 via-cyan-500/20 to-purple-600/25 rounded-3xl blur-3xl opacity-70 animate-pulse-glow pointer-events-none"></div>
      <div className="absolute -top-8 -right-8 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl animate-spin-slow pointer-events-none"></div>
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-500/25 rounded-full blur-2xl animate-float-slow pointer-events-none"></div>

      {/* Main 3D Tilted Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220 }}
        className="relative w-full max-w-[460px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-teal-500/35 shadow-[0_0_50px_rgba(20,184,166,0.16)] p-4 sm:p-5"
      >
        {/* Animated Neon Border Shimmer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute -inset-[100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(45,212,191,0.5)_360deg)] opacity-35"></div>
        </div>

        {/* Card Header & Model Selector Tabs */}
        <div className="relative z-10 pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                نموذج تطبيقي حي (Interactive Mockup)
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-300">
              Live Demo
            </span>
          </div>

          {/* Model Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-50/80 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveModel('ecommerce')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeModel === 'ecommerce' 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>متجر ذكي</span>
            </button>

            <button
              onClick={() => setActiveModel('saas')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeModel === 'saas' 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>منصة SaaS</span>
            </button>

            <button
              onClick={() => setActiveModel('automation')}
              className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeModel === 'automation' 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>نظام أتمتة</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Screen Display */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner p-4 min-h-[290px] flex flex-col justify-between">
          {/* Window dots header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="mr-2 text-slate-600 dark:text-slate-400 text-xs">abdallah.dev/{activeModel}</span>
            </div>
            <span className="text-teal-400 font-bold flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" /> 60 FPS
            </span>
          </div>

          {/* Model 1: E-commerce AI Showcase */}
          {activeModel === 'ecommerce' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">متجر المنتجات الرقمية الفاخر</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">واجهة جذابة تحفز الزائر على إتمام الشراء فوراً</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +42% مبيعات
                </span>
              </div>

              {/* Product preview card inside mockup */}
              <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500/20 to-blue-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold text-xs">الحزمة الرقمية الممتازة</div>
                    <div className="text-emerald-400 font-bold text-sm font-mono">$120.00</div>
                  </div>
                </div>

                <button
                  onClick={handleTriggerSale}
                  disabled={isSimulating}
                  className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1 active:scale-95"
                >
                  {isSimulating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  )}
                  <span>{isSimulating ? 'جاري الدفع...' : 'شراء تجريبي'}</span>
                </button>
              </div>

              {/* Live Metric Ticker */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-600 dark:text-slate-400 block text-[10px]">الطلبات المؤتمتة اليوم:</span>
                  <span className="text-teal-300 font-bold font-mono text-sm">{salesCount} طلب</span>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-600 dark:text-slate-400 block text-[10px]">زمن إتمام الشراء:</span>
                  <span className="text-emerald-300 font-bold font-mono text-sm">1.8 ثانية</span>
                </div>
              </div>
            </div>
          )}

          {/* Model 2: SaaS Platform Showcase */}
          {activeModel === 'saas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">لوحة تحكم المنصات السحابية</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">تحليلات دقيقة وتجربة مستخدم فائقة السرعة</p>
                </div>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold rounded-md">
                  SaaS V2.4
                </span>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-600 dark:text-slate-400">الأرباح الشهرية (MRR):</span>
                  <span className="text-emerald-400 font-mono font-bold text-sm">$38,450.00</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-full rounded-full w-[78%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>نمو متواصل +18.4%</span>
                  <span>الهدف: $50,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 block text-[10px]">استجابة الخادم:</span>
                  <span className="text-teal-300 font-bold font-mono text-sm">48ms Ultra-fast</span>
                </div>
                <div className="bg-white/60 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 block text-[10px]">الأمان والتشفير:</span>
                  <span className="text-emerald-300 font-bold font-mono text-sm">SSL Enterprise</span>
                </div>
              </div>
            </div>
          )}

          {/* Model 3: Automation Pipeline Showcase */}
          {activeModel === 'automation' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm">سير العمل التلقائي (Automation Bot)</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">ربط المتجر وموقعك بروبوتات الرد وإدارة الفواتير</p>
                </div>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold rounded-md flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" /> يعمل 24/7
                </span>
              </div>

              {/* Connected flow steps */}
              <div className="bg-white/90 dark:bg-slate-900/90 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-teal-300 bg-slate-50/60 dark:bg-slate-950/60 p-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Webhook Trigger</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">0.02s</span>
                </div>
                <div className="flex items-center justify-between text-emerald-300 bg-slate-50/60 dark:bg-slate-950/60 p-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Notification</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">Instant</span>
                </div>
                <div className="flex items-center justify-between text-blue-300 bg-slate-50/60 dark:bg-slate-950/60 p-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Database & CRM Sync</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">Live</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom simulation hint */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>معايير أداء عالمية وكود نظيف 100%</span>
            </span>
            <span className="text-teal-400 font-bold">بناء مخصص لمشروعك</span>
          </div>
        </div>

        {/* Feature Highlights Under Screen */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
          <div className="bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-700/60 transition-all">
            <div className="text-teal-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full-Stack</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">تطوير برمجي شامل</div>
          </div>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-700/60 transition-all">
            <div className="text-emerald-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              <span>24/7 Bot</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">أتمتة متواصلة</div>
          </div>

          <div className="bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-700/60 transition-all">
            <div className="text-blue-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+ROI</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5">عائد استثماري عالٍ</div>
          </div>
        </div>

        {/* Direct Call to Action */}
        <div className="mt-3.5">
          <a
            href="#contact"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-teal-500/20 active:scale-[0.98]"
          >
            <span>أريد بناء نموذج مثل هذا لمشروعي</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </motion.div>
    </div>
  );
}
