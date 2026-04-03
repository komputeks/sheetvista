import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onDemoClick: () => void;
}

export default function Navbar({ onDemoClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Live Demo', onClick: onDemoClick },
    { label: 'How it Works', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SheetVista</span>
          </div>
          <div className="hidden md:block text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            LIVE
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            link.onClick ? (
              <button
                key={i}
                onClick={link.onClick}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={i}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onDemoClick}
            className="hidden md:block px-5 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/5 transition-all"
          >
            Try Demo
          </button>
          <button
            onClick={onDemoClick}
            className="px-6 py-2 rounded-full bg-white text-slate-950 text-sm font-semibold hover:bg-white/90 transition-all flex items-center gap-2"
          >
            Get Started Free
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-white/10 bg-slate-950/95"
        >
          <div className="px-6 py-8 flex flex-col gap-4">
            {navLinks.map((link, i) => (
              link.onClick ? (
                <button
                  key={i}
                  onClick={() => { link.onClick(); setIsOpen(false); }}
                  className="text-left text-lg font-medium text-slate-300 hover:text-white py-2"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-white py-2"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
