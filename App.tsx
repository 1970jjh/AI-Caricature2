import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { PoseSelector } from './components/PoseSelector';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsView } from './components/ResultsView';
import { AdminLogin } from './components/AdminLogin';
import { AppState, GenerationResult } from './types';
import * as geminiService from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOCKED);
  const [drawingImage, setDrawingImage] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [pose, setPose] = useState<string>('');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isFormComplete = drawingImage && faceImage && pose;

  const handleAdminLogin = (password: string) => {
    if (password === '6749467') {
      setAppState(AppState.IDLE);
      return true;
    }
    return false;
  };

  const handleGenerate = async () => {
    if (!drawingImage || !faceImage || !pose) return;

    setAppState(AppState.LOADING);
    setError(null);

    try {
      // Run all generations in parallel for better performance
      const [caricatureImg, photoCaricatureImg, analysisData] = await Promise.all([
        geminiService.generatePostItCaricature(drawingImage),
        geminiService.generatePhotoCaricature(faceImage, pose),
        geminiService.analyzeImages(drawingImage, faceImage)
      ]);

      setResult({
        caricatureImage: caricatureImg,
        photoCaricatureImage: photoCaricatureImg,
        analysis: analysisData
      });
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setDrawingImage(null);
    setFaceImage(null);
    setPose('');
    setResult(null);
    setError(null);
  };

  // If Locked, show Admin Login
  if (appState === AppState.LOCKED) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] p-4 font-['Noto_Sans_KR'] flex items-center justify-center">
        <AdminLogin onLogin={handleAdminLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] p-4 font-['Noto_Sans_KR'] overflow-x-hidden">
      <div className="max-w-[500px] mx-auto transition-all">
        
        {/* Header */}
        {appState !== AppState.SUCCESS && (
          <div className="mb-10 mt-4 border-b-4 border-black pb-6">
            <h1 className="text-5xl font-black text-black mb-2 uppercase tracking-tighter leading-[0.9]">
              AI<br/><span className="text-[#FF5E00]">Cari</span><br/>cature
            </h1>
            <div className="text-xl font-bold text-black border-l-4 border-black pl-4 mt-4">
              나만의<br/>캐리커쳐<br/>만들기
            </div>
          </div>
        )}

        {/* Input Form Section */}
        {appState === AppState.IDLE && (
          <div className="animate-fade-in flex flex-col">
            <FileUpload
              id="drawingInput"
              label="포스트잇 그림"
              description="그림과 텍스트가 포함된 사진"
              icon="📝"
              buttonText="TAP TO UPLOAD"
              image={drawingImage}
              onImageChange={setDrawingImage}
            />

            <FileUpload
              id="faceInput"
              label="내 얼굴 실사"
              description="선명하게 나온 본인 얼굴 사진"
              icon="👤"
              buttonText="TAP TO UPLOAD"
              image={faceImage}
              onImageChange={setFaceImage}
            />

            <PoseSelector value={pose} onChange={setPose} />

            <button
              onClick={handleGenerate}
              disabled={!isFormComplete}
              className={`w-full py-6 text-2xl font-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 uppercase tracking-widest
                ${isFormComplete 
                  ? 'bg-[#FF5E00] cursor-pointer hover:bg-black hover:text-[#FF5E00] active:shadow-none active:translate-x-[8px] active:translate-y-[8px]' 
                  : 'bg-gray-400 cursor-not-allowed text-gray-200'}`}
            >
              GENERATE!
            </button>
          </div>
        )}

        {/* Loading State */}
        {appState === AppState.LOADING && <LoadingScreen />}

        {/* Error State */}
        {appState === AppState.ERROR && (
          <div className="text-center py-10">
             <div className="bg-red-100 border-4 border-black text-black font-bold p-6 mb-8 shadow-[8px_8px_0px_0px_#000000]">
                ⚠️ {error}
             </div>
             <button
              onClick={() => setAppState(AppState.IDLE)}
              className="w-full py-4 text-xl font-black text-black bg-white border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Results State */}
        {appState === AppState.SUCCESS && result && (
          <ResultsView result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;