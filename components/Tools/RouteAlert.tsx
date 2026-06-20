/**
 * @file Route alert subscription — 选择航线、输入邮箱、订阅预警。
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface RoutePair {
  origin: string;
  destination: string;
}

const ORIGINS = ['shanghai', 'ningbo', 'shenzhen', 'qingdao', 'tianjin'] as const;
const DESTINATIONS = ['los-angeles', 'long-beach', 'hamburg', 'rotterdam', 'singapore', 'tokyo'] as const;

export default function RouteAlert() {
  const t = useTranslations('tools.route_alert');
  const tp = useTranslations('tools.shipping_calculator');
  const [routes, setRoutes] = useState<RoutePair[]>([]);
  const [newOrigin, setNewOrigin] = useState('');
  const [newDest, setNewDest] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const addRoute = () => {
    if (newOrigin && newDest) {
      setRoutes([...routes, { origin: newOrigin, destination: newDest }]);
      setNewOrigin('');
      setNewDest('');
    }
  };

  const removeRoute = (index: number) => {
    setRoutes(routes.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!email || routes.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routes, email }),
      });
      if (res.ok) setSubscribed(true);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="text-sm font-medium text-green-800">{t('success')}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="gradient-brand text-white px-6 py-4">
        <h2 className="text-lg font-semibold">{t('title')}</h2>
      </div>
      <div className="p-6 space-y-4">
        {/* Route selection */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('origin_label')}</label>
            <select value={newOrigin} onChange={(e) => setNewOrigin(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="">--</option>
              {ORIGINS.map((id) => (<option key={id} value={id}>{tp('port_' + id)}</option>))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">{t('destination_label')}</label>
            <select value={newDest} onChange={(e) => setNewDest(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="">--</option>
              {DESTINATIONS.map((id) => (<option key={id} value={id}>{tp('port_' + id)}</option>))}
            </select>
          </div>
          <button onClick={addRoute} disabled={!newOrigin || !newDest} className="px-3 py-2 bg-brand-500 text-white text-sm rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0">{t('add_route')}</button>
        </div>

        {/* Subscribed routes list */}
        {routes.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">{t('subscribed_routes')}</p>
            <div className="space-y-2">
              {routes.map((route, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-700">{tp('port_' + route.origin)} → {tp('port_' + route.destination)}</span>
                  <button onClick={() => removeRoute(i)} className="text-xs text-red-500 hover:text-red-600 transition-colors">{t('remove')}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('email_label')}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placeholder_email')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>

        <button onClick={handleSubmit} disabled={!email || routes.length === 0 || loading} className="w-full sm:w-auto px-6 py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
          {loading ? '...' : t('subscribe')}
        </button>
      </div>
    </div>
  );
}