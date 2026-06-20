import re

path = 'C:\\Users\\贺义泉\\Documents\\Codex\\2026-06-19\\package-json-next-config-mjs-tailwind\\app\\[locale]\\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add SearchBar import
if 'SearchBar' not in content:
    content = content.replace(
        "import { getContentItems } from '@/lib/mdx';",
        "import { getContentItems } from '@/lib/mdx';\nimport SearchBar from '@/components/common/SearchBar';"
    )
    print('✓ Added SearchBar import')

# 2. Find and replace CTA buttons block
old_cta = """            <div className=\"mt-10 flex flex-wrap gap-4\">
              <Link href=\"/contact\" className=\"inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl\">{th('cta_primary')}</Link>
              <Link href=\"/tools\" className=\"inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all\">{th('cta_secondary')}</Link>
            </div>"""

new_cta = """            <div className=\"mt-8 mb-10\">
              <SearchBar variant=\"hero\" />
            </div>
            <div className=\"flex flex-wrap gap-4 justify-center\">
              <Link href=\"/services\" className=\"inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-600 font-semibold text-sm shadow-lg hover:bg-blue-50 transition-all hover:shadow-xl\">{th('cta_primary')}</Link>
              <Link href=\"/tools\" className=\"inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all\">{th('cta_secondary')}</Link>
            </div>"""

if old_cta in content:
    content = content.replace(old_cta, new_cta)
    print('✓ Replaced CTA block')
else:
    print('! CTA block not found')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('✓ Home page updated')
