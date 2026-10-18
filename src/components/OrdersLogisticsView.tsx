import React from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  Truck,
  Scissors,
  CheckCircle2,
  Clock,
  Ruler,
  ShieldCheck,
} from 'lucide-react';

export const OrdersLogisticsView: React.FC = () => {
  const { orders, showNotification } = useApp();

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 bg-white font-['Nunito']">
      {/* Header */}
      <div className="border-b border-[#E2DDD5] pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#5E8276] uppercase tracking-wider font-['Fredoka']">
            Pelacakan pesanan
          </span>
          <span className="text-xs text-stone-400">·</span>
          <span className="text-xs text-[#7E867F]">          Penjemputan dan rework</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#46534D] font-['Fredoka']">
          Pesanan & Pengiriman Upcycling
        </h1>
        <p className="text-xs text-[#7E867F] mt-1 max-w-2xl font-medium">
          Lacak pakaian dari penjemputan hingga selesai dijahit dan diantar kembali.
        </p>

      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const currentIndex = getStageIndex(order.status);

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                    <span className="font-mono font-bold text-stone-900">{order.orderCode}</span>
                    <span>·</span>
                    <span>{order.createdAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{order.concept.title}</h3>
                  <p className="text-xs text-stone-600">
                    Penjahit: <strong className="text-stone-900">{order.tailorWorkshop}</strong> ({order.tailorName})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                    Total Pembayaran
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
                    Rp {order.totalPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-end gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> Termasuk Ongkir Driver
                  </span>
                </div>
              </div>

              {/* 5-Stage Visual Stepper */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Status Alur Pengiriman & Pengerjaan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {stages.map((st, idx) => {
                    const isPassed = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;
                    const IconComp = st.icon;

                    return (
                      <div
                        key={st.key}
                        className={`p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? 'border-[#1B4332] bg-emerald-50/50 shadow-xs ring-1 ring-[#1B4332]'
                            : isPassed
                            ? 'border-emerald-200 bg-emerald-50/20 text-stone-700'
                            : 'border-stone-200 bg-stone-50/50 text-stone-400 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <IconComp
                            className={`w-4 h-4 ${
                              isCurrent
                                ? 'text-[#1B4332]'
                                : isPassed
                                ? 'text-emerald-700'
                                : 'text-stone-400'
                            }`}
                          />
                          {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        </div>
                        <span className="text-xs font-bold block text-stone-900">{st.label}</span>
                        <p className="text-[10px] text-stone-500 mt-1 leading-snug">{st.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs text-stone-600">
                Kurir: <strong>{order.driverName}</strong> (Kontak: {order.driverPhone})
              </div>

              {/* Specification Details & Audit History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100 text-xs">
                {/* Measurements & Specs */}
                <div className="bg-[#FBFBF9] p-4 rounded-xl border border-stone-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-stone-600 block flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#1B4332]" />
                    Ukuran Tubuh Terlampir ke Penjahit:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                    <div>TB: {order.measurements.height} cm</div>
                    <div>BB: {order.measurements.weight} kg</div>
                    <div>Lingkar Dada: {order.measurements.chest} cm</div>
                    <div>Lingkar Pinggang: {order.measurements.waist} cm</div>
                    <div>Lingkar Paha: {order.measurements.thigh} cm</div>
                    <div>Profil: {order.concept.fitProfile}</div>
                  </div>
                  <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                    <strong>Alamat Jemput:</strong> {order.userAddress}
                  </div>
                </div>

                {/* Audit Timeline History */}
                <div className="bg-[#FBFBF9] p-4 rounded-xl border border-stone-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-stone-600 block">
                    Riwayat Aktivitas Logistik:
                  </span>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {order.statusHistory.map((item, idx) => (
                      <div key={idx} className="text-[11px] space-y-0.5 border-b border-stone-200 pb-1.5 last:border-0">
                        <div className="flex items-center justify-between text-stone-400">
                          <span>{item.timestamp}</span>
                          <span className="font-semibold text-stone-600">{item.actor}</span>
                        </div>
                        <p className="text-stone-800">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
