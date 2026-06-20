/**
 * @file Tools page — 展示所有实用工具入口。
 */
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const tools = [
  { key: 'shipping', icon: '🚢', coming: true },
  { key: 'hs', icon: '📋', coming: true },
];

export default function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('tools.shipping_rate');
  const th = useTranslations('tools.hs_compliance');

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">实用工具</h1>
          <p className="mt-3 text-base text-blue-100">物流信息查询和合规检查工具</p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {tools.map((tool) => (
              <div key={tool.key} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tool.key === 'shipping' ? t('title') : th('title')}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {tool.key === 'shipping' ? '快速查询海运空运参考运价和运输时效' : '查询HS编码的关税税率和清关文件要求'}
                </p>
                {tool.coming && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    开发中，敬请期待
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white text-center">
        <p className="text-gray-500 text-sm">需要物流咨询帮助？<Link href="/contact" className="text-brand-500 font-medium hover:text-brand-600">联系我们 &rarr;</Link></p>
      </section>
    </div>
  );
}