/**
 * @file HS Code Compliance Check Tool — 查询HS编码的关税税率、清关文件和认证要求。
 */
'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';


type Dest = 'US' | 'EU' | 'UK' | 'JP' | 'AU';

interface HSRecord {
  desc: { zh: string; en: string };
  rates: Record<Dest, number>;
  docs: { zh: string[]; en: string[] };
  certs: { zh: string[]; en: string[] };
  notes: { zh: string; en: string };
}

const HS_DB: Record<string, HSRecord> = {
  '8471': {
    desc: { zh: '自动数据处理设备及部件', en: 'Automatic data processing machines' },
    rates: { US: 0, EU: 0, UK: 0, JP: 0, AU: 0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单/空运单'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading / Air waybill'],
    },
    certs: {
      zh: ['FCC认证（美国）', 'CE认证（欧盟）'],
      en: ['FCC certification (US)', 'CE certification (EU)'],
    },
    notes: {
      zh: '信息技术产品，根据ITA协议（信息技术产品协议）大多数WTO成员国实行零关税。出口美国需确保FCC合规，出口欧盟需CE标志。',
      en: 'IT products enjoy zero tariff in most WTO member countries under the ITA (Information Technology Agreement). FCC compliance required for US; CE marking required for EU.',
    },
  },
  '8504': {
    desc: { zh: '变压器、变流器及电感器', en: 'Electrical transformers, converters and inductors' },
    rates: { US: 2.5, EU: 2.7, UK: 2.7, JP: 1.5, AU: 3.0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单', '原产地证明'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Certificate of origin'],
    },
    certs: {
      zh: ['CE认证（欧盟）', 'UL认证（美国）', '能效认证（各国要求不同）'],
      en: ['CE certification (EU)', 'UL certification (US)', 'Energy efficiency certification (varies by country)'],
    },
    notes: {
      zh: '电力设备出口需关注目的国的电压频率标准和能效标签要求。部分产品可能需做CB测试报告。',
      en: 'Check destination country voltage/frequency standards and energy efficiency labeling. CB test report may be required for some products.',
    },
  },
  '9403': {
    desc: { zh: '家具及零件', en: 'Furniture and parts thereof' },
    rates: { US: 5.5, EU: 0, UK: 0, JP: 3.5, AU: 5.0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单', '原产地证明', '熏蒸证明（木制）'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Certificate of origin', 'Fumigation certificate (wooden)'],
    },
    certs: {
      zh: ['防火测试认证（美国）', 'REACH法规（欧盟）', 'ISPM-15热处理标识（木制包装）'],
      en: ['Flammability test (US)', 'REACH compliance (EU)', 'ISPM-15 heat treatment mark (wooden packaging)'],
    },
    notes: {
      zh: '木制家具出口需特别注意ISPM-15标准。出口美国需符合防火测试标准（TB117-2013）。欧盟对甲醛释放量有严格限制。',
      en: 'Wooden furniture must comply with ISPM-15. US requires flammability testing (TB117-2013). EU strictly limits formaldehyde emissions.',
    },
  },
  '6204': {
    desc: { zh: '女式服装（上衣、裙装等）', en: "Women''s or girls\u2019' suits, jackets, dresses, skirts" },
    rates: { US: 16.5, EU: 12.0, UK: 12.0, JP: 10.5, AU: 15.0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单', '原产地证明', '纺织品纤维成分标签'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Certificate of origin', 'Textile fiber composition label'],
    },
    certs: {
      zh: ['CPSIA认证（美国儿童产品）', 'REACH法规（欧盟）', 'OEKO-TEX认证（推荐）'],
      en: ['CPSIA certification (US children\'s products)', 'REACH compliance (EU)', 'OEKO-TEX certification (recommended)'],
    },
    notes: {
      zh: '纺织品出口需明确标注纤维成分（棉、涤纶等百分比）、原产地标签和护理标签。儿童服装还需提供阻燃性测试报告。',
      en: 'Textile exports require clear fiber composition labels, country of origin labels, and care labels. Children\'s clothing additionally requires flammability test reports.',
    },
  },
  '2008': {
    desc: { zh: '水果、坚果及其他食用植物制品', en: 'Fruit, nuts and other edible plant preparations' },
    rates: { US: 10.0, EU: 12.8, UK: 12.8, JP: 13.5, AU: 5.0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单', '卫生证书/健康证', '原产地证明', '成分分析表'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Health certificate', 'Certificate of origin', 'Ingredient analysis'],
    },
    certs: {
      zh: ['FDA食品设施注册（美国）', '欧盟进口食品注册（EU RASFF）', '有机认证（如需标注有机）'],
      en: ['FDA food facility registration (US)', 'EU food import registration (RASFF)', 'Organic certification (if labeled organic)'],
    },
    notes: {
      zh: '食品出口需重点关注目的国的食品安全法规。美国要求FDA前置注册，欧盟要求提供HACCP计划。保质期和储存条件必须清晰标注。',
      en: 'Food exports require strict compliance with destination food safety regulations. US requires prior FDA registration; EU requires HACCP documentation. Shelf life and storage conditions must be clearly labeled.',
    },
  },
  '8708': {
    desc: { zh: '汽车零部件及配件', en: 'Motor vehicle parts and accessories' },
    rates: { US: 2.5, EU: 3.0, UK: 3.0, JP: 0, AU: 5.0 },
    docs: {
      zh: ['商业发票', '装箱单', '提单', '原产地证明', '产品技术参数说明'],
      en: ['Commercial invoice', 'Packing list', 'Bill of lading', 'Certificate of origin', 'Technical specification sheet'],
    },
    certs: {
      zh: ['DOT认证（美国）', 'E-mark认证（欧盟）', 'CCC认证（中国出口返内销）'],
      en: ['DOT certification (US)', 'E-mark certification (EU)', 'CCC certification (for re-import to China)'],
    },
    notes: {
      zh: '安全相关零部件（刹车、转向、灯光等）出口美国必须通过DOT认证，出口欧盟需E-mark认证。建议提前3-6个月启动认证申请。',
      en: 'Safety-related parts (brakes, steering, lighting) require DOT certification for US and E-mark for EU. Allow 3-6 months for certification processing.',
    },
  },
};

