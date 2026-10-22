import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import {
  Truck,
  Scissors,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';

export const OrdersLogisticsView: React.FC = () => {
  const { orders, showNotification } = useApp();
  const [filter, setFilter] = useState<'all' | 'process' | 'delivery' | 'completed'>('all');

  const stages: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
    {
      key: 'pickup_scheduled',
      label: '1. Jadwal Pick-up',
      icon: Clock,
      desc: 'Driver ditugaskan menjemput bahan baju bekas dari pemesan',
    },
    {
      key: 'with_driver_pickup',
      label: '2. Bahan Diantar Driver',
      icon: Truck,
      desc: 'Driver mengambil bahan dan menuju workshop penjahit',
    },
    {
      key: 'tailor_working',
      label: '3. Proses Jahit Penjahit',
      icon: Scissors,
      desc: 'Bahan tiba di penjahit, proses pola & jahit dimulai',
    },
    {
      key: 'with_driver_delivery',
      label: '4. Driver Mengantar Hasil',
      icon: Truck,
      desc: 'Baju upcycle selesai dan sedang diantar driver ke pemesan',
    },
    {
      key: 'completed',
      label: '5. Selesai Diterima',
      icon: CheckCircle2,
      desc: 'Baju baru hasil upcycling diterima oleh pemesan',
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pickup_scheduled':
        return 0;
      case 'with_driver_pickup':
        return 1;
      case 'tailor_working':
        return 2;
      case 'with_driver_delivery':
        return 3;
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  const getOrderStatusLabel = (status: OrderStatus) => {
    if (status === 'completed') return 'Selesai';
    if (status === 'with_driver_delivery') return 'Sedang dikirim';
    return 'Sedang diproses';
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'completed') return order.status === 'completed';
    if (filter === 'delivery') return order.status === 'with_driver_delivery';
    if (filter === 'process') return order.status !== 'completed' && order.status !== 'with_driver_delivery';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 bg-[#F5F5F5] font-['Nunito']">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#5E8276] uppercase tracking-wider font-['Fredoka']">
            Pusat pesanan
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-[#7E867F]">Penjemputan dan rework</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#46534D] font-['Fredoka']">
          Pesanan Saya
        </h1>
        <p className="text-xs text-[#7E867F] mt-1 max-w-2xl font-medium">
          Pantau status, pembayaran, dan proses pesanan upcycle kamu.
        </p>
      </div>

      <nav className="grid grid-cols-4 rounded-xl border border-stone-200 bg-white text-center text-xs font-bold sm:text-sm">
        {([
          ['all', 'Semua'],
          ['process', 'Diproses'],
          ['delivery', 'Dikirim'],
          ['completed', 'Selesai'],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`border-b-2 px-2 py-3 transition ${
              filter === value
                ? 'border-emerald-700 text-emerald-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
            <PackageCheck className="mx-auto h-10 w-10 text-stone-300" />
            <p className="mt-3 font-bold text-stone-800">Belum ada pesanan di bagian ini</p>
            <p className="mt-1 text-xs text-stone-500">Pesanan upcycle kamu akan tampil di sini.</p>
          </div>
        )}
        {filteredOrders.map((order) => {
          const currentIndex = getStageIndex(order.status);

          return (
            <div
              key={order.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-5 py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-stone-900">
                    <ShoppingBag className="h-4 w-4 text-emerald-800" />
                    {order.tailorWorkshop}
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="font-mono text-stone-500">{order.orderCode}</span>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-500">{order.createdAt}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  {order.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : order.status === 'with_driver_delivery' ? (
                    <Truck className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  {getOrderStatusLabel(order.status)}
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row">
                <img
                  src={order.concept.userImageUrl || ASSET_IMAGES.denimJacket}
                  alt={order.concept.title}
                  className="h-24 w-24 shrink-0 rounded-xl border border-stone-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-stone-900">{order.concept.title}</h3>
                      <p className="mt-1 text-xs text-stone-500">
                        {order.concept.aesthetic} · Bahan: {order.concept.sourceGarment}
                      </p>
                    </div>
                    <span className="text-xs text-stone-500">1 produk</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-stone-200 pt-3 text-xs">
                    <span className="text-stone-500">Jasa jahit dan rework</span>
                    <span className="font-semibold text-stone-800">
                      Rp {order.tailorFee.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-y border-stone-100 bg-stone-50/60 px-5 py-4">
                <h4 className="mb-3 text-xs font-bold text-stone-700">Pelacakan pesanan</h4>
                <div className="grid grid-cols-5 gap-1">
                  {stages.map((stage, index) => {
                    const isPassed = index <= currentIndex;
                    const IconComp = stage.icon;
                    return (
                      <div key={stage.key} className="relative text-center">
                        {index > 0 && (
                          <span
                            className={`absolute right-1/2 top-3.5 h-0.5 w-full ${
                              index <= currentIndex ? 'bg-emerald-600' : 'bg-stone-200'
                            }`}
                          />
                        )}
                        <span
                          className={`relative mx-auto flex h-7 w-7 items-center justify-center rounded-full ${
                            isPassed ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          <IconComp className="h-3.5 w-3.5" />
                        </span>
                        <span className={`mt-1.5 block text-[9px] leading-tight sm:text-[10px] ${
                          isPassed ? 'font-bold text-emerald-900' : 'text-stone-500'
                        }`}>
                          {stage.label.replace(/^\d+\.\s*/, '')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-stone-600">
                <div>
                  <span className="font-semibold">Kurir: </span>
                  {order.driverName} · {order.driverPhone}
                  <span className="mx-2 text-stone-300">|</span>
                  <span className="font-semibold">Alamat: </span>
                  {order.userAddress || 'Belum diatur'}
                </div>
                <span className="flex items-center gap-1 text-emerald-800">
                  <ShieldCheck className="h-3.5 w-3.5" /> Termasuk ongkir
                </span>
              </div>

              <div className="flex flex-col items-start justify-between gap-3 border-t border-stone-100 px-5 py-4 sm:flex-row sm:items-center">
                <div className="text-xs">
                  <span className="text-stone-500">Metode pembayaran </span>
                  <span className="font-bold text-stone-800">{order.paymentMethod || 'Belum dipilih'}</span>
                </div>
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
                  <div className="text-right">
                    <span className="block text-[10px] text-stone-500">Total pesanan</span>
                    <span className="font-mono text-base font-bold text-emerald-800">
                      Rp {order.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    onClick={() => showNotification(`Status pesanan ${order.orderCode}: ${getOrderStatusLabel(order.status)}`, 'info')}
                    className="rounded-lg border border-emerald-700 px-3 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-50"
                  >
                    Lihat status
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
