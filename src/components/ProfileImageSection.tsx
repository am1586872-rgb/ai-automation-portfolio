import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  Check, 
  Sliders, 
  Sparkles, 
  X, 
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';
import { useProfileImage } from '../context/ProfileImageContext';

export function ProfileImageSection() {
  const { 
    profileImage, 
    hasCustomImage, 
    settings, 
    updateSettings, 
    uploadImageFile, 
    setImageUrl, 
    resetToDefault 
  } = useProfileImage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showFeedback('يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP)');
      return;
    }
    setIsProcessing(true);
    const success = await uploadImageFile(file);
    setIsProcessing(false);
    if (success) {
      showFeedback('تم تطبيق صورتك الأصلية بنجاح وحفظها بدقة كاملة!');
    } else {
      showFeedback('تعذر قراءة الصورة، يرجى تجربة ملف آخر.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setIsProcessing(true);
    const success = await setImageUrl(urlInput);
    setIsProcessing(false);
    if (success) {
      showFeedback('تم تعيين رابط الصورة بنجاح!');
      setUrlInput('');
    }
  };

  const handleReset = async () => {
    await resetToDefault();
    showFeedback('تمت استعادة الصورة الافتراضية.');
  };

  // Determine frame aspect ratio styling
  const aspectClass = 
    settings.aspectRatio === 'square' 
      ? 'aspect-square' 
      : settings.aspectRatio === 'portrait' 
        ? 'aspect-[3/4]' 
        : 'min-h-[360px] aspect-auto';

  const fitClass = settings.objectFit === 'contain' ? 'object-contain bg-slate-950/80 p-2' : 'object-cover object-top';

  return (
    <div className="lg:col-span-5 flex flex-col items-center">
      {/* Hidden File Input for Direct One-Click Trigger */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
        {/* Subtle ambient lighting behind */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-teal-500/25 via-emerald-500/20 to-blue-500/25 rounded-3xl blur-xl opacity-70 pointer-events-none"></div>

        {/* Photo Container with Drag-and-Drop + Interactive Upload overlay */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative z-10 w-full ${aspectClass} rounded-3xl overflow-hidden border-2 transition-all duration-200 bg-white dark:bg-slate-900 shadow-2xl group ${
            isDragging 
              ? 'border-teal-400 ring-4 ring-teal-500/30 scale-[1.02]' 
              : 'border-teal-500/40 dark:border-teal-500/50 hover:border-teal-400'
          }`}
        >
          {/* Main User Image */}
          <img
            src={profileImage}
            alt="عبداللاه محمد"
            className={`w-full h-full ${fitClass} select-none transition-all duration-300`}
            referrerPolicy="no-referrer"
          />

          {/* Quick Floating Camera Button on Corner */}
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label="تغيير صورتي فوراً"
            title="انقر لرفع صورتك الأصلية مباشرة من جهازك"
            className="absolute top-3.5 right-3.5 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/90 text-teal-400 border border-teal-500/40 shadow-lg backdrop-blur-md hover:scale-110 active:scale-95 transition-all"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Hover / Tap Bottom Action Strip */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-3 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent flex items-center justify-between gap-2 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>رفع صورتي الأصلية</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              title="خيارات وضبط الصورة"
              className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Drag Overlay State */}
          {isDragging && (
            <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-teal-400 rounded-3xl">
              <Upload className="w-12 h-12 text-teal-400 animate-bounce mb-3" />
              <p className="text-white font-bold text-base">أفلت صورتك هنا الآن</p>
              <p className="text-slate-400 text-xs mt-1">سيتم حفظها وتطبيقها بدقة عالية فوراً</p>
            </div>
          )}

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-white text-xs font-semibold">جارٍ معالجة الصورة...</span>
            </div>
          )}
        </div>

        {/* Temporary Feedback Toast */}
        <AnimatePresence>
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-12 inset-x-0 z-40 bg-emerald-500 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow-xl flex items-center justify-center gap-1.5 text-center"
            >
              <Check className="w-4 h-4 shrink-0" />
              <span>{feedbackMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Action Button - Always clearly visible underneath the photo */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500/15 via-emerald-500/15 to-teal-500/15 hover:from-teal-500/25 hover:to-teal-500/25 border border-teal-500/30 text-teal-600 dark:text-teal-300 font-bold text-xs transition-all active:scale-95"
          >
            <Camera className="w-4 h-4 text-teal-500" />
            <span>تغيير / رفع صورتك الحقيقية من جهازك</span>
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="خيارات الصورة"
            title="خيارات وضبط أبعاد الصورة"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs transition-all"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Verified Identity Card */}
        <div className="mt-3 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-lg text-center flex items-center justify-between gap-3">
          <div className="text-right">
            <span className="text-slate-900 dark:text-white font-extrabold text-base block leading-tight">عبداللاه محمد</span>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold block mt-0.5">مطور برمجيات ومهندس أتمتة النظم</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>متاح للمشاريع</span>
          </div>
        </div>
      </div>

      {/* Modal / Dialog for Advanced Image Customization */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">إضافة صورتك الأصلية</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">تطبيق صورتك الحقيقية بملامحها الكاملة دون أي تدخل</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Upload Drop Zone */}
              <div className="mt-5">
                <input
                  type="file"
                  ref={modalFileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />

                <div
                  onClick={() => modalFileInputRef.current?.click()}
                  className="border-2 border-dashed border-teal-500/50 hover:border-teal-400 rounded-2xl p-6 text-center cursor-pointer bg-teal-500/5 hover:bg-teal-500/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-500/15 text-teal-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    انقر لاختيار صورتك من الجهاز أو أسقطها هنا
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    يدعم جميع الصيغ (PNG, JPG, JPEG, WEBP) بدقة كاملة وغير مضغوطة
                  </p>
                </div>
              </div>

              {/* URL Option */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  أو إضافة رابط صورة خارجي مباشر:
                </label>
                <form onSubmit={handleUrlSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://example.com/my-photo.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!urlInput.trim()}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all"
                  >
                    تطبيق
                  </button>
                </form>
              </div>

              {/* Display & Ratio Settings */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  تخصيص نمط العرض والإطار
                </h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">نسبة أبعاد الإطار</label>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => updateSettings({ aspectRatio: 'portrait' })}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          settings.aspectRatio === 'portrait'
                            ? 'bg-teal-500 text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        3:4 عمودي
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSettings({ aspectRatio: 'square' })}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          settings.aspectRatio === 'square'
                            ? 'bg-teal-500 text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        1:1 مربع
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSettings({ aspectRatio: 'auto' })}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          settings.aspectRatio === 'auto'
                            ? 'bg-teal-500 text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        طبيعي
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">طريقة ملء الصورة</label>
                    <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => updateSettings({ objectFit: 'cover' })}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          settings.objectFit === 'cover'
                            ? 'bg-teal-500 text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ملء (Cover)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSettings({ objectFit: 'contain' })}
                        className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          settings.objectFit === 'contain'
                            ? 'bg-teal-500 text-slate-950 shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        احتواء (كامل)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Reset & Close */}
              <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                {hasCustomImage ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-400 font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>استعادة الصورة الافتراضية</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>تُحفظ صورتك دائماً في متصفحك</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow transition-all hover:opacity-90"
                >
                  إغلاق وحفظ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
