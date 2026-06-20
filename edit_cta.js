const fs = require("fs");
const path = "C:\\Users\\贺义泉\\Documents\\Codex\\2026-06-19\\package-json-next-config-mjs-tailwind\\app\\[locale]\\page.tsx";
let content = fs.readFileSync(path, "utf8");

// Update bottom CTA section - change /contact to /services, update title keys
content = content.replace(
  'href="/contact" className="inline-flex items-center px-8 py-3.5 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl">{tcontact(',
  'href="/services" className="inline-flex items-center px-8 py-3.5 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl">{tcontact('
);

// Also the hero section CTA - it should now point to /services
// But we already updated the link to /services above

// Update the tools section to use tcommon instead of hardcoded Chinese
content = content.replace(
  '<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">\u5b9e\u7528\u5de5\u5177</h2>',
  '<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{tcommon("tools_title")}</h2>'
);

content = content.replace(
  '<p className="mt-4 text-lg text-gray-600">\u5b9e\u65f6\u67e5\u8be2\u56fd\u9645\u6d77\u8fd0\u3001\u7a7a\u8fd0\u548c\u94c1\u8def\u8fd0\u4ef7\u4e0e\u65f6\u6548</p>',
  '<p className="mt-4 text-lg text-gray-600">{tcommon("tools_desc")}</p>'
);

// Add translation keys for tools section to common namespace
// We'll add them in the translation files instead

fs.writeFileSync(path, content, "utf8");
console.log("✓ Updated bottom CTA and tools section");