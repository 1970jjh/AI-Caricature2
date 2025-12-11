import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => Promise<boolean>;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const success = await onLogin(password);

    setLoading(false);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
      <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black mb-6 text-black uppercase tracking-tighter">
          ADMIN ACCESS
        </h2>
        <p className="mb-6 text-gray-600 font-medium">
          관리자 비밀번호를 입력하여<br/> 키오스크 모드를 시작하세요.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="PASSWORD"
              className="w-full h-14 px-4 border-4 border-black bg-gray-100 text-xl font-bold focus:outline-none focus:bg-[#FF5E00] focus:text-white placeholder-gray-400 transition-colors rounded-none"
              autoFocus
            />
            {error && (
              <p className="text-red-600 font-bold mt-2 text-sm">
                * 비밀번호가 올바르지 않습니다.
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-black text-white font-black text-xl uppercase hover:bg-[#FF5E00] hover:text-black border-4 border-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_#FF5E00] rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Start App'}
          </button>
        </form>
      </div>
    </div>
  );
};