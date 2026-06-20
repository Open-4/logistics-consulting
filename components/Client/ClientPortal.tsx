/**
 * @file Client login portal — 登录后可查看项目进度与文档下载。
 * 现阶段为模拟界面，标注「演示界面」。
 */
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  name: string;
  status: 'in_progress' | 'completed';
  progress: number;
}

interface Document {
  name: string;
  url: string;
}

const MOCK_PROJECTS: Project[] = [
  { name: '亚太供应链优化项目', status: 'in_progress', progress: 65 },
  { name: '海关AEO认证辅导', status: 'completed', progress: 100 },
  { name: '跨境电商物流方案设计', status: 'in_progress', progress: 32 },
  { name: '年度物流成本审计', status: 'completed', progress: 100 },
];

const MOCK_DOCUMENTS: Document[] = [
  { name: '供应链诊断报告 Q2 2026', url: '#' },
  { name: '运价谈判策略建议书', url: '#' },
  { name: 'AEO认证申请材料清单', url: '#' },
];

export default function ClientPortal({ isOpen, onClose }: ClientPortalProps) {
  const t = useTranslations('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleLogin = () => {
    if (email && password) setLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Demo label */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-yellow-400 text-yellow-900 text-center text-xs font-semibold py-1 tracking-wider uppercase">
          {t('demo_label')}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-8 right-4 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!loggedIn ? (
          /* ── Login Form ── */
          <div className="pt-12 px-6 pb-8">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">{t('login_title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email_label')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('password_label')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!email || !password}
                className="w-full py-2.5 gradient-brand text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {t('login_submit')}
              </button>
            </div>
          </div>
        ) : (
          /* ── Dashboard ── */
          <div className="pt-12 px-6 pb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('project_title')}</h2>

            {/* Projects */}
            <div className="space-y-4 mb-8">
              {MOCK_PROJECTS.map((project, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {t(project.status === 'completed' ? 'status_completed' : 'status_in_progress')}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.status === 'completed' ? 'bg-green-500' : 'bg-brand-500'
                      }`}
                      style={{ width: project.progress + '%' }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">{project.progress}%</p>
                </div>
              ))}
            </div>

            {/* Documents */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('documents_title')}</h3>
            <div className="space-y-2">
              {MOCK_DOCUMENTS.length === 0 ? (
                <p className="text-sm text-gray-400">{t('no_documents')}</p>
              ) : (
                MOCK_DOCUMENTS.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:border-brand-100 hover:bg-brand-50/30 transition-all group"
                  >
                    <svg className="w-5 h-5 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="flex-1 text-sm text-gray-700 group-hover:text-brand-600 transition-colors">{doc.name}</span>
                    <span className="text-xs font-medium text-brand-500">{t('download')}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}