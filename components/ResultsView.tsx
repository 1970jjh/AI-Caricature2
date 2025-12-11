import React from 'react';
import { GenerationResult } from '../types';

interface ResultsViewProps {
  result: GenerationResult;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  const downloadImage = (base64: string, filename: string) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4 animate-fade-in-up w-full">
      <div className="border-4 border-black bg-[#FF5E00] p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
         <h2 className="text-3xl font-black text-black text-center uppercase tracking-tighter">
            RESULTS
         </h2>
      </div>

      {/* Post-it Caricature */}
      <div className="border-4 border-black bg-white p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black text-white inline-block px-2 py-1 text-sm font-bold mb-4">
          OUTPUT 01
        </div>
        <h3 className="text-xl text-black font-black mb-4 uppercase">
          나만의 AI 캐리커쳐
        </h3>
        <div className="border-2 border-black mb-4 bg-gray-100">
          <img 
            src={result.caricatureImage} 
            alt="포스트잇 캐리커쳐" 
            className="w-full h-auto object-cover"
          />
        </div>
        <button
          onClick={() => downloadImage(result.caricatureImage, 'AI_포스트잇_캐리커쳐.png')}
          className="w-full py-3 px-4 bg-black text-white font-bold text-lg hover:bg-[#FF5E00] hover:text-black border-2 border-black transition-all active:scale-[0.99]"
        >
          DOWNLOAD IMAGE 📥
        </button>
      </div>

      {/* Photo Caricature */}
      <div className="border-4 border-black bg-white p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black text-white inline-block px-2 py-1 text-sm font-bold mb-4">
          OUTPUT 02
        </div>
        <h3 className="text-xl text-black font-black mb-4 uppercase">
          실사 사진 캐리커쳐
        </h3>
        <div className="border-2 border-black mb-4 bg-gray-100">
           <img 
            src={result.photoCaricatureImage} 
            alt="실사 캐리커쳐" 
            className="w-full h-auto object-cover"
          />
        </div>
        <button
          onClick={() => downloadImage(result.photoCaricatureImage, 'AI_실사_캐리커쳐.png')}
          className="w-full py-3 px-4 bg-black text-white font-bold text-lg hover:bg-[#FF5E00] hover:text-black border-2 border-black transition-all active:scale-[0.99]"
        >
          DOWNLOAD IMAGE 📥
        </button>
      </div>

      {/* Sync Rate */}
      <div className="border-4 border-black bg-white p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#FF5E00] w-16 h-16 transform rotate-45 translate-x-8 -translate-y-8 border-l-4 border-b-4 border-black"></div>
        
        <h3 className="text-xl text-black font-black mb-6 uppercase border-b-4 border-black inline-block pb-1">
          싱크로율 분석
        </h3>
        <div className="text-7xl font-black text-black text-center my-6 tracking-tighter">
          {result.analysis.syncRate}<span className="text-4xl align-top">%</span>
        </div>
        <div className="text-lg font-bold text-black leading-relaxed p-4 bg-[#F3F3F3] border-2 border-black">
          {result.analysis.syncAnalysis}
        </div>
      </div>

      {/* Physiognomy */}
      <div className="border-4 border-black bg-white p-4 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl text-black font-black mb-4 uppercase border-b-4 border-black inline-block pb-1">
          나의 관상학적 분석
        </h3>
        <div className="text-lg font-medium text-black leading-relaxed p-4 bg-[#F3F3F3] border-2 border-black whitespace-pre-wrap">
          {result.analysis.physiognomy}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-5 text-xl font-black text-white bg-[#FF5E00] border-4 border-black hover:bg-black hover:text-[#FF5E00] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] uppercase tracking-wider"
      >
        RESTART APP 🔄
      </button>
    </div>
  );
};