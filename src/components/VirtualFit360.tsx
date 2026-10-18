import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UpcycleConcept, BodyMeasurements } from '../types';
import { RotateCw, ArrowLeft, ArrowRight, Ruler, Scissors } from 'lucide-react';

interface VirtualFit360Props {
  concept?: UpcycleConcept;
  onProceedToTailor?: () => void;
}

export const VirtualFit360: React.FC<VirtualFit360Props> = ({ concept, onProceedToTailor }) => {
  const { currentUser, currentDesign, updateMeasurements, setActiveTab } = useApp();
  const activeConcept = concept || currentDesign;

  const [angle, setAngle] = useState<number>(0);
  const [measurements, setMeasurements] = useState<BodyMeasurements>(currentUser.measurements);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const dragPointerId = useRef<number | null>(null);
  const previousPointerX = useRef(0);

  React.useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 5) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleMeasurementChange = (key: keyof BodyMeasurements, val: number) => {
    const updated = { ...measurements, [key]: val };
    setMeasurements(updated);
    updateMeasurements({ [key]: val });
  };

  const handleRotationPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragPointerId.current = event.pointerId;
    previousPointerX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsAutoRotating(false);
  };

  const handleRotationPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;

    const movement = event.clientX - previousPointerX.current;
    previousPointerX.current = event.clientX;
    setAngle((prev) => (Math.round(prev + movement) + 360) % 360);
  };

  const handleRotationPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragPointerId.current !== event.pointerId) return;
    dragPointerId.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const heightRatio = Math.max(0.85, Math.min(1.2, measurements.height / 170));
  const chestRatio = Math.max(0.85, Math.min(1.3, measurements.chest / 90));
  const waistRatio = Math.max(0.85, Math.min(1.35, measurements.waist / 75));

  const normalizedAngle = ((angle % 360) + 360) % 360;
  const viewScaleX = Math.max(0.45, Math.abs(Math.cos((normalizedAngle * Math.PI) / 180)));
  let viewName = 'Tampak Depan (0°)';
  if (normalizedAngle >= 45 && normalizedAngle < 135) viewName = 'Tampak Samping Kanan (90°)';
  else if (normalizedAngle >= 135 && normalizedAngle < 225) viewName = 'Tampak Belakang (180°)';
  else if (normalizedAngle >= 225 && normalizedAngle < 315) viewName = 'Tampak Samping Kiri (270°)';

  const bmi = measurements.weight / Math.pow(measurements.height / 100, 2);
  let fitType: 'Relaxed Fit' | 'Regular Fit' | 'Slim Fit' = 'Regular Fit';
  let fitDescription = 'Siluet pas proporsional dengan kelonggaran standar 6-8 cm untuk kenyamanan gerak sehari-hari.';

  if (activeConcept.fitProfile === 'Relaxed Fit' || bmi > 24) {
    fitType = 'Relaxed Fit';
    fitDescription = 'Potongan santai drop-shoulder dengan kelonggaran ekstra 10-12 cm, sangat nyaman dan kekinian.';
  } else if (activeConcept.fitProfile === 'Slim Fit' || bmi < 20) {
    fitType = 'Slim Fit';
    fitDescription = 'Potongan rapi mengikuti bentuk tubuh dengan kelonggaran minimal 3-5 cm untuk siluet anggun.';
  }

  const primaryColor = activeConcept.previewColorPrimary || '#2C4C64';
  const accentColor = activeConcept.previewColorAccent || '#D97706';

  return (
    <div className="bg-white rounded-3xl border-3 border-[#F0E6D2] overflow-hidden shadow-sm">
      {/* Cute Top Banner */}
      <div className="px-6 py-4 border-b-2 border-[#F0E6D2] bg-gradient-to-r from-[#FFE5EC] via-[#FFF3B0] to-[#D8F3DC] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-['Fredoka'] text-sm font-bold text-[#E05780]">
              Virtual Fit 360°
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="font-['Fredoka'] text-xs text-stone-700">{activeConcept.title}</span>
          </div>
          <p className="text-xs text-stone-600 font-['Quicksand'] font-semibold mt-0.5">
            Sesuaikan ukuran tubuh dan lihat simulasi pakaian dari berbagai sudut.
          </p>
        </div>

        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`px-4 py-2 text-xs font-['Fredoka'] font-bold rounded-2xl border-2 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
            isAutoRotating
              ? 'bg-[#E05780] text-white border-[#B82B56]'
              : 'bg-white text-stone-800 border-stone-300 hover:bg-[#FFE5EC]'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span>{isAutoRotating ? 'Hentikan putar' : 'Putar 360° otomatis'}</span>
        </button>
      </div>

      {/* Main Grid: 360 Canvas Left + Measurement Controls Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x-2 divide-[#F0E6D2]">
        {/* 360 Interactive Canvas */}
        <div className="lg:col-span-7 p-6 flex flex-col items-center justify-between bg-gradient-to-b from-[#FFFDF7] to-white min-h-[460px]">
          <div className="w-full flex items-center justify-between text-xs text-stone-600 mb-2">
            <div className="flex items-center gap-1.5 font-bold font-['Fredoka'] text-[#2D6A4F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse"></span>
              <span>{viewName}</span>
            </div>
            <span className="font-mono tabular-nums text-stone-700 font-bold bg-[#FFF3B0] px-2 py-0.5 rounded-lg border border-[#FDE047]">
              {angle}° / 360°
            </span>
          </div>

          {/* Draggable mannequin preview */}
          <div
            className="relative my-auto flex aspect-[4/3] w-full max-w-[440px] select-none items-center justify-center overflow-hidden rounded-3xl border border-[#D8D2C7] bg-gradient-to-b from-[#F5F3EE] to-white shadow-inner touch-pan-y cursor-grab active:cursor-grabbing"
            onPointerDown={handleRotationPointerDown}
            onPointerMove={handleRotationPointerMove}
            onPointerUp={handleRotationPointerEnd}
            onPointerCancel={handleRotationPointerEnd}
            aria-label="Mannequin Virtual Fit 360 derajat. Geser untuk memutar."
          >
            <svg
              viewBox="0 0 300 400"
              role="img"
              aria-label={`Mannequin mengenakan ${activeConcept.title}`}
              className="h-full w-full max-w-[340px] drop-shadow-md"
              style={{
                transform: `scale(${viewScaleX * ((chestRatio + waistRatio) / 2)}, ${heightRatio})`,
                transformOrigin: 'center',
                transition: isAutoRotating ? 'transform 120ms linear' : 'transform 200ms ease-out',
              }}
            >
              <defs>
                <linearGradient id="mannequin-surface" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F5E7D8" />
                  <stop offset="55%" stopColor="#E8D6C4" />
                  <stop offset="100%" stopColor="#D8C2AD" />
                </linearGradient>
                <linearGradient id="garment-surface" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={primaryColor} />
                  <stop offset="50%" stopColor={primaryColor} />
                  <stop offset="100%" stopColor="#172E40" />
                </linearGradient>
              </defs>

              <ellipse cx="150" cy="374" rx="58" ry="10" fill="#D8D2C7" opacity="0.55" />

              <g fill="url(#mannequin-surface)" stroke="#C9B49F" strokeWidth="1.5">
                <path d="M137 60 L137 80 Q121 83 111 94 L96 151 Q91 167 99 171 Q107 174 112 159 L126 121 L124 198 L127 287 L132 354 Q133 365 143 365 Q151 365 151 354 L153 293 L158 354 Q159 365 168 365 Q178 365 177 354 L175 286 L176 198 L174 121 L188 159 Q193 174 202 171 Q210 167 204 151 L189 94 Q179 83 163 80 L163 60 Z" />
                <ellipse cx="150" cy="41" rx="21" ry="27" />
                <path d="M140 64 L140 83 L160 83 L160 64 Z" />
              </g>
              <path d="M145 14 Q150 10 155 14 L155 23 L145 23 Z" fill="#B9A48F" />
              <path d="M136 82 Q150 88 164 82" fill="none" stroke="#C9B49F" strokeWidth="1.5" />

              {/* FRONT VIEW (315° - 45°) */}
              {(normalizedAngle < 45 || normalizedAngle >= 315) && (
                <g className="transition-all duration-300">
                  <path
                    d={`
                      M 125,82
                      Q 150,96 175,82
                      L ${150 + 55 * chestRatio},${90}
                      L ${150 + 68 * chestRatio},${155 * heightRatio}
                      L ${150 + 54 * waistRatio},${160 * heightRatio}
                      L ${150 + 48 * waistRatio},${230 * heightRatio}
                      L ${150 - 48 * waistRatio},${230 * heightRatio}
                      L ${150 - 54 * waistRatio},${160 * heightRatio}
                      L ${150 - 68 * chestRatio},${155 * heightRatio}
                      L ${150 - 55 * chestRatio},${90}
                      Z
                    `}
                    fill="url(#garment-surface)"
                    stroke="#1C1E1B"
                    strokeWidth="2.5"
                  />
                  {/* Patchwork Panel */}
                  <polygon
                    points={`125,84 ${150 - 50 * chestRatio},92 ${150 - 35 * chestRatio},130 140,118`}
                    fill={accentColor}
                    opacity="0.9"
                  />
                  {/* Pocket Right */}
                  <rect
                    x={150 + 12 * chestRatio}
                    y={115 * heightRatio}
                    width={28 * chestRatio}
                    height={32 * heightRatio}
                    rx="6"
                    fill="#1E293B"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  {/* Pocket Left */}
                  <rect
                    x={150 - 42 * waistRatio}
                    y={168 * heightRatio}
                    width={32 * waistRatio}
                    height={38 * heightRatio}
                    rx="6"
                    fill="#334155"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                  />
                  {/* Placket */}
                  <line
                    x1="150"
                    y1={92}
                    x2="150"
                    y2={230 * heightRatio}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Cute floral / sashiko accent */}
                  <circle cx="134" cy="95" r="3" fill="#FFF3B0" />
                  <circle cx="128" cy="108" r="3" fill="#FFF3B0" />
                </g>
              )}

              {/* RIGHT SIDE VIEW (45° - 135°) */}
              {normalizedAngle >= 45 && normalizedAngle < 135 && (
                <g className="transition-all duration-300">
                  <path
                    d={`
                      M 148,82
                      Q 175,90 178,110
                      L ${175 + 15 * chestRatio},${185 * heightRatio}
                      L ${155 + 10 * waistRatio},${230 * heightRatio}
                      L ${130 - 10 * waistRatio},${230 * heightRatio}
                      L 125,${170 * heightRatio}
                      L 128,95
                      Z
                    `}
                    fill="url(#garment-surface)"
                    stroke="#1C1E1B"
                    strokeWidth="2.5"
                  />
                  <path
                    d={`
                      M 152,90
                      C ${175 * chestRatio},110 ${180 * chestRatio},160 ${165 + 10 * waistRatio},${
                      220 * heightRatio
                    }
                      L ${148 + 5 * waistRatio},${225 * heightRatio}
                      C 155,160 148,115 142,92
                      Z
                    `}
                    fill={accentColor}
                    opacity="0.9"
                    stroke="#1C1E1B"
                    strokeWidth="2"
                  />
                </g>
              )}

              {/* BACK VIEW (135° - 225°) */}
              {normalizedAngle >= 135 && normalizedAngle < 225 && (
                <g className="transition-all duration-300">
                  <path
                    d={`
                      M 125,80
                      Q 150,84 175,80
                      L ${150 + 55 * chestRatio},${90}
                      L ${150 + 66 * chestRatio},${155 * heightRatio}
                      L ${150 + 54 * waistRatio},${160 * heightRatio}
                      L ${150 + 48 * waistRatio},${230 * heightRatio}
                      L ${150 - 48 * waistRatio},${230 * heightRatio}
                      L ${150 - 54 * waistRatio},${160 * heightRatio}
                      L ${150 - 66 * chestRatio},${155 * heightRatio}
                      L ${150 - 55 * chestRatio},${90}
                      Z
                    `}
                    fill="url(#garment-surface)"
                    stroke="#1C1E1B"
                    strokeWidth="2.5"
                  />
                  {/* Western Yoke */}
                  <path
                    d={`M ${150 - 50 * chestRatio},102 Q 150,118 ${150 + 50 * chestRatio},102 L ${
                      150 + 53 * chestRatio
                    },90 L ${150 - 53 * chestRatio},90 Z`}
                    fill={accentColor}
                    stroke="#1C1E1B"
                    strokeWidth="2"
                  />
                  <line
                    x1="150"
                    y1="82"
                    x2="150"
                    y2={230 * heightRatio}
                    stroke="#E2E8F0"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </g>
              )}

              {/* LEFT SIDE VIEW (225° - 315°) */}
              {normalizedAngle >= 225 && normalizedAngle < 315 && (
                <g className="transition-all duration-300">
                  <path
                    d={`
                      M 152,82
                      Q 125,90 122,110
                      L ${125 - 15 * chestRatio},${185 * heightRatio}
                      L ${145 - 10 * waistRatio},${230 * heightRatio}
                      L ${170 + 10 * waistRatio},${230 * heightRatio}
                      L 175,${170 * heightRatio}
                      L 172,95
                      Z
                    `}
                    fill="url(#garment-surface)"
                    stroke="#1C1E1B"
                    strokeWidth="2.5"
                  />
                  <path
                    d={`
                      M 148,90
                      C ${125 * chestRatio},110 ${120 * chestRatio},160 ${135 - 10 * waistRatio},${
                      220 * heightRatio
                    }
                      L ${152 - 5 * waistRatio},${225 * heightRatio}
                      C 145,160 152,115 158,92
                      Z
                    `}
                    fill={accentColor}
                    opacity="0.9"
                    stroke="#1C1E1B"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Slider & Presets */}
          <div className="w-full space-y-3 pt-4 border-t-2 border-[#F0E6D2]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAngle((prev) => (prev - 45 + 360) % 360)}
                className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-[#FFE5EC] border"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-[#E05780] cursor-pointer"
              />
              <button
                onClick={() => setAngle((prev) => (prev + 45) % 360)}
                className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-[#FFE5EC] border"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-['Fredoka']">
              {[
                { label: 'Depan 0°', val: 0 },
                { label: 'Kanan 90°', val: 90 },
                { label: 'Belakang 180°', val: 180 },
                { label: 'Kiri 270°', val: 270 },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => setAngle(p.val)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer ${
                    angle === p.val
                      ? 'border-[#E05780] bg-[#FFE5EC] text-[#E05780]'
                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Controls: Measurements & Fit */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#E05780]" />
                <h4 className="font-['Fredoka'] text-sm font-bold text-stone-900">
                  Proporsi Ukuran Tubuh
                </h4>
              </div>
              <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#D8F3DC] px-2 py-0.5 rounded-lg border border-[#95D5B2]">
                Satuan cm & kg
              </span>
            </div>

            <div className="space-y-4 font-['Quicksand']">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Tinggi Badan (TB)</span>
                  <span className="font-mono text-[#E05780]">{measurements.height} cm</span>
                </div>
                <input
                  type="range"
                  min="145"
                  max="195"
                  value={measurements.height}
                  onChange={(e) => handleMeasurementChange('height', Number(e.target.value))}
                  className="w-full accent-[#E05780]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Berat Badan (BB)</span>
                  <span className="font-mono text-[#E05780]">{measurements.weight} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="110"
                  value={measurements.weight}
                  onChange={(e) => handleMeasurementChange('weight', Number(e.target.value))}
                  className="w-full accent-[#E05780]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Lingkar Dada</span>
                  <span className="font-mono text-[#E05780]">{measurements.chest} cm</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="125"
                  value={measurements.chest}
                  onChange={(e) => handleMeasurementChange('chest', Number(e.target.value))}
                  className="w-full accent-[#E05780]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Lingkar Pinggang</span>
                  <span className="font-mono text-[#E05780]">{measurements.waist} cm</span>
                </div>
                <input
                  type="range"
                  min="55"
                  max="115"
                  value={measurements.waist}
                  onChange={(e) => handleMeasurementChange('waist', Number(e.target.value))}
                  className="w-full accent-[#E05780]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Lingkar Paha</span>
                  <span className="font-mono text-[#E05780]">{measurements.thigh} cm</span>
                </div>
                <input
                  type="range"
                  min="42"
                  max="80"
                  value={measurements.thigh}
                  onChange={(e) => handleMeasurementChange('thigh', Number(e.target.value))}
                  className="w-full accent-[#E05780]"
                />
              </div>
            </div>

            {/* Fit Result Card */}
            <div className="mt-5 p-4 rounded-2xl border-2 border-[#FDE047] bg-[#FFFDF0] space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-['Fredoka'] text-xs font-bold text-stone-600">
                  Rekomendasi Kecocokan Fit:
                </span>
                <span className="font-['Fredoka'] text-xs font-bold text-[#78350F] bg-[#FFF3B0] px-3 py-1 rounded-full border border-[#FDE047]">
                  {fitType}
                </span>
              </div>
              <p className="text-xs text-stone-700 font-['Quicksand'] font-semibold leading-relaxed">
                {fitDescription}
              </p>
              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-stone-500">
                <span>BMI: <strong className="text-stone-800 font-mono">{bmi.toFixed(1)}</strong></span>
                <span>Toleransi Gerak: <strong className="text-[#2D6A4F] font-mono">±2.5 cm</strong></span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                if (onProceedToTailor) {
                  onProceedToTailor();
                } else {
                  setActiveTab('tailors');
                }
              }}
              className="w-full py-3 px-4 bg-[#E05780] hover:bg-[#C93B66] text-white font-['Fredoka'] text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#B82B56]"
            >
              <Scissors className="w-4 h-4 text-amber-200" />
              <span>Lanjut pesan penjahit</span>
            </button>
            <p className="text-[10px] text-center text-stone-500 font-['Quicksand'] font-medium">
              Data ukuran tubuhmu otomatis dilampirkan langsung ke workshop penjahit mitra pilihanmu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
