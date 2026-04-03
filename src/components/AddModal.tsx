import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Lead {
  id?: number;
  name: string;
  company: string;
  email: string;
  value: number;
  status: string;
  region: string;
}

interface AddModalProps {
  lead?: Lead | null;
  onClose: () => void;
  onSave: (lead: Lead) => void;
}

export default function AddModal({ lead, onClose, onSave }: AddModalProps) {
  const [formData, setFormData] = useState<Lead>({
    name: '',
    company: '',
    email: '',
    value: 50000,
    status: 'New',
    region: 'North America',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        value: lead.value,
        status: lead.status,
        region: lead.region,
      });
    }
  }, [lead]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const statuses = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Closed-Won', 'Closed-Lost'];
  const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass w-full max-w-lg rounded-3xl p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-semibold mb-6">
          {lead?.id ? 'Edit Lead' : 'Add New Lead'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-400 block mb-2">Lead Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Alex Rivera"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Company</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Value ($)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                placeholder="50000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 block mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="alex@acmecorp.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Region</label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-white/20 hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:brightness-110 transition"
            >
              {lead?.id ? 'Save Changes' : 'Add Lead'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
