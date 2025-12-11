import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in w-full">
      <div className="w-full border-4 border-black bg-[#FF5E00] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-1">
        <h2 className="text-3xl font-black text-black text-center uppercase tracking-tighter animate-pulse">
          PROCESSING...
        </h2>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
         <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-black animate-ping"></div>
             <span className="font-bold text-lg">포스트잇 분석중...</span>
         </div>
         <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-black animate-ping delay-100"></div>
             <span className="font-bold text-lg">실사 이미지 변환중...</span>
         </div>
         <div className="flex items-center gap-3">
             <div className="w-6 h-6 bg-black animate-ping delay-200"></div>
             <span className="font-bold text-lg">관상학 데이터 계산중...</span>
         </div>
      </div>
      
      <div className="mt-10 text-sm font-bold bg-black text-white px-4 py-2">
        PLEASE WAIT
      </div>
    </div>
  );
};