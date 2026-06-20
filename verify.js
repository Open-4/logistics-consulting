const fs = require("fs");
const path_base = "C:\\Users\\贺义泉\\Documents\\Codex\\2026-06-19\\package-json-next-config-mjs-tailwind";

// Check/create search API
const apiSearch = path_base + "\\app\\api\\search\\route.ts";
if (!fs.existsSync(apiSearch)) {
  console.log("Creating search API...");
}

// Check/create search page
const searchPageDir = path_base + "\\app\\[locale]\\search";
const searchPage = searchPageDir + "\\page.tsx";
if (fs.existsSync(searchPage)) {
  console.log("✓ Search page exists, reading...");
  const sp = fs.readFileSync(searchPage, "utf8");
  console.log("  Content length:", sp.length);
} else {
  console.log("! Search page not found, creating...");
  fs.mkdirSync(searchPageDir, { recursive: true });
  
  const spContent = `'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function SearchPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q || q.length < 2) { setLoading(false); return; }
    fetch(\`/api/search?q=\${encodeURIComponent(q)}&locale=\${locale}\`)
      .then(r => r.json())
      .then(data => { setResults(data.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [q, locale]);

  const getTypePath = (slug, cat) => {
    if (cat === "services" || cat.includes("咨询")) return "/services/" + slug;
    if (cat === "cases") return "/cases/" + slug;
    return "/news/" + slug;
  };

  const getTypeLabel = (cat) => {
    if (locale === "zh") {
      if (cat === "services" || cat.includes("咨询")) return "服务";
      if (cat === "cases") return "案例";
      return "资讯";
    }
    if (cat === "services") return "Service";
    if (cat === "cases") return "Case";
    return "News";
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === "zh" ? \`搜索"\${q}"的结果\` : \`Results for "\${q}"\`}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {loading ? (locale === "zh" ? "搜索中..." : "Searching...") : results.length + " " + (locale === "zh" ? "条结果" : "results")}
        </p>
        {!loading && results.length === 0 && q && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{locale === "zh" ? "未找到相关结果" : "No results found"}</h2>
          </div>
        )}
        {results.map(r => (
          <Link key={r.slug} href={getTypePath(r.slug, r.category)} className="block bg-white rounded-2xl border border-gray-100 p-6 mb-4 hover:shadow-md transition-all">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">{getTypeLabel(r.category)}</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-1">{r.title}</h3>
            <p className="text-sm text-gray-600">{r.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync(searchPage, spContent, "utf8");
  console.log("✓ Created search page");
}

// Verify search API
const apiRoute = path_base + "\\app\\api\\search\\route.ts";
if (fs.existsSync(apiRoute)) {
  const api = fs.readFileSync(apiRoute, "utf8");
  console.log("✓ Search API exists,", api.length, "bytes");
} else {
  console.log("! Search API missing");
}

// Check home page was updated
const homeContent = fs.readFileSync(path_base + "\\app\\[locale]\\page.tsx", "utf8");
console.log("");
console.log("=== Home page verification ===");
console.log("Has SearchBar:", homeContent.includes("SearchBar"));
console.log("Has /contact as CTA:", homeContent.includes('href="/contact"') && homeContent.includes("cta_primary"));
console.log("Has /services as CTA:", homeContent.includes('href="/services"') && homeContent.includes("cta_primary"));