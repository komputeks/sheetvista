import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Sales, TechNova",
    content: "SheetVista completely transformed how our team works with data. Our sales pipeline is now always accurate and visible to everyone.",
    rating: 5,
    company: "TechNova",
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Director, Global Dynamics",
    content: "The Google Sheets → GitHub → Supabase pipeline is genius. We sync our inventory data hourly without any manual work.",
    rating: 5,
    company: "Global Dynamics",
  },
  {
    name: "Priya Patel",
    role: "Data Analyst, Stellar Labs",
    content: "The TanStack table is incredibly fast even with 10k+ rows. Filtering and sorting feel instantaneous. Best dashboard tool we've used.",
    rating: 5,
    company: "Stellar Labs",
  },
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
      <div className="text-center mb-16">
        <div className="text-purple-400 text-sm font-semibold tracking-[3px] mb-3">LOVED BY TEAMS</div>
        <h2 className="text-5xl font-bold tracking-tight mb-4">Real results from real teams</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl flex flex-col"
          >
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, j) => (
                <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-lg leading-relaxed mb-8 flex-1">
              "{testimonial.content}"
            </blockquote>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-slate-400">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
