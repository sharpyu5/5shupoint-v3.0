
// Import hooks and components
import { useState, useLayoutEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
// 在浏览器 Babel 环境下，如果 constants.ts 在同一目录，直接引用文件名
import { MERIDIAN_DATA, ACUPOINT_PINYIN_MAP, ELEMENT_THEMES } from './constants.ts';

// Sorting Order Definitions
const SORT_CONFIGS = {
  circulation: {
    label: "循经流注",
    order: ["手太阴肺经", "手阳明大肠经", "足阳明胃经", "足太阴脾经", "手少阴心经", "手太阳小肠经", "足太阳膀胱经", "足少阴肾经", "手厥阴心包经", "手少阳三焦经", "足少阳胆经", "足厥阴肝经"]
  },
  name: {
    label: "按经络名",
    order: ["手太阳小肠经", "足太阳膀胱经", "手阳明大肠经", "足阳明胃经", "手少阳三焦经", "足少阳胆经", "手太阴肺经", "足太阴脾经", "手少阴心经", "足少阴肾经", "手厥阴心包经", "足厥阴肝经"]
  },
  yinyang: {
    label: "三阴三阳",
    order: ["手太阳小肠经", "手阳明大肠经", "手少阳三焦经", "足太阳膀胱经", "足阳明胃经", "足少阳胆经", "手太阴肺经", "手少阴心经", "手厥阴心包经", "足太阴脾经", "足少阴肾经", "足厥阴肝经"]
  }
};

const AcupointImage = ({ pointFullTitle }) => {
  const pointName = pointFullTitle.split('(')[0].trim();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const pinyinName = ACUPOINT_PINYIN_MAP[pointName] || null;
  const localImgPath = pinyinName ? `images/${pinyinName}.jpg` : '';

  useLayoutEffect(() => {
    if (!pinyinName) {
      setStatus('error');
    }
  }, [pinyinName]);

  return (
    <div className="w-full aspect-square relative flex items-center justify-center bg-stone-50 overflow-hidden border-b border-stone-100 p-3 group">
      {/* Skeleton Loader */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-stone-200 rounded-full mb-2 opacity-50"></div>
          <div className="w-12 h-2 bg-stone-200 rounded-full opacity-30"></div>
        </div>
      )}

      {/* Error / Missing State */}
      {status === 'error' ? (
        <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-stone-200 text-stone-400">
           <svg className="w-8 h-8 opacity-20 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <span className="text-[9px] uppercase tracking-tighter opacity-50 font-sans">Image Missing</span>
        </div>
      ) : (
        <img 
          src={localImgPath} 
          alt={pointName}
          onLoad={() => setStatus('success')}
          onError={() => setStatus('error')}
          className={`w-[90%] h-[90%] object-cover rounded-xl shadow-inner transition-all duration-700 ${status === 'success' ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-95'}`}
        />
      )}
    </div>
  );
};

const ScrollGuide = ({ items, onScrollTo }) => {
  return (
    <div className="fixed right-1 md:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1 md:gap-2 pointer-events-none">
      <div className="pointer-events-auto glass-morphism border border-stone-200/50 rounded-full py-3 px-1.5 md:px-2 shadow-2xl flex flex-col items-center">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => onScrollTo(`meridian-${item.name}`)}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-[10px] md:text-xs font-bold text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-all active:scale-90"
            title={item.name}
          >
            {item.shortName.charAt(0)}
          </button>
        ))}
      </div>
    </div>
  );
};

const StarryBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse opacity-40"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [selectedMeridian, setSelectedMeridian] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sortType, setSortType] = useState('circulation'); 

  const sortedMeridians = useMemo(() => {
    const config = SORT_CONFIGS[sortType];
    return [...MERIDIAN_DATA].sort((a, b) => {
      return config.order.indexOf(a.name) - config.order.indexOf(b.name);
    });
  }, [sortType]);

  useLayoutEffect(() => {
    if (selectedMeridian === null) {
      window.scrollTo(0, scrollPosition);
    } else {
      window.scrollTo(0, 0);
    }
  }, [selectedMeridian]);

  const handleSelect = (meridian, type) => {
    setScrollPosition(window.scrollY);
    setSelectedMeridian(meridian);
    setSelectedType(type);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const goBack = () => {
    setSelectedMeridian(null);
    setSelectedType(null);
  };

  if (selectedMeridian && selectedType) {
    const data = selectedMeridian.cases[selectedType];
    const theme = ELEMENT_THEMES[selectedMeridian.element];
    
    return (
      <div className="min-h-screen bg-stone-50 animate-in">
        <nav className="fixed top-0 left-0 right-0 z-[100] glass-morphism border-b border-stone-200 shadow-sm px-4 md:px-8 py-3 flex items-center justify-between">
           <button 
              onClick={goBack}
              className="flex items-center text-stone-600 hover:text-stone-900 transition-colors font-sans font-medium text-sm md:text-base group py-1 pr-4"
            >
              <svg className="w-5 h-5 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span>返回列表</span>
            </button>
            <div className="flex flex-col items-end">
                <span className={`text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full border ${theme.border} ${theme.bg} ${theme.text} uppercase font-sans tracking-widest shadow-sm`}>
                    {selectedMeridian.element}行 · {selectedMeridian.shortName}
                </span>
            </div>
        </nav>

        <div className="pt-20 p-4 md:p-8 md:pt-24 max-w-6xl mx-auto">
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-stone-900">{selectedMeridian.name}</h1>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold border font-sans shadow-sm ${selectedType === 'supplement' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                法则：{selectedType === 'supplement' ? '虚则补其母' : '实则泻其子'}
              </span>
              <p className="text-stone-500 italic text-sm md:text-base">{data.title}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {data.sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-3 p-3 rounded-xl ${section.type.startsWith('补') ? 'bg-rose-50/50 text-rose-900' : 'bg-blue-50/50 text-blue-900'}`}>
                  <span className={`w-2 h-6 rounded-full ${section.type.startsWith('补') ? 'bg-rose-600' : 'bg-blue-600'}`}></span>
                  {section.type}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {section.points.map((point, pIdx) => (
                    <div key={pIdx} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all group">
                      <AcupointImage pointFullTitle={point} />
                      <div className="p-5">
                        <h3 className="font-bold text-xl mb-3 text-stone-900 group-hover:text-amber-800 transition-colors">{point.split('(')[0].trim()}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {point.split('(')[1]?.replace(')', '').split('·').map((attr, i) => (
                            <span key={i} className="text-[10px] bg-stone-100 text-stone-500 px-2.5 py-1 rounded-lg font-sans font-medium">
                              {attr.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <footer className="mt-20 pt-8 border-t border-stone-200 text-center text-stone-400 text-[10px] font-sans pb-12">
            © 中医智慧经络手册 · 五输穴子母补泻
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 animate-in relative">
      <ScrollGuide items={sortedMeridians} onScrollTo={handleScrollTo} />

      <div className="bg-stone-900 text-white py-16 md:py-28 px-4 text-center relative overflow-hidden">
        <StarryBackground />
        
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-full max-w-screen-xl grid grid-cols-6 md:grid-cols-12 h-full opacity-20">
                {Array.from({length: 12}).map((_, i) => <div key={i} className="border-r border-stone-400 h-full"></div>)}
            </div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-[0.2em] md:tracking-[0.4em]">五输穴</h1>
          <p className="text-stone-400 text-lg md:text-2xl font-light italic leading-relaxed px-6">
            “井荥输经合，气血运行始”
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-[90] glass-morphism border-b border-stone-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          {Object.entries(SORT_CONFIGS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSortType(key)}
              className={`whitespace-nowrap px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold font-sans transition-all duration-300 ${
                sortType === key 
                ? 'bg-amber-800 text-white shadow-md scale-105' 
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16 md:px-8 pr-10 md:pr-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedMeridians.map((meridian) => {
            const theme = ELEMENT_THEMES[meridian.element];
            return (
              <div 
                key={meridian.name} 
                id={`meridian-${meridian.name}`}
                className={`meridian-card bg-white rounded-[2rem] shadow-sm border ${theme.border} overflow-hidden hover:shadow-2xl animate-in`}
              >
                <div className={`p-6 ${theme.bg} flex justify-between items-center border-b ${theme.border}`}>
                  <h2 className={`text-xl font-bold ${theme.text}`}>{meridian.name}</h2>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full font-sans uppercase ${theme.light} ${theme.text}`}>
                    {meridian.element}
                  </span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-stone-100">
                  <button
                    onClick={() => handleSelect(meridian, 'supplement')}
                    className="py-12 flex flex-col items-center justify-center hover:bg-rose-50/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 text-rose-500 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-stone-800 font-sans tracking-wide">补{meridian.shortName}</span>
                  </button>
                  <button
                    onClick={() => handleSelect(meridian, 'drain')}
                    className="py-12 flex flex-col items-center justify-center hover:bg-blue-50/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-100 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:scale-110">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 12H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-stone-800 font-sans tracking-wide">泻{meridian.shortName}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-20 text-center text-stone-400 border-t border-stone-200 font-sans bg-stone-100/50">
        <p className="text-sm font-medium">© 中医经典学习助手</p>
        <div className="mt-4 text-[11px] space-y-2 opacity-60 px-6 max-w-2xl mx-auto leading-relaxed">
            <p>本指南仅供参考学习，具体临床应用请严格遵医嘱。</p>
            <p>基于五门补泻与子母补泻经典法则设计。</p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
