import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, TrendingUp } from 'lucide-react';

interface HeroProps {
  onDemoClick: () => void;
}

export default function Hero({ onDemoClick }: HeroProps) {
  return (
    <div className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e2937_0.8px,transparent_1px)] bg-[length:4px_4px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black"></div>
      
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-400">Now syncing live from Google Sheets</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            Turn Google Sheets<br />into <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Live Dashboards</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-xl mb-10">
            Sync your Google Sheets data automatically via GitHub Actions. 
            Beautiful real-time tables, charts, and insights — no code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={onDemoClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-white text-slate-950 font-semibold text-lg hover:bg-white/90 transition-all"
            >
              Explore Live Demo
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </motion.button>
            
            <motion.button
              onClick={onDemoClick}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-3 px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/5 transition-all text-lg"
            >
              <Play className="w-5 h-5" />
              Watch 2 min Demo
            </motion.button>
          </div>

          <div className="flex items-center gap-8 mt-12 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>12,400+ teams</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>99.9% uptime</span>
            </div>
            <div>Trusted by Fortune 500</div>
          </div>
        </div>
      </div>

      {/* Floating dashboard preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-[-10%] right-[-5%] hidden xl:block w-[600px] h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-slate-500">Sales Pipeline • Live from Sheets</div>
          </div>
          
          <div className="bg-slate-950/90 rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-3 text-xs mb-3 text-slate-400">
              <div>Name</div>
              <div>Company</div>
              <div>Value</div>
              <div>Status</div>
              <div>Region</div>
            </div>
            {[1,2,3,4].map(i => (
              <div key={i} className="grid grid-cols-5 gap-3 py-3 border-t border-white/10 text-sm">
                <div className="text-white">Sarah K.</div>
                <div className="text-slate-400">Vanguard Inc</div>
                <div className="text-emerald-400">$87,500</div>
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">Qualified</div>
                <div className="text-slate-400">North America</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
