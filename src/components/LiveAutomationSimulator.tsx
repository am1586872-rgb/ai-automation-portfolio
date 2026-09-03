import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RefreshCw, CheckCircle2, 
  Terminal, ShieldCheck, Database, Send, Zap, Bot
} from 'lucide-react';

interface LogItem {
  id: string;
  time: string;
  text: string;
  type: 'info' | 'success' | 'process';
}

export function LiveAutomationSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionRuns, setSessionRuns] = useState(0);
  const [logs, setLogs] = useState<LogItem[]>([
    { id: 'init', time: 'جاهز', text: 'محرك أتمتة الأعمال السحابي مهيأ وجاهز لاختبار دورة المعالجة.', type: 'info' },
  ]);

  const steps = [
    { title: 'استقبال الطلب / الزائر', icon: <Bot className="w-5 h-5 text-teal-400" /> },
    { title: 'معالجة وتصنيف ذكي', icon: <Terminal className="w-5 h-5 text-blue-400" /> },
    { title: 'مزامنة قواعد البيانات', icon: <Database className="w-5 h-5 text-purple-400" /> },
    { title: 'إتمام البيع والإشعار', icon: <Send className="w-5 h-5 text-emerald-400" /> },
  ];

  const handleTriggerRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);

    const timeNow = new Date().toLocaleTimeString('ar-EG');
    const newLog: LogItem = {
      id: Date.now().toString(),
      time: timeNow,
      text: 'تم رصد عميل محتمل جديد على الموقع ⚡ جاري تشغيل خط الأتمتة التفاعلي...',
      type: 'process'
    };
    setLogs(prev => [newLog, ...prev.slice(0, 5)]);

    setTimeout(() => {
      setCurrentStep(2);
      setLogs(prev => [
        { id: Date.now().toString(), time: new Date().toLocaleTimeString('ar-EG'), text: 'تحليل سلوك العميل وتخصيص العرض المناسب له بدقة 99%.', type: 'info' },
        ...prev.slice(0, 5)
      ]);
    }, 1000);

    setTimeout(() => {
      setCurrentStep(3);
      setLogs(prev => [
        { id: Date.now().toString(), time: new Date().toLocaleTimeString('ar-EG'), text: 'تحديث قاعدة البيانات السحابية وإرسال الفاتورة ومسار التسليم فوراً.', type: 'process' },
        ...prev.slice(0, 5)
      ]);
    }, 2000);

    setTimeout(() => {
      setCurrentStep(4);
      setSessionRuns(prev => prev + 1);
      setLogs(prev => [
        { id: Date.now().toString(), time: new Date().toLocaleTimeString('ar-EG'), text: 'اكتملت العملية بنجاح! تم تحويل الزائر إلى عميل بدون أي تدخل بشري! 🎉', type: 'success' },
        ...prev.slice(0, 5)
      ]);
      setIsRunning(false);
    }, 3200);
  };

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs sm:text-sm font-bold mb-4">
            <Zap className="w-4 h-4 text-teal-400" />
            <span>محاكاة حية لمؤثرات الأتمتة (Live Simulation)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            شاهد كيف يعمل النظام الذكي خلف الكواليس
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            انقر على زر التشغيل التفاعلي لتشاهد كيف تتحرك البيانات وتُنجز العمليات المعقدة في ثوانٍ معدودة.
          </p>
        </div>

        {/* Visual Pipeline Showcase */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>مسار تدفق البيانات التلقائي</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {sessionRuns > 0 ? (
                  <>دورات الاختبار المنفذة في هذه الجلسة: <strong className="text-teal-400 font-mono font-bold text-base">{sessionRuns}</strong></>
                ) : (
                  <>حالة النظام: <span className="text-emerald-500 font-bold">جاهز للاختبار التفاعلي الحي</span></>
                )}
              </p>
            </div>

            <button
              onClick={handleTriggerRun}
              disabled={isRunning}
              className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
                isRunning 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700' 
                  : 'bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 hover:from-teal-500 hover:to-emerald-600 shadow-teal-500/20 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-teal-400" />
                  <span>جاري تدفق الأتمتة...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>جرّب تشغيل دورة أتمتة الآن</span>
                </>
              )}
            </button>
          </div>

          {/* Stepper Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isPast = currentStep > stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    isCurrent 
                      ? 'bg-slate-100 dark:bg-slate-800 border-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.25)] scale-[1.02]' 
                      : isPast
                        ? 'bg-slate-100/80 dark:bg-slate-800/80 border-emerald-500/50'
                        : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-70'
                  }`}
                >
                  {/* Glowing progress line on top */}
                  {isCurrent && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 animate-pulse"></div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{stepNumber}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h4>
                  <div className="text-xs">
                    {isCurrent ? (
                      <span className="text-teal-400 font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> قيد التنفيذ الآن...
                      </span>
                    ) : isPast ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> تم بنجاح
                      </span>
                    ) : (
                      <span className="text-slate-500">جاهز للإطلاق</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Console Output Log */}
          <div className="mt-8 bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="mr-2 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">سجل العمليات الآلية (Live System Terminal)</span>
              </div>
              <span className="text-teal-400 text-[11px]">نظام مستقر 99.9%</span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className={
                      log.type === 'success' 
                        ? 'text-emerald-400 font-bold' 
                        : log.type === 'process' 
                          ? 'text-teal-300' 
                          : 'text-slate-700 dark:text-slate-300'
                    }>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
