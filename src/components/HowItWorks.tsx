import { motion } from 'framer-motion';
import { FileSpreadsheet, Github, Zap, BarChart } from 'lucide-react';

const steps = [
  {
    icon: FileSpreadsheet,
    title: "Connect Google Sheets",
    desc: "Add our Google Apps Script to your sheet. One-click setup.",
    number: "01",
  },
  {
    icon: Github,
    title: "GitHub Actions Sync",
    desc: "Automated workflow exports JSON and pushes to Supabase every hour.",
    number: "02",
  },
  {
    icon: Zap,
    title: "Instant Dashboard",
    desc: "Your live table updates automatically with beautiful TanStack Table.",
    number: "03",
  },
  {
    icon: BarChart,
    title: "Share & Collaborate",
    desc: "Invite teammates, export data, or embed your dashboard anywhere.",
    number: "04",
  },
];

export default function HowItWorks() {
  return (
    <div id="how" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-purple-400 text-sm font-semibold tracking-[3px] mb-3">HOW IT WORKS</div>
          <h2 className="text-5xl font-bold tracking-tight mb-4">From sheets to insights in minutes</h2>
          <p className="max-w-md mx-auto text-xl text-slate-400">
            Four simple steps. No code. No hassle.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="glass p-8 rounded-3xl h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="text-6xl font-bold text-white/10">{step.number}</div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
