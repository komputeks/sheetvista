import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, RefreshCw, Trash2, Edit2, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import AddModal from './AddModal';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  value: number;
  status: string;
  region: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  'New': 'status-new',
  'Contacted': 'status-contacted',
  'Qualified': 'status-qualified',
  'Negotiation': 'status-negotiation',
  'Closed-Won': 'status-closed-won',
  'Closed-Lost': 'status-closed-lost',
};

export default function LiveDemo() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [syncing, setSyncing] = useState(false);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredData = useMemo(() => {
    return leads.filter(lead => {
      const matchesStatus = !statusFilter || lead.status === statusFilter;
      const matchesRegion = !regionFilter || lead.region === regionFilter;
      return matchesStatus && matchesRegion;
    });
  }, [leads, statusFilter, regionFilter]);

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Lead Name',
        cell: ({ row }) => (
          <div className="font-medium text-white">{row.original.name}</div>
        ),
      },
      {
        accessorKey: 'company',
        header: 'Company',
        cell: ({ row }) => (
          <div className="text-slate-400">{row.original.company}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <div className="text-slate-400 text-sm font-mono">{row.original.email}</div>
        ),
      },
      {
        accessorKey: 'value',
        header: 'Value',
        cell: ({ row }) => (
          <div className="font-mono text-emerald-400">
            ${row.original.value.toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span className={`status-badge ${statusColors[status] || 'bg-slate-700 text-slate-300'}`}>
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ row }) => (
          <div className="text-slate-400">{row.original.region}</div>
        ),
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated',
        cell: ({ row }) => {
          const date = new Date(row.original.updated_at);
          return (
            <div className="text-xs text-slate-500">
              {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setEditingLead(row.original)}
              className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteLead(row.original.id)}
              className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const deleteLead = async (id: number) => {
    if (!confirm('Delete this lead?')) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];
    const statuses = ['New', 'Contacted', 'Qualified', 'Negotiation'];
    const companies = ['Acme Corp', 'TechNova', 'Global Dynamics', 'Vanguard Inc', 'Stellar Solutions', 'Nexus Group'];
    const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Cameron', 'Jamie'];
    const lastNames = ['Chen', 'Rodriguez', 'Kim', 'Patel', 'Thompson', 'Garcia', 'Lee', 'Johnson'];

    try {
      for (let i = 0; i < 3; i++) {
        const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        const company = companies[Math.floor(Math.random() * companies.length)];
        const email = `${name.toLowerCase().replace(' ', '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`;
        
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            company,
            email,
            value: Math.floor(Math.random() * 80000) + 20000,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
          }),
        });
      }
      fetchLeads();
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = async (lead: Omit<Lead, 'id' | 'updated_at'> & { id?: number }) => {
    try {
      if (lead.id) {
        await fetch('/api/leads', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
      } else {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
      }
      fetchLeads();
      setShowAddModal(false);
      setEditingLead(null);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const uniqueStatuses = [...new Set(leads.map(l => l.status))];
  const uniqueRegions = [...new Set(leads.map(l => l.region))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-3">
            LIVE FROM GOOGLE SHEETS
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-3">Sales Pipeline</h2>
          <p className="text-xl text-slate-400">Real-time data synced from Google Sheets via GitHub Actions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/5 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync from Sheets'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:brightness-110 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search leads, companies, emails..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-5 py-3 bg-slate-900 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-5 py-3 bg-slate-900 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value="">All Regions</option>
          {uniqueRegions.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="table-container overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b border-white/10">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-medium text-slate-400 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-slate-600">
                            {header.column.getIsSorted() === 'asc' && <ArrowUp className="w-3 h-3" />}
                            {header.column.getIsSorted() === 'desc' && <ArrowDown className="w-3 h-3" />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/10">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-white/10 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="text-4xl mb-4">📭</div>
                    <div className="text-xl font-medium mb-2">No leads found</div>
                    <p className="text-slate-400">Add your first lead or sync from Google Sheets</p>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="border-b border-white/10 hover:bg-white/5 group"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 text-sm">
          <div className="text-slate-400">
            Showing {table.getRowModel().rows.length} of {filteredData.length} leads
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/5 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="text-slate-400">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </div>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white/5 disabled:opacity-40 transition"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="bg-transparent border border-white/20 px-3 py-1 rounded-lg text-xs"
            >
              {[10, 25, 50].map(size => (
                <option key={size} value={size}>{size} rows</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {(showAddModal || editingLead) && (
          <AddModal
            lead={editingLead}
            onClose={() => { setShowAddModal(false); setEditingLead(null); }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
