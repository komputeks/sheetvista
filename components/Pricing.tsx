import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "/mo",
    desc: "Perfect for trying it out",
    features: [
      "Up to 100 rows",
      "Manual sync",
      "Basic table features",
      "Email support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    period: "/mo",
    desc: "For growing teams",
    features: [
      "Unlimited rows",
      "Auto hourly sync",
      "Advanced filters & sorting",
      "Team sharing (5 seats)",
      "Priority support",
      "Export to CSV/Excel",
    ],
    cta: "Start 14-day Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "99",
    period: "/mo",
    desc: "For large organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML",
      "Audit logs",
      "Dedicated success manager",
      "Custom integrations",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
      <div className="text-center mb-16">
        <div className="text-purple-400 text-sm font-semibold tracking-[3px] mb-3">PRICING</div>
        <h2 className="text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
        <p className="text-xl text-slate-400">Start free. Upgrade as you grow.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-3xl p-8 flex flex-col relative ${plan.popular ? 'ring-2 ring-purple-500 scale-[1.02]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-purple-500 text-xs font-semibold tracking-widest">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-8">
              <div className="text-2xl font-semibold mb-2">{plan.name}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-bold tracking-tighter">${plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <p className="text-slate-400 mt-3">{plan.desc}</p>
            </div>

            <ul className="space-y-4 flex-1 mb-8">
              {plan.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const demo = document.getElementById('demo');
                demo?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-full py-4 rounded-2xl font-semibold transition-all ${
                plan.popular 
                  ? 'bg-white text-slate-950 hover:bg-white/90' 
                  : 'border border-white/20 hover:bg-white/5'
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-xs text-slate-500 mt-8">
        All plans include 99.9% uptime SLA • Cancel anytime • Secure checkout
      </p>
    </div>
  );
}
