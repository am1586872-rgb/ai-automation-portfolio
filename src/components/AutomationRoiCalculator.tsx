import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, DollarSign, Clock, Users, ArrowLeft, 
  Sparkles, CheckCircle2, TrendingUp, HelpCircle
} from 'lucide-react';

export function AutomationRoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(12);
  const [hourlyWage, setHourlyWage] = useState<number>(25);

  // Calculations
  const weeklyWastedCost = teamSize * hoursWastedPerWeek * hourlyWage;
  const annualLoss = weeklyWastedCost * 50; // 50 working weeks
  const annualSavingsWithAutomation = Math.round(annualLoss * 0.75); // 75% automation efficiency
  const hoursSavedYearly = Math.round(teamSize * hoursWastedPerWeek * 50 * 0.75);

  return (
    <section className="py-20 px-6 bg-white/80 dark:bg-slate-900/80 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-bold mb-4">
            <Calculator className="w-4 h-4" />
            <span>حاسبة العائد الاستثماري التفاعلية (ROI Calculator)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            كم توفر لك أتمتة الأنظمة وبرمجة الحلول الذكية سنوياً؟
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            حرك المؤشرات أدناه وشاهد بالدولار وساعات العمل كم من الهدر المالي ستوفره شركتك عند أتمتة العمليات الروتينية.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Form */}
          <div className="lg:col-span-7 bg-slate-100/60 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-700/80 backdrop-blur-xl shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Slider 1: Team Size */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm sm:text-base">
                    <Users className="w-4 h-4 text-teal-400" />
                    عدد الموظفين أو أعضاء الفريق:
                  </span>
                  <span className="text-teal-400 font-mono font-bold text-lg px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700">
                    {teamSize} موظف
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1 شخص</span>
                  <span>50 موظف</span>
                </div>
              </div>

              {/* Slider 2: Hours wasted per person */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm sm:text-base">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    ساعات المهام اليدوية والروتينية أسبوعياً لكل فرد:
                  </span>
                  <span className="text-cyan-400 font-mono font-bold text-lg px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700">
                    {hoursWastedPerWeek} ساعة
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="35" 
                  value={hoursWastedPerWeek}
                  onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>ساعتان</span>
                  <span>35 ساعة (أعمال ورقية وروتينية)</span>
                </div>
              </div>

              {/* Slider 3: Average hourly wage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-900 dark:text-white font-bold flex items-center gap-2 text-sm sm:text-base">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    متوسط أجر ساعة العمل التقديري:
                  </span>
                  <span className="text-emerald-400 font-mono font-bold text-lg px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700">
                    ${hourlyWage}/ساعة
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="150" 
                  step="5"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$10/ساعة</span>
                  <span>$150/ساعة</span>
                </div>
              </div>
            </div>

            {/* Reassurance note */}
            <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
              <span>نقوم ببناء سكربتات وبوتات مستقلة تحل محل هذه الساعات وتعمل طوال الـ 24 ساعة دون إجازات.</span>
            </div>
          </div>

          {/* Results Display Board */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white dark:from-slate-900 via-slate-800 to-white dark:to-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-teal-500/40 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wide uppercase">وفر الأرباح التقديري</span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                  كفاءة أتمتة +75%
                </span>
              </div>

              {/* Main Big Number */}
              <div className="mb-6">
                <div className="text-slate-600 dark:text-slate-400 text-xs mb-1 font-semibold">توفير مالي سنوي مسترد لشركتك:</div>
                <motion.div 
                  key={annualSavingsWithAutomation}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono tracking-tight"
                >
                  ${annualSavingsWithAutomation.toLocaleString()}
                </motion.div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">توفير نقدي مباشر من التكاليف المهدورة</div>
              </div>

              {/* Secondary Metric */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-700/80">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">ساعات عمل مستردة:</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-400 font-mono">
                    {hoursSavedYearly.toLocaleString()} ساعة
                  </div>
                </div>

                <div className="p-3.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-700/80">
                  <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">ساعات إضافية للبيع:</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">
                    +{(hoursWastedPerWeek * teamSize).toLocaleString()} س/أسبوع
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-700/80">
              <a
                href="#contact"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-black rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95"
              >
                <span>دعنا نبدأ بأتمتة عملك وتوفير هذه الأرباح</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
