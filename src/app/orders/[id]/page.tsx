'use client';

import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrackingTimeline } from '@/components/dashboard/TrackingTimeline';
import { getOrderById, type OrderItem } from '@/data/orders';
import { CUSTOMERS } from '@/data/customers';
import { PROVIDERS } from '@/data/providers';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const order = getOrderById(orderId);
  
  if (!order) {
    notFound();
  }
  
  const customer = CUSTOMERS.find((c) => c.id === order.customerId);
  const provider = PROVIDERS.find((p) => p.id === order.providerId);
  
  return (
    <main>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-stock-dim hover:text-stock transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
        
        {/* Order Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stock">
                Order {order.id}
              </h1>
              <p className="text-stock-dim mt-1">
                {customer?.name} · {customer?.company}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-stock-dim">
                {format(new Date(order.createdAt), 'dd MMM yyyy')}
              </span>
              <span className="px-3 py-1 bg-signal/20 text-signal rounded-full text-sm font-medium border border-signal/30">
                {order.status}
              </span>
            </div>
          </div>
        </div>
        
        {/* Order Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Items */}
          <div className="lg:col-span-2 bg-ink-raised border border-ink-line rounded-lg p-6">
            <h3 className="font-semibold text-stock mb-4">Order Items</h3>
            
            <div className="space-y-3">
              {order.items.map((item: OrderItem) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-ink-line last:border-0">
                  <div>
                    <p className="font-medium text-stock">{item.name}</p>
                    <p className="text-sm text-stock-dim">
                      {item.quantity} × R{item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-mono text-stock">
                    R{item.total.toFixed(2)}
                  </p>
                </div>
              ))}
              
              <div className="flex items-center justify-between pt-3 border-t border-ink-line">
                <p className="font-semibold text-stock">Total</p>
                <p className="font-bold text-lg text-stock">
                  R{order.total.toFixed(2)}
                </p>
              </div>
            </div>
            
            {order.specialInstructions && (
              <div className="mt-4 p-3 bg-ink rounded-lg border border-ink-line">
                <p className="text-sm text-stock-dim">
                  📝 {order.specialInstructions}
                </p>
              </div>
            )}
          </div>
          
          {/* Provider & Delivery */}
          <div className="bg-ink-raised border border-ink-line rounded-lg p-6">
            <h3 className="font-semibold text-stock mb-4">Provider</h3>
            
            {provider && (
              <div className="mb-4 p-3 bg-ink rounded-lg border border-ink-line">
                <p className="font-medium text-stock">{provider.name}</p>
                <p className="text-sm text-stock-dim mt-1">
                  {provider.city}, {provider.province}
                </p>
                <p className="text-sm text-stock-dim mt-1">
                  ⭐ {provider.rating} · {provider.verified ? '✅ Verified' : '⚪ Unverified'}
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-stock-dim">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{order.deliveryAddress}</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-stock-dim">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Est. Delivery: {format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}</span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-ink-line">
              <button className="w-full text-center text-signal hover:text-signal/80 transition-colors text-sm font-medium">
                Contact Provider
              </button>
            </div>
          </div>
        </div>
        
        {/* Tracking Timeline */}
        <div className="bg-ink-raised border border-ink-line rounded-lg p-6">
          <h3 className="font-semibold text-stock mb-6">
            Tracking Timeline
          </h3>
          <TrackingTimeline order={order} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}