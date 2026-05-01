import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      login: formData.get('login'),
      password: formData.get('password'),
    };

    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  }

  return (
    <div className="w-full max-w-[400px]">
      {/* Logo + Title */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-xl shadow-blue-200">
          <Zap size={30} className="text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          CRM <span className="text-blue-600">Tizimi</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500">Hisobingizga kiring</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Login input */}
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Login</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="login"
              type="text"
              placeholder="Loginni kiriting"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
        </div>

        {/* Password input */}
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-gray-700">Parol</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Parolni kiriting"
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-12 text-[13px] text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-[14px] font-bold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Kirilmoqda...
            </>
          ) : (
            'Kirish'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[12px] text-gray-400">
        © 2024 CRM Tizimi. Barcha huquqlar himoyalangan.
      </p>
    </div>
  );
}
