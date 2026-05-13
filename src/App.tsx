import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Cat, 
  UtensilsCrossed, 
  Cake as CakeIcon, 
  LogOut, 
  ShoppingCart, 
  Plus, 
  Minus, 
  User, 
  Lock,
  ChevronRight,
  Utensils
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'comida' | 'bebidas' | 'postres';
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

// --- Data ---
const MENU: MenuItem[] = [
  // Bebidas
  { id: 'b1', name: 'Cat-puccino', price: 4.50, category: 'bebidas', description: 'Espresso con leche cremosa y arte latte de gato.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400' },
  { id: 'b2', name: 'Meow-tcha Latte', price: 5.20, category: 'bebidas', description: 'Té verde premium con un toque dulce.', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400' },
  { id: 'b3', name: 'Chocolate Gatuno', price: 4.80, category: 'bebidas', description: 'Chocolate belga caliente con bombones en forma de huella.', image: 'https://images.unsplash.com/photo-1544787210-2213d24268e3?auto=format&fit=crop&q=80&w=400' },
  { id: 'b4', name: 'Café Americano', price: 3.50, category: 'bebidas', description: 'Cuerpo intenso y aroma profundo.', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400' },
  
  // Comida
  { id: 'c1', name: 'Sándwich Purr-fecto', price: 8.50, category: 'comida', description: 'Jamón serrano, queso brie y rúcula en pan artesanal.', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
  { id: 'c2', name: 'Bagel de Queso Crema', price: 6.00, category: 'comida', description: 'Bagel tostado con Philadelphia y salmón ahumado.', image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=400' },
  { id: 'c3', name: 'Ensalada Whiskers', price: 9.20, category: 'comida', description: 'Quinoa, aguacate, cherrys y aderezo de cítricos.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400' },
  
  // Postres
  { id: 'p1', name: 'Cheesecake de Gato', price: 5.50, category: 'postres', description: 'Tarta de queso cremosa con orejas de chocolate.', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' },
  { id: 'p2', name: 'Brownie Bigotes', price: 4.50, category: 'postres', description: 'Brownie de chocolate negro con helado de vainilla.', image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=400' },
  { id: 'p3', name: 'Galletas de Patita', price: 3.00, category: 'postres', description: 'Galletas de mantequilla decoradas a mano.', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=400' },
  { id: 'p4', name: 'Muffin de Arándanos', price: 3.80, category: 'postres', description: 'Esponjoso y lleno de fruta natural.', image: 'https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?auto=format&fit=crop&q=80&w=400' },
];

// --- Components ---

const LoginForm = ({ onLogin }: { onLogin: (name: string) => void }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

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
      className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-amber-50"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <Cat className="text-amber-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-amber-900">Catfé</h1>
        <p className="text-amber-600/60 font-medium">Inicia sesión para ordenar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-amber-900 ml-1">Nombre</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl outline-none focus:border-amber-400 transition-all text-amber-900 placeholder:text-amber-200"
              placeholder="¿Cómo te llamas?"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-amber-900 ml-1">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl outline-none focus:border-amber-400 transition-all text-amber-900 placeholder:text-amber-200"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          Entrar al Catfé <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};

const Header = ({ userName, onLogout, cartCount }: { userName: string, onLogout: () => void, cartCount: number }) => (
  <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-amber-50 z-50 px-6">
    <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
          <Cat className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold text-amber-900 tracking-tight">Catfé</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-amber-900 font-medium">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <User className="text-amber-600 w-4 h-4" />
          </div>
          Hola, {userName}
        </div>
        
        <button 
          onClick={onLogout}
          className="p-2 text-amber-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          title="Cerrar sesión"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Navbar = ({ active, onChange }: { active: string, onChange: (c: any) => void }) => {
  const categories = [
    { id: 'bebidas', label: 'Bebidas', icon: Coffee },
    { id: 'comida', label: 'Comida', icon: Utensils },
    { id: 'postres', label: 'Postres', icon: CakeIcon },
  ];

  return (
    <div className="flex gap-2 p-1 bg-amber-100/50 rounded-2xl border border-amber-100">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all
              ${isActive 
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' 
                : 'text-amber-700 hover:bg-amber-200/50'}
            `}
          >
            <Icon size={18} />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState<'comida' | 'bebidas' | 'postres'>('bebidas');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const filteredItems = useMemo(() => {
    return MENU.filter(item => item.category === category);
  }, [category]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6 selection:bg-amber-200">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
          <div className="grid grid-cols-4 gap-20 -rotate-12 translate-x-10 translate-y-10">
            {[...Array(20)].map((_, i) => (
              <Cat key={i} size={100} className="text-amber-900" />
            ))}
          </div>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-amber-950 font-sans selection:bg-amber-200 pt-32 pb-40 px-6">
      <Header userName={userName} onLogout={handleLogout} cartCount={cart.length} />

      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-bold text-amber-900 mb-2">Nuestro Menú</h2>
            <p className="text-amber-600 font-medium">Cada pedido ayuda a cuidar a nuestros gatitos 🐾</p>
          </div>
          <Navbar active={category} onChange={setCategory} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-amber-50"
              >
                <div className="h-56 relative overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-amber-900">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-amber-600/70 mb-6 leading-relaxed h-10 overflow-hidden line-clamp-2">
                    {item.description}
                  </p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full bg-amber-50 hover:bg-amber-600 text-amber-700 hover:text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    Añadir al pedido
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Cart Summary Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-6 right-6 md:left-auto md:right-10 md:w-96 z-50"
          >
            <div className="bg-amber-900 rounded-[2.5rem] p-6 shadow-2xl shadow-amber-900/40 border border-amber-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-800 rounded-2xl flex items-center justify-center relative">
                    <ShoppingCart className="text-amber-200 w-6 h-6" />
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-amber-900">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-xl uppercase tracking-tight">Tu Pedido</h4>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-amber-400 uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-amber-800/50 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm">{item.name}</span>
                      <span className="text-amber-400/60 text-xs">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-amber-800/50 rounded-xl p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-amber-700 rounded-lg text-amber-200 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-1 hover:bg-amber-700 rounded-lg text-amber-200 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-amber-500 hover:bg-amber-400 text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                Confirmar y Pagar <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 191, 36, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
