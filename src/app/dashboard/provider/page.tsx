'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ORDERS } from '@/data/orders';
import { PROVIDERS } from '@/data/providers';
import { 
  Package, CheckCircle, 
  Clock, DollarSign, Star,
  Search 
} from 'lucide-react';
import { format } from 'date-fns';

// Use first provider for demo
const DEMO_PROVIDER = PROVIDERS[0];

export default function ProviderDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Get orders for this provider
  const providerOrders = ORDERS.filter(order => order.providerId === DEMO_PROVIDER.id);
  
  const stats = {
    total: providerOrders.length,
    completed: providerOrders.filter(o => o.status === 'completed').length,
    inProgress: providerOrders.filter(o => o.status === 'in-progress' || o.status === 'confirmed').length,
    pending: providerOrders.filter(o => o.status === 'pending').length,
    revenue: providerOrders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0),
    rating: 4.8,
  };

  const filteredOrders = providerOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const recentOrders = filteredOrders.slice(0, 10);

  return (
    <ProtectedRoute allowedRoles={['provider']}>
      <main>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stock">
              Provider Dashboard
            </h1>
            <p className="text-stock-dim mt-1">
              {DEMO_PROVIDER.name} · {DEMO_PROVIDER.city}, {DEMO_PROVIDER.province}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-stock-dim">
                <Package className="h-4 w-4" />
                <span className="text-sm">Total Orders</span>
              </div>
              <p className="text-2xl font-bold text-stock mt-1">{stats.total}</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-confirmed">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Completed</span>
              </div>
              <p className="text-2xl font-bold text-confirmed mt-1">{stats.completed}</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-signal">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-signal mt-1">R{stats.revenue.toFixed(0)}</p>
            </div>

            <div className="bg-ink-raised border border-ink-line rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="h-4 w-4" />
                <span className="text-sm">Rating</span>
              </div>
              <p className="text-2xl font-bold text-yellow-500 mt-1">{stats.rating} ★</p>
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-stock">
                Recent Orders
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-board" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-ink-line rounded-lg bg-ink-raised text-stock placeholder-stock-dim focus:outline-none focus:ring-2 focus:ring-signal/50 w-full sm:w-48"
                  />
                </div>
                
                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-ink-line rounded-lg bg-ink-raised text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map(order => {
                  return (
                    <div key={order.id} className="bg-ink-raised border border-ink-line rounded-lg p-4 hover:border-signal transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm text-stock-dim">
                              {order.id}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full border ${
                              order.status === 'completed' ? 'bg-confirmed/20 text-confirmed border-confirmed/30' :
                              order.status === 'in-progress' ? 'bg-signal/20 text-signal border-signal/30' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                              'bg-blue-500/20 text-blue-500 border-blue-500/30'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="font-medium text-stock">
                            {order.items.map(item => item.name).join(' + ')}
                          </p>
                          <p className="text-sm text-stock-dim mt-1">
                            {format(new Date(order.createdAt), 'dd MMM yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-stock">
                            R{order.total.toFixed(2)}
                          </p>
                          <button className="text-sm text-signal hover:text-signal/80 transition-colors">
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-board mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-stock">No orders found</h3>
                  <p className="text-stock-dim mt-1">
                    {searchTerm ? 'Try adjusting your search' : 'Orders will appear here'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}