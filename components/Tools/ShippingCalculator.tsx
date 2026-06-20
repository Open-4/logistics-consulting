/**
 * @file Multimodal shipping rate & transit time calculator.
 * All user-facing text is read from next-intl translation files.
 * Rate data is hardcoded reference data — see note on results.
 */
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

/* ──────── Types ──────── */

type PortId = 'shanghai' | 'ningbo' | 'shenzhen' | 'qingdao' | 'tianjin';
type DestId =
  | 'los-angeles'
  | 'long-beach'
  | 'hamburg'
  | 'rotterdam'
  | 'singapore'
  | 'tokyo';
type ModeId = 'fcl' | 'lcl' | 'air' | 'rail' | 'multimodal';

interface RouteResult {
  days: number;
  rate: number;
  schedule: string;
}

/* ──────── Reference data (hardcoded simulation) ──────── */

type DestData = Record<ModeId, RouteResult | null>;
type RouteTable = Record<PortId, Record<DestId, DestData>>;

export const ROUTE_DATA: RouteTable = {
  shanghai: {
    'los-angeles': {
      fcl: { days: 14, rate: 2500, schedule: 'Tue / Fri' },
      lcl: { days: 17, rate: 120, schedule: 'Tue / Fri / Sat' },
      air: { days: 3, rate: 5.5, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 18, rate: 3200, schedule: 'Tue' },
    },
    'long-beach': {
      fcl: { days: 15, rate: 2550, schedule: 'Tue / Thu / Sat' },
      lcl: { days: 18, rate: 125, schedule: 'Tue / Thu / Sat' },
      air: { days: 3, rate: 5.5, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 19, rate: 3300, schedule: 'Tue' },
    },
    hamburg: {
      fcl: { days: 30, rate: 2000, schedule: 'Mon / Wed' },
      lcl: { days: 33, rate: 90, schedule: 'Mon / Wed / Fri' },
      air: { days: 4, rate: 4.5, schedule: 'Tue / Thu / Sat' },
      rail: { days: 16, rate: 4000, schedule: 'Wed / Sat' },
      multimodal: { days: 22, rate: 3000, schedule: 'Mon' },
    },
    rotterdam: {
      fcl: { days: 31, rate: 1900, schedule: 'Mon / Thu' },
      lcl: { days: 34, rate: 85, schedule: 'Mon / Thu / Sat' },
      air: { days: 4, rate: 4.5, schedule: 'Tue / Thu / Sat' },
      rail: { days: 17, rate: 4200, schedule: 'Thu / Sun' },
      multimodal: { days: 23, rate: 3100, schedule: 'Mon' },
    },
    singapore: {
      fcl: { days: 6, rate: 450, schedule: 'Daily' },
      lcl: { days: 8, rate: 40, schedule: 'Daily' },
      air: { days: 2, rate: 2.5, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 10, rate: 600, schedule: 'Tue / Thu' },
    },
    tokyo: {
      fcl: { days: 4, rate: 300, schedule: 'Mon / Wed / Fri' },
      lcl: { days: 6, rate: 25, schedule: 'Mon / Wed / Fri' },
      air: { days: 1, rate: 2.0, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 6, rate: 450, schedule: 'Mon / Thu' },
    },
  },
  ningbo: {
    'los-angeles': {
      fcl: { days: 15, rate: 2400, schedule: 'Wed / Sat' },
      lcl: { days: 18, rate: 115, schedule: 'Wed / Sat' },
      air: { days: 3, rate: 5.5, schedule: 'Tue / Thu / Sat' },
      rail: null,
      multimodal: { days: 19, rate: 3100, schedule: 'Wed' },
    },
    'long-beach': {
      fcl: { days: 16, rate: 2450, schedule: 'Wed / Sat' },
      lcl: { days: 19, rate: 120, schedule: 'Wed / Sat' },
      air: { days: 3, rate: 5.5, schedule: 'Tue / Thu / Sat' },
      rail: null,
      multimodal: { days: 20, rate: 3200, schedule: 'Wed' },
    },
    hamburg: {
      fcl: { days: 30, rate: 1900, schedule: 'Tue / Fri' },
      lcl: { days: 33, rate: 85, schedule: 'Tue / Fri' },
      air: { days: 4, rate: 4.5, schedule: 'Mon / Wed / Fri' },
      rail: { days: 16, rate: 3800, schedule: 'Wed / Sat' },
      multimodal: { days: 22, rate: 2900, schedule: 'Tue' },
    },
    rotterdam: {
      fcl: { days: 31, rate: 1800, schedule: 'Tue / Sat' },
      lcl: { days: 34, rate: 80, schedule: 'Tue / Sat' },
      air: { days: 4, rate: 4.5, schedule: 'Mon / Wed / Fri' },
      rail: { days: 17, rate: 4000, schedule: 'Fri / Sun' },
      multimodal: { days: 23, rate: 3000, schedule: 'Tue' },
    },
    singapore: {
      fcl: { days: 7, rate: 480, schedule: 'Daily' },
      lcl: { days: 9, rate: 45, schedule: 'Daily' },
      air: { days: 2, rate: 2.5, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 11, rate: 650, schedule: 'Wed / Fri' },
    },
    tokyo: {
      fcl: { days: 4, rate: 320, schedule: 'Mon / Thu / Sat' },
      lcl: { days: 6, rate: 28, schedule: 'Mon / Thu / Sat' },
      air: { days: 1, rate: 2.0, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 6, rate: 480, schedule: 'Tue / Fri' },
    },
  },
  shenzhen: {
    'los-angeles': {
      fcl: { days: 13, rate: 2200, schedule: 'Tue / Thu / Sat' },
      lcl: { days: 16, rate: 110, schedule: 'Tue / Thu / Sat' },
      air: { days: 3, rate: 5.0, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 17, rate: 2900, schedule: 'Thu' },
    },
    'long-beach': {
      fcl: { days: 14, rate: 2250, schedule: 'Tue / Thu / Sun' },
      lcl: { days: 17, rate: 115, schedule: 'Tue / Thu / Sun' },
      air: { days: 3, rate: 5.0, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 18, rate: 3000, schedule: 'Thu' },
    },
    hamburg: {
      fcl: { days: 28, rate: 2100, schedule: 'Mon / Thu' },
      lcl: { days: 31, rate: 95, schedule: 'Mon / Thu' },
      air: { days: 4, rate: 4.5, schedule: 'Mon / Wed / Fri' },
      rail: { days: 15, rate: 4200, schedule: 'Tue / Fri' },
      multimodal: { days: 21, rate: 3100, schedule: 'Mon' },
    },
    rotterdam: {
      fcl: { days: 29, rate: 2000, schedule: 'Mon / Fri' },
      lcl: { days: 32, rate: 90, schedule: 'Mon / Fri' },
      air: { days: 4, rate: 4.5, schedule: 'Mon / Wed / Fri' },
      rail: { days: 16, rate: 4400, schedule: 'Wed / Sat' },
      multimodal: { days: 22, rate: 3200, schedule: 'Mon' },
    },
    singapore: {
      fcl: { days: 5, rate: 380, schedule: 'Daily' },
      lcl: { days: 7, rate: 35, schedule: 'Daily' },
      air: { days: 2, rate: 2.0, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 9, rate: 550, schedule: 'Mon / Wed / Fri' },
    },
    tokyo: {
      fcl: { days: 5, rate: 380, schedule: 'Mon / Wed / Fri' },
      lcl: { days: 7, rate: 35, schedule: 'Mon / Wed / Fri' },
      air: { days: 2, rate: 2.5, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 8, rate: 550, schedule: 'Tue / Fri' },
    },
  },
  qingdao: {
    'los-angeles': {
      fcl: { days: 16, rate: 2700, schedule: 'Mon / Thu' },
      lcl: { days: 19, rate: 130, schedule: 'Mon / Thu' },
      air: { days: 3, rate: 6.0, schedule: 'Tue / Thu / Sat' },
      rail: null,
      multimodal: { days: 20, rate: 3500, schedule: 'Mon' },
    },
    'long-beach': {
      fcl: { days: 17, rate: 2750, schedule: 'Mon / Fri' },
      lcl: { days: 20, rate: 135, schedule: 'Mon / Fri' },
      air: { days: 3, rate: 6.0, schedule: 'Tue / Thu / Sat' },
      rail: null,
      multimodal: { days: 21, rate: 3600, schedule: 'Mon' },
    },
    hamburg: {
      fcl: { days: 32, rate: 1800, schedule: 'Tue / Sat' },
      lcl: { days: 35, rate: 80, schedule: 'Tue / Sat' },
      air: { days: 4, rate: 4.0, schedule: 'Mon / Thu / Sat' },
      rail: { days: 17, rate: 3600, schedule: 'Mon / Thu' },
      multimodal: { days: 24, rate: 2800, schedule: 'Tue' },
    },
    rotterdam: {
      fcl: { days: 33, rate: 1700, schedule: 'Wed / Sun' },
      lcl: { days: 36, rate: 75, schedule: 'Wed / Sun' },
      air: { days: 4, rate: 4.0, schedule: 'Mon / Thu / Sat' },
      rail: { days: 18, rate: 3800, schedule: 'Tue / Fri' },
      multimodal: { days: 25, rate: 2900, schedule: 'Wed' },
    },
    singapore: {
      fcl: { days: 8, rate: 550, schedule: 'Mon / Thu / Sat' },
      lcl: { days: 10, rate: 50, schedule: 'Mon / Thu / Sat' },
      air: { days: 3, rate: 3.0, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 12, rate: 750, schedule: 'Tue / Fri' },
    },
    tokyo: {
      fcl: { days: 3, rate: 250, schedule: 'Daily' },
      lcl: { days: 5, rate: 20, schedule: 'Daily' },
      air: { days: 1, rate: 1.5, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 5, rate: 400, schedule: 'Mon / Wed / Fri' },
    },
  },
  tianjin: {
    'los-angeles': {
      fcl: { days: 17, rate: 2800, schedule: 'Mon / Thu' },
      lcl: { days: 20, rate: 135, schedule: 'Mon / Thu' },
      air: { days: 3, rate: 6.0, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 21, rate: 3600, schedule: 'Mon' },
    },
    'long-beach': {
      fcl: { days: 18, rate: 2850, schedule: 'Mon / Fri' },
      lcl: { days: 21, rate: 140, schedule: 'Mon / Fri' },
      air: { days: 3, rate: 6.0, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 22, rate: 3700, schedule: 'Mon' },
    },
    hamburg: {
      fcl: { days: 32, rate: 1850, schedule: 'Wed / Sat' },
      lcl: { days: 35, rate: 85, schedule: 'Wed / Sat' },
      air: { days: 4, rate: 4.0, schedule: 'Tue / Thu / Sat' },
      rail: { days: 17, rate: 3700, schedule: 'Mon / Thu' },
      multimodal: { days: 24, rate: 2900, schedule: 'Wed' },
    },
    rotterdam: {
      fcl: { days: 33, rate: 1750, schedule: 'Thu / Sun' },
      lcl: { days: 36, rate: 80, schedule: 'Thu / Sun' },
      air: { days: 4, rate: 4.0, schedule: 'Tue / Thu / Sat' },
      rail: { days: 18, rate: 3900, schedule: 'Tue / Fri' },
      multimodal: { days: 25, rate: 3000, schedule: 'Thu' },
    },
    singapore: {
      fcl: { days: 9, rate: 580, schedule: 'Tue / Fri / Sun' },
      lcl: { days: 11, rate: 55, schedule: 'Tue / Fri / Sun' },
      air: { days: 3, rate: 3.0, schedule: 'Mon / Wed / Fri' },
      rail: null,
      multimodal: { days: 13, rate: 800, schedule: 'Wed / Fri' },
    },
    tokyo: {
      fcl: { days: 3, rate: 260, schedule: 'Daily' },
      lcl: { days: 5, rate: 22, schedule: 'Daily' },
      air: { days: 1, rate: 1.5, schedule: 'Daily' },
      rail: null,
      multimodal: { days: 5, rate: 420, schedule: 'Tue / Thu / Sat' },
    },
  },
};

