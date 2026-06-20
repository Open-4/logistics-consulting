const fs = require("fs");
const path_base = "C:\\Users\\贺义泉\\Documents\\Codex\\2026-06-19\\package-json-next-config-mjs-tailwind";

// --- 1. Update home page ---
const homePath = path_base + "\\app\\[locale]\\page.tsx";
let content = fs.readFileSync(homePath, "utf8");

// Add SearchBar import (only if not already there)
if (!content.includes("SearchBar")) {
  content = content.replace(
    "import { getContentItems } from '@/lib/mdx';",
    "import { getContentItems } from '@/lib/mdx';\nimport SearchBar from '@/components/common/SearchBar';"
  );
  console.log("✓ Added SearchBar import");
}

// Replace CTA buttons - use flexible matching
const ctaRegex = /<div className="mt-10 flex flex-wrap gap-4">\s*<Link href="\/contact"[^>]*>{th\('cta_primary'\)}<\/Link>\s*<Link href="\/tools"[^>]*>{th\('cta_secondary'\)}<\/Link>\s*<\/div>/s;
const newCTA = `<div className="mt-8 mb-10">
              <SearchBar variant="hero" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/services" className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl">{th('cta_primary')}</Link>
              <Link href="/tools" className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all">{th('cta_secondary')}</Link>
            </div>`;

if (ctaRegex.test(content)) {
  content = content.replace(ctaRegex, newCTA);
  console.log("✓ Replaced CTA buttons with SearchBar");
} else {
  console.log("! CTA regex didn't match, trying simpler match...");
  // Try finding the key text
  if (content.includes('cta_primary') && content.includes('/contact')) {
    console.log("  Found contact link, looking at surrounding block...");
    // Extract the block manually
    const idx = content.indexOf('href="/contact"');
    const lineStart = content.lastIndexOf('\n', idx);
    const lineEnd = content.indexOf('\n', idx + 50);
    console.log("  Contact link line:", content.substring(lineStart, lineEnd).trim());
  }
}

fs.writeFileSync(homePath, content, "utf8");
console.log("✓ Home page saved");