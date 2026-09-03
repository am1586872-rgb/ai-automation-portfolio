import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, User, Mail, Briefcase, MessageSquare, 
  CheckCircle2, Clock, Sparkles, ShieldCheck, 
  RotateCcw, ArrowRight, Phone, Copy, Check, MessageCircle
} from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'web-app', label: 'تطبيق ويب / موقع متقدم', icon: '💻' },
  { id: 'automation', label: 'أتمتة عمليات وروبوتات ذكية', icon: '⚡' },
  { id: 'api-integration', label: 'ربط أنظمة وبوابات دفع (APIs)', icon: '🔗' },
  { id: 'saas', label: 'منصة سحابية متكاملة (SaaS)', icon: '☁️' },
  { id: 'consultation', label: 'استشارة فنية وتخطيط نظام', icon: '💡' },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'web-app',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const constructEmailBody = () => {
    return (
      `السلام عليكم أستاذ عبداللاه،\n\n` +
      `أود مناقشة مشروع جديد معك عبر موقعك الشخصي:\n\n` +
      `• الاسم: ${formData.name}\n` +
      `• البريد الإلكتروني: ${formData.email}\n` +
      (formData.phone ? `• رقم الهاتف / الواتساب: ${formData.phone}\n` : '') +
      `• نوع المشروع: ${PROJECT_TYPES.find(p => p.id === formData.projectType)?.label}\n\n` +
      `• تفاصيل الفكرة والمتطلبات:\n${formData.message}\n\n` +
      `مع خالص التحية والتقدير.`
    );
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`طلب مشروع جديد: ${PROJECT_TYPES.find(p => p.id === formData.projectType)?.label || 'مشروع جديد'} - ${formData.name}`);
    const body = encodeURIComponent(constructEmailBody());
    return `mailto:am1586872@gmail.com?subject=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(constructEmailBody());
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('يرجى ملء الاسم والبريد الإلكتروني وتفاصيل المشروع.');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      // Trigger user's mail client directly
      window.location.href = getMailtoUrl();
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(constructEmailBody());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'web-app',
      message: '',
    });
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Trust Highlights (5 cols) */}
        <div className="lg:col-span-5 space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تواصل فعلي ومباشر</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            دعنا نبني نظامك القادم أو نؤتمت أعمالك اليوم
          </h3>

          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            أنا جاهز لتحويل فكرتك أو مشكلتك التشغيلية إلى حل برمجي متين يرفع إيراداتك ويوفر وقتك الثمين. يمكنك ملء النموذج أدناه أو مراسلتي مباشرة عبر البريد الإلكتروني.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-850/80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-slate-600 dark:text-slate-400 block">البريد الإلكتروني المباشر</span>
                <a 
                  href="mailto:am1586872@gmail.com" 
                  className="text-slate-900 dark:text-white font-bold text-sm sm:text-base hover:text-teal-400 transition-colors font-mono block"
                  dir="ltr"
                >
                  am1586872@gmail.com
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-850/80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 block">سرعة التجاوب والرد</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                  خلال أقل من 12 ساعة كحد أقصى
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-850/80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 block">ضمان الشفافية والسرية</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                  جلسة تخطيط أولية ودراسة جدوى فنية مجاناً
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7">
          <div className="relative">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-60"></div>

            <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8 px-4 space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        تم تجهيز طلبك بنجاح، شكراً لك {formData.name}!
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        تم إعداد مسودة الرسالة لإرسالها مباشرة إلى المطور عبداللاه محمد. يمكنك إرسالها الآن عبر بريدك أو واتساب:
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={getMailtoUrl()}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-teal-500/25"
                      >
                        <Mail className="w-4 h-4" />
                        <span>فتح وإرسال بالبريد الإلكتروني</span>
                      </a>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/25"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>إرسال عبر الواتساب</span>
                      </a>
                      
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-300 dark:border-slate-700"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'تم النسخ للحافظة!' : 'نسخ النص'}</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs text-slate-500 hover:text-teal-400 transition-colors flex items-center justify-center gap-1 mx-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>إرسال استفسار أو مشروع آخر</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 text-right"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">نموذج حجز واستشارة مشروع</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">شاركني فكرتك لنبدأ دراستها والتخطيط لها</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-300 font-medium">
                        تواصل مباشر
                      </span>
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    {/* Name & Email Inputs */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-teal-400" />
                          <span>الاسم الكريم *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="اكتب اسمك الكريم هنا"
                          className="w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-teal-400" />
                          <span>البريد الإلكتروني *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="yourname@gmail.com"
                          className="w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>رقم الواتساب أو الهاتف (اختياري لسرعة الرد)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966... / +20..."
                        className="w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-mono text-left"
                        dir="ltr"
                      />
                    </div>

                    {/* Project Type Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                        <span>نوع المشروع المطلوب *</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PROJECT_TYPES.map((type) => {
                          const isSelected = formData.projectType === type.id;
                          return (
                            <button
                              type="button"
                              key={type.id}
                              onClick={() => setFormData({ ...formData, projectType: type.id })}
                              className={`p-3 rounded-xl border text-right text-xs font-semibold transition-all flex items-center gap-2.5 ${
                                isSelected
                                  ? 'bg-teal-500/15 border-teal-400 text-teal-700 dark:text-teal-200 shadow-sm shadow-teal-500/20'
                                  : 'bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:border-slate-700 hover:text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <span className="text-base">{type.icon}</span>
                              <span className="flex-1">{type.label}</span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Details Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                        <span>تفاصيل الفكرة أو المتطلبات *</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="صف باختصار فكرة موقعك أو التطبيق، المشكلة التي ترغب بأتمتتها، أو أي متطلبات فنية هامة..."
                        className="w-full px-4 py-3 bg-slate-50/70 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-extrabold text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                          <span>جاري تجهيز طلبك...</span>
                        </>
                      ) : (
                        <>
                          <span>إرسال تفاصيل المشروع الآن</span>
                          <Send className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
