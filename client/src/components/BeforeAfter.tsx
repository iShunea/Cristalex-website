import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CaseProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

interface BeforeAfterProps {
  cases: CaseProps[];
  mainTitle?: string;
  mainSubtitle?: string;
}

function SingleBeforeAfter({ beforeImage, afterImage, title }: CaseProps) {
  const { t } = useTranslation();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl shadow-lg cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <img src={afterImage} alt={t("beforeafter.after")} className="w-full h-auto block" draggable={false} />
        <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img
            src={beforeImage}
            alt={t("beforeafter.before")}
            className="w-full h-full object-cover"
            style={{ width: `${(100 / sliderPos) * 100}%` }}
            draggable={false}
          />
        </div>
        <div
          className="absolute top-0 left-1/2 w-1 h-full bg-white transition-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-2 border-primary">
            <div className="flex items-center gap-0.5">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-lg font-bold text-sm">{t('beforeafter.before')}</div>
        <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-lg font-bold text-sm">{t('beforeafter.after')}</div>
      </div>
      <h3 className="text-center mt-4 font-semibold text-gray-800">{title}</h3>
    </div>
  );
}

export function BeforeAfter({ cases, mainTitle = "Transformări Reale", mainSubtitle = "Glisează pentru a vedea rezultatele noastre" }: BeforeAfterProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">{mainTitle}</h2>
          <p className="text-gray-500 text-base md:text-lg">{mainSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((caseItem, idx) => (
            <SingleBeforeAfter key={idx} {...caseItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
