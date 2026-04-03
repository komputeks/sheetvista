import { Zap, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-3xl font-bold tracking-tight">SheetVista</span>
          </div>
          
          <p className="text-slate-400 max-w-sm mb-8">
            Turn your Google Sheets into beautiful, real-time dashboards. 
            Powered by GitHub Actions, TanStack Table, and Supabase.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition"><Github className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="font-semibold mb-4 text-sm tracking-widest">PRODUCT</div>
          <div className="space-y-3 text-slate-400">
            <a href="#features" className="block hover:text-white transition">Features</a>
            <a href="#demo" className="block hover:text-white transition">Live Demo</a>
            <a href="#how" className="block hover:text-white transition">How it Works</a>
            <a href="#pricing" className="block hover:text-white transition">Pricing</a>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="font-semibold mb-4 text-sm tracking-widest">COMPANY</div>
          <div className="space-y-3 text-slate-400">
            <a href="#" className="block hover:text-white transition">About</a>
            <a href="#" className="block hover:text-white transition">Blog</a>
            <a href="#" className="block hover:text-white transition">Careers</a>
            <a href="#" className="block hover:text-white transition">Contact</a>
          </div>
          
          <div className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} SheetVista Inc. All rights reserved.<br />
            Built with React 19, TanStack Table, and Supabase.
          </div>
        </div>
      </div>
    </footer>
  );
}
