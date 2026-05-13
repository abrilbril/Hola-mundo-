/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Snowflake, Calculator, Home, Sparkles, Equal, Minus, Plus, X, Divide, Wand2, User, Lock, ArrowRight, LogOut } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', greeting: 'Hello', label: 'EN' },
  { code: 'es', name: 'Español', greeting: 'Hola', label: 'ES' },
  { code: 'fr', name: 'Français', greeting: 'Bonjour', label: 'FR' },
  { code: 'de', name: 'Deutsch', greeting: 'Hallo', label: 'DE' },
  { code: 'jp', name: '日本語', greeting: 'こんにちは', label: 'JP' },
];

const Snowflakes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            top: '110%',
            left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute"
        >
          <Snowflake size={Math.random() * 15 + 10} className="text-blue-200/50" />
        </motion.div>
      ))}
    </div>
  );
};

const MagicBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-purple-900/40 to-transparent" />
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_70%)]" />
    
    {/* Animated stars */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        initial={{ 
          top: `${Math.random() * 100}%`, 
          left: `${Math.random() * 100}%`,
          opacity: Math.random()
        }}
        animate={{ 
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

const WinterCalculator = ({ theme }: { theme: 'winter' | 'magic' }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay((prev) => (prev === '0' ? num : prev + num));
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Use Function constructor instead of eval for slightly better safety
      const result = new Function(`return ${equation.replace('x', '*')}${display}`)();
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const isMagic = theme === 'magic';
  
  const btnBase = "w-full h-14 rounded-2xl flex items-center justify-center text-lg font-medium transition-all duration-200 border active:scale-95 shadow-sm";
  
  const btnClass = isMagic
    ? `${btnBase} bg-purple-900/40 text-purple-100 border-white/20 hover:bg-purple-800/60 backdrop-blur-md`
    : `${btnBase} bg-white/40 text-slate-700 border-white/40 hover:bg-white/60 backdrop-blur-md`;
    
  const opClass = isMagic
    ? `${btnBase} bg-amber-400/20 text-amber-300 border-amber-400/30 hover:bg-amber-400/40 backdrop-blur-md`
    : `${btnBase} bg-blue-100/50 text-blue-700 border-white/40 hover:bg-blue-200/60 backdrop-blur-md`;
    
  const eqClass = isMagic
    ? `${btnBase} bg-amber-500 text-slate-900 shadow-xl shadow-amber-500/20 hover:bg-amber-400 border-none`
    : `${btnBase} bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800 border-none`;

  const displayClass = isMagic ? "text-amber-100" : "text-slate-900";
  const equationClass = isMagic ? "text-purple-300" : "text-slate-400";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative z-10 backdrop-blur-xl border rounded-[40px] p-8 shadow-2xl w-full max-w-sm mx-auto ${isMagic ? 'bg-indigo-950/40 border-white/10 shadow-purple-900/20' : 'bg-white/30 border-white/60 shadow-blue-100'}`}
    >
      <div className="mb-6 text-right px-4">
        <div className={`h-4 ${equationClass} text-xs font-medium tracking-wider mb-1`}>{equation}</div>
        <div className={`text-5xl font-display font-light ${displayClass} tracking-tighter truncate`}>
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${opClass} col-span-2 ${isMagic ? 'text-amber-400' : 'text-red-500'}`}>AC</button>
        <button onClick={() => handleOperator('/')} className={opClass}><Divide size={20} /></button>
        <button onClick={() => handleOperator('*')} className={opClass}><X size={20} /></button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={() => handleOperator('-')} className={opClass}><Minus size={20} /></button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={() => handleOperator('+')} className={opClass}><Plus size={20} /></button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNumber(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={calculate} className={`${eqClass} row-span-2`}><Equal size={24} /></button>
        
        <button onClick={() => handleNumber('0')} className={`${btnClass} col-span-2`}>0</button>
        <button onClick={() => handleNumber('.')} className={btnClass}>.</button>
      </div>
    </motion.div>
  );
};

const LoginView = ({ onLogin, theme }: { onLogin: (name: string) => void, theme: 'winter' | 'magic' }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const isMagic = theme === 'magic';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && password.trim()) {
      onLogin(name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full max-w-md p-10 rounded-[3rem] backdrop-blur-2xl border shadow-2xl relative z-10 
        ${isMagic ? 'bg-indigo-950/40 border-white/10 shadow-purple-900/30' : 'bg-white/40 border-white/60 shadow-blue-100'}`}
    >
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-6 shadow-lg 
          ${isMagic ? 'bg-amber-500 shadow-amber-500/20' : 'bg-slate-900 shadow-slate-900/20'}`}>
          {isMagic ? <Sparkles size={32} className="text-indigo-950" /> : <Snowflake size={32} className="text-white" />}
        </div>
        <h2 className={`text-4xl font-display font-light mb-2 ${isMagic ? 'text-amber-100' : 'text-slate-900'}`}>
          {isMagic ? 'Arcane Entry' : 'Winter Welcome'}
        </h2>
        <p className={`text-xs font-bold uppercase tracking-[0.3em] ${isMagic ? 'text-amber-300/60' : 'text-slate-400'}`}>
          Identify Yourself
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className={`text-[10px] font-bold uppercase tracking-widest pl-4 ${isMagic ? 'text-amber-200/50' : 'text-slate-400'}`}>
            What is your name?
          </label>
          <div className="relative group">
            <User size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 
              ${isMagic ? 'text-amber-200/30 group-focus-within:text-amber-400' : 'text-slate-400 group-focus-within:text-slate-900'}`} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className={`w-full pl-14 pr-6 py-5 rounded-2xl border transition-all duration-300 outline-none font-medium
                ${isMagic 
                  ? 'bg-purple-900/20 border-white/10 text-amber-100 placeholder:text-amber-200/20 focus:border-amber-500/50' 
                  : 'bg-white/50 border-white/60 text-slate-900 placeholder:text-slate-400 focus:border-slate-300'}`}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`text-[10px] font-bold uppercase tracking-widest pl-4 ${isMagic ? 'text-amber-200/50' : 'text-slate-400'}`}>
            Secret Password
          </label>
          <div className="relative group">
            <Lock size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 
              ${isMagic ? 'text-amber-200/30 group-focus-within:text-amber-400' : 'text-slate-400 group-focus-within:text-slate-900'}`} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full pl-14 pr-6 py-5 rounded-2xl border transition-all duration-300 outline-none font-medium
                ${isMagic 
                  ? 'bg-purple-900/20 border-white/10 text-amber-100 placeholder:text-amber-200/20 focus:border-amber-500/50' 
                  : 'bg-white/50 border-white/60 text-slate-900 placeholder:text-slate-400 focus:border-slate-300'}`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 group
            ${isMagic 
              ? 'bg-amber-500 text-indigo-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20' 
              : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20'}`}
        >
          Enter the World <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'greeting' | 'calculator'>('greeting');
  const [theme, setTheme] = useState<'winter' | 'magic'>('winter');
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const isMagic = theme === 'magic';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-sans selection:bg-blue-100 transition-all duration-1000 relative overflow-hidden ${isMagic ? 'bg-indigo-950' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'}`}>
      {isMagic ? <MagicBackground /> : <Snowflakes />}
      
      {/* Decorative Orbs */}
      {!isMagic && (
        <>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-slate-200/30 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      {/* Primary Navigation & Theme Switcher */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        {isLoggedIn && (
          <div className="p-1 bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl flex gap-1">
            <button 
              onClick={() => setView('greeting')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all ${view === 'greeting' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Home size={12} /> Greeting
            </button>
            <button 
              onClick={() => setView('calculator')}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all ${view === 'calculator' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Calculator size={12} /> Calculator
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            onClick={() => setTheme(isMagic ? 'winter' : 'magic')}
            className={`group flex items-center gap-3 px-6 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-500 ${isMagic ? 'bg-amber-400/10 border-amber-400/30 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : 'bg-blue-900/10 border-blue-900/10 text-blue-900 hover:bg-blue-900/20'}`}
          >
            {isMagic ? (
              <>
                <Snowflake size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Winter Mode</span>
              </>
            ) : (
              <>
                <Wand2 size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Magic Mode</span>
              </>
            )}
          </button>

          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className={`flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-xl border transition-all duration-500 ${isMagic ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      <main className="relative z-10 w-full max-w-4xl py-20 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <LoginView onLogin={handleLogin} theme={theme} key="login" />
          ) : view === 'greeting' ? (
            <motion.div
              key="greeting-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center gap-12"
            >
              {/* Magic Image Frame (Only in Magic Mode) */}
              <AnimatePresence>
                {isMagic && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-indigo-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=800" 
                        alt="Magical Cat" 
                        className="w-full h-80 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/40">
                          <Sparkles size={14} className="text-indigo-950" />
                        </div>
                        <span className="text-amber-100 text-[10px] font-bold tracking-[0.3em] uppercase">Gattus Magus</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {isReady && (
                    <motion.div
                      key={currentLang.code}
                      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center"
                    >
                      <h1 className={`font-display text-7xl md:text-8xl font-light tracking-tight mb-4 ${isMagic ? 'text-amber-100 drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'text-slate-900'}`}>
                        {currentLang.greeting}, <span className="font-medium">{userName}</span>
                      </h1>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isMagic ? 0.7 : 0.5 }}
                        transition={{ delay: 0.4 }}
                        className={`font-medium uppercase tracking-[0.2em] text-xs ${isMagic ? 'text-amber-300' : 'text-slate-500'}`}
                      >
                        {currentLang.name}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 flex flex-wrap justify-center gap-3">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang)}
                      className={`
                        relative px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300
                        ${currentLang.code === lang.code 
                          ? (isMagic ? 'bg-amber-500 text-indigo-950' : 'bg-slate-900 text-white shadow-xl shadow-slate-200')
                          : (isMagic ? 'bg-indigo-900/40 text-amber-200/60 border border-white/10 hover:bg-indigo-800/60' : 'bg-white/40 text-slate-500 hover:bg-white/60 backdrop-blur-sm border border-white/50 hover:border-white')}
                      `}
                    >
                      {lang.label}
                      {currentLang.code === lang.code && (
                        <motion.div
                          layoutId="active-pill"
                          className={`absolute inset-0 rounded-full -z-10 ${isMagic ? 'bg-amber-500' : 'bg-slate-900'}`}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calc-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full"
            >
              <WinterCalculator theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-10 left-0 right-0 text-center">
        <p className={`text-[9px] font-bold uppercase tracking-[0.5em] ${isMagic ? 'text-amber-200/30' : 'text-slate-300'}`}>
          {isMagic ? 'Arcane Minimalist' : 'Winter Minimal'} &bull; Est. 2026
        </p>
      </footer>
    </div>
  );
}
