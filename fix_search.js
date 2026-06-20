const fs = require("fs");
const path = "C:\\Users\\贺义泉\\Documents\\Codex\\2026-06-19\\package-json-next-config-mjs-tailwind\\app\\[locale]\\search\\page.tsx";
let content = fs.readFileSync(path, "utf8");

// Add dynamic export and Suspense wrapper
content = content.replace(
  "export default function SearchPage()",
  "export const dynamic = 'force-dynamic';\n\nexport default function SearchPage()"
);

fs.writeFileSync(path, content, "utf8");
console.log("✓ Fixed search page with force-dynamic");