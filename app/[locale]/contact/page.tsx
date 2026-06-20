/**
 * @file Contact page — 咨询表单 + 联系方式展示。
 */
'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ContactInfo from '@/components/common/ContactInfo';

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const locale_ = useLocale();

  const inquiryTypes = ['general', 'shipping', 'customs', 'supply_chain', 'ecommerce', 'project'];
  const typeLabels: Record<string, string> = locale_ === 'en'
    ? { general: 'General', shipping: 'Freight', customs: 'Customs', supply_chain: 'Supply Chain', ecommerce: 'E-commerce', project: 'Project' }
    : { general: '一般咨询', shipping: '货运代理', customs: '海关合规', supply_chain: '供应链优化', ecommerce: '跨境电商', project: '项目物流' };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setError(locale_ === 'en' ? 'Please fill in required fields' : '请填写必填项'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale: locale_, source: 'contact_page' }),
      });
      if (res.ok) setSubmitted(true);
      else setError(locale_ === 'en' ? 'Submission failed. Please try again.' : '提交失败，请稍后重试');
    } catch { setError(locale_ === 'en' ? 'Network error. Please try again.' : '网络错误，请稍后重试'); }
    finally { setLoading(false); }
  };

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="mt-3 text-base text-blue-100 max-w-2xl mx-auto">{t('description')}</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{t('form_success')}</h2>
                    <p className="text-sm text-gray-500">{locale_ === 'en' ? 'We will contact you within 24 hours.' : '我们将在24小时内与您联系。'}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')} <span className="text-red-500">*</span></label><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={t('form_placeholder_name')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_company')}</label><input type="text" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder={t('form_placeholder_company')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')} <span className="text-red-500">*</span></label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder={t('form_placeholder_email')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_phone')}</label><input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder={t('form_placeholder_phone')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{locale_ === 'en' ? 'Inquiry Type' : '咨询方向'}</label>
                      <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                        {inquiryTypes.map(tp=><option key={tp} value={tp}>{typeLabels[tp]}</option>)}
                      </select>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('form_message')} <span className="text-red-500">*</span></label><textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder={t('form_placeholder_message')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto px-8 py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all">{loading ? '...' : t('form_submit')}</button>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}