const ORIGINS: PortId[] = [
  'shanghai',
  'ningbo',
  'shenzhen',
  'qingdao',
  'tianjin',
];
const DESTINATIONS: DestId[] = [
  'los-angeles',
  'long-beach',
  'hamburg',
  'rotterdam',
  'singapore',
  'tokyo',
];
const MODES: ModeId[] = ['fcl', 'lcl', 'air', 'rail', 'multimodal'];

/* ──────── Component ──────── */

export default function ShippingCalculator() {
  const t = useTranslations('tools.shipping_calculator');
  const [origin, setOrigin] = useState<PortId | ''>('');
  const [destination, setDestination] = useState<DestId | ''>('');
  const [mode, setMode] = useState<ModeId>('fcl');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState<RouteResult | null>(null);
  const [calculated, setCalculated] = useState(false);

  /* Get display name for port/mode */
  const portName = (id: PortId | DestId): string => t(`port_${id}`);
  const modeName = (id: ModeId): string => t(`mode_${id}`);

  /* Filter modes available for selected route */
  const availableModes = useMemo<ModeId[]>(() => {
    if (!origin || !destination) return MODES;
    const destData = ROUTE_DATA[origin]?.[destination];
    if (!destData) return MODES;
    return MODES.filter((m) => destData[m] !== null);
  }, [origin, destination]);

  /* Reset mode when switched to unavailable one */
  useMemo(() => {
    if (!availableModes.includes(mode) && availableModes.length > 0) {
      setMode(availableModes[0]);
    }
  }, [availableModes, mode]);

  const handleCalculate = () => {
    if (!origin || !destination) return;
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;

    const destData = ROUTE_DATA[origin]?.[destination];
    const route = destData?.[mode];
    if (!route) return;

    setResult(route);
    setCalculated(true);
  };

  const canCalculate = origin !== '' && destination !== '' && quantity !== '';

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="gradient-brand text-white px-6 py-4">
        <h2 className="text-lg font-semibold">{t('title')}</h2>
      </div>

      {/* Form */}
      <div className="p-6 space-y-5">
        {/* Origin & Destination */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('origin_label')}
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value as PortId)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              <option value="">--</option>
              {ORIGINS.map((id) => (
                <option key={id} value={id}>
                  {portName(id)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('destination_label')}
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value as DestId)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
            >
              <option value="">--</option>
              {DESTINATIONS.map((id) => (
                <option key={id} value={id}>
                  {portName(id)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transport Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('mode_label')}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableModes.map((id) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  mode === id
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                }`}
              >
                {modeName(id)}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('quantity_label')} ({t(mode === 'air' ? 'kg' : 'teu')})
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              min="0"
              step={mode === 'air' ? '0.5' : '1'}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={mode === 'air' ? 'e.g. 500' : 'e.g. 2'}
              className="flex-1 max-w-[180px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <span className="text-sm text-gray-500">
              {t(mode === 'air' ? 'kg' : 'teu')}
            </span>
          </div>
        </div>

        {/* Calculate button */}
        <button
          onClick={handleCalculate}
          disabled={!canCalculate}
          className="w-full sm:w-auto px-6 py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {t('calculate')}
        </button>
      </div>

      {/* Results */}
      {calculated && result && (
        <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            {origin && destination && mode
              ? `${portName(origin as PortId)} → ${portName(destination as DestId)} · ${modeName(mode)}`
              : ''}
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {t('result_rate')}
              </p>
              <p className="text-xl font-bold text-brand-600 mt-1">
                ${result.rate.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">
                  /{mode === 'air' ? 'kg' : 'TEU'}
                </span>
              </p>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {t('result_transit')}
              </p>
              <p className="text-xl font-bold text-brand-600 mt-1">
                {result.days}
                <span className="text-sm font-normal text-gray-500">
                  {' '}days
                </span>
              </p>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {t('result_schedule')}
              </p>
              <p className="text-xl font-bold text-brand-600 mt-1">
                {result.schedule}
              </p>
            </div>
          </div>

          {/* Total estimate */}
          {mode !== 'air' && quantity && !isNaN(parseFloat(quantity)) && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Est. total:</span> $
              {(result.rate * Math.ceil(parseFloat(quantity || '0'))).toLocaleString()}{' '}
              (based on {Math.ceil(parseFloat(quantity || '0'))} × ${result.rate.toLocaleString()}/TEU)
            </p>
          )}

          <p className="text-xs text-gray-400 italic">{t('note')}</p>
        </div>
      )}
    </div>
  );
}
