/**
 * @file MDX/Markdown content loader with frontmatter parsing and filtering.
 * Content files are stored under /content/{locale}/{type}/.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/* ──────── Types ──────── */

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  locale: string;
  content: string;
}

/* ──────── Content directory helpers ──────── */

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function getContentDir(locale: string, type: string): string {
  return path.join(CONTENT_ROOT, locale, type);
}

function parseFile(filePath: string, locale: string, type: string): ContentItem | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = path.basename(filePath, '.md');
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : (data.date || ''),
      category: data.category || type,
      tags: Array.isArray(data.tags) ? data.tags : [],
      locale,
      content: content.trim(),
    };
  } catch {
    return null;
  }
}

/* ──────── Public API ──────── */

export function getContentItems(locale: string, type: 'services' | 'cases' | 'news'): ContentItem[] {
  const dir = getContentDir(locale, type);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const items: ContentItem[] = [];
  for (const file of files) {
    const item = parseFile(path.join(dir, file), locale, type);
    if (item) items.push(item);
  }
  return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getContentItem(locale: string, type: string, slug: string): ContentItem | null {
  const filePath = path.join(getContentDir(locale, type), slug + '.md');
  if (!fs.existsSync(filePath)) return null;
  return parseFile(filePath, locale, type);
}

export function getRelatedItems(locale: string, type: string, currentSlug: string, tags: string[], limit = 3): ContentItem[] {
  const all = getContentItems(locale, type as 'services' | 'cases' | 'news');
  return all
    .filter((item) => item.slug !== currentSlug)
    .map((item) => ({ item, score: item.tags.filter((t) => tags.includes(t)).length }))
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((e) => e.item);
}

export function generateContentStaticParams(locale: string, type: 'services' | 'cases' | 'news'): { slug: string }[] {
  return getContentItems(locale, type).map((item) => ({ slug: item.slug }));
}

/* ──────── Simple markdown renderer ──────── */

export function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/^---+$/gm, '<hr/>');

  const blocks = html.split(/\n\n+/);
  const processed = blocks.map((block) => {
    const t = block.trim();
    if (!t) return '';
    if (t.startsWith('### ')) return '<h3>' + t.slice(4) + '</h3>';
    if (t.startsWith('## ')) return '<h2>' + t.slice(3) + '</h2>';
    if (t.startsWith('- ') || t.startsWith('* ')) {
      const items = t.split('\n').filter((l) => l.startsWith('- ') || l.startsWith('* ')).map((l) => '<li>' + l.replace(/^[-*] /, '') + '</li>').join('');
      return '<ul>' + items + '</ul>';
    }
    if (/^\d+\.\s/.test(t)) {
      const items = t.split('\n').filter((l) => /^\d+\.\s/.test(l)).map((l) => '<li>' + l.replace(/^\d+\.\s/, '') + '</li>').join('');
      return '<ol>' + items + '</ol>';
    }
    if (t.startsWith('> ')) return '<blockquote>' + t.replace(/^> /gm, '').trim() + '</blockquote>';
    return '<p>' + t.replace(/\n/g, '<br/>') + '</p>';
  });

  return processed.join('\n');
}

