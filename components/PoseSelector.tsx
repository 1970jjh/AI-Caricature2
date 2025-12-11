import React from 'react';
import { POSES } from '../types';

interface PoseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PoseSelector: React.FC<PoseSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="my-10">
      <div className="bg-black text-white inline-block px-3 py-1 text-sm font-bold mb-2 uppercase border-2 border-black">
        STEP 03
      </div>
      <label className="block text-xl font-black text-black mb-2 tracking-tight">
        제일 좋아하는 포즈 선택 💃
      </label>
      <p className="text-sm text-gray-600 mb-4 font-medium border-l-4 border-[#FF5E00] pl-3">
        선택한 포즈로 실사 캐리커쳐를 만들어드려요!
      </p>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-16 pl-4 pr-10 text-lg font-bold border-4 border-black rounded-none bg-white text-black cursor-pointer focus:outline-none focus:bg-[#FF5E00] focus:text-white appearance-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
        >
          <option value="" className="bg-white text-black">CLICK TO SELECT POSE ▼</option>
          {POSES.map((pose) => (
            <option key={pose} value={pose} className="bg-white text-black">
              {pose}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none border-2 border-black bg-black text-white px-2 font-bold">
          ▼
        </div>
      </div>
    </div>
  );
};