const DEST_KEYS: Dest[] = ['US', 'EU', 'UK', 'JP', 'AU'];

export default function HSComplianceTool() {
  const t = useTranslations('tools.hs_compliance');
  const tu = useTranslations('upgrade');
  const locale = useLocale();
  const [hsCode, setHsCode] = useState('');
  const [dest, setDest] = useState<Dest>('US');
  const [result, setResult] = useState<HSRecord | null>(null);
  const [queried, setQueried] = useState(false);
  const [found, setFound] = useState(true);
  const [usageCount, setUsageCount] = useState(0);
  useEffect(() => { const d=new Date().toISOString().slice(0,10); const s=localStorage.getItem('fh_d'); if(s!==d) { localStorage.setItem('fh_d',d); localStorage.removeItem('fh_hc'); } setUsageCount(parseInt(localStorage.getItem('fh_hc')||'0',10)); }, []);
  const handleQuery = () => {
    const code = hsCode.replace(/\D/g,'').slice(0,4);
    if(code.length<4){setFound(false);setQueried(true);setResult(null);return;}
    const match = HS_DB[code];
    if(match){setResult(match);setFound(true);const nc=parseInt(localStorage.getItem('fh_hc')||'0',10)+1;localStorage.setItem('fh_hc',nc.toString());setUsageCount(nc);}
    else{setResult(null);setFound(false);}
    setQueried(true);
  };
  const isEn = locale==='en';
  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="gradient-brand text-white px-6 py-4"><h2 className="text-lg font-semibold">{t('title')}</h2>`n        <p className="text-xs text-blue-200 mt-0.5">{t('hint')}</p></div>
      <div className="p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('hs_label')}</label><input type="text" value={hsCode} onChange={e=>setHsCode(e.target.value)} placeholder={t('hs_placeholder')} maxLength={8} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">{t('destination_label')}</label><select value={dest} onChange={e=>setDest(e.target.value as Dest)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">{DEST_KEYS.map(k=><option key={k} value={k}>{t('dest_'+k)}</option>)}</select></div>
        </div>
        <button onClick={handleQuery} disabled={hsCode.replace(/\D/g,'').length<4} className="w-full sm:w-auto px-6 py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all">{t('query')}</button>
      </div>
      {queried&&<div className="border-t border-gray-100 px-6 py-5 space-y-4">
        {!found?<div className="text-center py-6"><p className="text-gray-600 text-sm">{t('not_found')}</p></div>:
        result&&<><h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{t('result_title')}</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{t('description_label')}</p><p className="text-sm font-medium text-gray-900">{isEn?result.desc.en:result.desc.zh}</p></div>
            <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{t('tariff_rate')}</p><p className="text-xl font-bold text-brand-600">{result.rates[dest]}%</p></div>
          </div>
          <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('documents')}</p><ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">{(isEn?result.docs.en:result.docs.zh).map((d,i)=><li key={i}>{d}</li>)}</ul></div>
          <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('certifications')}</p><ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">{(isEn?result.certs.en:result.certs.zh).map((c,i)=><li key={i}>{c}</li>)}</ul></div>
          <div><p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t('notes')}</p><p className="text-sm text-gray-700 leading-relaxed">{isEn?result.notes.en:result.notes.zh}</p></div>
          <div className="pt-2 border-t border-gray-100"><Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">{t('cta')}<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs text-gray-500">
            <span>{tu('queries_used',{used:usageCount})}</span>
            <Link href="/upgrade" className="text-brand-500 font-medium hover:text-brand-600">{tu('upgrade_btn')} &rarr;</Link>
          </div>
        </div></>}
      </div>}
    </div>
  );
}
