/**
 * @file International shipping rate & transit time query tool.
 * Data source: Shanghai Shipping Exchange, Baltic Exchange (June 2026).
 */
'use client';

import { useState, useMemo, useEffect } from 'react';
// Usage tracking
const FH_DK = 'fh_date';
const getU = (k: string): number => { if (typeof window === 'undefined') return 0; const t = new Date().toISOString().slice(0, 10); const s = localStorage.getItem(FH_DK); if (s !== t) { localStorage.setItem(FH_DK, t); localStorage.removeItem(k); return 0; } return parseInt(localStorage.getItem(k) || '0', 10); };
const incU = (k: string): number => { if (typeof window === 'undefined') return 0; getU(k); const c = parseInt(localStorage.getItem(k) || '0', 10) + 1; localStorage.setItem(k, c.toString()); return c; };
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ROUTE_DATA } from './ShippingCalculator';

type PortId = 'shanghai' | 'ningbo' | 'shenzhen' | 'qingdao' | 'tianjin';
type DestId = 'los-angeles' | 'long-beach' | 'hamburg' | 'rotterdam' | 'singapore' | 'tokyo';
type ModeId = 'fcl' | 'lcl' | 'air' | 'rail';
type ContainerType = '20gp' | '40gp' | '40hq';

interface RouteResult {
  days: number;
  rate: number;
  schedule: string;
}

const CONTAINER_MULTIPLIER: Record<ContainerType, number> = {
  '20gp': 1,
  '40gp': 2,
  '40hq': 2.2
};

const ORIGINS: PortId[] = ['shanghai','ningbo','shenzhen','qingdao','tianjin'];
const DESTINATIONS: DestId[] = ['los-angeles','long-beach','hamburg','rotterdam','singapore','tokyo'];
const MODES: ModeId[] = ['fcl','lcl','air','rail'];

export default function ShippingRateTool() {
  const t = useTranslations('tools.shipping_rate');
  const tp = useTranslations('tools.shipping_calculator');
  const tu = useTranslations('upgrade');
  const [origin, setOrigin] = useState<PortId|''>('');
  const [dest, setDest] = useState<DestId|''>('');
  const [mode, setMode] = useState<ModeId>('fcl');
  const [container, setContainer] = useState<ContainerType>('20gp');
  const [qty, setQty] = useState('');
  const [result, setResult] = useState<RouteResult|null>(null);
  const [queried, setQueried] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  useEffect(() => { const t=new Date().toISOString().slice(0,10); const s=localStorage.getItem('fh_d'); if(s!==t) { localStorage.setItem('fh_d',t); localStorage.removeItem('fh_sr'); } setUsageCount(parseInt(localStorage.getItem('fh_sr')||'0',10)); }, []);
  const availModes = useMemo(() => MODES.filter(m => origin&&dest ? ROUTE_DATA[origin as PortId]?.[dest as DestId]?.[m] !== null : true), [origin,dest]);
  const handleQuery = () => {
    if (!origin||!dest) return; const q=parseFloat(qty); if(isNaN(q)||q<=0) return;
    const route = ROUTE_DATA[origin as PortId]?.[dest as DestId]?.[mode]; if(!route) return;
    setResult(route); setQueried(true);
    const nc=parseInt(localStorage.getItem('fh_sr')||'0',10)+1; localStorage.setItem('fh_sr',nc.toString()); setUsageCount(nc);
  };
  const isReady = origin!=='' && dest!=='' && qty!=='';
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="gradient-brand text-white px-6 py-4">
        <h2 className="text-lg font-semibold">{t('title')}</h2>`n        <p className="text-xs text-blue-200 mt-0.5">{t('hint')}</p>
      </div>
      <div className="p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('origin_label')}</label><select value={origin} onChange={e=>setOrigin(e.target.value as PortId)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"><option value="">--</option>{ORIGINS.map(id=><option key={id} value={id}>{tp('port_'+id)}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('destination_label')}</label><select value={dest} onChange={e=>setDest(e.target.value as DestId)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"><option value="">--</option>{DESTINATIONS.map(id=><option key={id} value={id}>{tp('port_'+id)}</option>)}</select></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('mode_label')}</label>
          <div className="flex flex-wrap gap-2">{availModes.map(id=><button key={id} onClick={()=>setMode(id)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${mode===id?'bg-brand-500 text-white border-brand-500':'bg-white text-gray-600 border-gray-200 hover:border-brand-300'}`}>{t('mode_'+id)}</button>)}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {mode==='fcl'&&<div><label className="block text-sm font-medium text-gray-700 mb-1">{t('container_label')}</label><div className="flex gap-2">{(['20gp','40gp','40hq'] as ContainerType[]).map(id=><button key={id} onClick={()=>setContainer(id)} className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${container===id?'bg-brand-500 text-white border-brand-500':'bg-white text-gray-600 border-gray-200'}`}>{t('container_'+id)}</button>)}</div></div>}
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('quantity_label')} ({mode==='air'?t('kg'):t('teu')})</label><input type="number" min="0" step={mode==='air'?'0.5':'1'} value={qty} onChange={e=>setQty(e.target.value)} placeholder={mode==='air'?'e.g. 500':'e.g. 2'} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
        </div>
        <button onClick={handleQuery} disabled={!isReady} className="w-full sm:w-auto px-6 py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">{t('query')}</button>
      </div>
      {queried&&result&&<div className="border-t border-gray-100 bg-gray-50 px-6 py-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{tp('port_'+origin as string)} → {tp('port_'+dest as string)}</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"><p className="text-xs text-gray-500 uppercase tracking-wider">{t('result_rate')}</p><p className="text-xl font-bold text-brand-600 mt-1">${(result.rate*(mode==='fcl'?CONTAINER_MULTIPLIER[container]:1)).toLocaleString()}<span className="text-sm font-normal text-gray-500">/{mode==='air'?'kg':'TEU'}</span></p></div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"><p className="text-xs text-gray-500 uppercase tracking-wider">{t('result_transit')}</p><p className="text-xl font-bold text-brand-600 mt-1">{result.days}<span className="text-sm font-normal text-gray-500"> days</span></p></div>
          <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"><p className="text-xs text-gray-500 uppercase tracking-wider">{t('result_schedule')}</p><p className="text-xl font-bold text-brand-600 mt-1">{result.schedule}</p></div>
        </div>
        {mode!=='air'&&qty&&!isNaN(parseFloat(qty))&&<p className="text-sm text-gray-600">Est. total: ${(result.rate*(mode==='fcl'?CONTAINER_MULTIPLIER[container]:1)*Math.ceil(parseFloat(qty||'0'))).toLocaleString()}</p>}
        <p className="text-xs text-gray-400 italic">{t('note')}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-0.5"><p>&#9432; {t('data_update')}</p><p>&#9432; {t('data_source')}</p></div>
          <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors whitespace-nowrap">{t('cta')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs text-gray-500">
          <span>{tu('queries_used',{used:usageCount})}</span>
          <Link href="/upgrade" className="text-brand-500 font-medium hover:text-brand-600">{tu('upgrade_btn')} &rarr;</Link>
        </div>
      </div>}
    </div>
  );
}
