import { motion } from 'framer-motion';
import { Zap, Database, BarChart3, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Instant Sync",
    desc: "Google Apps Script exports JSON via GitHub Actions. Your sheets update your dashboard in seconds."
  },
  {
    icon: Database,
    title: "Real-Time Tables",
    desc: "Built with TanStack Table. Sort, filter, paginate — all backed by live Supabase data."
  },
  {
    icon: BarChart3,
    title: "Beautiful Dashboards",
    desc: "Transform raw sheets into stunning visual dashboards with metrics and charts."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    desc: "Share live views with your team. Role-based access and real-time collaboration."
  },
  {
    icon: Clock,
    title: "Scheduled Updates",
    desc: "Set hourly, daily, or weekly syncs. Never miss a beat with automatic refreshes."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Row-level security, audit logs, and SOC2 compliance. Your data stays protected."
  }
];

export default function Features() {
  return (
    <div id="features" className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <div className="text-purple-400 text-sm font-semibold tracking-[3px] mb-3">POWERFUL FEATURES</div>
        <h2 className="text-5xl font-bold tracking-tight mb-4">Everything you need to<br />bring sheets to life</h2>
        <p className="max-w-md mx-auto text-xl text-slate-400">
          Connect your Google Sheets and get a beautiful, interactive dashboard in minutes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group glass p-8 rounded-3xl hover:border-white/30 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
